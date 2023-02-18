
const urlParams= (new URL(window.location)).searchParams;
let id;

if (urlParams.has('id')){
id = urlParams.get('id');
};


 
/* creation d'une fonction pour récupérer les éléments du produit*/    

const productApi = await fetch("http://localhost:3000/api/products/"+id); 
const responseApi = await productApi.json(); 




function produitId(responseApi){   

const mainElement = document.querySelector(".limitedWidthBlockContainer")
const divPrincipaleElement = document.createElement("div");
divPrincipaleElement.setAttribute("class", "limitedWidthBlock");
sectionElement= document.createElement("section");
sectionElement.setAttribute("class", "items");
const articleElement = document.createElement("article");


const div1Element = document.createElement("div");
div1Element.setAttribute("class", "item__img");
const imgElement = document.createElement("img"); 
imgElement.src = responseApi.imageUrl;
imgElement.setAttribute("alt", "produits.altTxt");
        
const div2Element = document.createElement("div")
div2Element.setAttribute("class", "item__content__titlePrice");
const nameElement = document.createElement("h1")
nameElement.setAttribute("id", "title");
nameElement.innerText = responseApi.name;
const pElement = document.createElement("p")
const prixElement = document.createElement("span")
prixElement.setAttribute("id", "description");
prixElement.innerText = responseApi.price;

const div3Element = document.createElement("div");
div3Element.setAttribute("class", "item__content__description");
const descriptionElement = document.createElement("p");
descriptionElement.innerText = responseApi.description; /*?? "Aucune description"*/

mainElement.appendChild(divPrincipaleElement);
divPrincipaleElement.appendChild(sectionElement);
sectionElement.appendChild(articleElement);
articleElement.appendChild(div1Element);
articleElement.appendChild(div2Element);
articleElement.appendChild(div3Element);
div1Element.appendChild(imgElement);
div2Element.appendChild(nameElement);
div2Element.appendChild(pElement);
pElement.appendChild(prixElement);
div3Element.appendChild(descriptionElement);

}

produitId(responseApi);