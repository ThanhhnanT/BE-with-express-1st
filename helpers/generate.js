module.exports.randomString = (length) => {
    const characters = "ABCDEFGHKLQEWOWOOEEWdsajdasdwoqdjowqdjsao3284304139010744750"
    let result = ""
    for (let i =0 ; i<length ; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}