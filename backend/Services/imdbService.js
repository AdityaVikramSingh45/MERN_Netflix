const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();


exports.fetchFromIMDB = async (url) => {
    const options = {
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST
          }
        };

    try {
        const response = await axios.get(url, options);

        if (response.status !== 200) {
            throw new Error("Failed to fetch data from IMDB");
        }

        // console.log("Response from imdbService -->", response.data); 
        
        return response.data; 
    } catch (error) {
        console.error("Error fetching data from IMDb API:", error.message);
        throw error; // Re-throw the error for handling in the calling function
    }
};

// exports.fetchFromDb = async(url)=>{
//     const options = {
//         headers: {
//           'x-rapidapi-key': 'e7cde12bf3msh0ae7bbe7a47a3b0p11bb36jsnd3d89b3d00c9',
//           'x-rapidapi-host': 'moviesverse1.p.rapidapi.com'
//         }
//       };
//       try{
//         const response = await axios.request(url, options);
//         if (response.status !== 200) {
//             throw new Error("Failed to fetch data from IMDB");
//         }
//         return response.data;
//       }
//       catch(error){
//         console.error("Error fetching data from IMDb API:", error.message);
//         throw error; // Re-throw the error for handling in the calling function
//       }
// }