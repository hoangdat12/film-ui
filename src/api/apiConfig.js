const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '14076b9c6598506287f61740e48172ae',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;