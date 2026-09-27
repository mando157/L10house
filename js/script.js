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