import request from "@/utils/request";

export const getBlogSetting = (key = "") => {
    return request({
        method: "get",
        url: `/api/blog-setting/settings?key=${key}`,
    });
};

export const setBlogSetting = (data) => {
    return request({
        method: "post",
        url: `/api/blog-setting/setting`,
        data
    });
};