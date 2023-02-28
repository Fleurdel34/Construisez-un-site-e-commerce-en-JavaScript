/*creation d'un tableau contenant les articles du panier*/

let kanapPanier = JSON.parse(window.localStorage.getItem('kanapPanier'));


for (let i =0; i<= kanapPanier.length-1; i++) {   

   
    let id = kanapPanier[i].id;
    let quantite  = kanapPanier[i].quantite;
    let colors  = kanapPanier[i].colors;
	       
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
div4Element.setAttribute("class","cart__item__content__settings__delete");
const deleteElement = document.createElement("p");
deleteElement.innerText = "Supprimer";
div4Element.setAttribute("class", "deleteItem");



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

/* supression d'un document du panier/du DOM/ du localStorage*/

function supprimerListenerProduit(){

const produitSupprimer = document.querySelectorAll(".deleteItem");

for(let i = 0; i<=produitSupprimer.length-1; i++){

produitSupprimer[i].addEventListener('click', function(event){
    event.preventDefault();
    
    let parentElementDelete = produitSupprimer[i].closest("article");
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

        };

    };       

});
}
}
supprimerListenerProduit();




/* fonction pour validation des données du formulaire et envoi des données et tableau des produits*/


/*let contAlphaNumerique= /[a-zA-Z0-9]/g;
let contEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;*/

/*let lastName = document.getElementById("lastName").value;
let address = document.getElementById("address").value;
let city = document.getElementById("city").value;
let email = document.getElementById("email").value;*/

function check(){

    let contText= /[a-zA-Z]/g;
    let firstName = document.getElementById("firstName").value;
    

if(firstName !== "" && contText.test(firstName) === false){

     document.querySelector("#firstNameErrorMsg").innerText="Veuillez saisir uniquement des lettres.";

}else{
    document.querySelector("#firstNameErrorMsg").innerText="";
}
}
check();


function ajoutListenerCommande(){

    const formulaireCommande = document.querySelector("#order");

    formulaireCommande.addEventListener("submit", function(event){

    event.preventDefault();

   

    let kanapPanier = JSON.parse(window.localStorage.getItem('kanapPanier'));

    let panierCommande = kanapPanier.filter(produit => produit.id);

        const contact = {
            'firstName':event.target.querySelector("[name=firstName]").value,
            'lastName':event.target.querySelector("[name=lastName]").value,
            'address':event.target.querySelector("[name=address]").value,
            'city':event.target.querySelector("[name=city]").value,
            'email':event.target.querySelector("[name=email]").value,
            'produitsPanier': panierCommande
        }

        const chargeUtile = JSON.stringify(contact);

        fetch("http://localhost:3000/api/products/order"),{

            method:"POST",
            hearders:{"Content-Type":"application/json"},
            body:chargeUtile
        }


    })


}
ajoutListenerCommande();



/*

let lastNameError = document.querySelector("#lastNameErrorMsg");
let addressError = document.querySelector("#addressErrorMsg");
let cityError = document.querySelector("#cityErrorMsg");
let emailError = document.querySelector("#emailErrorMsg");






if (firstName !== "" && contText.test(firstName) === false){

    firstNameError.innerHTML = "Veuillez saisir uniquement des lettres.";
    boutonCommandeInvalid.disabled = true;
    
}else{

    firstNameError.textContent="";
    boutonCommandeInvalid.disabled = false;
}

if (lastName !== "" &&contText.test(lastName) === false){

    lastNameError.innerText = "Veuillez saisir uniquement des lettres.";
    boutonCommandeInvalid.disabled = true;

    
}else{

    lastNameError.textContent="";
    boutonCommandeInvalid.disabled = false;
}

if (address !== "" &&contAlphaNumerique.test(address) === false){

    addressError.innerText = "Veuillez saisir uniquement des chiffres et des lettres.";
    boutonCommandeInvalid.disabled = true;
    
}else{

    addressError.textContent="";
    boutonCommandeInvalid.disabled = false;
}

if (city !== "" && contText.test(city) === false){

    cityError.innerText = "Veuillez saisir uniquement des lettres.";
    boutonCommandeInvalid.disabled = true;
    
}else{

    cityError.textContent="";
    boutonCommandeInvalid.disabled = false;
}

if (email!== "" && contEmail.test(email) === false){

    emailError.innerText = "Veuillez saisir une adresse email valide.";
    boutonCommandeInvalid.disabled = true;
    
}else{

    emailError.textContent="";
    boutonCommandeInvalid.disabled = false;
}
*/
