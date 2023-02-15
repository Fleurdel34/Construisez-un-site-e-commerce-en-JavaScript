const response = await fetch("http://localhost:3000/api/products");
const produit =  await response.json();

/*appel de la requête fetch pour la création des fiches produits*/

function afficherProduits(produit){

for (let i = 0; i<produit.length; i++){

    const produits = produit[i];

    const sectionElement = document.querySelector(".items");

    const aElement = document.createElement("a");
    aElement.setAttribute("href", "../producthtml");
    const articleElement = document.createElement("article");
    articleElement.dataset.produit[i].id;
    const imgElement = document.createElement("img"); 
    imgElement.src = produits.imageUrl;
    imgElement.setAttribute("alt", "produits.altTxt");
    const nameElement = document.createElement("h3");
    nameElement.innerText = produits.name;
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = produits.description ?? "Aucune description";
    


    sectionElement.appendChild(aElement);
    aElement.appendChild(articleElement);
    articleElement.appendChild(imgElement);
    articleElement.appendChild(nameElement);
    articleElement.appendChild(descriptionElement); 
    };
    
}

afficherProduits(produit);


/*const str = "";
const url = new URL (str);
const search_url= new URLSearchParams(url.search);

// Itère sur les paramètres de recherche.

  if (search_url.has('id')){
    
    const id = search_params.get('id');
    console.log(p);

  };*/



