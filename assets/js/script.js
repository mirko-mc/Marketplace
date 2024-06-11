const FETCHURL = "https://striveschool-api.herokuapp.com/api/product/";
const FETCHTOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NDRhNjdmNmI0YjAwMTU0MjhmYzciLCJpYXQiOjE3MTgwNDM4MTQsImV4cCI6MTcxOTI1MzQxNH0.SXzbkbBeQ3k_Id3jleh3mqKxiDVVMO0B3PmJiY3Q7Sk";
const ID = "666844fb8fc0f300155e5aca";

document.addEventListener("DOMContentLoaded", () => {
  console.log(
    "DOMContentLoaded => localStorage.type\n",
    localStorage.getItem("type")
  );
  /**
   * se non è già stato definito che tipo di utente sta visitando la pagina allora imposto il tipo di utente su utente normale
   */
  if (localStorage.getItem("type") === null)
    localStorage.setItem("type", "user");
  console.log(
    "DOMContentLoaded => localStorage.type\n",
    localStorage.getItem("type")
  );
  /**
   * recupero headers
   */
  const header = document.querySelector("header");
  let main = `
  <main class="container">
    <div class="row gx-3 gy-3">
    </div>
  </main>
    `;
  header.insertAdjacentHTML("afterend", main);
  main = document.querySelector("main .row");
  const card = `
      <div class="col-3">
        <div class="card">
          <img src="${IMMAGINE}" class="card-img-top" alt="${DESCRIZIONE_IMMAGINE}">
          <div class="card-body">
            <h5 class="card-title">${TITOLO}</h5>
            <p class="card-text">${DESCRIZIONE}</p>
            <a href="#" class="btn btn-primary">
              <span class="material-symbols-outlined">add_shopping_cart</span>
            </a>
            <a href="#" class="btn btn-primary">
              <span class="material-symbols-outlined">edit</span>
            </a>
            <a href="#" class="btn btn-primary">
              <span class="material-symbols-outlined">delete</span>
            </a>
          </div>
        </div>
      </div>
  `;
  main.innerHTML += card;
});
async function getData() {
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
      return data;
    });
}

async function postData() {
  await fetch(FETCHURL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: FETCHTOKEN,
    },
    body: JSON.stringify({
      name: "name2",
      description: "description2",
      brand: "brand2",
      imageUrl: "https://example.com/imageUrl2",
      price: 502,
    }),
  })
    .then((response) => {
      console.log("POSTDATA => response\n", response);
    })
    .catch((error) => {
      console.log("POSTDATA => error\n", error);
    });
}

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

async function putData() {
  await fetch(FETCHURL + ID, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: FETCHTOKEN,
    },
    body: JSON.stringify({
      name: "name2",
      description: "description2",
      brand: "brand2",
      imageUrl: "https://example.com/imageUrl2",
      price: 52,
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
 * DA ELIMINARE
 */
const TESTHTML = document.querySelector("span");
