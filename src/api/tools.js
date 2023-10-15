import request from "@/utils/request";

export const identifyIpArea = (data) => {
    return request({
        method: "post",
        url: `/api/tools/identifyIpArea`,
        data
    });
};