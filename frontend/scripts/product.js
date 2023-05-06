let filter = document.getElementById("filter")
let card = document.getElementById("smooth")
filter.addEventListener("click", () => {
    if (card.style.opacity == "0" && card.style.display == "none") {
        card.style.opacity = "1"
        card.style.display = "flex"
    }
    else {
        card.style.opacity = "0"
        card.style.display = "none"
    }
})