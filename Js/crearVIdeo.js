import { conectaAPI } from "./conectaAPI.js";

const formulario = document.querySelector("[data-formulario]");

//validaciones

async function crearImagen(evento){
    evento.preventDefault();
    const imagen= document.querySelector("[data-imagen]").value;
    const precio = document.querySelector("[data-precio]").value;
    const titulo=document.querySelector("[data-titulo]").value;
    
    try{
        await conectaAPI.crearImagen(titulo,precio,imagen)
    
        window.location.href="../Pages/envio-concluido.html"
    }catch(e){
        alert(e);
    }
}

formulario,addEventListener("submit",evento=>crearImagen(evento));