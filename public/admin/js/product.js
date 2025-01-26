// Change Status
const formChangeStatus = document.querySelector("#form-change-status")
const path = formChangeStatus.getAttribute("data-path")
// console.log(path)
const buttonChangeStatus = document.querySelectorAll('[button-change-status]')
if (buttonChangeStatus.length > 0) {
    buttonChangeStatus.forEach(item => {
        item.addEventListener("click", () => {
            const statusCurrent = item.getAttribute("data-status")
            const id = item.getAttribute("data-id")
            let statusChange = statusCurrent == "active" ? "non-active" : "active"
            const action = path + `/${statusChange}/${id}`
            // console.log(action)
            formChangeStatus.action = action
            formChangeStatus.submit()
        })
    })
}

//End Change Status

// Tick heckBox

const checkboxMulti = document.querySelector("[checkbox-multi]")
// console.log(checkboxMulti)
if (checkboxMulti) {
    const inputCheck = document.querySelector("input[name='checkAll']")
    // console.log(inputCheck)
    const inputId = checkboxMulti.querySelectorAll("input[name='id']")
    // console.log(inputId)
    inputCheck.addEventListener("click", () => {
        if (inputCheck.checked) {
            // console.log("check tất cả")
            inputId.forEach(item => item.checked = true)
        }
        else {
            inputId.forEach(item => item.checked = false)
        }
    })
    const willCheckAll = () => {
        return [...inputId].every(item => item.checked);
    };
    // willCheckAll()
    inputId.forEach(item => {
        item.addEventListener("click", () => {
            // willCheckAll()
            const change = willCheckAll()
            if (change) inputCheck.checked = true
            else inputCheck.checked = false
        })
    })


    // if(willCheckAll) inputCheck.checked=true
    // else inputCheck.checked=false

}

// End Tick CheckBox

// Form change-multi

const formChangeMulti = document.querySelector("[form-change-multi]")
// console.log(formChangeMulti)
formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault()
    const boxchecked = document.querySelectorAll("input[name='id']:checked")
    // console.log(boxchecked)
    let ids = []
    boxchecked.forEach(item => {
        const id = item.value
        ids.push(id)
    })
    // console.log(ids.join(", "))
    const inputID = document.querySelector("input[name='ids']")
    // console.log(inputID)
    inputID.value = ids.join(", ")
    // const path = formChangeMulti.getAttribute("path")
    // const select = formChangeMulti.querySelector("select")
    // const action = path + `/${select.value}/${ids.join("")}`
    // // console.log(action)
    // formChangeMulti.action = action
    // console.log(action)
    formChangeMulti.submit()
})

//  End Form change-multi

