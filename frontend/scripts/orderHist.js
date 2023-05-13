let userName = localStorage.getItem("name");
let token = localStorage.getItem("token")
function createcad(img, title, desc, price, id) {
    let card = document.createElement("div");
    card.setAttribute("class", "flex gap-3 p-2 border-b");
    card.innerHTML = `
    <img
      class="aspect-square object-contain w-[20%]"
      src="${img}"
      alt=""
    />
    <div class="flex flex-col gap-2">
      <p class="text-3xl text-[#A80038] line-clamp-1">${title}</p>
      <p>${desc}</p>
      <span class="flex items-center gap-2 text-xl"
        >1</span>
      <p class="text-xl">Price : Rs.${price}</p>
    </div>`;
    return card;
}
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
        document.getElementById("loginButton").innerHTML = `<a class="font-semibold text-xl" href="login.html">Login</a>`;
    }
});
function logout() {
    localStorage.removeItem("name");
    location.reload();
}
let orderHWrap = document.getElementById("orderWrapp")
function fetchData() {
    fetch("https://long-eel-tunic.cyclic.app/getUserHistory", {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            orderHWrap.innerHTML = null;
            data.orderHist.forEach((el) => {
                orderHWrap.append(createcad(el.image, el.title, el.desc, el.price, el._id))
            })
            UpdateCartValue()

        })
        .catch((err) => {
            console.log("something ")
        })
}
fetchData()
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
// console.log("yoo")
function toIndex() {
    window.location.href = "index.html"
}