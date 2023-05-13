let userName = localStorage.getItem("name");
let token = localStorage.getItem("token")
let orderWrap = document.getElementById("orderWrap");
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
function fetchData() {
  fetch("https://long-eel-tunic.cyclic.app/getUserOrder", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      orderWrap.innerHTML = null;
      data.order.forEach((el) => {
        orderWrap.append(createcad(el.image, el.title, el.desc, el.price, el._id))
      })
      document.getElementById("cartItem").innerText = data.order.length;
      document.getElementById("totalD").innerText = updatePrice(data.order)
      document.getElementById("totalP").innerText = updatePrice(data.order)
      removeItem()
      UpdateCartValue()

    })
}
fetchData()
function createcad(img, title, desc, price, id) {
  let card = document.createElement("div");
  card.setAttribute("class", "flex gap-3 p-2 border-b");
  card.innerHTML = `
  <img
    class="aspect-square object-contain w-[26%]"
    src="${img}"
    alt=""
  />
  <div class="flex flex-col gap-2">
    <p class="text-3xl text-[#A80038] line-clamp-1">${title}</p>
    <p>${desc}</p>
    <span class="flex items-center gap-2 text-xl"
      ><button>
        <i
          class="text-green-500 fa-regular fa-plus border-2 p-1 rounded-full"
        ></i></button
      >1<button>
        <i
          class="text-red-500 border-2 p-1 fa-solid fa-minus rounded-full"
        ></i></button
    ></span>
    <p class="text-xl">Price : Rs.${price}</p>
    <p class="">
      <button
        data-id=${id}
        class="text-red-600 flex gap-2 items-center border border-red-600 text-xl p-2 rounded-md hover:text-white hover:bg-red-600 transition-all duration-[250ms] ease-out removeBtn"
      >
        <i class="fa-solid fa-trash"></i>Remove
      </button>
    </p>
  </div>`;
  return card;
}
function updatePrice(arr) {
  return arr.reduce((acc, cur) => { return acc + cur.price }, 0)
}
function removeItem() {
  let btns = document.getElementsByClassName("removeBtn")
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", () => {
      fetch(`https://long-eel-tunic.cyclic.app/removeCart/${btns[i].dataset.id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire(
            'Good job!',
            'Product Added To Cart!',
            'success'
          )
          fetchData();
        })
    })
  }
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
UpdateCartValue()