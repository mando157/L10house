let navbar = document.querySelector("nav.navbar");

window.addEventListener("scroll" , function(){
    if(window.scrollY > 10){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }
});