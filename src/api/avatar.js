import request from "@/utils/request";

export const getAvatars = (type) => {
    return request({
        method: "get",
        url: `/api/avatar/avatars?type=${type}`,
    });
};