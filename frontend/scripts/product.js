let filter = document.getElementById("filter")
let token = localStorage.getItem("token")
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
let wrap = document.getElementById("wrapper");
function createCard(id, title, desc, price, img) {
  let randomNum = Math.floor(Math.random() * 5) + 1
  let cardL = document.createElement("div");
  cardL.setAttribute("class", "hover:shadow-lg hover:border-0 border rounded-xl overflow-hidden cursor-pointer");
  cardL.setAttribute("data-id", id);
  cardL.innerHTML = `<img
    class="aspect-square object-contain w-full"
    src=${img}
    alt=""
  />
  <div class="px-3 pt-2 z-30 flex flex-col pb-4">
    <p class="text-xl font-semibold line-clamp-1">${title}</p>
    <p class="text-gray-500">${desc}</p>
    <div class="flex justify-between mt-2">
      <p class="text-xl p-3 pl-0 flex gap-1 items-center">
        <i class="fa-solid fa-star text-yellow-400 mb-1"></i>${randomNum}/5
      </p>
      <p
        class="text-[16px] p-2 border-2 text-[#A80038] flex justify-center items-center text-center rounded-md hover:bg-[#A80038] hover:text-white transition-all duration-[250ms] ease-out font-semibold border-[#A80038]"
      >Rs.${price}</p>
    </div>
  </div>`
  return cardL;
}
function fetchData() {
  fetch("https://long-eel-tunic.cyclic.app/getProd", {
    method: "GET",
    headers: {
      "Authorization": token
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      data.forEach(el => {
        wrap.append(createCard(el._id, el.title, el.desc, el.price, el.image))
      })
    })
}
fetchData();