import request from "@/utils/request";

export const getBlogWallpaper = (key = "") => {
    return request({
        method: "get",
        url: `/api/blog-wallpaper/wallpapers?key=${key}`,
    });
};