window.addEventListener("DOMContentLoaded",()=>{
      
   const data = localStorage.getItem("rezervasiya");
   if(!data) return;

   const rezervler = JSON.parse(data);
 const tbody = document.getElementById("tbody");
   rezervler.forEach(rezerv => {
    const tr = document.createElement("tr");

    tr.innerHTML +=`
    <td>${rezerv.ad}</td>
      <td>${rezerv.soyad}</td>
      <td>${rezerv.nomre}</td>
      <td>${rezerv.tarix}</td>
      <td>${rezerv.saat}</td>
      <td>${rezerv.barber}</td>
      <td>${rezerv.service}</td>
     <td><button class="btn btn-delete"><i class="fa-solid fa-trash"></i></button></td>
    `
     tbody.appendChild(tr)
   });

})
 const tbody = document.getElementById("tbody");

tbody.addEventListener("click", (e) => {
    if (e.target.className == "fa-solid fa-trash") {
     const tr = e.target.closest("tr"); 
     const index = tr.dataset.index; // HTML-dən sətiri silir
          tr.remove();
        let rezervler = JSON.parse(localStorage.getItem("rezervasiya")) || [];

        rezervler.splice(index, 1); // massivdən sil

        localStorage.setItem("rezervasiya", JSON.stringify(rezervler));
    }
});
