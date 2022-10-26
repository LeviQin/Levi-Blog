

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
    return function() {                
        const context = this;               
        const args = arguments;                
        if (!timer) {                    
            timer = setTimeout(function() {                        
                func.apply(context, args);                        
                timer = null;                    
            }, delay);                
        }            
    }        
}   