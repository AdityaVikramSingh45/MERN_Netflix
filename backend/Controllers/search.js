const User = require("../Models/user");
const { fetchFromIMDB } = require("../Services/imdbService");

exports.searchPerson = async(req, res)=>{
    try{

    }
    catch(error){

    }
}

// exports.searchMovie = async(req, res)=>{
//     try{
//         const {query} = req.params;
//         const response1 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies");
//         const response2 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/top-rated-english-movies");
//         const response3 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/lowest-rated-movies");
//         const response4 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/top-box-office");

//         const response = [...response1, ...response2, ...response3, ...response4];

//         if(!response || response.length === 0){
//             return res.status(400).json({
//                 success: false,
//                 message: "Error occured while fetching movies"
//             })
//         }

//         let requiredMovie = null;
//         response.find((movie) => {
//             if(movie.primaryTitle.replace(/\s/g, "").toLowerCase() === query.replace(/\s/g, "").toLowerCase()){
//                 requiredMovie = movie;
//                 console.log("Yeh i found it", movie)
//             }
//         })
//         // console.log("requiredMovie--->", requiredMovie)

//         // console.log("requiredMovie--->", requiredMovie.id)
//         // console.log("requiredMovie.primaryImage--->", requiredMovie.primaryImage)
//         // console.log("requiredMovie.originalTitle--->", requiredMovie.originalTitle)


//         if(!requiredMovie){
//             return res.status(404).json({
//                 success: false,
//                 message: "No movie found"
//             })
//         }

//         // console.log("req.user", req.user);

//         const user = await User.findByIdAndUpdate(req.user._id, {
//             $push:{
//                 searchHistory:{
//                     id: requiredMovie.id,
//                     image: requiredMovie.primaryImage,
//                     title: requiredMovie.originalTitle,
//                     searchType: "movie",
//                     createdAt: Date.now()
//                 }
//             }
//         })

//         // console.log("User", user);

//         return res.status(200).json({
//             success: true,
//             movie: requiredMovie
//         })

//     }
//     catch(error){
//         console.log("Error occured whie fetching the movie")
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         })
//     }
// }

exports.searchMovie = async (req, res) => {
	try {
		const { query } = req.params;

		const response1 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies");
		const response2 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/top-rated-english-movies");
		const response3 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/lowest-rated-movies");
		const response4 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/top-box-office");

		const allMovies = [...response1, ...response2, ...response3, ...response4];

		if (!allMovies || allMovies.length === 0) {
			return res.status(400).json({
				success: false,
				message: "Error occurred while fetching movies"
			});
		}

		const normalizedQuery = query.replace(/\s/g, "").toLowerCase();

		const matchedMovies = allMovies.filter((movie) => {
			const title = movie.primaryTitle?.replace(/\s/g, "").toLowerCase();
			return title && title.includes(normalizedQuery);
		});

		if (matchedMovies.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No movies found for the given query"
			});
		}

		const searchEntries = matchedMovies.map(movie => ({
			id: movie.id,
			image: movie.primaryImage,
			title: movie.originalTitle,
			searchType: "movie",
			createdAt: Date.now()
		}));

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: { $each: searchEntries }
			}
		});

		return res.status(200).json({
			success: true,
			content: matchedMovies
		});
	} catch (error) {
		console.error("Error occurred while fetching the movie:", error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error"
		});
	}
};


exports.searchTv = async(req, res)=>{
    try{
        const {query} = req.params;
        const response1 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/imdb/most-popular-movies");
        const response2 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/imdb/top-rated-english-movies");
        const response3 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/imdb/lowest-rated-movies");
        const response4 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/imdb/top-box-office");

        const response = [...response1, ...response2, ...response3, ...response4];

        if(!response || response.length === 0){
            return res.status(400).json({
                success: false,
                message: "Error occured while fetching TV SHOWS"
            })
        }

        let requiredTvShows = null;
        response.find((tvShow) => {
            if(tvShow.primaryTitle.replace(/\s/g, "").toLowerCase() === query.replace(/\s/g, "").toLowerCase()){
                requiredTvShows = tvShow;
                console.log("Yeh i found it", tvShow)
            }
        })

        console.log("requiredTvShows--->", requiredTvShows)

        if(!requiredTvShows){
            return res.status(404).json({
                success: false,
                message: "No TV SHOWS found"
            })
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id: requiredTvShows.id,
                    image: requiredTvShows.primaryImage,
                    title: requiredTvShows.originalTitle,
                    searchType: "tv",
                    createdAt: Date.now()
                }
            }
        })

        return res.status(200).json({
            success: true,
            content: requiredTvShows
        })

    }
    catch(error){
        console.log("Error occured whie fetching the TV SHOWS")
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

exports.getSearchHistory = async(req, res)=>{
    try{
        res.status(200).json({
            success: true,
            content: req.user.searchHistory
        })
    }
    catch(error){
        console.log("Error occured while getSearchHistory...")
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

exports.removeItemFromSearchHistory = async(req, res)=>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: id
                }
            }
        }, {new: true})

        res.status(200).json({
            success: true,
            message: "Items removed from search histroy"
        })
    }
    catch(error){
        console.log("Error occured while removeItemFromSearchHistory");
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}