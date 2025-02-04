const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.cloudKey,
    api_secret: process.env.cloudSecret
});

module.exports.upload = async (req, res, next) => {
    // Kiểm tra nếu không có file thì bỏ qua upload
    if (!req.file) {
        return next(); // Không có ảnh, tiếp tục middleware tiếp theo
    }

    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function upload(req) {
        let result = await streamUpload(req);
        req.body[req.file.fieldname] = result.secure_url;
    }

    await upload(req);
    next();
};
