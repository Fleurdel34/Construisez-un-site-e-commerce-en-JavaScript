const accesPanier= window.localStorage.getItem('kanapPanier');

let id;
let quantite;
let colors;
for (let i = 0; i <=accesPanier.length; i++) {
 
    const panierObj = accesPanier[i];
  
  	  for (let i = 0; i < panierObj.length; i++) {

            let id  = panierObj[i].id;
            let quantite  = panierObj[i].utilisateur;
            let colors  = panierObj[i].avis;
      }
}   
    

const requeteApi = await fetch("http://localhost:3000/api/products/"+id); 
const response = await requeteApi.json(); 

function genererPanier(response){

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
    colorElement.innerText = colorsObj;
    const prixElement = document.createElement("p");
    prixElement.innerText = response.price;


    const div3Element = document.createElement("div");
    div3Element.setAttribute("class", "cart__item__content__settings")
    const sousDiv3Element = document.createElement("dv");
    sousDiv3Element.setAttribute("class", "cart__item__content__setting__Quantity");
    const quantiteElement = document.createElement("p");
    quantiteElement.innerText = quantiteObj;
    const itemElement = document.createElement("input");
    itemElement.setAttribute("type","number");
    itemElement.setAttribute("class","itemQuantity");
    itemElement.setAttribute("name","itemQuantity");
    itemElement.setAttribute("min","1");
    itemElement.setAttribute("max","100");
    itemElement.setAttribute("value","42");

        
    const div4Element = document.createElement("div");
    div4Element.setAttribute("class","deleteItem");
    const deleteElement = document.createElement("p");
    deleteElement.innerText = 'Supprimer';



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
genererPanier(response);