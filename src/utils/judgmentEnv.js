/**
 * 获取baseUrl
 * @returns 
 */
export const getBaseURL = () => {
    const HOST = window.location.host;
    const PROD = "leviqin.top"; // 生产环境
    return HOST === PROD ? `https://api.leviqin.top` : `http://localhost:3000`;
}