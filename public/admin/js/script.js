// console.log("oke")

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