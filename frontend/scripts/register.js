function postdata() {
    let obj = {
        name: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    if (obj.name != undefined && obj.email != undefined && obj.password != undefined) {
        fetch("https://long-eel-tunic.cyclic.app/register", {
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
        console.log("something")
    }
}
document.getElementById("register").addEventListener("click", () => {
    postdata()
})