import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import "../styles/home.css"
import axios from "axios"
import ImageCard from "../components/ImageCard"
import Loader from "../components/Loader"
import ScrollUp from "../components/ScrollUp"

const Home = () => {
  const [searchValue, setsearchValue] = useState("")
  const [showPhotos, setShowPhotos] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollUp, setShowScrollUp] = useState(false)

  useEffect(() => {
    async function fetchData() {
      await axios.get("http://localhost:3000/api/search/popular").then((res) => {
        setData(res.data)
        setIsLoading(false)
        setShowScrollUp(true)
      }).catch((err) => {
        console.error(err)
        alert("Please check if your server is running or not.")
      })
    }
    fetchData()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (searchValue.trim() === "") {
      alert("Please enter a search term.")
      setsearchValue("")
      return
    }
    setShowScrollUp(false)
    setIsLoading(true)
    await axios.get(`http://localhost:3000/api/search/${searchValue}`).then((res) => {
      setData(res.data)
      setShowPhotos(true)
      setIsLoading(false)
      setShowScrollUp(true)
    }).catch((err) => {
      console.error(err)
      alert("Please check if your server is running or not.")
    })
  }

  const handleChange = (e) => {
    setsearchValue(e.target.value)
  }

  return (
    <div className="home">
      <section className="searchSection">
        <h1>Welcome to ImageSearcher</h1>
        <p>Search for your favourite images and save them to your favourites list!</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Search images..." value={searchValue} onChange={handleChange} />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Search"}
          </button>
        </form>
      </section>

      {!showPhotos && <h2 align="center">Trending Images</h2>}
      <section className="sec-2">
        {isLoading ? <Loader /> : data.length === 0 ? <h2>No images found.</h2> :
          (<div className="imagesContainer">
            {data.length !== 0 && data.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>)}
        {showScrollUp && data.length !== 0 && <ScrollUp />}
      </section>
    </div>
  )
}

export default Home