var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});
var sweper = new Swiper(".mySweper", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});
let nav = document.getElementById("nav")
window.addEventListener("scroll", () => {
    if (window.scrollY == 0) {
        nav.style.top = "33px"
        nav.classList.remove("shadow")
    }
    else {
        nav.style.top = "0px"
        nav.classList.add("shadow")
        // dropdown.style.display = "none"
    }
})