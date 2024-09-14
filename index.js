let nav = document.getElementById("nav-bar");
window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 103) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

//search
// Anggap ini setelah fungsi fetch dan pengisian item

const searchBar = document.getElementById("search-bar");
const navMenu = document.getElementById("navMenu");
//mendengarkan event input untuk menangani pencarian secara real-time
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  if (menu.classList.contains("hidden")) {
    navMenu.classList.remove("d-none");
  } else {
    navMenu.classList.add("d-none");
  }
  fetch("barang.json")
    .then((response) => response.json())
    .then((myItems) => {
      const filteredItems = myItems.filter(
        (item) => item.itemName.toLowerCase().includes(query) // Filter item berdasarkan query pencarian
      );

      displayItems(filteredItems); // Panggil fungsi tampilkan item dengan item yang sudah difilter
      document
        .getElementById("item-content")
        .scrollIntoView({ behavior: "smooth" });
    })
    .catch((error) => console.error("Error loading JSON:", error));
});

// Fungsi untuk menampilkan item
function displayItems(items) {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = items
    .map((item) => {
      return `<div class="item">  
                <img  
                  src=${item.image}  
                  alt="${item.itemName}"  
                  height="200px"  
                  width="200px"  
                />  
                <div class="item-desc">  
                  <div class="name">${item.itemName}</div>  
                  <div class="price">${item.price}</div>  
                  <div class="stock">stock: ${item.stock}</div>  
                </div>  
              </div>`;
    })
    .join("");
}

// menu button
const menuBtn = document.querySelector("#menu-btn");
const menu = document.querySelector("#menu-list");
const title = document.querySelector(".title");
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  if (menu.classList.contains("hidden")) {
    title.classList.remove("d-none");
  } else {
    title.classList.add("d-none");
  }
});

// fetch
fetch("barang.json")
  .then((response) => response.json())
  .then((myItem) => {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = myItem
      .map((item) => {
        return `<div class="item">  
                  <img  
                    src=${item.image}  
                    alt="${item.itemName}"  
                    height="200px"  
                    width="200px"  
                  />  
                  <div class="item-desc">  
                    <div class="name">${item.itemName}</div>  
                    <div class="price">${item.price}</div>  
                    <div class="stock">stock: ${item.stock}</div>  
                  </div>  
                </div>`;
      })
      .join("");
  })
  .catch((error) => console.error("Error loading JSON:", error));
