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


/**
 * 时间显示格式化： 多少分钟前，多少天前
 * @param {*} timestamp 
 * @returns 
 */
export const dateToString = (timestamp) => {
    timestamp = new Date(timestamp);
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let month = day * 30;
    let now = new Date().getTime();
    let diffValue = now - timestamp;

    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
        return '不久前';
    }
    // 计算差异时间的量级
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;

    // 数值补0方法
    let zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    // 使用
    if (monthC > 4) {
        // 超过1年，直接显示年月日
        return (function () {
            let date = new Date(timestamp);
            return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
        })();
    } else if (monthC >= 1) {
        return parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        return parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        return parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        return parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        return parseInt(minC) + "分钟前";
    }
    return '刚刚';
};