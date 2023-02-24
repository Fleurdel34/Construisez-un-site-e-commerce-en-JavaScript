/*creation d'un tableau contenant les articles du panier*/

let accesPanier= window.localStorage.getItem('kanapPanier');

accesPanier =JSON.parse(accesPanier);


for (let i = 0; i <=accesPanier.length; i++) {   
    
    let id = accesPanier[i].id;
    let quantite  = accesPanier[i].quantite;
    let colors  = accesPanier[i].colors;
  	       
const requeteApi = await fetch("http://localhost:3000/api/products/"+id); 
const response = await requeteApi.json(); 



const sectionElement = document.querySelector("#cart__items");

const articleElement = document.createElement("article");
articleElement.setAttribute("class", "cart__item");

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
const sousDiv3Element = document.createElement("dv");
sousDiv3Element.setAttribute("class", "cart__item__content__setting__Quantity");
const quantiteElement = document.createElement("p");
quantiteElement.innerText = quantite;
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
const supElement= document.createElement('button');
supElement.setAttribute('id', 'btn__sup');
supElement.innerHTML= 'Cliquer ici';



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
div4Element.appendChild(supElement);


}


/* Modification de la quantité ou supression d'un produit du panier et maj du DOM/localStorage*/

/* modification de la quantité d'un produit*/ 
let input = document.querySelector(".itemQuantity");
let result = document.querySelector("div.cart__item__content__settings__quantity p");

input.addEventListener('change', function(event){
    result.textContent = this.value;

    let inputModif = document.getByNameClass("itemQuantity").value;
    let parentElementInputModif = inputModif.closet(":not (div)");
    let productIdModif = parentElementInputModif.dataset.id;
    let productColorModif = parentElementInputModif.dataset.color;

    kanapPanier = parseInt(window.localStorage.getItem('kanapPanier'));

    const majPanier = kanapPanier.map((kanap)=>{

    if(kanap[i].id === productIdModif && kanap[i].colors === productColorModif){

        return{...kanap, quantite: inputModif};
    };
    return kanap;
    });
})

/* supression d'un element du panier/du DOM/ du localStorage*/


let itemSupprimer = document.querySelector("#btn__sup");


kanapPanier = parseInt(window.localStorage.getItem('kanapPanier'));



itemSupprimer.addEventListener('click', function(event){
   

    let supressionElement = document.getElementsById("#btn__sup");

    let parentElementDelete = supressionElement.closet(":not (div)");

    let productId = parentElementDelete.dataset.id;
    let productColor = parentElementDelete.dataset.color;

    kanapPanier = parseInt(window.localStorage.getItem('kanapPanier'));

    for (let i =0; i<=kanapPanier.length; i++){

        if(kanapPanier[i].id === productId && kanapPanier[i].colors === productColor){

            window.localStorage.removeItem(kanapPanier[i]);

            parentElementDelete.remove();
        };
    };

});

