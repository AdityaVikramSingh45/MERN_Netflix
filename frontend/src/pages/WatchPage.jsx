import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import React from "react";
import ReactPlayer from "react-player";
import MovieSlider from "../components/MovieSlider";

function formatReleaseDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

const WatchPage = () => {
    const { id } = useParams();
    const [trailer, setTrailer] = useState(null);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const { contentType } = useContentStore();

    useEffect(() => {
        const getTrailer = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/${contentType}/trending`, {
                    withCredentials: true,
                });
                setTrailer(res?.data?.content?.trailer);
            } catch (error) {
                if (error.message.includes("404")) {
                    console.log("No Trailer Found");
                    setTrailer(null);
                }
            }
        };
        getTrailer();
    }, [contentType, id]);

    useEffect(() => {
        const getContentDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/${contentType}/trending`, {
                    withCredentials: true,
                });
                setContent(res?.data?.content);
                setCurrentTrailerIdx(res?.data?.content?.id);
                console.log(res?.data?.content);
            } catch (error) {
                if (error.message.includes("404")) {
                    console.log("No Content Found");
                    setContent(null);
                }
            } finally {
                setLoading(false);
            }
        };
        getContentDetail();
    }, [contentType, id]);

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="mx-auto container px-4 py-5 h-full">
                <Navbar />

                {/* Trailer */}
                <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
                    {loading ? (
                        <div className="w-full h-[70vh] bg-gray-700 animate-pulse rounded-lg" />
                    ) : (
                        trailer?.length > 0 && (
                            <ReactPlayer
                                controls={true}
                                width={"100%"}
                                height={"70vh"}
                                className="mx-auto overflow-hidden rounded-lg"
                                url={`https://www.youtube.com/watch?v=${trailer}`}
                            />
                        )
                    )}
                </div>

                {/* Recommended Movie Section */}
                <div className="max-w-6xl mx-auto mt-12 px-4 md:px-8">
                    <h2 className="text-3xl font-semibold mb-6 border-l-4 border-red-500 pl-4">
                        Recommended Movie
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                        <div>
                            <h3 className="text-4xl font-bold text-white">
                                {content?.primaryTitle}
                            </h3>
                            <p className="mt-2 text-lg text-gray-300">
                                {formatReleaseDate(content?.startYear || 1990)} |{" "}
                                {content?.isAdult ? (
                                    <span className="text-red-500">18+</span>
                                ) : (
                                    <span className="text-green-500">PG-13</span>
                                )}
                            </p>
                            <p className="mt-4 text-md text-gray-300 leading-relaxed">
                                {content?.description}
                            </p>
                        </div>

                        {content?.primaryImage && (
                            <img
                                src={content?.primaryImage}
                                alt="Poster"
                                className="w-full max-h-[500px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                            />
                        )}
                    </div>
                </div>

                {/* Movie Slider */}
                <div className="mt-16 px-4 md:px-10 lg:px-20">
                    <h3 className="text-2xl font-semibold mb-4 border-l-4 border-red-500 pl-4"/>
                    <MovieSlider category="Similar" />
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
