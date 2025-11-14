class Mehsul {
   getcategory(){

    return new Promise((resolve,reject)=>{
      fetch("mehsul.json").then(res=>res.json()).then(data=>resolve(data)).catch(err=>reject(err));
       
    })
}
}


const mehsul  = new Mehsul();
mehsul.getcategory()
  .then(res => {

    const navList = document.querySelector(".navbar-nav");

    res.categories.forEach(category => {

      // li (dropdown item)
      const li = document.createElement("li");
      li.classList.add("nav-item", "dropdown");

      // dropdown button
      const dropdownBtn = document.createElement("a");
      dropdownBtn.classList.add("nav-link", "dropdown-toggle");
      dropdownBtn.href = "#";
      dropdownBtn.role = "button";
      dropdownBtn.setAttribute("data-bs-toggle", "dropdown");
      dropdownBtn.setAttribute("aria-expanded", "false");
      dropdownBtn.textContent = category.name;

      // dropdown menu
      const dropdownMenu = document.createElement("ul");
      dropdownMenu.classList.add("dropdown-menu");

      // ✅ category.products varsa — məhsulları alt menyuya əlavə edirik
      if (category.products && category.products.length > 0) {

        category.products.forEach(product => {
          const productLi = document.createElement("li");

          productLi.innerHTML = `
            <a href="#" class="dropdown-item" data-id="${product.id}">
              ${product.name}
            </a>
          `;
          dropdownMenu.appendChild(productLi);
        });

      } else {
        // ✅ sản alt məhsul yoxdursa
        dropdownMenu.innerHTML = `
          <li><span class="dropdown-item-text text-muted">Məhsul tapılmadı</span></li>
        `;
      }

      // elementləri birləşdiririk
      li.appendChild(dropdownBtn);
      li.appendChild(dropdownMenu);
      navList.appendChild(li);
    });
        return res;
  })
  .then(res => {
    const container = document.querySelector(".cont");
       const data = res;
    data.categories.forEach(category => {

      // === PRODUCT GROUP WRAPPER ===
      const groupDiv = document.createElement("div");
      groupDiv.classList.add("product-group");

      // CATEGORY TITLE
      const titleDiv = document.createElement("div");
      titleDiv.innerHTML = `<h2>${category.name}</h2>`;
      groupDiv.appendChild(titleDiv);

      // PRODUCT LIST WRAPPER
      const productList = document.createElement("div");
      productList.classList.add("product-list");
      productList.style.display = "flex";
      productList.style.flexWrap = "wrap";
      productList.style.gap = "20px";

      // ADD EACH PRODUCT
      category.products.forEach(product => {
        
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";

        card.innerHTML = `
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span id="price" class="fw-bold text-primary">${product.price} AZN</span>
              <button   class="btn btn-dark addcart">Səbətə əlavə et</button>
            </div>
          </div>
        `;

        productList.appendChild(card);
      });

      groupDiv.appendChild(productList);
      container.appendChild(groupDiv);

    });

  })
  .catch(err => console.log(err));

const btncart = document.getElementById("btn-cart");
const cartbottom = document.querySelector("#cart-bottom");
const cartclose = document.getElementById("cart-close");

btncart.addEventListener("click",()=>cartbottom.classList.add("active"));
cartclose.addEventListener("click",()=>cartbottom.classList.remove("active"));

// const btncard = document.querySelectorAll(".addcart");
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("addcart")) {
    const productBox = e.target.closest(".card");
    addToCart(productBox);
  }
});


const addToCart = productBox =>{
  
  const productImage = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector(".card-title").textContent;
  const productPrice = productBox.querySelector("#price").textContent;


    const cartcontent = document.querySelector(".cart-content");
  const cartItems  = cartcontent.querySelectorAll(".cart-product-title");
  for(let item of cartItems){
if(item.textContent === productTitle){
  alert("Bu mehsul artiq movcuddur");
  return
}
  }

     const cartbox = document.createElement("div");
     cartbox.classList.add("cart-box");
     cartbox.innerHTML = `
       <img src="${productImage}" alt="">
              <div class="cart-detail">
                <h2 class="cart-product-title">${productTitle}</h2>
                <span class="cart-product-price">${productPrice}</span>
                <div class="cart-qunatity">
                  <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
                </div>
              </div>
              <i class="fa-solid fa-trash"></i>
     `
     cartcontent.appendChild(cartbox);
 document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    const cartBox = e.target.closest(".cart-box"); // yalnız həmin məhsul
    cartBox.remove(); // yalnız onu silirik
        updateCartCount(-1);
    updateTotalPrice();

  }
});

    cartbox.querySelector(".cart-qunatity").addEventListener("click",e=>{
           const numberElement = cartbox.querySelector(".number");
           const decrementButton = cartbox.querySelector("#decrement");
           let quantity = numberElement.textContent;
           if(e.target.id === "decrement" && quantity>1){
              quantity--;
              if(quantity===1){
                decrementButton.style.color = "#999";
              }
           }else if(e.target.id === "increment"){
             quantity++;
                decrementButton.style.color = "#999";

           }
           numberElement.textContent = quantity;
           updateTotalPrice();
    })
        updateCartCount(1);
    updateTotalPrice();
}
function updateTotalPrice() {
  const cartBoxes = document.querySelectorAll(".cart-box"); // bütün məhsullar
  let total = 0;

  cartBoxes.forEach(box => {
    const priceText = box.querySelector(".cart-product-price").textContent; // "20azn"
    const quantity = parseInt(box.querySelector(".number").textContent); // miqdar
    const price = parseFloat(priceText.replace("azn", "").trim()); // "20" çevrilir

    total += price * quantity;
  });

  const totalPriceElement = document.querySelector(".total-price");
  totalPriceElement.textContent = total + " AZN";
}

let cartItemCount = 0;

const updateCartCount = change => {
  cartItemCount += change;
  const cartCountBadge = document.querySelector("#cart-span-count");

  if(cartItemCount > 0){
    cartCountBadge.style.visibility = "visible";
    cartCountBadge.textContent = cartItemCount;
  } else {
    cartCountBadge.style.visibility = "hidden";
    cartCountBadge.textContent = "";
  }
}

const odenis = document.querySelector(".buy-now");

odenis.addEventListener("click", (e) => {
  const cartBoxes = document.querySelectorAll(".cart-box");

  if (cartBoxes.length === 0) {
    alert("Səbətiniz boşdur, məhsul əlavə edin!");
    return;
  }

  // bütün cart-box-ları silirik
  cartBoxes.forEach(item => item.remove());

  // cart count və total sıfırlanır
  cartItemCount = 0;
  updateCartCount(0); // funksiyanı çağırırıq
  updateTotalPrice();

  alert("Ödəniş uğurludur!");
});
