const urlParams= (new URL(window.location)).searchParams;
let identifiant;

if (urlParams.has('identifiant')){
identifiant = urlParams.get('identifiant');
};


const divElement = document.querySelector("confirmation");
const spanElement = document.createElement("span");
spanElement.setAttribute("id", "orderId");
spanElement.innerText= identifiant;
divElement.appendChild(spanElement);

 