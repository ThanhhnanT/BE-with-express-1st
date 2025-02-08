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