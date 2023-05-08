function postdata() {
    let obj = {
        name: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    if (obj.username != undefined && obj.email != undefined && obj.password != undefined) {
        fetch("https://elegant-bass-outerwear.cyclic.app/task/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(obj)
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                Swal.fire('Registerd!', '', 'success')
                window.location.href = 'login.html'
            })
    }
    else {

    }
}
document.getElementById("register").addEventListener("click", () => {
    postdata()
})