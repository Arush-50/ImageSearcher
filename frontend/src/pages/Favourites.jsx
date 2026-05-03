import "../styles/favourites.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from "axios"
import Navbar from '../components/Navbar'
import ImageCard from "../components/ImageCard"
import Loader from "../components/Loader"
import ScrollUp from "../components/ScrollUp"
import Toast from "../components/Toast"

const Favourites = () => {
  const [hasFavourite, setHasFavourite] = useState(false)
  const [favourites, setFavourites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollUp, setShowScrollUp] = useState(false)

  useEffect(() => {
    async function fetchFavourites() {
      setIsLoading(true)
      await axios.get("http://localhost:3000/api/favourites").then(res => {
        setFavourites(res.data)
        setHasFavourite(res.data.length > 0)
        setShowScrollUp(res.data.length > 0)
      }).catch(error => {
        console.error("Error fetching favourites:", error)
      }).finally(() => {
        setIsLoading(false)
      })
    }
    fetchFavourites()
  }, [])

  const handleRemove = (id) => {
    setFavourites(prev => {
      const next = prev.filter(img => img.id !== id)
      setHasFavourite(next.length > 0)
      setShowScrollUp(next.length > 0)
      return next
    })
  }

  return (
    <div className="favourites">
      <h1>Favourites</h1>
      <div className="container">
        {isLoading && <Loader />}
        {!hasFavourite && !isLoading && (
          <>
            <p>You don't have any favourite images.</p>
            <Link to="/"><button>Explore Images</button></Link>
          </>
        )}
        {hasFavourite && (
          <section className="imagesSec">
            {favourites.length !== 0 && favourites.map(image => {
              return <ImageCard key={image.id} image={image} onRemove={handleRemove} />
            })}
          </section>
        )}
      </div>
      {showScrollUp && <ScrollUp />}
    </div>
  )
}

export default Favourites
