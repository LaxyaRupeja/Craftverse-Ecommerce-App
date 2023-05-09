let filter = document.getElementById("filter")
let token = localStorage.getItem("token")
let card = document.getElementById("smooth")
let userName = localStorage.getItem("name")
UpdateCartValue();
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
window.addEventListener("load", () => {
  if (userName) {
    document.getElementById("loginButton").innerHTML = `<button
        @click="open = !open"
        class="flex flex-row items-center w-full px-4 py-2 mt-2 text-[17px] font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      >
        <span id="changeName">Hello , ${userName}</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          :class="{'rotate-180': open, 'rotate-0': !open}"
          class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        x-show="open"
        x-transition:enter="transition ease-out duration-100"
        x-transition:enter-start="transform opacity-0 scale-95"
        x-transition:enter-end="transform opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-75"
        x-transition:leave-start="transform opacity-100 scale-100"
        x-transition:leave-end="transform opacity-0 scale-95"
        class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48"
      >
        <div
          class="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800"
        >
          <a
            class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href="#"
            >My Account</a
          >
          <a
            class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href="#"
            >Order History</a
          >
          <a
            onclick="logout()"
            class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href="#"
            >Logout</a
          >
        </div>
      </div>`;
  } else {
    document.getElementById(
      "loginButton"
    ).innerHTML = `<a class="font-semibold text-xl" href="login.html">Login</a>`;
  }
});
function logout() {
  localStorage.removeItem("name");
  location.reload();
}
function UpdateCartValue() {
  fetch("https://long-eel-tunic.cyclic.app/getUserOrder", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("cartIconNo").innerText = data.order.length;
    })
}