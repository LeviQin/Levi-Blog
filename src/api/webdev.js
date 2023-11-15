import request from "@/utils/request";

export const getSiteList = () => {
    return request({
        method: "get",
        url: "/api/frontEnd/siteNav",
    });
};

export const getInterviewList = () => {
    return request({
        method: "get",
        url: "/api/frontEnd/interview",
    });
};

export const getSiteListA = () => {
    return request({
        method: "get",
        url: "/api/frontEnd/getSiteListA",
    });
};