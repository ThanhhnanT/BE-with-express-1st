// Cập nhật số lượng sản phẩm
    const inputQuantity = document.querySelectorAll("input[name='quantity']")
    if (inputQuantity.length > 0) {
        inputQuantity.forEach(input => {
            // console.log(input)
            input.addEventListener("change", (e) => {
                const productId = input.getAttribute("product-id")
                // console.log(productId)
                const quantity = input.value 
                window.location.href=  `/cart/update/${productId}/${quantity}`
                // console.log(e.target.value)
            })
        })
    }

