import request from "@/utils/request";

export const getlinkList = () => {
    return request({
        method: 'get',
        url: '/api/links/link',
    });
};