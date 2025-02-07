const Setting = require("../../model/setting-general.model")

module.exports.general = async (req, res) => {
    const setting = await Setting.findOne({})
    res.render("admin/pages/setting/general.pug", {
        pageTitle: "Cài đặt chung",
        setting: setting
    })
}

module.exports.postGeneral = async (req, res) => {
    // console.log(req.body)
    const setting = await Setting.findOne({})
    if (setting) {
        await Setting.updateOne({
            _id: setting.id
        }, req.body)
    } else {
        const record = new Setting(req.body)
        await record.save()
    }
    res.redirect("back")
}