// 防抖
export const debounce = (func, wait = 0) => {
    if (typeof func !== 'function') {
        throw new TypeError('need a function arguments')
    }
    let timeid = null;
    let result;

    return function () {
        const context = this;
        const args = arguments;

        if (timeid) {
            clearTimeout(timeid);
        }
        timeid = setTimeout(function () {
            result = func.apply(context, args);
        }, wait);

        return result;
    }
}

// 节流throttle代码（定时器）：
export const throttle = (func, delay) => {
    let timer = null;
    return function () {
        const context = this;
        const args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}

/**
 * @description 判断是否为移动端
 */
export const _isMobile = () => {
    const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
};

/**
 * 生成随机色值
 * @returns 
 */
export const getRandomHexColor = () => {
    // 生成随机的 R、G、B 分量
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // 补全至 6 位
    return '#' + '0'.repeat(6 - randomColor.length) + randomColor;
};