const { fetchFromIMDB } = require("../Services/imdbService");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

exports.getTrendingTv = async(req, res)=>{
    try{
        const data = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies");
        const randomMovie = data[Math.floor(Math.random() * data?.length)];
        console.log("randomMovie", randomMovie);

        res.status(200).json({
            success: true,
            content: randomMovie,
            message: "Trending movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching trending movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getTvTrailers = async(req, res)=>{
    const options = {
        headers: {
            Authorization: process.env.PEXEL_API_KEY
        }    
    }

    try{
        const response = await axios.get('https://api.pexels.com/videos/popular', options);
        // console.log("response----->>>", response)

    const videos = response.data.videos;
    
    res.status(200).json({
        success: true,
        trailer: videos
    })
    }
    catch(error){
        console.error('Error fetching videos:', error);
    }
}

exports.getSimilarTvs = async(req, res)=>{
    try{
        const data = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies");
        // const randomMovie = data[Math.floor(Math.random() * data?.length)];
        // console.log("randomMovie", randomMovie);

        res.status(200).json({
            success: true,
            similar: data,
            message: "Similar movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching Similar movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getPopularTvs = async(req, res)=>{
    try{
        const response = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/top-rated-english-movies")
        res.status(200).json({
            success: true,
            popularContent: response,
            message: "Similar movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching Popular movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getTopRatedTvs = async(req, res)=>{
    try{
        const response = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies")
        res.status(200).json({
            success: true,
            topRated: response,
            message: "Similar movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching Popular movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getUpcomingTvs = async(req, res)=>{
    try{
        const response = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/top-box-office")
        res.status(200).json({
            success: true,
            upcoming: response,
            message: "Similar movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching Popular movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getNowPlayingTvs = async(req, res)=>{
    try{
        const response = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/lowest-rated-movies")
        res.status(200).json({
            success: true,
            nowPlaying: response,
            message: "Similar movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching Popular movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}



// exports.getTrendingMovie = async(req, res)=>{
//     try{
//         const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
//         const randomMovie = data.results[Math.floor(Math.random() * data?.results?.length)];

//         res.status(200).json({
//             success: true,
//             content: randomMovie,
//             message: "Trending movie get fetched successfully"
//         })
//     }
//     catch(error){
//         console.log("Error occured during fetching trending movie");
//         res.status(500).json({
//             success: false,
//             message: error.message 
//         })
//     }
// }




