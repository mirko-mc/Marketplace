/** url da fetchare */
const FETCHURL = "https://striveschool-api.herokuapp.com/api/product/";
/** token per l'autenticazione */
const FETCHTOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NDRhNjdmNmI0YjAwMTU0MjhmYzciLCJpYXQiOjE3MTgwNDM4MTQsImV4cCI6MTcxOTI1MzQxNH0.SXzbkbBeQ3k_Id3jleh3mqKxiDVVMO0B3PmJiY3Q7Sk";
/** dichiaro l'oggetto che conterrà i dati */
let product = null;

document.addEventListener("DOMContentLoaded", async () => {
  const ID = new URLSearchParams(window.location.search).get("id");
  console.log("DOMCONTENTLOADED => id\n", ID);
  await getData(ID);
  createCard();
});

async function getData(ID) {
  await fetch(FETCHURL, {
    method: "GET",
    headers: {
      Authorization: FETCHTOKEN,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // console.log("GETDATA => response\n", response);
      return response.json();
    })
    .then((data) => {
      console.log("GETDATA => data\n", data);
      for (const ITEM of data) {
        console.log("GETDATA => item\n", ITEM._id);
        if (ID == ITEM._id)
          product = {
            id: ITEM._id,
            name: ITEM.name,
            description: ITEM.description,
            brand: ITEM.brand,
            image: ITEM.imageUrl,
            price: ITEM.price.toFixed(2),
          };
      }
    });
}

async function createCard() {
  let innesto = "";
  const HEADER = document.querySelector("header");
  innesto += `
  <main class="container">
    <div class="row mb-3">
      <div class="card border-0">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${product.image}" class="img-fluid rounded-start" alt="${product.description}">
          </div>
          <div class="col-md-6 offset-md-2">
            <div class="card-body">
              <h5 class="card-title text-truncate">${product.brand}</h5>
              <h6 class="card-title text-truncate">${product.name}</h6>
              <p class="card-text">${product.description}</p>
              <p class="card-text">${product.price}</p>
            </div>
            <button class="btn btn-primary w-100 material-symbols-outlined" id="${product.id}">add_shopping_cart</button>
          </div>
        </div>
      </div>
    </div>
  </main>
    `;
  HEADER.insertAdjacentHTML("afterend", innesto);
}
