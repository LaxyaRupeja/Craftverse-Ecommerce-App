let filter = document.getElementById("filter")
let token = localStorage.getItem("token")
let card = document.getElementById("smooth")
let url = "https://long-eel-tunic.cyclic.app/getProd"
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

  cardL.addEventListener("click", () => {
    localStorage.setItem("ProductID", id)
    window.location.href = "individual.html";
  })
  return cardL;
}
function fetchData(url) {
  fetch(url, {
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
      if (data.msg) {
        wrap.innerHTML = ` <a href="login.html" class="text-blue-600"><p class="text-3xl text-red-700 font-semibold line-clamp-1">Please login First</p></a>`
      }
      else {
        console.log(data)
        wrap.innerHTML = null;
        data.forEach(el => {
          wrap.append(createCard(el._id, el.title, el.desc, el.price, el.image))
        })
        document.getElementById("prodF").innerText = data.length
      }
    })
}
fetchData(url);
document.getElementById("low").addEventListener("click", () => {
  fetchData(`${url}?sort=low`)
})
document.getElementById("high").addEventListener("click", () => {
  fetchData(`${url}?sort=high`)
})
document.getElementById("saree").addEventListener("change", () => {
  fetchData(`https://long-eel-tunic.cyclic.app/prodcat/Saree`);
})
document.getElementById("kurta").addEventListener("change", () => {
  fetchData(`https://long-eel-tunic.cyclic.app/prodcat/Kurta`)
})
document.getElementById("home").addEventListener("change", () => {
  fetchData(`https://long-eel-tunic.cyclic.app/prodcat/Home-Decor`)
})
document.getElementById("two").addEventListener("change", () => {
  fetchData(`https://long-eel-tunic.cyclic.app/prodfilter/2000`)
})
document.getElementById("five").addEventListener("change", () => {
  fetchData(`https://long-eel-tunic.cyclic.app/prodfilter/500`)
})
document.getElementById("thou").addEventListener("change", () => {
  fetchData(`https://long-eel-tunic.cyclic.app/prodfilter/1000`)
})

      console.log(data)
      data.forEach(el => {
        wrap.append(createCard(el._id, el.title, el.desc, el.price, el.image))
      })
    })
}
fetchData();
