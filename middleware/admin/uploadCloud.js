const uploadToCloud = require("../../helpers/uploadToCloud")


module.exports.upload = async (req, res, next) => {
    // Kiểm tra nếu không có file thì bỏ qua upload
    if (!req.file) {
        return next(); // Không có ảnh, tiếp tục middleware tiếp theo
    }
    const result = await uploadToCloud(req.file.buffer)

    req.body[req.file.fieldname] = result;

    next();
};
