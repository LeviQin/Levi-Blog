import request from "@/utils/request";

export const getComments = (article_id) => {
    return request({
        method: "get",
        url: `/api/comments/comment?article_id=${article_id}`,
    });
};

export const sendComment = (data) => {
    return request({
        method: "post",
        url: `/api/comments/comment`,
        data
    });
};