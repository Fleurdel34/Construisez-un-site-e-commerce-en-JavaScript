POST / "http://localhost:3000/api/products/order/"/HTTP/1.1
Host: foo.com"Content-Type":"application/json"
Content-Type: application/x-www-form-urlencoded
Content-Length: 13

function afficherIdentifiant(responsePost){

    for (let i = 0; i<responsePost.length; i++){
    
        const identiant = responsePost[i];
        const divElement = document.querySelector(".confirmation");
        const spanElement = document.createElement("span")
        spanElement.innerText = identiant.orderId;
        spanElement.setAttribute("id", "orderId");
        divElement.appendChild(spanElement);
    }
}  