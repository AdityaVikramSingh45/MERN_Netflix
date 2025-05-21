import { create } from "zustand";


//Tv shows and Movies
export const useContentStore = create((set) => ({
    contentType: "movie",
    setContentType: (type) => {
        set({contentType: type})
    }
}))