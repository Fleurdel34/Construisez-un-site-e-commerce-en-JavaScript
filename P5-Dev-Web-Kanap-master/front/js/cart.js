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

const input = document.querySelectorAll(".itemQuantity");

for(let i = 0; i<=input.length-1; i++){

input[i].addEventListener('change', function(event){

    event.preventDefault();

    let resultModif = this.value;
    document.querySelector(".cart__item__content__setting__Quantity > p").innerText = "Qté : " + input[i].value;
    let parentElementQuantiteModif = input[i].closest("article");
    let productIdModif = parentElementQuantiteModif.dataset.id;
    let productColorModif = parentElementQuantiteModif.dataset.color;

    let kanapPanier = JSON.parse(window.localStorage.getItem('kanapPanier'));

    const newItemQuantite = kanapPanier.map((item)=>{

        if(item.id === productIdModif &&item.colors === productColorModif)
        {
            return{...item, quantite:resultModif}
            
        }
        return item;
    })
    window.localStorage.setItem('kanapPanier', JSON.stringify(newItemQuantite));  

});

};

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

    for (let item = kanapPanier.length-1 ; item >= 0; item--){

        if(kanapPanier[item].id === productId && kanapPanier[item].colors === productColor){
            
            kanapPanier.splice(item,1);
            window.localStorage.setItem('kanapPanier', JSON.stringify(kanapPanier));
            
            
        };
    };  
    parentElementDelete.remove();  

});
}
}
supprimerListenerProduit();




/* fonction pour validation des données du formulaire et envoi des données et du tableau des produits lors de la création de la requête POST*/


function check(){

    const inputCheck= document.querySelector(".cart__order__form");

    inputCheck.addEventListener('input', function(event){

        event.preventDefault();

        let contText= /[a-zA-Z]/g;
        let contAlphaNumerique= /[a-zA-Z0-9]/g;
        let contEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("email").value;
        
        

    if(firstName !== "" && contText.test(firstName) === false){

        document.getElementById("firstNameErrorMsg").textContent="Veuillez saisir uniquement des lettres.";
        document.getElementById("order").disabled = true;

    }else{
        document.getElementById("firstNameErrorMsg").textContent="";
        document.getElementById("order").disabled = false;

    }

    if(lastName !== "" && contText.test(lastName) === false){

        document.getElementById("lastNameErrorMsg").textContent="Veuillez saisir uniquement des lettres.";
        document.getElementById("order").disabled = false;

    }else{
        document.getElementById("lastNameErrorMsg").textContent="";
    }

    if(address !== "" && contAlphaNumerique.test(address) === false){

        document.getElementById("addressErrorMsg").textContent="Veuillez saisir uniquement des chiffres et des lettres.";
        document.getElementById("order").disabled = false;

    }else{
        document.getElementById("addressErrorMsg").textContent="";
    }

    if(city !== "" && contText.test(city) === false){

        document.getElementById("cityErrorMsg").textContent="Veuillez saisir uniquement des lettres.";
        document.getElementById("order").disabled = true;

    }else{
        document.getElementById("cityErrorMsg").textContent="";
        document.getElementById("order").disabled = false;

    }

    if(email !== "" && contEmail.test(email) === false){

        document.getElementById("emailErrorMsg").textContent="Ceci n'est pas une adresse mail valide.";
        document.getElementById("order").disabled = true;

    }else{
        document.getElementById("emailErrorMsg").textContent="";
        document.getElementById("order").disabled = false;
    }
    });
}

check();


function ajoutListenerCommande(){

    const formulaireCommande = document.getElementById("order");
 
    formulaireCommande.addEventListener("click", function(event){

        event.preventDefault();

        kanapPanier = JSON.parse(window.localStorage.getItem('kanapPanier'));

        let products = kanapPanier.map(produit => produit.id);

        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value            
        }

        async function reqOrderId(){
        try{

            const reqResponse = await fetch("http://localhost:3000/api/products/order",{

                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({contact, products})
            });

            if(!reqResponse.ok){

                throw new Error("Erreur de status: ${reqResponse.status}");
            }

            const resultReqPost = await reqResponse.json();
            window.location.href = "confirmation.html?identifiant=" + resultReqPost.orderId; 

        }
        catch(error)
        {
            console.error(error);
        };
        }
        reqOrderId();
    });

}
ajoutListenerCommande();



