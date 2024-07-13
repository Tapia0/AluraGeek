const $submit = document.getElementById("submit"),
      $password = document.getElementById("password"),
      $username = document.getElementById("username"),
      $regresar =document.getElementById("regresar")
      $visible = document.getElementById("visible");

document.addEventListener("change", (e)=> {
    if(e.target == $visible){
        if($visible.checked === false) $password.type = "password";
        else $password.type = "text";
    }
});

function regresar(){
    location.href="../index.html"
}

document.addEventListener("click", (e) =>{
    if(e.target === $submit){
        if($password.value !== "123456" && $username.value !== "tapia123"){
        e.preventDefault();
        window.location.href = "../Pages/envio.html";
        }
    }
});




