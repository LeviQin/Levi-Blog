import request from "@/utils/request";

export const getExifTotal = () => {
    return request({
        method: "get",
        url: "/api/image-tool/exif-total",
    });
};

export const addExifTotal = () => {
    return request({
        method: "post",
        url: "/api/image-tool/update-parse-count",
    });
};