 /*récupération de l'id dans l'url*/
let id;
 export function recupIdFicheProduit (){    

    const sectionElement = document.querySelector("#items a");

    sectionElement.addEventListener('click', function(){

      const hrefId = "http://127.0.0.1:5500/front/producthtml?id=" + produit._id;
      const url = new URL (hrefId);
      const search_url= new URLSearchParams(url.search);

      if (search_url.has('id')){
      id = search_url.get('id');
      };
    });
    return id;
}

recupIdFicheProduit();



/*creation de la requete fetch APIpour récupérer les éléments du produit en fonction de son id"*/

export async function constructionAPiProduit(id){

        const productApi = await fetch("http://localhost:3000/api" + id + "/products");
        const responseApi = await productApi.json(); 
        
        const sectionElement = document.querySelector(".items");
        const articleElement = document.createElement("article");
        const divElement = document.createElement("div");
      
        const imgElement = document.createElement("img"); 
        imgElement.src = responseApi.imageUrl;
        imgElement.setAttribute("alt", "produits.altTxt");
        
        const nameElement = document.createElement("h1");
        nameElement.innerText = responseApi.name;
        const prixElement = document.createElement("p");
        prixElement.innerText = responseApi.priceElement;
       
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = responseApi.description ?? "Aucune description";

        sectionElement.appendChild(articleElement);
        articleElement.appendChild(divElement);
        divElement.appendChild(imgElement);
        divElement.appendChild(nameElement);
        divElement.appendChild(descriptionElement); 

}

constructionAPiProduit(id);