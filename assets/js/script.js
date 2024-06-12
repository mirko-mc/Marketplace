/**
 * DA ELIMINARE
 */
// _id: '6669d98f853a4d001548624b', name: 'EPICODE@epicode.it', description: 'epicode', brand: 'admin'
const TESTHTML = document.querySelector("span");
const ID = "6669d98f853a4d001548624b";

/**
 * url da fetchare
 */
const FETCHURL = "https://striveschool-api.herokuapp.com/api/product/";
/**
 * token per l'autenticazione
 */
const FETCHTOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NDRhNjdmNmI0YjAwMTU0MjhmYzciLCJpYXQiOjE3MTgwNDM4MTQsImV4cCI6MTcxOTI1MzQxNH0.SXzbkbBeQ3k_Id3jleh3mqKxiDVVMO0B3PmJiY3Q7Sk";
/**
 * inserisco i dati fetchati in un oggetto
 */
let products = null;
// console.log(products);

/**
 * funzione al caricamento del documento.....
 */
document.addEventListener("DOMContentLoaded", async () => {
  await getData();
  /**
   * dichiaro il main che sarà innestato in html
   */
  let innesto = `
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
  console.log(products);

  for (const PRODUCT of products) {
    console.log("PRODUCT", PRODUCT);
    /**
     * formatto la card
     */
    let card = `
            <div class="col-3">
              <div class="card">
              <img src="${PRODUCT.image}" class="card-img-top" alt="${PRODUCT.description}">
              <div class="card-body">
              <h5 class="card-title">${PRODUCT.brand} - ${PRODUCT.name}</h5>
              <p class="card-text">${PRODUCT.description}</p>
                  <p class="card-text">${PRODUCT.price} €</p>
                  <a href="#" class="btn btn-primary">
                  <span class="material-symbols-outlined" id="cart${PRODUCT.id}">add_shopping_cart</span>
                  </a>
                  `;
    if (localStorage.getItem("type") === "admin") {
      console.log(
        "DOMContentLoaded => localStorage.type\n",
        localStorage.getItem("type")
      );
      card += `
                      <a href="#" class="btn btn-primary">
                        <span class="material-symbols-outlined" id="edit${PRODUCT.id}">edit</span>
                      </a>
                      <a href="#" class="btn btn-primary">
                        <span class="material-symbols-outlined" id="del${PRODUCT.id}">delete</span>
                      </a>
                    </div>
                    </div>
                    </div>
                    `;
    }
    /**
     * inietto le cards, una per ogni prodotto
     */
    innesto.innerHTML += card;
  }
});

/**
 * funzione fetch per ottenere i dati dall'API ed inserirli in un oggetto
 */
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
      console.log("GETDATA => response\n", response);
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

/**
 * funzione per l'accesso all'area amministratore
 */
function adminAccess() {
  let email = document.querySelector("input[type=email]").value;
  let password = document.querySelector("input[type=password]").value;
  // if (email === products[0].name && password === products[0].description)
  if (email === "a@a.i" && password === "a")
    localStorage.setItem("type", "admin");
  else
    alert(
      "Username e password non corretti. Sei autenticato come utente normale"
    );
}

/**
 * posta i dati nella API
 */
async function postData() {
  await fetch(FETCHURL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: FETCHTOKEN,
    },
    body: JSON.stringify({
      name: "EPICODE",
      description: "epicode",
      brand: "EPICODE",
      imageUrl: "EPICODE",
      price: 0,
    }),
  })
    .then((response) => {
      console.log("POSTDATA => response\n", response);
    })
    .catch((error) => {
      console.log("POSTDATA => error\n", error);
    });
}

/**
 * cancella i dati dall'API
 */
async function deleteData() {
  await fetch(FETCHURL + ID, {
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
}

/**
 * modifica i dati nell'API
 */
async function putData() {
  await fetch(FETCHURL + ID, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: FETCHTOKEN,
    },
    body: JSON.stringify({
      name: "EPICODE@epicode.it",
      brand: "admin",
    }),
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
}

/**
 * funzione per nascondere il pulsante e mostrare il form d'accesso
 */
function reverseIcon(reverse) {
  // console.log("REVERSEICON => reverse\n", reverse);
  // console.log("REVERSEICON => reverse.nextSibling\n",reverse.nextElementSibling);
  reverse.classList.toggle("d-none");
  reverse.nextElementSibling.classList.toggle("d-none");
}

/**
 * funzione per mostrare il pulsante e nascondere il form d'accesso
 */
function reverseAccess(reverse) {
  // console.log("REVERSEACCESS => reverse\n", reverse.previousSibling.parentElement);
  // console.log("REVERSEACCESS => reverse.parentElement.previousElementSibling\n",reverse.parentElement.previousElementSibling);
  reverse.previousSibling.parentElement.classList.toggle("d-none");
  reverse.parentElement.previousElementSibling.classList.toggle("d-none");
}

/**
 * mostra il modale per l'editazione del prodotto
 */
function editProduct(id) {}

/**
 * mostra il modale per una conferma della cancellazione del prodotto
 */
function deleteProduct(id) {}
