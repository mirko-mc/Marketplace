/**
 * DA ELIMINARE ------------------------------------------------------------------------------------------------
 */
// _id: '6669d98f853a4d001548624b', name: 'EPICODE@epicode.it', description: 'epicode', brand: 'admin'
const TESTHTML = document.querySelector("span");
const ID = "666aa2eb853a4d001548630e";
/** FINE DA ELIMINARE ----------------------------------------------------------------------------------------*/

/** url da fetchare */
const FETCHURL = "https://striveschool-api.herokuapp.com/api/product/";
/** token per l'autenticazione */
const FETCHTOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NDRhNjdmNmI0YjAwMTU0MjhmYzciLCJpYXQiOjE3MTgwNDM4MTQsImV4cCI6MTcxOTI1MzQxNH0.SXzbkbBeQ3k_Id3jleh3mqKxiDVVMO0B3PmJiY3Q7Sk";
/** inserisco i dati fetchati in un oggetto */
let products = null;
// console.log(products);
let innesto = "";

async function innestation() {
  await getData();
  /**
   * dichiaro il main che sarà innestato in html
   */
  innesto = `
  <main class="container">
    <div class="row gx-3 gy-3">
    </div>
  </main>
    `;
  /**
   * recupero headers
   */
  const header = document.querySelector("header");
  /**
   * inietto main appena finisce header
   */
  header.insertAdjacentHTML("afterend", innesto);
  /**
   * recupero il main appena inserito in cui saranno aggiunte le cards
   */
  innesto = document.querySelector("main .row");
  /**
   * se non è già stato definito che tipo di utente sta visitando la pagina allora imposto il tipo di utente su utente normale e mostro le cards
   */
  if (localStorage.getItem("type") === null)
    localStorage.setItem("type", "user");
  console.log(
    "DOMContentLoaded => localStorage.type\n",
    localStorage.getItem("type")
  );

  if (localStorage.getItem("type") === "admin") {
    innesto.innerHTML += `
    <button class="btn btn-primary material-symbols-outlined" data-bs-target="#ModalToggle" data-bs-toggle="modal" onclick="addProduct()">add</button>
    `;
  }
  for (const PRODUCT of products) {
    // console.log("PRODUCT", PRODUCT);
    /** il primo prodotto l'ho riservato per l'autenticazione quindi lo salto perché non dovrà essere renderizzato */
    if (PRODUCT.brand === "admin") continue;
    else {
      /** richiamo la funzione per creare la card */
      innesto.innerHTML += createCard(PRODUCT);
    }
    if (localStorage.getItem("type") === "admin")
      document.getElementById(`cart${PRODUCT.id}`).classList.toggle("d-none");
  }
}
/** funzione al caricamento del documento..... */
document.addEventListener("DOMContentLoaded", async () => {
  await innestation();
  if (localStorage.getItem("type") === "admin") {
    document.getElementById("login").classList.toggle("d-none");
    document.getElementById("logout").classList.toggle("d-none");
  }
});

function createCard(product) {
  /**
   * formatto la card
   */
  let card = `
  <div class="col-3">
    <div class="card">
      <img src="${product.image}" class="card-img-top" alt="${product.description}">
      <div class="card-body">
        <h5 class="card-title">${product.brand} - ${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">${product.price} €</p>
        <button class="btn btn-primary material-symbols-outlined" id="cart${product.id}">add_shopping_cart</button>
  `;
  if (localStorage.getItem("type") === "admin") {
    card += `
        <button type="button" class="btn btn-primary material-symbols-outlined" data-bs-target="#ModalToggle" data-bs-toggle="modal" onclick="editProduct('${product.id}')">edit</button>
        <button type="button" class="btn btn-primary material-symbols-outlined" onclick="deleteData('${product.id}')">delete</button>
      </div>
    </div>
  </div>
                    `;
  }
  return card;
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

/** funzione per l'accesso all'area amministratore */
function login() {
  let email = document.querySelector("input[type=email]").value;
  let password = document.querySelector("input[type=password]").value;
  // if (email === products[0].name && password === products[0].description)
  if (email === "a@a.a" && password === "a") {
    localStorage.setItem("type", "admin");
    location.reload();
  } else alert("Username e password non corretti.");
}

/** funzione per il logout */
function logout() {
  localStorage.setItem("type", "user");
  location.reload();
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

/** funzione per nascondere il pulsante e mostrare il form d'accesso */
function reverseLogin() {
  document.getElementById("login").classList.toggle("d-none");
  document.getElementById("formAccess").classList.toggle("d-none");
}

/** funzione per mostrare il pulsante e nascondere il form d'accesso */
function reverseForm() {
  document.getElementById("login").classList.toggle("d-none");
  document.getElementById("formAccess").classList.toggle("d-none");
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

async function switchModal() {
  console.log("SWITCHMODAL => \n");
  const MODALTOGGLELABEL = document.getElementById("ModalToggleLabel");
  MODALTOGGLELABEL.innerText = "AGGIUNGI PRODOTTO";

  const NOWVALUE = document.querySelector("#editModal .row h6:first-of-type");
  NOWVALUE.classList.toggle("d-none");

  const NEWVALUE = document.querySelector("#editModal .row h6:last-of-type");
  NEWVALUE.classList.toggle("d-none");

  const NOWCOLUMN = document.getElementById("name").parentElement;
  NOWCOLUMN.classList.toggle("d-none");

  const SPECS = document.querySelector("#editModal .row label").parentElement;
  SPECS.classList.toggle("col-sm-4");

  const NEWCOLUMN = document.getElementById("editName").parentElement;
  NEWCOLUMN.classList.toggle("col-sm-8");

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
  });
}
