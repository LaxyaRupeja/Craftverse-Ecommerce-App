let token = localStorage.getItem("token")
document.getElementById("goToHome").addEventListener("click", () => {
    CompfetchData()
})
function redirectToIndex() {
    setTimeout(function () {
        window.location.href = "index.html";
    }, 1000); // 4000 milliseconds = 4 seconds
}
function updatePrice(arr) {
    return arr.reduce((acc, cur) => { return acc + cur.price }, 0)
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
            document.getElementById("totalD").innerText = updatePrice(data.order)
            document.getElementById("totalP").innerText = "Rs." + updatePrice(data.order)

        })
}
function CompfetchData() {
    fetch("https://long-eel-tunic.cyclic.app/complete", {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            redirectToIndex()
            Swal.fire(
                'Good job!',
                'Order will be deliverd shortly',
                'success'
            )
        })
}
fetchData();