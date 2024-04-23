import request from "@/utils/request";

export const sendBoardMsg = (data) => {
    return request({
        method: "post",
        url: `/api/message/messages`,
        data
    });
};