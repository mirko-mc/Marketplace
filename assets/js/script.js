const FETCHURL = "https://striveschool-api.herokuapp.com/api/product/";
const FETCHTOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NDRhNjdmNmI0YjAwMTU0MjhmYzciLCJpYXQiOjE3MTgwNDM4MTQsImV4cCI6MTcxOTI1MzQxNH0.SXzbkbBeQ3k_Id3jleh3mqKxiDVVMO0B3PmJiY3Q7Sk";

document.addEventListener("DOMContentLoaded", () => {
  postData();
  getData();
});

async function getData() {
  await fetch(FETCHURL, {
    method: "GET",
    headers: { Authorization: FETCHTOKEN, "Content-Type": "application/json" },
  }).then((response) => {
    console.log("GETDATA => response\n", response);
    return response.json();
  }).then((data) => {
    console.log("GETDATA => data\n", data);
  });
}



async function postData() {
  await fetch(FETCHURL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": FETCHTOKEN,
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
    //   return response.json();
    })
    // .then((data) => {
    //   console.log("POSTDATA => data\n", data);
    // })
    .catch((error) => {
      console.log("POSTDATA => error\n", error);
    });
}
