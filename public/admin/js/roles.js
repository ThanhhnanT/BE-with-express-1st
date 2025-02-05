//Permission
    const tablePermission = document.querySelector("[table-permission]")
    if(tablePermission){
        const buttonSubmit = document.querySelector("[button-submit]")
        buttonSubmit.addEventListener("click", (e) => {
            let permission =[]
            const rows = tablePermission.querySelectorAll("[data-name]")
            rows.forEach(item => {
                const name = item.getAttribute("data-name")
                const input = item.querySelectorAll("input")
                if(name == "id"){
                    input.forEach(inp => {
                        const id = inp.value
                        permission.push({
                            id: id,
                            permissions: []
                        })
                    });           
                }
                else{
                    input.forEach((inp, index) => {
                        const checked = inp.checked
                        // console.log()
                        if(checked){
                            permission[index].permissions.push(name)
                        }
                    })
                }
            })
            // console.log(permission)
            if(permission.length >0){
                const formPermission = document.querySelector("#form-change-permission")
                // console.log(formPermission)
                const inputPermission = formPermission.querySelector("input[name='permissions']")
                inputPermission.value = JSON.stringify(permission)
                formPermission.submit()
            }
        })
    }
//End Permission

// Check Permission
    const dataRoles = document.querySelector("[dataRoles]")
    // console.log(dataRoles)
    if(dataRoles){
        const data = JSON.parse(dataRoles.getAttribute("dataRoles"))
        // console.log(data)
        const tablePermission = document.querySelector("[table-permission]")
        data.forEach((item, index) => {
            const permission = item.permission
            // console.log(permission)
            permission.forEach(permission => {
                const row = tablePermission.querySelector(`[data-name=${permission}]`)
                // console.log(row)
                const input = row.querySelectorAll("input")[index]
                input.checked = true
            })
        })
        
    }

// End Check Permission
