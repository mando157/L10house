let
    // * Navbar
    navbar = document.querySelector("nav.navbar"),
    links = navbar.querySelectorAll(".nav-item .nav-link");

window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // * To Top
    let homeSection = document.querySelector("#Home"),
        homeHeight = homeSection.offsetHeight;

    if (window.scrollY <= (homeHeight - 300)) {
        $(".top-button").addClass("hide");
    } else {
        $(".top-button").removeClass("hide");
    }

    $(".top-button").on("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

links.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        let currentId = link.getAttribute("href"),
            currentSection = document.querySelector(currentId),
            topSection = currentSection.offsetTop - navbar.clientHeight;

        $(".nav-link.active")?.removeClass("active");

        link.classList.add("active");

        window.scrollTo({
            top: topSection
        });

    });

});

window.addEventListener("scroll", function () {
    links.forEach(function (link) {
        let currentId = link.getAttribute("href"),
            currentSection = document.querySelector(currentId),
            topSection = currentSection?.offsetTop - navbar.clientHeight,
            bottomSection = topSection + currentSection?.clientHeight;

        if (window.scrollY >= topSection && window.scrollY < bottomSection) {

            $(".nav-link.active")?.removeClass("active");

            link.classList.add("active");
        }
    });
});

$(".popup .popup-element").click(function (e) {
    e.stopPropagation();
});

servicesDate();
languagesDate();
sectorsDate();

// * owl.carousel.js

$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 5,
        loop: true,
        slideBy: 1,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        slideTransition: "linear",

        responsive: {
            0: {
                items: 1
            },

            576: {
                items: 2
            },

            768: {
                items: 3
            },

            992: {
                items: 4
            },

            1200: {
                items: 5
            }
        }

    });
});

// * WOW
wow = new WOW(
    {
        animateClass: 'animate__animated',
    }
)
wow.init();

// * Loading Page

$("body").css("overflow-y", "hidden");

window.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        $(".loading").fadeOut(2000);
        $("body").css("overflow-y", "");
    }, 500);
});

// * About Us Button
$(".down").click(function () {
    let $aboutSection = $("#About").offset().top;
    $(window).scrollTop($aboutSection - $(navbar).outerHeight());
});

