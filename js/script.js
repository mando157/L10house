let
    // * Navbar
    navbar = document.querySelector("nav.navbar");

window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

$(".popup .popup-element").click(function (e) { 
    e.stopPropagation();
});

servicesDate();