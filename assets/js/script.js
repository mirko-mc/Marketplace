/** * * * * * * * * * * * * * * * * * * *
 * PRODUCT PER L'ACCESSO COME ADMIN
 * _id: '6669d98f853a4d001548624b',
 * name: 'EPICODE@epicode.it',            // EMAIL
 * description: 'epicode',                // PASSWORD
 * brand: 'admin'
 * * * * * * * * * * * * * * * * * * * */
/** url da fetchare */
const FETCHURL = "https://striveschool-api.herokuapp.com/api/product/";
/** token per l'autenticazione */
const FETCHTOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NDRhNjdmNmI0YjAwMTU0MjhmYzciLCJpYXQiOjE3MTgwNDM4MTQsImV4cCI6MTcxOTI1MzQxNH0.SXzbkbBeQ3k_Id3jleh3mqKxiDVVMO0B3PmJiY3Q7Sk";
/** oggetto che conterrà i dati fetchati */
let products = null;
/** variabile multiuso per i vari innerHTML */
let innesto = "";

/** funzione al caricamento del documento..... */
document.addEventListener("DOMContentLoaded", async () => {
  /** se non è già stato definito che tipo di utente sta visitando la pagina allora imposto il tipo di utente su utente normale e mostro le cards */
  if (localStorage.getItem("type") === null)
    localStorage.setItem("type", "user");
  console.log(
    "DOMContentLoaded => localStorage.type\n",
    localStorage.getItem("type")
  );
  const ADMINBAR = document.getElementById("adminBar");
  if (isAdmin()) {
    console.log("DOMContentLoaded => isAdmin\n", "admin");
    document.getElementById("login").classList.add("d-none");
  } else {
    /** se l'utente non è admin nascondo i pulsanti per amministratori */
    console.log("DOMContentLoaded => isAdmin\n", "user");
    for (const COL of document.querySelectorAll("#adminBar .col-1")) {
      COL.classList.add("d-none");
    }
    document.querySelector("#adminBar .col-10").classList.add("offset-1");
    document.getElementById("logout").classList.add("d-none");
  }
  /** attendi il caricamento dei dati fetchati nell'oggetto */
  await getData();
  /** dichiaro il main che sarà innestato in html */
  innesto = `
  <main class="container">
    <div class="row gx-3 gy-3" id="cardsContainer">
    </div>
  </main>
    `;
  // console.log("ONLOAD => innesto\n", innesto);
  /** inietto main appena finisce header */
  ADMINBAR.insertAdjacentHTML("afterend", innesto);
  /** recupero il main appena inserito in cui saranno aggiunte le cards */
  innesto = document.getElementById("cardsContainer");
  /** itero l'oggetto per recuperare i prodotti e creare le cards */
  for (const PRODUCT of products) {
    // console.log("PRODUCT", PRODUCT);
    /** il primo prodotto l'ho riservato per l'autenticazione quindi lo salto perché non dovrà essere renderizzato */
    if (PRODUCT.brand === "admin") continue;
    else {
      /** richiamo la funzione per creare la card */
      innesto.innerHTML += createCard(
        PRODUCT.id,
        PRODUCT.name,
        PRODUCT.description,
        PRODUCT.brand,
        PRODUCT.image,
        PRODUCT.price
      );
    }
    if (isAdmin()) {
      console.log(isAdmin(), "admin");
      document.getElementById(`cart${PRODUCT.id}`).classList.add("d-none");
    }
  }
});

/** funzione per verificare se l'utente è admin */
function isAdmin() {
  if (localStorage.getItem("type") === "admin") return true;
  else return false;
}

function createCard(id, name, description, brand, image, price) {
  /**
   * formatto la card
   */
  let card = `
  <div class="col-3" onclick="window.location.href = 'product.html?id=${id}'">
    <div class="card id="card${id}">
      <img src="${image}" class="card-img-top" alt="${description}">
      <div class="card-body">
        <h5 class="card-title text-truncate">${brand}</h5>
        <p class="card-text text-truncate">${name}</p>
        <p class="card-text">${price} €</p>
        <button class="btn btn-primary material-symbols-outlined" id="cart${id}">add_shopping_cart</button>
  `;
  if (isAdmin()) {
    card += `
        <button type="button" class="btn btn-primary material-symbols-outlined" data-bs-target="#ModalToggle" data-bs-toggle="modal" onclick="editProduct('${id}')" id="edit${id}">edit</button>
        <button type="button" class="btn btn-primary material-symbols-outlined" onclick="deleteData('${id}')" id="delete${id}">delete</button>
      </div>
    </div>
  </div>
                    `;
  }
  return card;
}

/** funzione per l'accesso all'area amministratore */
function login() {
  let email = document.querySelector("input[type=email]").value;
  let password = document.querySelector("input[type=password]").value;
  // if (email === products[0].name && password === products[0].description)
  if (email === "a@a.a" && password === "a") {
    localStorage.setItem("type", "admin");
    window.location.reload();
  } else alert("Username e password non corretti.");
}

/** funzione per il logout */
function logout() {
  localStorage.setItem("type", "user");
  location.reload();
}

/** funzione per nascondere il pulsante e mostrare il form d'accesso */
function reverseLogin() {
  document.getElementById("login").classList.add("d-none");
  document.getElementById("formAccess").classList.remove("d-none");
}

/** funzione per mostrare il pulsante e nascondere il form d'accesso */
function reverseForm() {
  document.getElementById("login").classList.remove("d-none");
  document.getElementById("formAccess").classList.add("d-none");
}

/** mostra il modale per l'editazione del prodotto */
function editProduct(id) {
  // console.log("EDITPRODUCT => id\n", id);
  for (const PRODUCT of products) {
    // console.log("EDITPRODUCT => product.id\n", PRODUCT.id);
    if (PRODUCT.id === id) {
      // console.log("EDITPRODUCT => product\n", PRODUCT);
      // document.querySelector("main").insertAdjacentHTML("afterend", createEditModal(PRODUCT.name, PRODUCT.description, PRODUCT.brand, PRODUCT.image, PRODUCT.price ));
      document.getElementById("name").value = PRODUCT.name;
      document.getElementById("description").value = PRODUCT.description;
      document.getElementById("brand").value = PRODUCT.brand;
      document.getElementById("image").value = PRODUCT.image;
      document.getElementById("price").value = PRODUCT.price;
      break;
    }
  }
  document.getElementById("saveEdit").addEventListener("click", async () => {
    let name = document.getElementById("editName").value;
    let description = document.getElementById("editDescription").value;
    let brand = document.getElementById("editBrand").value;
    let image = document.getElementById("editImage").value;
    let price = document.getElementById("editPrice").value;
    let edit = {};
    if (name !== "") edit["name"] = name;
    if (description !== "") edit["description"] = description;
    if (brand !== "") edit["brand"] = brand;
    if (image !== "") edit["imageUrl"] = image;
    if (price !== "") edit["price"] = price;
    await putData(id, edit);
  });
}

/** funzione per convertire il modale per l'edit nel modale per l'aggiunta prodotto */
async function switchModal() {
  console.log("SWITCHMODAL => \n");
  const MODALTOGGLELABEL = document.getElementById("ModalToggleLabel");
  MODALTOGGLELABEL.innerText = "AGGIUNGI PRODOTTO";

  const NOWVALUE = document.querySelector("#editModal .row h6:first-of-type");
  NOWVALUE.classList.add("d-none");

  const NEWVALUE = document.querySelector("#editModal .row h6:last-of-type");
  NEWVALUE.classList.add("d-none");

  const NOWCOLUMN = document.getElementById("name").parentElement;
  NOWCOLUMN.classList.add("d-none");

  const SPECS = document.querySelector("#editModal .row label").parentElement;
  SPECS.classList.add("col-sm-4");

  const NEWCOLUMN = document.getElementById("editName").parentElement;
  NEWCOLUMN.classList.add("col-sm-8");

  const NAME = document.getElementById("editName");
  NAME.setAttribute("required", true);
  const DESCRIPTION = document.getElementById("editDescription");
  DESCRIPTION.setAttribute("required", true);
  const BRAND = document.getElementById("editBrand");
  BRAND.setAttribute("required", true);
  const IMAGE = document.getElementById("editImage");
  IMAGE.setAttribute("required", true);
  const PRICE = document.getElementById("editPrice");
  PRICE.setAttribute("required", true);
}

/** funzione per aggiungere un prodotto */
async function addProduct() {
  await switchModal();
  document.getElementById("saveEdit").addEventListener("click", async () => {
    let edit = {};
    edit["name"] = document.getElementById("editName").value;
    edit["description"] = document.getElementById("editDescription").value;
    edit["brand"] = document.getElementById("editBrand").value;
    edit["imageUrl"] = document.getElementById("editImage").value;
    edit["price"] = document.getElementById("editPrice").value;
    console.log("ADDPRODUCT => edit\n", edit);
    const ADD = {
      name: document.getElementById("editName").value,
      description: document.getElementById("editDescription").value,
      brand: document.getElementById("editBrand").value,
      imageUrl: document.getElementById("editImage").value,
      price: document.getElementById("editPrice").value,
    };
    console.log("ADDPRODUCT => add\n", ADD);
    postData(ADD);
    await switchModal();
  });
}

/** funzione per filtrare in base a brand o name del prodotto */
async function filter(searchOn) {
  /** prendo il valore della select */
  const WHERE = searchOn.previousElementSibling.value;
  /** prendo il valore dalla input */
  const WHAT = searchOn.value;
  // /** prendo il contenitore delle cards e lo riformatto per le cards del filtro */
  innesto = document.getElementById("cardsContainer").parentElement;
  innesto.innerHTML = `<div id="cardsContainer" class="row gx-3 gy-3">`;
  /** itero l'oggetto con i dati della fetch */
  for (const PRODUCT of products) {
    innesto = document.getElementById("cardsContainer");
    if (PRODUCT[WHERE].toLowerCase().includes(WHAT)) {
      innesto.innerHTML += createCard(
        PRODUCT.id,
        PRODUCT.name,
        PRODUCT.description,
        PRODUCT.brand,
        PRODUCT.image,
        PRODUCT.price
      );
      if (isAdmin()) {
        console.log(isAdmin(), "admin");
        document.getElementById(`cart${PRODUCT.id}`).classList.add("d-none");
      }
    }
  }
  innesto.innerHTML += `</div>`;
}

/** funzione fetch per ottenere i dati dall'API ed inserirli in un oggetto */
async function getData() {
  if (products !== null) {
    console.log("NON HO FATTO LA FETCH\n");
    return products;
  }
  await fetch(FETCHURL, {
    method: "GET",
    headers: { Authorization: FETCHTOKEN, "Content-Type": "application/json" },
  })
    .then((response) => {
      // console.log("GETDATA => response\n", response);
      return response.json();
    })
    .then((data) => {
      console.log("GETDATA => data\n", data);
      products = data.map((PRODUCT) => ({
        id: PRODUCT._id,
        name: PRODUCT.name,
        description: PRODUCT.description,
        brand: PRODUCT.brand,
        image: PRODUCT.imageUrl,
        price: PRODUCT.price.toFixed(2),
      }));
      return data;
    });
}

/** posta i dati nella API */
async function postData(ADD) {
  await fetch(FETCHURL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: FETCHTOKEN,
    },
    body: JSON.stringify(ADD),
  })
    .then((response) => {
      console.log("POSTDATA => response\n", response);
    })
    .catch((error) => {
      console.log("POSTDATA => error\n", error);
    });
  window.location.reload();
}

/** cancella i dati dall'API */
async function deleteData(id) {
  await fetch(FETCHURL + id, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: FETCHTOKEN,
    },
  })
    .then((response) => {
      console.log("DELETEDATA => response\n", response);
    })
    .catch((error) => {
      console.log("DELETEDATA => error\n", error);
    });
  window.location.reload();
}

/** modifica i dati nell'API */
async function putData(id, edit) {
  console.log("PUTDATA => edit\n", edit);
  await fetch(FETCHURL + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: FETCHTOKEN,
    },
    body: JSON.stringify(edit),
  })
    .then((response) => {
      console.log("PUTDATA => response\n", response);
      return response;
    })
    .then((data) => {
      console.log("PUTDATA => data\n", data);
    })
    .catch((error) => {
      console.log("POSTDATA => error\n", error);
    });
  window.location.reload();
}
