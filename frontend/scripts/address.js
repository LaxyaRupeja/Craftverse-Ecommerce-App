let addWrap = document.getElementById("addressWrap")
let token = localStorage.getItem("token")
document.getElementById("clickToAdd").addEventListener("click", (e) => {
    e.preventDefault();
    let obj = {
        name: document.getElementById("fname").value + " " + document.getElementById("lname").value,
        address: document.getElementById("add1").value,
        city: document.getElementById("city").value,
        pincode: document.getElementById("pin").value
    }
    console.log(obj)
    fetch("https://long-eel-tunic.cyclic.app/addAddress", {
        method: "PATCH",
        headers: {
            "Authorization": token,
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => {
            fetchData();
        })
})
function fetchData() {
    fetch("https://long-eel-tunic.cyclic.app/getUserOrder", {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            addWrap.innerHTML = null;
            data.address.forEach((el) => {
                addWrap.append(createcard(el.name, el.address, el.pincode, el.city))
            })
        })
}
fetchData()
function createcard(name, add, pin, city) {
    let card = document.createElement("div")
    card.setAttribute("class", "rounded-lg border-2 flex flex-col gap-2 p-5 text-[16px]")
    card.innerHTML = `<p>Name : ${name}</p>
    <p>Address : ${add}</p>
    <p>City : ${city}</p>
    <p>Pincode : ${pin}</p>
    <button
    onclick="goToPayment()"
      class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
      type="submit"
    >
      Proceed with this Address
    </button>`
    return card;
}
function goToPayment() {
    window.location.href = "payment.html"
}
