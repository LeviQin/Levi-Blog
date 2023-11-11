import request from "@/utils/request";

export const getArticleList = () => {
    return request({
        method: 'get',
        url: '/api/articles/article',
    });
};

export const getCategoryArticles = (data) => {
    return request({
        method: "post",
        url: `/api/articles/category`,
        data
    });
};

export const articleDetail = (id) => {
    return request({
        method: 'get',
        url: `/api/articles/article/${id}`,
    });
};