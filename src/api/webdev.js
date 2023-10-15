import request from "@/utils/request";

export const getSiteList = () => {
    return request({
        method: "get",
        url: "/api/frontEnd/getSiteList",
    });
};

export const getInterviewList = () => {
    return request({
        method: "get",
        url: "/api/frontEnd/getInterviewList",
    });
};

export const getSiteListA = () => {
    return request({
        method: "get",
        url: "/api/frontEnd/getSiteListA",
    });
};