export const categorizeExifData = (tags) => {
    const categories = {
        "basicInformation": [],
        "shootingParameters": [],
        "cameraInformation": [],
        "shootingTime": [],
        "GPSInformation": [],
        "imageProcessingParameters": [],
        "imageFormatParameters": [],
        "additionalInformation": [],
        "summaryInformation": [],
    };

    const labelMap = {
        // 图片信息
        "FileType": "文件类型",
        "Image Width": "图像宽度",
        "Image Height": "图像高度",
        "ResolutionUnit": "分辨率单位",
        "XResolution": "X方向分辨率",
        "YResolution": "Y方向分辨率",

        // 拍摄参数
        "ExposureTime": "曝光时间",
        "FNumber": "光圈值",
        "ISOSpeedRatings": "ISO 感光度",
        "FocalLength": "焦距",
        "ExposureBiasValue": "曝光补偿",
        "WhiteBalance": "白平衡",
        "Flash": "闪光灯",

        // 相机信息
        "Make": "制造商",
        "Model": "型号",
        "LensModel": "镜头型号",
        "LensSerialNumber": "镜头序列号",
        "BodySerialNumber": "相机序列号",
        "Software": "软件版本",

        // 拍摄时间
        "DateTimeOriginal": "拍摄日期时间",
        "DateTimeDigitized": "数字化日期时间",
        "DateTime": "修改日期时间",

        // GPS 信息
        "GPSLatitude": "纬度",
        "GPSLongitude": "经度",
        "GPSAltitude": "海拔",

        // 图像处理参数
        "Contrast": "对比度",
        "Saturation": "饱和度",
        "Sharpness": "锐度",

        // 图像格式参数
        "Bits Per Sample": "位深度",
        "Compression": "压缩方法",
        "Filter": "滤波器方法",
        "Interlace": "隔行扫描方法",

        // 其他信息
        "Artist": "作者",
        "Copyright": "版权信息",
        "UserComment": "用户评论"
    };

    const categoryMap = {
        "basicInformation": ["FileType", "Image Width", "Image Height", "ResolutionUnit", "XResolution", "YResolution"],
        "shootingParameters": ["ExposureTime", "FNumber", "ISOSpeedRatings", "FocalLength", "ExposureBiasValue", "WhiteBalance", "Flash"],
        "cameraInformation": ["Make", "Model", "LensModel", "LensSerialNumber", "BodySerialNumber", "Software"],
        "shootingTime": ["DateTimeOriginal", "DateTimeDigitized", "DateTime"],
        "GPSInformation": ["GPSLatitude", "GPSLongitude", "GPSAltitude"],
        "imageProcessingParameters": ["Contrast", "Saturation", "Sharpness"],
        "imageFormatParameters": ["Bits Per Sample", "Compression", "Filter", "Interlace"],
        "additionalInformation": ["Artist", "Copyright", "UserComment"]
    };

    for (const tag in tags) {
        const label = labelMap[tag] || tag;
        const value = tags[tag].description || tags[tag].value;

        let found = false;
        for (const category in categoryMap) {
            if (categoryMap[category].includes(tag)) {
                categories[category].push({ label, value });
                found = true;
                break;
            }
        }
        if (!found) {
            categories["additionalInformation"].push({ label, value });
        }
    }

    // 生成摘要信息
    const getValue = (tag) => tags[tag]?.description || tags[tag]?.value || "";

    const summary = [
        {
            label: "器材",
            value: [getValue("Make"), getValue("Model"), getValue("LensModel")].filter(Boolean).join(", ")
        },
        {
            label: "模式",
            value: ["曝光模式:" + getValue("ExposureMode"), "测光模式:" + getValue("MeteringMode"), "曝光补偿:" + getValue("ExposureBiasValue")].filter(Boolean).join(", ")
        },
        {
            label: "曝光",
            value: ["光圈:" + getValue("FNumber"), "快门:" + getValue("ExposureTime") + "秒", "ISO" + getValue("ISOSpeedRatings")].filter(Boolean).join(", ")
        },
        {
            label: "焦距",
            value: [getValue("FocalLength") + " mm", "视角:" + getValue("FieldOfView")].filter(Boolean).join(", ")
        },
        {
            label: "色彩",
            value: ["白平衡:" + getValue("WhiteBalance"), "色彩空间:" + getValue("ColorSpace")].filter(Boolean).join(", ")
        },
        {
            label: "闪光",
            value: getValue("Flash")
        },
        {
            label: "时间",
            value: getValue("DateTimeOriginal")
        }
    ];

    categories["summaryInformation"] = summary;

    return categories;
};
