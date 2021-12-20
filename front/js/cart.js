// --------------------- Récupération des données stockées dans le local storage + affichage dans la page Panier

const storage = JSON.parse(localStorage.getItem("CART"));
console.log(storage);

let arrayOrder = []; //tableau de produits (à envoyer avec l'objet contact pour la commande)

storage.forEach(element => {
    document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
                                <div class="cart__item__img">
                                    <img src="${element.image}" alt="${element.altTxt}">
                                </div>
                                <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                        <h2>${element.name}</h2>
                                        <p>${element.color}</p>
                                        <p>${element.price}, 00 €</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                        <div class="cart__item__content__settings__quantity">
                                        <p>Qté : ${element.quantity}</p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                            <p class="deleteItem">Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </article>`;
    let orderedId = `${element.id}`;
    arrayOrder.push(orderedId);
})

// Affichage du nombre total d'articles
let totalQuantity = document.getElementById("totalQuantity");
let sumQuantity = 0;
storage.forEach(Object => {
    sumQuantity += JSON.parse(Object.quantity);
});
totalQuantity.textContent = sumQuantity;


// Affichage du prix total
let totalPrice = document.getElementById("totalPrice");
let sumPrice = 0;
storage.forEach(Object => {
    sumPrice += JSON.parse(Object.totalPrice);
});
totalPrice.textContent = sumPrice;

// --------------------- Modification du panier

let newQuantityInput = [...document.getElementsByClassName("itemQuantity")];
let deleteButton = [...document.getElementsByClassName("deleteItem")];
let productsInCart = document.getElementById("cart__items");

// Bouton Supprimer
deleteButton.forEach((element, index) => {
    element.addEventListener('click', () => {
        // supprimer dans le DOM
        let deletedProduct = deleteButton[index].closest('.cart__item');
        deletedProduct.remove();
        // supprimer dans le local storage
        storage.splice(index, 1);
        localStorage.setItem('CART', JSON.stringify(storage));
        location.reload();
    })
})

// Modification de la quantité par le client
newQuantityInput.forEach((productsInCart, index) => {
    productsInCart.addEventListener('change', () => {
        // modifie la quantité dans le local storage et le DOM
        storage[index].quantity = newQuantityInput[index].value;
        storage[index].totalPrice = newQuantityInput[index].value * storage[index].price;
        localStorage.setItem('CART', JSON.stringify(storage));
        location.reload();
    })
})

// --------------------- Validation Inputs du formulaire

let formFirstName = document.getElementById("firstName");
let formLastName = document.getElementById("lastName");
let formAddress = document.getElementById("address");
let formCity = document.getElementById("city");
let formEmail = document.getElementById("email");
let regExpLetters = /^[a-zA-Zàáâãäæçèéêëìíîïñòóôõöœšùúûü\s\-']*$/;
let regExpLettersAndNumbers = /^[a-zA-Zàáâãäæçèéêëìíîïñòóôõöœšùúûü0-9\s\-',]*$/;
let regExpEmail = /^[a-zA-Z0-9.\-_]+[@]{1}[a-zA-Z0-9.\-_]+[.]{1}[a-z]{2,10}$/; 

//Prénom 
formFirstName.addEventListener('change', function() {
    let inputToCheck = formFirstName.value;
    let test = regExpLetters.test(inputToCheck);
        if(test) {
            document.getElementById("firstNameErrorMsg").textContent = "";
        } else {
            document.getElementById("firstNameErrorMsg").textContent = "Les données renseignées ne sont pas valides";
        }
})

//Nom
formLastName.addEventListener('change', function() {
    let inputToCheck = formLastName.value;
    let test = regExpLetters.test(inputToCheck);
        if(test) {
            document.getElementById("lastNameErrorMsg").textContent = "";
        } else {
            document.getElementById("lastNameErrorMsg").textContent = "Les données renseignées ne sont pas valides";
        }
})

//Adresse
formAddress.addEventListener('change', function() {
    let inputToCheck = formAddress.value;
    let test = regExpLettersAndNumbers.test(inputToCheck);
        if(test) {
            document.getElementById("addressErrorMsg").textContent = "";
        } else {
            document.getElementById("addressErrorMsg").textContent = "Les données renseignées ne sont pas valides";
        }
})

//Ville - faut-il permettre un CP ou pas ?
formCity.addEventListener('change', function() {
    let inputToCheck = formCity.value;
    let test = regExpLetters.test(inputToCheck);
        if(test) {
            document.getElementById("cityErrorMsg").textContent = "";
        } else {
            document.getElementById("cityErrorMsg").textContent = "Les données renseignées ne sont pas valides";
        }
})

//Email
formEmail.addEventListener('change', function() {
    let inputToCheck = formEmail.value;
    let test = regExpEmail.test(inputToCheck);
        if(test) {
            document.getElementById("emailErrorMsg").textContent = "";
        } else {
            document.getElementById("emailErrorMsg").textContent = "L'adresse mail renseignée n'est pas valide";
        }
})


// -------------------- Validation formulaire

let orderButton = document.getElementById("order");

orderButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (regExpLetters.test(formFirstName.value) == true
    && regExpLetters.test(formLastName.value) == true
    && regExpLettersAndNumbers.test(formAddress.value) == true
    && regExpLetters.test(formCity.value) == true
    && regExpEmail.test(formEmail.value) == true) { 
        //si tous les champs sont correctement remplis
        console.log("ok pour création objet");
        
        // création objet contact
        let contact = {
            lastName: formFirstName.value,
            firstName: formLastName.value,
            address: formAddress.value,
            city: formCity.value,
            email: formEmail.value,
        }
        console.log(contact);
        //envoyer tout ça sur le local storage ?
        //redirection vers page confirmation
        

    } else { //si au moins l'un des champs n'est pas correctement rempli
        alert("Veuillez intégralement remplir le formulaire avant de soumettre votre commande.");
    }
})



//création objet contact
//création tableau produit