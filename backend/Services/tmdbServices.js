const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

exports.fetchFromTMDB = async(url)=>{
    const options = {
        headers: {
            accept: "application/json",
            Authorization: "Bearer" + process.env.TMDB_API_KEY
        }
    };
    //Fetch through AXIOS
    const response = await axios.get(url, options);
    console.log("Response form tmdbService-->", response)

    if(response.status !== 200){
        throw new Error("Failed to fetch data from TMDB" + response.statusText)
    }

    return response.data;
}

