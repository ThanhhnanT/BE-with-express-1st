// CLIENT_SEND_MESSAGE
    const formSendData = document.querySelector(".chat .inner-form")
    if(formSendData){
        // console.log(formSendData)
        formSendData.addEventListener("submit", (e) => {
            e.preventDefault()
            const content = e.target[0].value
            // console.log(content) 
            if(content) {
                socket.emit("CLIENT_SEND_MESSAGE", content)
                e.target[0].value = ''
            }
        })
    }

// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
    socket.on("SERVER_RETURN_MESSAGE", (data) => {
        // console.log(data)
        const body = document.querySelector(".chat .inner-body")
        const id = document.querySelector("[my-id]").getAttribute("my-id")
        console.log(id, data.user_id)
        const div =document.createElement("div")
        div.classList.add(id === data.userId ? "inner-outgoing" : "inner-incoming")
        let nameHTML = id === data.userId ? "" : `<div class='inner-name'> ${data.fullName} </div>`;
        div.innerHTML = `
            ${nameHTML}
            <div class='inner-content'> ${data.content} </div>
        `
        body.appendChild(div)
    })
// END SERVER_RETURN_MESSAGE