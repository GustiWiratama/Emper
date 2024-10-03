let nav = document.getElementById("nav-bar");
window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 103) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

//search

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
  if (query.trim() === "") {
    navMenu.classList.remove("d-none");
    fetch("barang.json")
      .then((response) => response.json())
      .then((myItems) => {
        displayItems(myItems); // Tampilkan semua item
        navMenu.classList.remove("d-none"); // Tampilkan menu
        document
          .getElementById("item-content")
          .scrollIntoView({ behavior: "smooth" });
      })
      .catch((error) => console.error("Error loading JSON:", error));
  } else {
    fetch("barang.json")
      .then((response) => response.json())
      .then((myItems) => {
        const filteredItems = myItems.filter(
          (item) => item.itemName.toLowerCase().includes(query) // Filter item berdasarkan query pencarian
        );

        if (filteredItems.length === 0) {
          navMenu.classList.remove("d-none");
        } else {
          navMenu.classList.add("d-none");
        }

        displayItems(filteredItems); // Panggil fungsi tampilkan item dengan item yang sudah difilter
        document
          .getElementById("item-content")
          .scrollIntoView({ behavior: "smooth" });
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }
});

// menampilkan item
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

//pesan item

function toggleQuantityInput(checkbox, inputId) {
  const quantityInput = document.getElementById(inputId);
  quantityInput.style.display = checkbox.checked ? "block" : "none";
  if (!checkbox.checked) {
    quantityInput.value = ""; // Reset value if unchecked
  }
}

function sendToWhatsApp() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  let message = `Nama Pemesan: ${name}%0AAlamat: ${address}%0ANo HP: ${phone}%0APesanan:%0A`;

  document.querySelectorAll(".item-group").forEach((itemGroup, index) => {
    const checkbox = itemGroup.querySelector(".item-checkbox");
    const quantityInput = itemGroup.querySelector(".item-quantity");

    if (checkbox.checked) {
      const itemName = itemGroup.querySelector("label").textContent;
      const quantity = quantityInput.value;
      message += `-${itemName}: ${quantity}%0A`;
    }
  });

  const phoneNumber = "+62881037361961"; // ganti dengan nomor WhatsApp tujuan
  const url = `https://wa.me/${phoneNumber}?text=${message.trim()}`;

  window.open(url, "_blank");
  return false; // mencegah pengiriman form biasa
}
