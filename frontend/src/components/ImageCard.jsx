import axios from "axios"
import "../styles/imageCard.css"
import { useState, useEffect } from "react"
import Toast from "./Toast"

const ImageCard = ({ image, onRemove }) => {
    const [isFavourite, setIsFavourite] = useState(false)
    const [showAddToast, setShowAddToast] = useState(null)

    useEffect(() => {
        async function checkIfFavourite() {
            try {
                const response = await axios.get("http://localhost:3000/api/favourites")
                const favourites = response.data
                favourites.forEach((fav) => {
                    if (fav.id === image.id) {
                        setIsFavourite(true)
                    }
                })
            } catch (error) {
                console.error("Error checking favourites:", error)
            }
        }

        checkIfFavourite()
    }, [image.id])


    const handleFavouritesToggle = async () => {
        if (isFavourite) {
            try {
                await axios.delete(`http://localhost:3000/api/favourites/remove/${image.id}`)
                setIsFavourite(false)
                setShowAddToast("0")
                if (onRemove) onRemove(image.id)
            } catch (error) {
                console.error("Error removing from favourites:", error)
            }
        }
        else {
            try {
                await axios.post("http://localhost:3000/api/favourites", {
                    id: image.id,
                    imageURL: image.src.large,
                    avg_color: image.avg_color,
                    alt: image.alt
                })
                setIsFavourite(true)
                setShowAddToast("1")
            } catch (error) {
                console.error("Error adding to favourites:", error)
            }
        }
    }

    const handleDownload = async (url, filename) => {
        try {
            const res = await fetch(url, { mode: 'cors' })
            if (!res.ok) throw new Error('Network error')
            const blob = await res.blob()
            const blobUrl = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = blobUrl
            a.download = filename
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(blobUrl)
        } catch (err) {
            window.open(url, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <>
            <div key={image.id} style={{ backgroundColor: image.avg_color }} className="imgContainer">
                <div className="options">
                    <button
                        className="download"
                        type="button"
                        onClick={() =>
                            handleDownload(
                                image.imageURL || image.src?.large,
                                `ImageSearcher-${image.id || Date.now()}.jpg`
                            )
                        }
                    >
                        <i className="ri-download-line"></i>
                    </button>
                    <button className="saveToFav" onClick={handleFavouritesToggle}><i className={isFavourite ? "ri-bookmark-fill" : "ri-bookmark-line"}></i></button>
                </div>
                <img src={image.imageURL || image.src?.large}
                    alt={image.alt}
                    className="images"
                    loading="lazy" />
                <p className="imgAbt">{image.alt}</p>
            </div>
            {showAddToast === "1" && <Toast isFor={"add"} />}
            {showAddToast === "0" && <Toast isFor={"remove"} />}
        </>
    )
}

export default ImageCard