async function searchImages(query, perPage = 30, page = 1) {
    const apiKey = process.env.PEXELS_API_KEY
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey
            }
        })
        if (!response.ok) {
            throw new Error(`Error fetching images: ${response.statusText}`)
        }
        const data = await response.json()
        return data.photos
    } catch (error) {
        console.error(error)
    }
}

module.exports = searchImages