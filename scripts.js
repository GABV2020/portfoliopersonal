/* Hamburguess Menu */
document.querySelector(".navmenu").addEventListener("click", animateBars);

var line1 = document.querySelector(".line1");
var line2 = document.querySelector(".line2");
var line3 = document.querySelector(".line3");
var container_menu = document.querySelector(".navmenu_ham");
var header_img = document.querySelector("#logoPersonal");

function animateBars(){
    line1.classList.toggle("activeline1");
    line2.classList.toggle("activeline2");
    line3.classList.toggle("activeline3");
    header_img.classList.toggle("desactive-imgheader");
    container_menu.classList.toggle("active-navmenu_ham");
}

document.querySelector(".navmenu_ham").addEventListener("click", (e)=>{
    const target = e.target;
    if(target.tagName == "A"){
        container_menu.classList.remove("active-navmenu_ham");
        line1.classList.remove("activeline1");
        line2.classList.remove("activeline2");
        line3.classList.remove("activeline3");
        header_img.classList.remove("desactive-imgheader");
    }
});


/* Carousel */
const carousel = document.querySelector(".carousel");
firstImg = document.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft;
let firstImgWidth = firstImg.clientWidth + 14;

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    })
});

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault(); 
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft =  positionDiff - prevScrollLeft;
} 

const dragStop = () => {
    isDragStart = false;
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging); 
carousel.addEventListener("mouseup", dragStop);

/* CONTACT FORM */
var form = document.getElementById("form-contact");

async function handleSubmit(event){
    event.preventDefault(); 
    var data = new FormData(event.target);

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers:{
            'Accept' : 'application/json'
        }
    }).then(response =>{
        if(response.ok){
            form.reset();
            alert("¡Mensaje enviado con éxito, me estaré comunicando pronto!")            
        }else{
            response.json().then(data =>{
                alert("¡Revisa los datos ingresados y vuelve a intentar!");  
                if (Object.hasOwn(data, 'errors')) {
                    console.log(data["errors"].map(error => error["message"]).join(", "));
                  } else {
                    console.log("Oops, there was a problem submitting your form!");
                  }
            })
        }
    }).catch(error=>{
        console.log("Oops, there was a problem submitting your form!");
    })
}

form.addEventListener("submit", handleSubmit);

