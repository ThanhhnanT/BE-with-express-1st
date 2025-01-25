module.exports = async (req, objectPagination, countProduct) => {
    if (req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page)
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem
    
    const totalPage = Math.ceil(countProduct / objectPagination.limitItem)
    // console.log(totalPage)
    objectPagination.totalPage = totalPage
    // console.log(objectPagination)
    return objectPagination
}