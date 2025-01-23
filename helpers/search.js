module.exports = (req) =>{
    let objectSearch = {
        keyword: "",
        regex: ""
    }
    if(req.query.title){
        objectSearch.keyword = req.query.title
        const regex = new RegExp(objectSearch.keyword, "i")
        objectSearch.regex = regex
    }
    return objectSearch
}