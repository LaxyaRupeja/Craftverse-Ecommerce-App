let main = document.getElementsByTagName("main")[0];
let token = localStorage.getItem("token")
let prod = localStorage.getItem("ProductID") || null
function fetchData() {
  fetch(`https://long-eel-tunic.cyclic.app/product/${prod}`, {
    method: "GET",
    headers: {
      "Authorization": token
    }
  })
    .then((res) => res.json())
    .then((data) => {
      UpdateCartValue()
      console.log(data)
      main.innerHTML = `<div class="flex">
            <div
              id="left"
              class="flex border w-[50%] justify-around px-5 items-center"
            >
              <div class="w-[15%] flex flex-col gap-2 justify-center">
                <img
                  class="w-[70px]"
                  src="${data.image}"
                  alt=""
                />
                <img
                  class="w-[70px]"
                  src="${data.image2}"
                  alt=""
                />
              </div>
              <div class="w-[70%]">
                <img
                  class="w-full"
                  src="${data.image}"
                  alt=""
                />
              </div>
            </div>
            <div id="right" class="w-[50%] flex flex-col gap-3 px-5 py-2">
              <p class="text-3xl font-semibold">${data.title}</p>
              <p class="text-gray-500 border-b-2 text-xl">${data.desc}</p>
              <p class="text-3xl font-semibold border-b-2 pb-3">
                Rating :
                <i class="fa-solid fa-star text-yellow-400 mb-1"></i
                ><i class="fa-solid fa-star text-yellow-400 mb-1"></i
                ><i class="fa-solid fa-star text-yellow-400 mb-1"></i
                ><i class="fa-regular fa-star text-yellow-400 mb-1"></i
                ><i class="fa-regular fa-star text-yellow-400 mb-1"></i>
              </p>
              <p class="text-3xl font-semibold border-b-2 pb-3">
                Price : <span class="text-[#A80038]">₹${data.price}</span>
              </p>
              <div class="flex flex-col gap-3">
                <p class="font-semibold text-2xl">Details :</p>
                <div class="flex gap-5 border-y-2">
                  <div class="border-r-2 p-3 pl-0">
                    <p class="font-semibold">Rerturn Window</p>
                    <p class="text-[#A80038]">0 Minutes</p>
                    <p class="font-semibold">Returnable</p>
                    <p class="text-[#A80038]">No</p>
                  </div>
                  <div class="p-3 pl-0">
                    <p class="font-semibold">Time to Ship</p>
                    <p class="text-[#A80038]">7 Days</p>
                    <p class="font-semibold">Cancelable</p>
                    <p class="text-[#A80038]">No</p>
                  </div>
                </div>
                <div class="border-b pb-3">
                  <button
                  id="addToCartBtn"
                  data-id=${prod} class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg border-2"
                  >
                    <div
                      class="absolute inset-0 w-3 bg-[#A80038] transition-all duration-[250ms] ease-out group-hover:w-full"
                    ></div>
                    <span
                    
                      class="relative text-[#A80038] group-hover:text-white flex justify-center items-center gap-2"
                      ><i
                        class="fa-solid fa-cart-shopping group-hover:text-white mb-1"
                      ></i
                      >Add to Cart</span
                    >
                  </button>
                  <button
                  data-id=${prod} class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg border-2"
                  >
                    <div
                      class="absolute inset-0 w-3 bg-[#A80038] transition-all duration-[250ms] ease-out group-hover:w-full"
                    ></div>
                    <span
                    
                      class="relative text-[#A80038] group-hover:text-white flex justify-center items-center gap-2"
                      ><i
                        class="fa-regular text-[#A80038] fa-heart group-hover:text-white mb-1"
                      ></i
                      >Wishlist</span
                    >
                  </button>
                </div>
                <div>
                  <p class="text-xl">Product Description</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                    labore inventore velit nam debitis perferendis impedit
                    consequatur in, sit accusamus voluptas eos rem voluptates
                    nostrum nobis placeat, illum nulla corporis.
                  </p>
                </div>
              </div>
            </div>
          </div>`
      ListenToClick()
    })

}
fetchData();
function ListenToClick() {
  let addBtn = document.getElementById("addToCartBtn");
  // console.log(addBtn)
  addBtn.addEventListener("click", () => {
    fetch(`https://long-eel-tunic.cyclic.app/addtocart/${addBtn.dataset.id}`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire(
          'Good job!',
          'Product Added To Cart!',
          'success'
        )
        UpdateCartValue()
      })
  })
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
function toIndex() {
  window.location.href = "index.html"
}