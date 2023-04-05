import request from "@/utils/request";

export const getSiteList = () => {
    return request({
        method: 'get',
        url: '/api/getSiteList',
    });
};

export const getInterviewList = () => {
    return request({
        method: 'get',
        url: '/api/getInterviewList',
    });
};

export const getSiteListA = () => {
    return request({
        method: 'get',
        url: '/api/getSiteListA',
    });
};