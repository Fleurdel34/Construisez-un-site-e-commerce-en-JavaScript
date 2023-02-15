const response = await fetch('http://localhost:3000/api/products')
const produit = await response.json();
response.catch(err => console.error());


/*appel de la requête fetch pour la création des fiches produits*/
function afficherProduits(produit){
for (let i = 0; i < produit.length; i++){

    const produits = produit[i];
    const sectionElement = document.querySelector("#items");
    const aElement = document.createElement("a");
    aElement.setAttribute("href", "../producthtml");
    sectionElement.appendChild(aElement);
    const articleElement = document.createElement("article");
    aElement.appendChild(articleElement);
    const imgElement = document.createElement("img"); 
    imgElement.src = produits[i].imageUrl;
    imgElement.setAttribute("alt", "produits.altTxt");
    articleElement.appendChild(imgElement);
    const nameElement = document.createElement("h3");
    nameElement.innerText = produits[i].name;
    articleElement.appendChild(nameElement);
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = produits[i].description ?? "Aucune description";
    articleElement.appendChild(descriptionElement); 
    };
    
}

afficherProduits(produit);

