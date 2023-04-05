import Cookies from "js-cookie";

export const TOKEN_KEY = "ADMIN_TK";

export function getToken() {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false;
};

export function setToken(token) {
    return Cookies.set(TOKEN_KEY, token, 1);
};

export function removeToken() {
    return Cookies.remove(TOKEN_KEY);
};
