/*creation d'un tableau contenant les articles du panier*/

let kanapPanier = JSON.parse(window.localStorage.getItem('kanapPanier'));

let id;
let quantite;
let colors;


for (let i =0; i<= kanapPanier.length-1; i++) {   

   
    id = kanapPanier[i].id;
    quantite  = kanapPanier[i].quantite;
    colors  = kanapPanier[i].colors;
	       
const requeteApi = await fetch("http://localhost:3000/api/products/"+id); 
const response = await requeteApi.json(); 



const sectionElement = document.querySelector("#cart__items");

const articleElement = document.createElement("article");
articleElement.setAttribute("class", "cart__item");
articleElement.setAttribute("data-id", id);
articleElement.setAttribute("data-color", colors);

const div1Element = document.createElement("div");
div1Element.setAttribute("class", "cart__item__img");
const imgElement = document.createElement("img"); 
imgElement.src = response.imageUrl;
imgElement.setAttribute("alt", "produits.altTxt");

const div2Element = document.createElement("div");
div2Element.setAttribute("class", "cart__item__content");
const sousDiv2Element = document.createElement("div");
sousDiv2Element.setAttribute("class", "cart__item__content__description");
const nameElement = document.createElement("h2");
nameElement.innerText = response.name;
const colorElement = document.createElement("p");
colorElement.innerText = colors;
const prixElement = document.createElement("p");
prixElement.innerText = response.price + " €";


const div3Element = document.createElement("div");
div3Element.setAttribute("class", "cart__item__content__settings")
const sousDiv3Element = document.createElement("div");
sousDiv3Element.setAttribute("class", "cart__item__content__setting__Quantity");
const quantiteElement = document.createElement("p");
quantiteElement.innerText = "Qté: " + quantite;
const itemElement = document.createElement("input");
itemElement.setAttribute("type","number");
itemElement.setAttribute("class","itemQuantity");
itemElement.setAttribute("name","itemQuantity");
itemElement.setAttribute("min","1");
itemElement.setAttribute("max","100");


        
const div4Element = document.createElement("div");
div4Element.setAttribute("class","deleteItem");
const deleteElement = document.createElement("p");
deleteElement.innerText = "Supprimer";




sectionElement.appendChild(articleElement);

articleElement.appendChild(div1Element);
articleElement.appendChild(div2Element);
articleElement.appendChild(div3Element);
articleElement.appendChild(div4Element);

div1Element.appendChild(imgElement);  

div2Element.appendChild(sousDiv2Element);
sousDiv2Element.appendChild(nameElement);
sousDiv2Element.appendChild(colorElement);
sousDiv2Element.appendChild(prixElement);

div3Element.appendChild(sousDiv3Element);
sousDiv3Element.appendChild(quantiteElement);
sousDiv3Element.appendChild(itemElement);

div4Element.appendChild(deleteElement);

}


/* Modification de la quantité ou supression d'un produit du panier et maj du DOM/localStorage*/

/* modification de la quantité d'un produit*/ 


function modifListenerQuantite(){
const input = document.querySelector(".itemQuantity");

input.addEventListener('change', function(event){
    event.preventDefault();

    let resultModif = this.value;
    let quantiteElement = document.querySelector("div.cart__item__content__setting__Quantity > p");
    quantiteElement.innerText = "Qté: " + resultModif;
    let parentElementQuantiteModif = quantiteElement.closest("article");
    let productIdModif = parentElementQuantiteModif.dataset.id;
    let productColorModif = parentElementQuantiteModif.dataset.color;

    let kanapPanier = JSON.parse(window.localStorage.getItem('kanapPanier'));

    for(let obj = 0; obj<=kanapPanier.length-1; obj++){
        if(kanapPanier[obj].id === productIdModif && kanapPanier[obj].colors === productColorModif)
        {
            kanapPanier[obj].quantite = resultModif;
            window.localStorage.setItem('kanapPanier', JSON.stringify(kanapPanier));
        }

    }

});
}

modifListenerQuantite();

/* supression d'un element du panier/du DOM/ du localStorage*/


let itemSupprimer = document.querySelector(".deleteItem");

itemSupprimer.onclick= function(){
   

    let supressionElement = document.querySelector(".deleteItem");
    let parentElementDelete = supressionElement.closest("article");
    let productId = parentElementDelete.dataset.id;
    let productColor = parentElementDelete.dataset.color;

    let kanapPanier = JSON.parse(window.localStorage.getItem('kanapPanier'));

   for (let item =0; item<=kanapPanier.length-1; item++){

        if(kanapPanier[item].id === productId && kanapPanier[item].colors === productColor){

            parentElementDelete.remove();
            
        };
    };

    kanapPanier = JSON.parse(window.localStorage.getItem('kanapPanier'));

    for(let obj = 0; obj<=kanapPanier.length-1;obj++){


        if(kanapPanier[obj].id === productId && kanapPanier[obj].colors === productColor){

           kanapPanier.splice(kanapPanier[obj],1);
           window.localStorage.setItem('kanapPanier', JSON.stringify(kanapPanier));

        }

    }
            

        
};

/* fonction pour validation des données du formulaire et envoi des données et tableau des produits*/

let contText= new RegExp ([a-zA-Z]);

let contAlphaNumerique= new RegExp([a-zA-Z0-9]);

let contEmail = new RegExp();

let firstNameError = element.getElementById("firstNameErrorMsg");
let lastNameError = element.getElementById("lastNameErrorMsg");
let addressError = element.getElementById("addressErrorMsg");
let cityError = element.getElementById("cityErrorMsg");


let firstName = element.getElementById("firstName").value;
let lastName = element.getElementById("lastName").value;
let address = element.getElementById("address").value;
let city = element.getElementById("city").value;


if (firstName.match(contText) === false){
    firstNameError.innerText = "La saisie est invalide. Veuillez saisir uniquement des lettres minuscules ou majuscule.";
}else{
    firstNameError.innerText = "";
}

if (lastName.match(contText) === false){
    lastNameError.innerText = "La saisie est invalide. Veuillez saisir uniquement des lettres minuscules ou majuscule.";
}else{
    lastNameError.innerText = "";
}

if (address.match(contAlphaNumerique) === false){
    address.innerText = "La saisie est invalide. Veuillez saisir uniquement des chiffres ou des lettres .";
}else{
    address.innerText = " ";
}

if (city.match(contText) === false){
    cityError.innerText = "La saisie est invalide. Veuillez saisir uniquement des lettres minuscules ou majuscule.";
}else{
    cityError.innerText = " ";
}

function ajoutListenerCommande(){

    const formulaireCommande = document.querySelector(".cart_order_form");

    formulaireCommande.addEventListener("submit", function(event){

        event.preventDefault();

        let kanapPanier = JSON.parse(window.localStorage.getItem('kanapPanier'));

        let id;
        let quantite;
        let colors;


        for (let i =0; i<= kanapPanier.length-1; i++) {   

   
        id = kanapPanier[i].id;
        quantite  = kanapPanier[i].quantite;
        colors  = kanapPanier[i].colors;

        }

        const contact = {
            'firstName':event.target.querySelector("[name=firstName]").value,
            'lastName':event.target.querySelector("[name=lastName]").value,
            'address':event.target.querySelector("[name=address]").value,
            'city':event.target.querySelector("[name=city]").value,
            'email':event.target.querySelector("[name=email]").value,
            'id': id,
            'quantite': quantite,
            'color': colors
        }

        const chargeUtile = JSON.stringify(contact);

        fetch("http://localhost:3000/api/products/order"),{

            method:"POST",
            hearders:{"Content-Type":"application/json"},
            body:chargeUtile
        }


    })


}


