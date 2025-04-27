import request from "@/utils/request";

export const getArticleList = () => {
    return request({
        method: "get",
        url: "/api/articles/article",
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
        method: "get",
        url: `/api/articles/article/${id}`,
    });
};

export const getKeywordResult = (data) => {
    return request({
        method: "post",
        url: `/api/articles/searchKeyword`,
        data
    });
};

export const getStatistics = () => {
    return request({
        method: "get",
        url: `/api/articles/statistics`,
    });
};

export const ArticleLikes = (data) => {
    return request({
        method: "post",
        url: `/api/articles/likes`,
        data
    });
};

export const getTagList = () => {
    return request({
        method: "get",
        url: `/api/articles/tags`,
    });
};