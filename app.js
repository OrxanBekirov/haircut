window.onload = (e) => {
    e.preventDefault();
 const title = document.querySelector(".title");
  title.classList.add("active");


  const li = document.querySelectorAll(".show");
  li.forEach((li) => {
    li.classList.add("show_menu");})

    
  const btn = document.getElementById("btnrezervation");
  setTimeout(() => {
    btn.classList.add("btnshow");
  }, 1000);


    const img = document.getElementById("parallax-bg");
  img.style.opacity = 1;

  
  const text = document.querySelector(".text");
  text.classList.add("showtext");

  const subtitle = document.querySelector(".subtitle");
  subtitle.classList.add("showsub");
  const btnbuttonhome = document.querySelectorAll(".btn");
btnbuttonhome.forEach(el=>{
  el.classList.add("active");
})
    
};


const formgroup = document.querySelectorAll(".form-group");
setTimeout(() => {
  formgroup.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("showi");
    }, index * 300); // hər biri bir-birinin ardınca görünsün
  });
}, 1000);

  const btn = document.getElementById("btnrezervation");
  const cancel = document.getElementById("cancel");
  const btnreservation = document.getElementById("btn");
  const formserver = document.querySelector(".formreserv");

  btn.addEventListener("click",()=>{
     formserver.classList.add("removeform");
  })
    cancel.addEventListener("click",()=>{
         formserver.classList.remove("removeform");
    })

btnreservation.addEventListener("click",()=>{
    if(!formserver.classList.contains("removeform")){
      formserver.classList.add("removeform");
    }
})




  

const form = document.querySelector("#form");
 form.addEventListener("submit",(e)=>{
  e.preventDefault();
    const ad = document.getElementById("ad").value.trim();
    const soyad = document.getElementById("soyad").value.trim();
    const nomre = document.getElementById("nomre").value.trim();
    const tarix = document.getElementById("tarix").value;
    const saat = document.getElementById("saat").value;
    const barber= document.getElementById("barber").value.trim();
    const service = document.getElementById("service").value.trim();
     
    const rezerv = {
      ad,soyad,nomre,tarix,saat,barber,service
    }
    let rezervler = JSON.parse(localStorage.getItem("rezervasiya")) || [];
      if (!Array.isArray(rezervler)) {
    rezervler = [];
  }
  rezervler.push(rezerv);
     localStorage.setItem("rezervasiya", JSON.stringify(rezervler));
      
      
     displayMessage("Ugurla yuklendi","success");
      document.getElementById("ad").value ="";
     document.getElementById("soyad").value = "";
     document.getElementById("nomre").value ="";
     document.getElementById("tarix").value ="";
    document.getElementById("saat").value ="";
     document.getElementById("barber").value = "";
  document.getElementById("service").value ="";
 })


  function displayMessage(message, type){
       const alert = document.querySelector("#alert");
          const div = document.createElement("div");
          div.className = `alert alert-${type}`;
          div.textContent = message;
          alert.appendChild(div);
          setTimeout(function () {
               div.remove();
          }, 2000);
     }


