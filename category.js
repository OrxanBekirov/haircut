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
              <span class="fw-bold text-primary">${product.price} AZN</span>
              <button class="btn btn-dark">Səbətə əlavə et</button>
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







