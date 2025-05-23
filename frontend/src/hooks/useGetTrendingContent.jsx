import React, { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const useGetTrendingContent = ()=>{
    const [trendingContent, setTrendingContent] = useState(null);
    const {contentType} = useContentStore()

    const [loading, setLoading] = useState(false);

    // useEffect(()=>{
    //     console.log("contentType", contentType);

    // }, [])
    
    useEffect(()=>{
        const getTrendingContent = async()=>{
            setLoading(true);
            try {
                const res = await axios.get(`${baseURL}/api/v1/${contentType}/trending`, { withCredentials: true });
                setTrendingContent(res.data.content);
              } catch (error) {
                console.error("Failed to fetch trending content", error);
                setTrendingContent(null);
              } finally {
                setLoading(false);
              }
        }

        getTrendingContent();
    }, [contentType])

    return {trendingContent, loading}
}

export default useGetTrendingContent