const User = require("../../model/user.model")
const Forgot= require("../../model/forgotPassword.model")
const random= require("../../helpers/generate")
const md5 = require('md5')
const sendMail = require("../../helpers/sendEmail")
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        title: "Đăng ký"
    })
}

module.exports.postRegister = async (req, res) => {
    // console.log(req.body)
    const exist = await User.findOne(
        {
            email: req.body.email,
            deleted: false
        }
    )
    if (exist) {
        return res.status(400).json({ error: "Email đã tồn tại" });
    } else {
        req.body.password = md5(req.body.password)
        const user = new User(req.body)
        await user.save()
        // console.log(user)
        res.cookie("token", user.token)
        res.redirect("/")
    }
}

module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        title: "Đăng nhập"
    })
}

module.exports.postLogin = async (req, res) => {
    // console.log(req.body)
    const user = await User.findOne(
        {
            email: req.body.email,
            deleted: false
        }
    )
    if (!user) {
        console.log("email không tồn tại")
        return
    }
    if (md5(req.body.password) != user.password) {
        console.log("Sai mật khẩu")
        return
    }

    res.cookie("token", user.token)
    res.redirect("/")
}

module.exports.logout = (req, res) => {
    res.clearCookie("token")
    res.redirect("/")
}

module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgotPassword.pug", {
        title: "Quên mật khẩu"
    })
}

module.exports.postForgotPassword = async (req, res) => {
    // console.log(req.body)
    const email = req.body.email
    const user = await User.findOne(
        {
            email: req.body.email,
            deleted: false
        }
    )
    if (!user) {
        console.log("email không tồn tại")
        return
    }

    // Tạo mã otp và lưu thông tin vào collection
    const objectForgot = {
        email: email,
        otp: random.random(4),
        expireAt: Date.now()
    }
    // console.log(objectForgot)
    const forgot = new Forgot(objectForgot)
    await forgot.save()

    // Send Gmail 
    const subject = "Mã OTP xác minh mật khẩu"
    const html =`
        Mã OTP của bạn là: <b>${objectForgot.otp}</b>
    `
    sendMail.sendMail(email, subject , html )
    res.redirect(`/user/password/otp?email=${email}`)
}

module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;
    res.render("client/pages/user/otpPassword", {
        title: "Nhập OTP",
        email: email
    })
} 

module.exports.postOtpPassword = async (req, res) => {
    const email = req.body.email
    const otp = req.body.otp

    const result = await Forgot.findOne(
        {
            email: email,
            otp: otp
        }
    )
    if (!result){
        console.log("otp ko hop le")
        return 
    }

    const user = await User.findOne(
        {
            email: email,
            deleted: false
        }
    )

    res.cookie('token', user.token)

    res.redirect(`/user/password/reset`)

} 

module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/resetPassword", {
        title: "Đổi mật khẩu",
    })
}

module.exports.postResetPassword = async (req, res) => {
    const pass = req.body.password
    const confirmPass= req.body.confirmPassword
    // console.log(pass, confirmPass)
    if (pass !== confirmPass){
        console.log("Mật khẩu không trùng khớp")
        return
    }
    // console.log(req.cookies.token)
    // const user = await User.findOne({
    //     token: req.cookies.token
    // })

    await User.updateOne(
        {
            token: req.cookies.token
        },
        {
            password: md5(pass)
        }
    )
    res.redirect("/")
}