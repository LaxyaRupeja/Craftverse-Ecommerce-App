function postdata() {
    let obj = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    fetch("https://long-eel-tunic.cyclic.app/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(obj)
    }).then((res) => res.json())
        .then((data) => {
            if (data.token == undefined) {
                document.getElementById("wrapper").classList.add('animated', 'shake');
                setTimeout(() => {
                    document.getElementById("wrapper").classList.remove('shake');
                }, 1000)
            }
            else {
                localStorage.setItem("token", data.token)
                console.log(data)
                // alert("Logged in Successfully");
                Swal.fire('Registerd!', '', 'success')
                // window.location.href = 'index.html'

            }
            // alert("succesfully logged in");
        })
}
document.getElementById("login").addEventListener("click", () => {
    postdata()
})