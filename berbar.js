class Name {
      

getbarbername(){
    return new Promise((resolve,reject)=>{
       fetch("berber.json").then(res=>res.json()).then(data=>resolve(data)).catch(err=>reject(err));

    })  
}

getservicename(){
     return new Promise((resolve,reject)=>{
       fetch("service.json").then(res=>res.json()).then(data=>resolve(data)).catch(err=>reject(err));

    })  
}

mehsulgetir(){
      return new Promise((resolve,reject)=>{
       fetch("mehsul.json").then(res=>res.json()).then(data=>resolve(data)).catch(err=>reject(err));

    })   
}
}

const names = new Name();
names.getbarbername().then(res=>{
      const ad = res.berber;
      const berberselect = document.querySelector("#barber");
      ad.forEach(element => {
           const option = document.createElement("option");
              option.value = element.ad;
              option.textContent = element.ad;
              berberselect.appendChild(option);
      });
}).catch(err=>console.log(err))


const service = new Name();
 service.getservicename().then(res=>{
      const service = res.services;
        const serviceselect = document.querySelector("#service")
      service.forEach(el=>{
           const option = document.createElement("option");
           option.value = el.ad
           option.textContent = el.ad;

            serviceselect.appendChild(option);
      })

 }).catch(err=>console(err));
 
 //Mehsuslu carda yazmaq
 const mehsul = new Name();

 mehsul.mehsulgetir().then(res=>{
      const data = res;
      const productsContainer = document.querySelector(".product-list");
      let count = 0;
      data.categories.forEach(category => {
  category.products.forEach(product => {
      if(count>=4) return;
    const card = document.createElement("div");
    card.className = "product";

    card.innerHTML = `
      <img   src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">$${product.price}</p>
      <button class="buy-btn">Sifariş et</button>
    `;

    productsContainer.appendChild(card);
    count++
  });
}); 

 }).catch(err=>console.log(err))