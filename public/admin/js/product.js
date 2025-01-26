// Change Status
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    // console.log(path)
    const buttonChangeStatus = document.querySelectorAll('[button-change-status]')
    if (buttonChangeStatus.length > 0) {
        buttonChangeStatus.forEach(item => {
            item.addEventListener("click",() => {
                const statusCurrent = item.getAttribute("data-status")
                const id = item.getAttribute("data-id")
                let statusChange = statusCurrent == "active" ? "non-active" :"active"
                const action = path + `/${statusChange}/${id}`
                // console.log(action)
                formChangeStatus.action = action
                formChangeStatus.submit()
            })
        })
    }

//End Change Status

