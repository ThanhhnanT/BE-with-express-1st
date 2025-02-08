import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
// import { socket } from "./socket.js";
// CLIENT_SEND_MESSAGE
const socket = io();
const formSendData = document.querySelector(".chat .inner-form")
if (formSendData) {


    formSendData.addEventListener("submit", (e) => {
        e.preventDefault()
        const content = e.target[0].value
        // console.log(content) 
        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content)
            e.target[0].value = ''
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    })
}

// END CLIENT_SEND_MESSAGE
const typing = document.querySelector(".chat .inner-list-typing")



// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    // console.log(data)
    const body = document.querySelector(".chat .inner-body")
    const id = document.querySelector("[my-id]").getAttribute("my-id")
    // console.log(id, data.user_id)
    const div = document.createElement("div")
    div.classList.add(id === data.userId ? "inner-outgoing" : "inner-incoming")
    let nameHTML = id === data.userId ? "" : `<div class='inner-name'> ${data.fullName} </div>`;
    div.innerHTML = `
            ${nameHTML}
            <div class='inner-content'> ${data.content} </div>
        `
    body.insertBefore(div, typing)
    if (body) {
        body.scrollTop = body.scrollHeight
    }

})
// END SERVER_RETURN_MESSAGE


//Scroll chat to bottom
const body = document.querySelector(".chat .inner-body")
if (body) {
    body.scrollTop = body.scrollHeight
}

// End Scroll chat to bottom

// Emoji Picker

//Show pop-up
const buttonIcon = document.querySelector(".button-icon")

if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip')
    Popper.createPopper(buttonIcon, tooltip)
    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}

// Insert icon
const emojiPicker = document.querySelector('emoji-picker')
if (emojiPicker) {
    const input = document.querySelector(".chat .inner-form input[name='content']")
    
    var timeOut
    emojiPicker.addEventListener("emoji-click", (e) => {
        const icon = e.detail.unicode
        input.value = input.value + icon
        socket.emit("CLIENT_SEND_TYPING", "show")
        input.setSelectionRange(input.value.length, input.value.length)
        input.focus()

        clearTimeout(timeOut);

        timeOut = setTimeout(() => {
            socket.emit("CLIENT_SEND_TYPING", "hidden")
        }, 3000)


    })
    input.addEventListener("keydown", (e) => {
        socket.emit("CLIENT_SEND_TYPING", "show")

        clearTimeout(timeOut);

        timeOut = setTimeout(() => {
            socket.emit("CLIENT_SEND_TYPING", "hidden")
        }, 3000)
    })
}
// End Emoji Picker

// SERVER_RETURN_TYPING


if (typing) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        // console.log(data)
        if (data.type == "show") {
            const existTyping = document.querySelector(`[user-id='${data.userId}']`);
            const boxTyping = document.createElement("div")
            boxTyping.setAttribute("user-id", data.userId)

            if (!existTyping) {
                boxTyping.classList.add("box-typing")
                boxTyping.innerHTML = `
                <div class='inner-name'> ${data.fullName} </div>
                <div class='inner-dots'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `
                typing.appendChild(boxTyping)
                if (body) {
                    body.scrollTop = body.scrollHeight
                }
            }
        } else {
            const boxTyping = typing.querySelector(`div`)
            // console.log(boxTyping)
            if (boxTyping) {
                typing.removeChild(boxTyping)
            }
        }
    })


}

// END SERVER_RETURN_TYPING