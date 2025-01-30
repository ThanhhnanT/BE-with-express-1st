// console.log("oke")

// const { options } = require("../../../routes/admin/product.route");

// button-status
const buttonStatus = document.querySelectorAll("[button-status]")
let url = new URL(window.location.href);
if (buttonStatus.length > 0) {

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status")
            if (status) {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    })
}

// End button-status


// Form search
const formSearch = document.querySelector("#form-search")
if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const key = e.target.elements.keyboard.value
        // console.log(e.target.elements.keyboard.value)
        if (key) {
            url.searchParams.set("title", key)
        } else {
            url.searchParams.delete("title")
        }
        window.location.href = url.href
    })
}
// End form search

// Pagination
const buttonPagination = document.querySelectorAll("[buttonPagination]")
// console.log(buttonPagination)
if (buttonPagination)
    buttonPagination.forEach((item) => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("buttonPagination")
            // console.log(page)
            url.searchParams.set("page", page)
            window.location.href = url.href
        })
    })
// End pagination

// Preview Image

const uploadImage = document.querySelector("[upload-image]")
// console.log(uploadImage)
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    uploadImage.addEventListener("change", (e) => {
        const [file] = uploadImageInput.files
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}

// End Preview Image

// Sort
const sortButton = document.querySelector("[sort]")
// console.log(sortButton)
if (sortButton) {
    const sortSelect = sortButton.querySelector("[sort-select")
    const sortClear = sortButton.querySelector("[sort-clear]")
    sortSelect.addEventListener("change", (e) => {
        // console.log(e.target.value)
        const [sortKey, sortValue] = e.target.value.split("-")
        // console.log(list)
        // console.log(url)
        url.searchParams.set("sortKey", sortKey)
        url.searchParams.set("sortValue", sortValue)
        window.location.href = url.href
    })
    // Xóa sắp xếp
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey")
        url.searchParams.delete("sortValue")
        window.location.href = url.href
    })

    // Thêm selected cho option
    const sortKey = url.searchParams.get("sortKey")
    const sortValue = url.searchParams.get("sortValue")
    if (sortKey && sortValue) {
        const optionss = sortKey + "-" + sortValue
        // console.log(option)
        const optionSelected = sortSelect.querySelector(`option[value='${optionss}']`)
        // console.log(optionSelected)
        optionSelected.selected = true
    }
}


// End Sort

