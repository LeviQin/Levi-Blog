import request from "@/utils/request";

export const identifyIpArea = (data) => {
    return request({
        method: "post",
        url: `/api/tools/identifyIpArea`,
        data
    });
};

export const weatherInfo = (data) => {
    return request({
        method: "post",
        url: `/api/tools/weatherInfo`,
        data
    });
};

export const cityCode = (data) => {
    return request({
        method: "post",
        url: `/api/tools/cityCode`,
        data
    });
};