import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";

const ShimmerCard = () => (
    <div className="min-w-[180px] sm:min-w-[180px] md:min-w-[220px] h-[300px] bg-gray-800 animate-pulse rounded-xl" />
);

const MovieSlider = ({ category }) => {
    const { contentType } = useContentStore();
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);

    const formattedContentType = contentType === "movie" ? "Movies" : "Tv shows";
    const formattedCategoryName =
        category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);

    useEffect(() => {
        const getContent = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/${contentType}/popular`,
                    { withCredentials: true }
                );
                setContent(res?.data?.popularContent);
            } catch (error) {
                console.error("Failed to fetch content", error);
            } finally {
                setLoading(false);
            }
        };
        getContent();
    }, [category, contentType]);

    return (
        <div className="bg-black text-white relative px-5 md:px-20">
            <h2 className="text-xl md:text-2xl font-semibold mb-5">
                {formattedCategoryName} {formattedContentType}
            </h2>

            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <ShimmerCard key={index} />
                      ))
                    : content?.map((item) => (
                          <Link
                              to={`/watch/${item.id}`}
                              className="min-w-[180px] sm:min-w-[180px] md:min-w-[220px] relative group"
                              key={Math.floor(Math.random() * 11000)}
                          >
                              <div className="rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                                  <img
                                      src={item?.primaryImage}
                                      alt="Movie image"
                                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                  />
                              </div>
                              <p className="mt-2 text-center">{item.primaryTitle}</p>
                          </Link>
                      ))}
            </div>
        </div>
    );
};

export default MovieSlider;
