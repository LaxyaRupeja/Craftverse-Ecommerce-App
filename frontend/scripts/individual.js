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