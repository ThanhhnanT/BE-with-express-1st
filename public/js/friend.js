// Gửi yêu cầu kết bạn
// console.log("OK")
const socket = io();
const listBtnAdd = document.querySelectorAll("[btn-add-friend]")
if (listBtnAdd.length > 0) {
    listBtnAdd.forEach(btn => {
        // console.log(btn)
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("btn-add-friend")
            const boxUser = btn.closest(".box-user")
            boxUser.classList.add("add")

            // gửi qua socket
            socket.emit("CLIENT_ADD_FRIEND", userId)
        })
    })
}



// Hủy yêu cầu
const listBtnCancel = document.querySelectorAll("[btn-cancel-request]")
if (listBtnCancel.length > 0) {
    listBtnCancel.forEach(btn => {
        // console.log(btn)
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("btn-cancel-request")
            // console.log(userId)
            // gửi qua socket
            socket.emit("CLIENT_CANCEL_REQUEST", userId)
        })
    })
}

// Từ chối yêu cầu
const listBtnRefuse = document.querySelectorAll("[btn-refuse-friend]")
if (listBtnRefuse) {
    listBtnRefuse.forEach(btn => {
        // console.log(btn)
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("btn-refuse-friend")
            // gửi qua socket
            socket.emit("CLIENT_REFUSE_FRIEND", userId)
        })
    })
}

// Đồng ý yêu cầu
const listBtnAccept = document.querySelectorAll("[btn-accept-friend]")
if (listBtnAccept) {
    listBtnAccept.forEach(btn => {
        // console.log(btn)
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("btn-accept-friend")
            // console.log(userId)
            // gửi qua socket
            socket.emit("CLIENT_ACCEPT_FRIEND", userId)
        })
    })
}

// SERVER_RETURN_LENGHT_ACCEPT
socket.on("SERVER_RETURN_LENGHT_ACCEPT", async (datas) => {
    // console.log(datas)
    const badgetLength = document.querySelector("[badge-user-accept]")
    const id = badgetLength.getAttribute("badge-user-accept")
    // console.log(id)
    if (id === datas.userId) {
        badgetLength.innerHTML = datas.lengthAcceptFriend
    }

})
// END SERVER_RETURN_LENGHT_ACCEPT

// SERVER_RETURN_INFOR
socket.on("SERVER_RETURN_INFOR", (datas) => {
    const dataAccept = document.querySelector("[data-user-accept]")
    if (dataAccept) {
        const id = dataAccept.getAttribute("data-user-accept")
        if (id === datas.userId) {
            // Vẽ user ra giao diện
            const newBox = document.createElement("div")
            newBox.classList.add("col-6")
            const html = `
                    <div class="box-user">
                        <div class="inner-avatar">
                            <img src="" alt=${datas.fullName}>
                        </div>
                        <div class="inner-infor ">
                            <div class="inner-name">
                                ${datas.fullName}
                            </div>
                            <div class="inner-button">
                            <button class="btn btn-primary mr-1" btn-accept-friend=${datas.userA}>Đồng ý kết bạn</button>
                            <button class="btn btn-danger mr-1" btn-refuse-friend=${datas.userA}>Từ chối</button>
                            </div>
                        </div>
                    </div>
            `
            newBox.innerHTML = html
            dataAccept.appendChild(newBox)

            // Bắt sự kiện cho nút mới vẽ ra
            const btn = newBox.querySelector("[btn-refuse-friend]")
            btn.addEventListener("click", () => {
                const userId = btn.getAttribute("btn-refuse-friend")
                // gửi qua socket
                socket.emit("CLIENT_REFUSE_FRIEND", userId)
            })
        }
    }

    // console.log(dataAccept)

})
// END SERVER_RETURN_INFOR

// Hủy kết bạn
const buttonCancelFriendList = document.querySelectorAll("[btn-cancel-friendList]")
if (buttonCancelFriendList.length > 0) {
    buttonCancelFriendList.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log(btn)
            const idB = btn.getAttribute("btn-cancel-friendList")
            socket.emit("CLIENT_CANCEL_FRIEND_LIST", idB)
            console.log(idB)
        })
    })
}

// SERVER_RETURN_LOGIN
socket.on("SERVER_RETURN_LOGIN", (userId) => {
    const boxInfor = document.querySelector(`[user-id='${userId}']`);
    
    if (boxInfor) {
        const btnOff = boxInfor.querySelector(".status-offline");
        const btn = boxInfor.querySelector(".inner-button");

        // Xóa trạng thái offline nếu tồn tại
        if (btnOff) {
            btnOff.remove();
        }

        // Tạo trạng thái online
        const btnOn = document.createElement("div");
        btnOn.classList.add("status-online");
        btnOn.innerHTML = "Online";

        // Chèn vào trước nút inner-button nếu có
        if (btn) {
            boxInfor.insertBefore(btnOn, btn);
        } else {
            boxInfor.appendChild(btnOn);
        }
    }
});
