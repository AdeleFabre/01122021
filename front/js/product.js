// ------------------- Récupération ID produit
let productId;
let str = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search;
let url = new URL(str);
let search_params = new URLSearchParams(url.search);
if(search_params.has('id')) {
    productId = search_params.get('id');
    //console.log(productId);
}

// ------------------- Récupération données du produit (format Json) pour affichage du produit dans la page

let colorOption;
let cart = [];
const addedColor = document.querySelector("#colors");
const addedQuantity = document.getElementById("quantity");


// requête API => affichage détail du produit sur la page 
fetch(`http://localhost:3000/api/products/${productId}`) 
    .then(res => {
        return res.json();
    })
    .then(dataList => {
        //console.log(jsonProductDetail);
        document.querySelector("#title").textContent += dataList.name;
        document.querySelector("#price").textContent += dataList.price;
        document.querySelector("#description").textContent += dataList.description;
        document.querySelector("div.item__img").innerHTML = `<img src="${dataList["imageUrl"]}" alt="${dataList["altTxt"]}">`;
        dataList.colors.forEach(element => {
            colorOption = document.createElement("option");
            document.getElementById("colors").appendChild(colorOption);
            colorOption.innerHTML = `<option value="${element}">${element}</option>`; 
        });
    
    //Fonction récupérer éléments du local storage
    function getFromStorage() {
        return localStorage.getItem("CART");
    }

    //Fonction vérifier si article en doublon
    function checkProduct(addedProduct) {
        const cart = JSON.parse(getFromStorage());
        let findSameIndex = cart.findIndex(object => object.id == addedProduct.id && object.color == addedProduct.color);
        return findSameIndex;
    }

    //Fonction envoi du panier au local storage
    function addToLocalStorage (addedProduct) {
        const storage = getFromStorage();

        if (storage) {
            cart = JSON.parse(storage);
            const sameProductIndex = checkProduct(addedProduct);
            if (sameProductIndex >= 0) {
                cart[sameProductIndex].quantity = String(parseFloat(cart[sameProductIndex].quantity) + parseFloat(addedProduct.quantity));
                cart[sameProductIndex].totalPrice = String(parseFloat(cart[sameProductIndex].totalPrice) + parseFloat(addedProduct.price));
            } else {
                cart.push(addedProduct);
            }
            localStorage.setItem("CART", JSON.stringify(cart));

        } else {
            let cart = [];
            cart.push(addedProduct);
            localStorage.setItem("CART", JSON.stringify(cart));
        }
    }

    //Fonction ajouter un produit au panier (création objet + ajout au panier)
    function addProduct() {
        if (addedColor.value == "") {
            alert("Veuillez sélectionner une couleur pour votre produit.");
        } else {
            let addedProduct = {
                id: productId, 
                name: `${dataList.name}`,
                color: addedColor.value,
                price: `${dataList.price}`,
                image: `${dataList.imageUrl}`,
                altTxt: `${dataList.altTxt}`,
                quantity: addedQuantity.value,
                totalPrice: String(`${addedQuantity.value}` * `${dataList.price}`)
            };
            addToLocalStorage(addedProduct);
        }
    }

    //Event Listener
    const addButton = document.getElementById("addToCart");
    addButton.addEventListener('click', addProduct);
});






//------ old

/*

fetch(`http://localhost:3000/api/products/${productId}`) 
    .then(data => data.json())
    .then(jsonProductDetail => {
        //console.log(jsonProductDetail);
        document.querySelector("h1").innerHTML = jsonProductDetail["name"];
        document.querySelector("#price").innerHTML = jsonProductDetail["price"];
        document.querySelector("#description").innerHTML = jsonProductDetail["description"];
        document.querySelector("div.item__img").innerHTML = `<img src="${jsonProductDetail["imageUrl"]}" alt="${jsonProductDetail["altTxt"]}">`;
        jsonProductDetail.colors.forEach(element => {
            colorOption = document.createElement("option");
            document.getElementById("colors").appendChild(colorOption);
            colorOption.innerHTML = `<option value="${element}">${element}</option>`; 
        });
    });

// Ajout d'un produit au panier
const addButton = document.getElementById("addToCart");
addButton.addEventListener('click', function(event) { //on écoute le bouton
    event.preventDefault;
    let addedProduct = { //on stocke la commande dans un objet
        ID:productId,
        Couleur: addedColor.value,
        Quantite: addedQuantity.value
    };
    //console.log(addedProduct); // afficher le produit commandé




    // ------------------- Local Storage
    //optionsProduits pour Egenie == addedProduct pour moi

    // création variable pour stocker les données dans le local storage
    let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("product")); //= version en langage objet (parse) de ce qui est dans le LS

    if(produitEnregistreDansLocalStorage) { //s'il y a déjà des produits d'enregistrés dans le lS
        produitEnregistreDansLocalStorage.push(addedProduct);
        localStorage.setItem("product", JSON.stringify(produitEnregistreDansLocalStorage));
        console.log(produitEnregistreDansLocalStorage);

    } else { // s'il n'y a pas de produits enregistrés dans le LS
        produitEnregistreDansLocalStorage = [];
        produitEnregistreDansLocalStorage.push(addedProduct);
        localStorage.setItem("product", JSON.stringify(produitEnregistreDansLocalStorage));

        console.log(produitEnregistreDansLocalStorage);
    };

});

/* ----------------- test modif valeur qté d'un objet si doublon pushé dans un array

let arrayTest = [];
let objet = {
    id: "ob001",
    couleur: "vert",
    quantite: 1
}
arrayTest.push(objet);
let newObjet = {
    id: "ob001",
    couleur: "vert",
    quantite: 1
}

if(newObjet.id == objet.id && newObjet.couleur == objet.couleur) {
    objet.quantite = objet.quantite + newObjet.quantite;  
} else {
    arrayTest.push(newObjet);
}
console.log(arrayTest);*/