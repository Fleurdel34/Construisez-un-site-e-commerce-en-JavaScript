/*affichage de l'identifiant de commande*/

const urlParams= (new URL(window.location)).searchParams;

let identifiant;

if (urlParams.has('identifiant')){
identifiant = urlParams.get('identifiant');
};



const spanElement = document.querySelector("#orderId");
spanElement.innerText= identifiant;


