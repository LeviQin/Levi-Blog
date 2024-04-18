/**
 * 单位转换函数
 * @param {string} type - 转换的类型（例如，'长度'、'质量'等）
 * @param {string} inputUnit - 输入的单位
 * @param {string} outputUnit - 输出的单位
 * @param {number} inputValue - 输入的值
 * @returns {number|string} - 转换结果或错误信息
 */
export const convertUnits = (type, inputUnit, outputUnit, inputValue) => {
    // 长度单位转换
    if (type === '长度') {
        const lengthConversionFactors = {
            '米': 1, // 米是基本单位，因此转换因子为1
            '分米': 10, // 1米 = 10分米
            '厘米': 100, // 1米 = 100厘米
            '英寸': 39.3701, // 1米 = 39.3701英寸
            '英尺': 3.28084, // 1米 = 3.28084英尺
            '千米': 0.001, // 1米 = 0.001千米
            '毫米': 1000, // 1米 = 1000毫米
            '码': 1.09361, // 1米 = 1.09361码
        };

        const result = inputValue * lengthConversionFactors[outputUnit] / lengthConversionFactors[inputUnit];
        return result;
    }

    // 质量单位转换
    else if (type === '质量') {
        const massConversionFactors = {
            '千克': 1, // 千克是基本单位，因此转换因子为1
            '克': 1000, // 1千克 = 1000克
            '磅': 2.20462, // 1千克 = 2.20462磅
            '盎司': 35.274, // 1千克 = 35.274盎司
            '公吨': 0.001, // 1千克 = 0.001公吨
            '斤': 2.20462, // 1千克 = 2.20462斤
            '毫克': 1000000, // 1千克 = 1000000毫克
            '吨': 0.0001, // 1千克 = 0.0001吨
            '英石': 0.157473, // 1千克 = 0.157473英石
            '太阳质量': 1.1109e-12, // 1千克 = 1.1109e-12太阳质量
        };

        const result = inputValue * massConversionFactors[outputUnit] / massConversionFactors[inputUnit];
        return result;
    }

    // 面积单位转换
    else if (type === '面积') {
        // 面积单位的转换因子
        const areaConversionFactors = {
            '平方米': 1, // 平方米是基本单位，因此转换因子为1
            '平方千米': 1e-6, // 1平方米 = 1e-6平方千米
            '平方厘米': 1e4, // 1平方米 = 1e4平方厘米
            '平方毫米': 1e6, // 1平方米 = 1e6平方毫米
            '公顷': 1e-4, // 1平方米 = 1e-4公顷
            '亩': 0.000247105, // 1平方米 = 0.000247105亩
            '英亩': 0.0000002471054, // 1平方米 = 0.0000002471054英亩
            '平方英尺': 10.7639, // 1平方米 = 10.7639平方英尺
            '平方英寸': 1550.0031, // 1平方米 = 1550.0031平方英寸
            // 添加更多面积单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * areaConversionFactors[outputUnit] / areaConversionFactors[inputUnit];
        return result;
    }

    // 时间单位转换
    else if (type === '时间') {
        const timeConversionFactors = {
            '秒': 1, // 秒是时间的基本单位，因此转换因子为1
            '分钟': 1 / 60, // 1分钟 = 1/60小时
            '小时': 1 / 3600, // 1小时 = 1/3600天
            '天': 1 / (24 * 3600), // 1天 = 1/24周
            '周': 1 / (7 * 24 * 3600), // 1周 = 1/30月
            '月': 1 / (30 * 24 * 3600), // 1月 = 1/12年
            '年': 1 / (365 * 24 * 3600), // 1年 = 1/10十年
            '十年': 10, // 1十年 = 10年
            '世纪': 100, // 1世纪 = 100年
        };

        const result = inputValue * timeConversionFactors[outputUnit] / timeConversionFactors[inputUnit];
        return result;
    }

    // 数据单位转换
    else if (type === '数据') {
        // 数据单位的转换因子
        const dataConversionFactors = {
            '比特': 1, // 比特是基本单位，因此转换因子为1
            '字节': 0.125, // 1字节 = 8比特
            '千比特': 0.001, // 1比特 = 0.001千比特
            '千字节': 0.000125, // 1字节 = 0.000125千字节
            '兆比特': 1e-6, // 1比特 = 1e-6兆比特
            '兆字节': 1.25e-7, // 1字节 = 1.25e-7兆字节
            '吉比特': 1e-9, // 1比特 = 1e-9吉比特
            '吉字节': 1.25e-10, // 1字节 = 1.25e-10吉字节
            '太比特': 1e-12, // 1比特 = 1e-12太比特
            '太字节': 1.25e-13, // 1字节 = 1.25e-13太字节
            '拍比特': 1e-15, // 1比特 = 1e-15拍比特
            '拍字节': 1.25e-16, // 1字节 = 1.25e-16拍字节
            // 添加更多数据单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * dataConversionFactors[outputUnit] / dataConversionFactors[inputUnit];
        return result;
    }


    // 速度单位转换
    else if (type === '速度') {
        // 速度单位的转换因子
        const speedConversionFactors = {
            '米/秒': 1, // 米/秒是基本单位，因此转换因子为1
            '千米/小时': 3.6, // 1米/秒 = 3.6千米/小时
            '英里/小时': 2.23694, // 1米/秒 = 2.23694英里/小时
            '节': 1.94384, // 1米/秒 = 1.94384节
            '英尺/秒': 3.28084, // 1米/秒 = 3.28084英尺/秒
            '公里/秒': 0.001, // 1米/秒 = 0.001公里/秒
            '公里/分钟': 0.06, // 1米/秒 = 0.06公里/分钟
            '微速': 1e6, // 1米/秒 = 1e6微速
            // 添加更多速度单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * speedConversionFactors[outputUnit] / speedConversionFactors[inputUnit];
        return result;
    }

    // 压力单位转换
    else if (type === '压力') {
        // 压力单位的转换因子
        const pressureConversionFactors = {
            '帕斯卡': 1, // 帕斯卡是基本单位，因此转换因子为1
            '千帕': 0.001, // 1帕斯卡 = 0.001千帕
            '兆帕': 1e-6, // 1帕斯卡 = 1e-6兆帕
            '巴': 0.00001, // 1帕斯卡 = 0.00001巴
            '毫米汞柱': 0.00750062, // 1帕斯卡 = 0.00750062毫米汞柱
            '英寸汞柱': 0.000295301, // 1帕斯卡 = 0.000295301英寸汞柱
            '磅力/平方英寸': 0.000145037737732, // 1帕斯卡 = 0.000145037737732磅力/平方英寸
            // 添加更多压力单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * pressureConversionFactors[outputUnit] / pressureConversionFactors[inputUnit];
        return result;
    }

    // 角度单位转换
    else if (type === '角度') {
        // 角度单位的转换因子
        const angleConversionFactors = {
            '度': 1, // 度是基本单位，因此转换因子为1
            '弧度': Math.PI / 180, // 1度 = π/180弧度
            '分钟': 60, // 1度 = 60分钟
            '秒': 3600, // 1度 = 3600秒
            '梅卡': 0.9, // 1度 = 0.9梅卡
            '圈': 1 / 360, // 1度 = 1/360圈
            // 添加更多角度单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * angleConversionFactors[outputUnit] / angleConversionFactors[inputUnit];
        return result;
    }

    // 功率单位转换
    else if (type === '功率') {
        // 功率单位的转换因子
        const powerConversionFactors = {
            '瓦特': 1, // 瓦特是基本单位，因此转换因子为1
            '千瓦': 0.001, // 1瓦特 = 0.001千瓦
            '兆瓦': 1e-6, // 1瓦特 = 1e-6兆瓦
            '千卡/小时': 0.859845, // 1瓦特 = 0.859845千卡/小时
            '英制马力': 0.00134102, // 1瓦特 = 0.00134102英制马力
            '米制马力': 0.00135962, // 1瓦特 = 0.00135962米制马力
            // 添加更多功率单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * powerConversionFactors[outputUnit] / powerConversionFactors[inputUnit];
        return result;
    }

    // 电量单位转换
    else if (type === '电量') {
        // 电量单位的转换因子
        const electricChargeConversionFactors = {
            '库仑': 1, // 库仑是基本单位，因此转换因子为1
            '毫库仑': 1000, // 1库仑 = 1000毫库仑
            '微库仑': 1e6, // 1库仑 = 1e6微库仑
            '安时': 3600, // 1库仑 = 3600安时
            '毫安时': 3.6e6, // 1库仑 = 3.6e6毫安时
            '微安时': 3.6e9, // 1库仑 = 3.6e9微安时
            '法拉/伏': 1, // 1库仑 = 1法拉/伏
            // 添加更多电量单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * electricChargeConversionFactors[outputUnit] / electricChargeConversionFactors[inputUnit];
        return result;
    }

    // 电流单位转换
    else if (type === '电流') {
        // 电流单位的转换因子
        const electricCurrentConversionFactors = {
            '安培': 1, // 安培是电流的基本单位，因此转换因子为1
            '毫安培': 1000, // 1安培 = 1000毫安培
            '微安培': 1e6, // 1安培 = 1e6微安培
            '千安培': 0.001, // 1安培 = 0.001千安培
            // 添加更多电流单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * electricCurrentConversionFactors[outputUnit] / electricCurrentConversionFactors[inputUnit];
        return result;
    }

    // 力单位转换
    else if (type === '力') {
        // 力单位的转换因子
        const forceConversionFactors = {
            '牛顿': 1, // 牛顿是力的基本单位，因此转换因子为1
            '千牛': 0.001, // 1牛顿 = 0.001千牛
            '兆牛': 1e-6, // 1牛顿 = 1e-6兆牛
            '千克力': 0.101972, // 1牛顿 = 0.101972千克力
            '克力': 101.972, // 1牛顿 = 101.972克力
            '磅力': 0.224809, // 1牛顿 = 0.224809磅力
            '磅': 0.224809, // 1牛顿 = 0.224809磅
            '牛顿（地球重力）': 0.101972, // 1牛顿 = 0.101972牛顿（地球重力）
            // 添加更多力单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * forceConversionFactors[outputUnit] / forceConversionFactors[inputUnit];
        return result;
    }

    // 电压单位转换
    else if (type === '电压') {
        // 电压单位的转换因子
        const voltageConversionFactors = {
            '伏特': 1, // 伏特是电压的基本单位，因此转换因子为1
            '千伏': 0.001, // 1伏特 = 0.001千伏
            '兆伏': 1e-6, // 1伏特 = 1e-6兆伏
            '毫伏': 1000, // 1伏特 = 1000毫伏
            '微伏': 1e6, // 1伏特 = 1e6微伏
            '千瓦': 0.001, // 1伏特 = 0.001千瓦
            // 添加更多电压单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * voltageConversionFactors[outputUnit] / voltageConversionFactors[inputUnit];
        return result;
    }

    // 密度单位转换
    else if (type === '密度') {
        // 密度单位的转换因子
        const densityConversionFactors = {
            '千克/立方米': 1, // 千克/立方米是密度的基本单位，因此转换因子为1
            '克/立方厘米': 1000, // 1千克/立方米 = 1000克/立方厘米
            '克/立方毫米': 1e6, // 1千克/立方米 = 1e6克/立方毫米
            '克/升': 1, // 1千克/立方米 = 1克/升
            '磅/立方英尺': 0.062428, // 1千克/立方米 = 0.062428磅/立方英尺
            '盎司/立方英尺': 35.27396, // 1千克/立方米 = 35.27396盎司/立方英尺
            // 添加更多密度单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * densityConversionFactors[inputUnit] / densityConversionFactors[outputUnit];
        return result;
    }

    // 频率单位转换
    else if (type === '频率') {
        // 频率单位的转换因子
        const frequencyConversionFactors = {
            '赫兹': 1, // 赫兹是频率的基本单位，因此转换因子为1
            '千赫兹': 0.001, // 1赫兹 = 0.001千赫兹
            '兆赫兹': 1e-6, // 1赫兹 = 1e-6兆赫兹
            '吉赫兹': 1e-9, // 1赫兹 = 1e-9吉赫兹
            '千兆赫兹': 1e-12, // 1赫兹 = 1e-12千兆赫兹
            // 添加更多频率单位的转换因子...
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * frequencyConversionFactors[outputUnit] / frequencyConversionFactors[inputUnit];
        return result;
    }

    // 温度单位转换
    if (type === '温度') {
        // 温度单位的转换函数
        const temperatureConversionFunctions = {
            '摄氏度': {
                '摄氏度': function (x) {
                    return x;
                },
                '华氏度': function (x) {
                    return (x * 9 / 5) + 32;
                },
                '开尔文': function (x) {
                    return x + 273.15;
                },
            },
            '华氏度': {
                '摄氏度': function (x) {
                    return (x - 32) * 5 / 9;
                },
                '华氏度': function (x) {
                    return x;
                },
                '开尔文': function (x) {
                    return (x + 459.67) * 5 / 9;
                },
            },
            '开尔文': {
                '摄氏度': function (x) {
                    return x - 273.15;
                },
                '华氏度': function (x) {
                    return (x * 9 / 5) - 459.67;
                },
                '开尔文': function (x) {
                    return x;
                },
            },
        };

        // 输入单位和输出单位之间的转换
        const result = temperatureConversionFunctions[inputUnit][outputUnit](inputValue);
        return result;
    }

    // 体积单位转换
    if (type === '体积') {
        // 体积单位的转换因子
        const volumeConversionFactors = {
            '立方米': 1, // 立方米是体积的基本单位，因此转换因子为1
            '升': 1000, // 1升 = 1000立方米
            '毫升': 1e6, // 1毫升 = 1e6立方米
            '立方厘米': 1e6, // 1立方厘米 = 1e6立方米
            '立方毫米': 1e9, // 1立方毫米 = 1e9立方米
            '立方分米': 1000, // 1立方分米 = 1000立方米
            '立方英尺': 35.3147, // 1立方英尺 = 0.0283168立方米
            '立方英寸': 61023.7, // 1立方英寸 = 0.0000163871立方米
        };

        // 输入单位和输出单位之间的转换
        const result = inputValue * volumeConversionFactors[outputUnit] / volumeConversionFactors[inputUnit];
        return result;
    }

    // 其他类型的转换...

    // 未知类型
    else {
        return '未知类型';
    }
}

/**
 * 单位和类型对应函数
 * @param {string} type 选择的类型（例如，'长度'、'质量'等）
 */
export const unitInTtype = (type) => {
    const unitMap = {
        "长度": [{
                label: "米",
                value: "米",
            },
            {
                label: "分米",
                value: "分米",
            },
            {
                label: "厘米",
                value: "厘米",
            },
            {
                label: "英寸",
                value: "英寸",
            },
            {
                label: "英尺",
                value: "英尺",
            },
            {
                label: "千米",
                value: "千米",
            },
            {
                label: "毫米",
                value: "毫米",
            },
            {
                label: "码",
                value: "码",
            },
        ],
        "质量": [{
                label: "千克",
                value: "千克",
            },
            {
                label: "克",
                value: "克",
            },
            {
                label: "磅",
                value: "磅",
            },
            {
                label: "盎司",
                value: "盎司",
            },
            {
                label: "公吨",
                value: "公吨",
            },
            {
                label: "斤",
                value: "斤",
            },
            {
                label: "毫克",
                value: "毫克",
            },
            {
                label: "吨",
                value: "吨",
            },
            {
                label: "英石",
                value: "英石",
            },
            {
                label: "太阳质量",
                value: "太阳质量",
            },
        ],
        "面积": [{
                label: "平方米",
                value: "平方米",
            },
            {
                label: "平方千米",
                value: "平方千米",
            },
            {
                label: "平方厘米",
                value: "平方厘米",
            },
            {
                label: "平方毫米",
                value: "平方毫米",
            },
            {
                label: "公顷",
                value: "公顷",
            },
            {
                label: "亩",
                value: "亩",
            },
            {
                label: "英亩",
                value: "英亩",
            },
            {
                label: "平方英尺",
                value: "平方英尺",
            },
            {
                label: "平方英寸",
                value: "平方英寸",
            },
        ],
        "时间": [{
                label: "秒",
                value: "秒",
            },
            {
                label: "分钟",
                value: "分钟",
            },
            {
                label: "小时",
                value: "小时",
            },
            {
                label: "天",
                value: "天",
            },
            {
                label: "周",
                value: "周",
            },
            {
                label: "月",
                value: "月",
            },
            {
                label: "年",
                value: "年",
            },
            {
                label: "十年",
                value: "十年",
            },
            {
                label: "世纪",
                value: "世纪",
            },
        ],
        "数据": [{
                label: "比特",
                value: "比特",
            },
            {
                label: "字节",
                value: "字节",
            },
            {
                label: "千比特",
                value: "千比特",
            },
            {
                label: "千字节",
                value: "千字节",
            },
            {
                label: "兆比特",
                value: "兆比特",
            },
            {
                label: "兆字节",
                value: "兆字节",
            },
            {
                label: "吉比特",
                value: "吉比特",
            },
            {
                label: "吉字节",
                value: "吉字节",
            },
            {
                label: "太比特",
                value: "太比特",
            },
            {
                label: "太字节",
                value: "太字节",
            },
            {
                label: "拍比特",
                value: "拍比特",
            },
            {
                label: "拍字节",
                value: "拍字节",
            },
        ],
        "速度": [{
                label: "米/秒",
                value: "米/秒",
            },
            {
                label: "千米/小时",
                value: "千米/小时",
            },
            {
                label: "英里/小时",
                value: "英里/小时",
            },
            {
                label: "节",
                value: "节",
            },
            {
                label: "英尺/秒",
                value: "英尺/秒",
            },
            {
                label: "公里/秒",
                value: "公里/秒",
            },
            {
                label: "公里/分钟",
                value: "公里/分钟",
            },
            {
                label: "微速",
                value: "微速",
            },
        ],
        "压力": [{
                label: "帕斯卡",
                value: "帕斯卡",
            },
            {
                label: "千帕",
                value: "千帕",
            },
            {
                label: "兆帕",
                value: "兆帕",
            },
            {
                label: "巴",
                value: "巴",
            },
            {
                label: "毫米汞柱",
                value: "毫米汞柱",
            },
            {
                label: "英寸汞柱",
                value: "英寸汞柱",
            },
            {
                label: "磅力/平方英寸",
                value: "磅力/平方英寸",
            },
        ],
        "角度": [{
                label: "度",
                value: "度",
            },
            {
                label: "弧度",
                value: "弧度",
            },
            {
                label: "分钟",
                value: "分钟",
            },
            {
                label: "秒",
                value: "秒",
            },
            {
                label: "梅卡",
                value: "梅卡",
            },
            {
                label: "圈",
                value: "圈",
            },
        ],
        "功率": [{
                label: "瓦特",
                value: "瓦特",
            },
            {
                label: "千瓦",
                value: "千瓦",
            },
            {
                label: "兆瓦",
                value: "兆瓦",
            },
            {
                label: "千卡/小时",
                value: "千卡/小时",
            },
            {
                label: "英制马力",
                value: "英制马力",
            },
            {
                label: "米制马力",
                value: "米制马力",
            },
        ],
        "电量": [{
                label: "库仑",
                value: "库仑",
            },
            {
                label: "毫库仑",
                value: "毫库仑",
            },
            {
                label: "微库仑",
                value: "微库仑",
            },
            {
                label: "安时",
                value: "安时",
            },
            {
                label: "毫安时",
                value: "毫安时",
            },
            {
                label: "微安时",
                value: "微安时",
            },
            {
                label: "法拉/伏",
                value: "法拉/伏",
            },
        ],
        "电流": [{
                label: "安培",
                value: "安培",
            },
            {
                label: "毫安培",
                value: "毫安培",
            },
            {
                label: "微安培",
                value: "微安培",
            },
            {
                label: "千安培",
                value: "千安培",
            },
        ],
        "力": [{
                label: "牛顿",
                value: "牛顿",
            },
            {
                label: "千牛",
                value: "千牛",
            },
            {
                label: "兆牛",
                value: "兆牛",
            },
            {
                label: "千克力",
                value: "千克力",
            },
            {
                label: "克力",
                value: "克力",
            },
            {
                label: "磅力",
                value: "磅力",
            },
            {
                label: "磅",
                value: "磅",
            },
            {
                label: "牛顿（地球重力）",
                value: "牛顿（地球重力）",
            },
        ],
        "电压": [{
                label: "伏特",
                value: "伏特",
            },
            {
                label: "千伏",
                value: "千伏",
            },
            {
                label: "兆伏",
                value: "兆伏",
            },
            {
                label: "毫伏",
                value: "毫伏",
            },
            {
                label: "微伏",
                value: "微伏",
            },
            {
                label: "千瓦",
                value: "千瓦",
            },
        ],
        "密度": [{
                label: "千克/立方米",
                value: "千克/立方米",
            },
            {
                label: "克/立方厘米",
                value: "克/立方厘米",
            },
            {
                label: "克/立方毫米",
                value: "克/立方毫米",
            },
            {
                label: "克/升",
                value: "克/升",
            },
            {
                label: "磅/立方英尺",
                value: "磅/立方英尺",
            },
            {
                label: "盎司/立方英尺",
                value: "盎司/立方英尺",
            },
        ],
        "频率": [{
                label: "赫兹",
                value: "赫兹",
            },
            {
                label: "千赫兹",
                value: "千赫兹",
            },
            {
                label: "兆赫兹",
                value: "兆赫兹",
            },
            {
                label: "吉赫兹",
                value: "吉赫兹",
            },
            {
                label: "千兆赫兹",
                value: "千兆赫兹",
            },
        ],
        "温度": [{
                label: "摄氏度",
                value: "摄氏度",
            },
            {
                label: "华氏度",
                value: "华氏度",
            },
            {
                label: "开尔文",
                value: "开尔文",
            },
        ],
        "体积": [{
                label: "立方米",
                value: "立方米",
            },
            {
                label: "升",
                value: "升",
            },
            {
                label: "毫升",
                value: "毫升",
            },
            {
                label: "立方毫米",
                value: "立方毫米",
            },
            {
                label: "立方厘米",
                value: "立方厘米",
            },
            {
                label: "立方分米",
                value: "立方分米",
            },
            {
                label: "立方英尺",
                value: "立方英尺",
            },
            {
                label: "立方英寸",
                value: "立方英寸",
            },
        ],
    }
    if (unitMap[type]) {
        return unitMap[type];
    }
    return [];
}