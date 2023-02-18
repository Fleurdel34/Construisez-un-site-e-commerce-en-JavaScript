
const urlParams= (new URL(window.location)).searchParams;
let id;

if (urlParams.has('id')){
id = urlParams.get('id');
};


 
/* creation d'une fonction pour récupérer les éléments du produit*/    

const productApi = await fetch("http://localhost:3000/api/products/"+id); 
const responseApi = await productApi.json(); 




function produitId(responseApi){   

const div1Element = document.querySelector(".item__img");
const imgElement = document.createElement("img"); 
imgElement.src = responseApi.imageUrl;
imgElement.setAttribute("alt", "produits.altTxt");
div1Element.appendChild(imgElement);  

const h1Element = document.querySelector("#title");
const nameElement = document.createElement("h1")
nameElement.innerText = responseApi.name;
h1Element.appendChild(nameElement);

const spanElement = document.querySelector("#price")
const prixElement = document.createElement("span")
prixElement.innerText = responseApi.price;
spanElement.appendChild(prixElement);

const pElement = document.querySelector("#description");
const descriptionElement = document.createElement("p");
descriptionElement.innerText = responseApi.description ?? "Aucune description";
pElement.appendChild(descriptionElement);

for(let i =0; i<responseApi.colors.length; i++){
    const selectElement = document.querySelector("#colors");
    const optionElement = document.createElement("option");
    optionElement.innerText = responseApi.colors[i];
    selectElement.appendChild(optionElement);
}

}

produitId(responseApi);