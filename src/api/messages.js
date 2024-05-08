import request from "@/utils/request";

export const getMessageList = () => {
    return request({
        method: 'get',
        url: '/api/message/messages',
    });
};

export const sendBoardMsg = (data) => {
    return request({
        method: "post",
        url: `/api/message/messages`,
        data
    });
};