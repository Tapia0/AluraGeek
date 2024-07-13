//conecta API

import { conectaAPI } from "./conectaAPI";

const lista = document.querySelector("[data-lista]");

//validaciones

function crearCart() {

    const img = document.createElement("div");
    img.className="caja-producto";
    img.innerHTML =`           
                    <img src="${imagen}" alt="" class="producto-imagen">
                    <h2 class="titulo-producto">${titulo}</h2>
                    <span class="precio">${precio}</span>
                 <i class="bx bx-shopping-bag add-tarj"></i>`

    return img;


}


async function listaImagenes() {
    try{
        const listaAPI = await conectaAPI.listaImagenes();
        listaAPI.forEach(element => lista
            .appendChild(construyeCard(element.titulo, element.precio, element.imagen)));
    }catch{
        lista.innerHTML=`<h2 class="mensaje__titulo">No fue posible cargar la lista de imagenes</h2>`;
    }
}

listaImagenes();