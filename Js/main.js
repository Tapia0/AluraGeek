//Menu contenedor de tarjeta

let cartIcon = document.querySelector("#tarjeta-icono");
let cart = document.querySelector(".tarjeta");
let cerrarCart = document.querySelector("#cerrar-tarjeta");
//Abrir menu de tarjeta
cartIcon.onclick = () => {
    cart.classList.add("active");
}
//Cerrar menu de tarjeta
cerrarCart.onclick = () => {
    cart.classList.remove("active");
}

//Agregar al carrito

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//Creacion de funcion

function ready() {
    //quitar del carrito
    var removetarjButtons = document.getElementsByClassName("tarj-remove");
    for (var i = 0; i < removetarjButtons.length; i++) {
        var button = removetarjButtons[i];
        button.addEventListener("click", removeTarjItem);
    }
    //contador por cantidad
    var quantityInputs = document.getElementsByClassName("tarj-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    var addTarj=addTarj;
}

//conecta API

import { conectaAPI } from "./conectaAPI.js";

const lista = document.querySelector("[data-lista]");

//validaciones

export default function construyeCard(titulo, precio, imagen) {

    const img = document.createElement("div");
    img.className="caja-producto";
    img.innerHTML =`           
                    <img src="${imagen}" alt="" class="producto-imagen">
                    <h2 class="titulo-producto">${titulo}</h2>
                    <span class="precio">${precio}</span>
                 <i class="bx bx-shopping-bag add-tarj"></i>`

                //Agregar Productos
                var addTarj = document.getElementsByClassName("add-tarj");
                for (var i = 0; i < addTarj.length; i++) {
                    var button = addTarj[i];
                    button.addEventListener("click", addTarjClicked);
                }
                

    return img;


}

loadTarjItems();

//Remover elementos

function removeTarjItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    saveTarjItems();
}

//Quantity Changed

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 0;
    }
    updateTotal();
    saveTarjItems();
    updateTarjIcon();
}
//Agregar Tarjeta funcion productos
function addTarjClicked(event) {
    var button = event.target;
    var comprarProducts = button.parentElement;
    var title = comprarProducts.getElementsByClassName("titulo-producto")[0].innerText;
    var precio = comprarProducts.getElementsByClassName("precio")[0].innerText;
    var productImg = comprarProducts.getElementsByClassName("producto-imagen")[0].src;
    addProductToTarj(title, precio, productImg);
    updateTotal();
    saveTarjItems();
    updateTarjIcon();
    

}

function addProductToTarj(title, precio, productImg) {
    var tarjShopBox = document.createElement("div");
    tarjShopBox.classList.add("caja-tarjeta");
    var tarjItems = document.getElementsByClassName("tarjeta-contenido")[0];
    var tarjItemsNames = tarjItems.getElementsByClassName("tarj-producto-titulo");
    for (var i = 0; i < tarjItemsNames.length; i++) {
        if (tarjItemsNames[i].innerText == title) {
            alert("Ya has añadido este artículo al carrito.");
            return;
        }
    }
    var tarjBoxContent = `<img src="${productImg}" alt="" class="tarj-img">
                        <div class="detalle-caja">
                            <div class="tarj-producto-titulo">${title}</div>
                            <div class="tarj-price">${precio}</div>
                            <input type="number" name="" id="" value="1" class="tarj-quantity">
                        </div>
                        <!--Remover item-->
                        <i class="bx bxs-trash tarj-remove"></i>`;
    tarjShopBox.innerHTML = tarjBoxContent;
    tarjItems.append(tarjShopBox);
    tarjShopBox
        .getElementsByClassName("tarj-remove")[0]
        .addEventListener("click", removeTarjItem);
    tarjShopBox
        .getElementsByClassName("tarj-quantity")[0]
        .addEventListener("change", quantityChanged);
        saveTarjItems ();
        updateTarjIcon();
}

//Actualizar Total

function updateTotal() {
    var tarjContent = document.getElementsByClassName("tarjeta-contenido")[0];
    var tarjBoxes = tarjContent.getElementsByClassName("caja-tarjeta");
    var total = 0;
    for (var i = 0; i < tarjBoxes.length; i++) {
        var tarjBox = tarjBoxes[i];
        var precioElement = tarjBox.getElementsByClassName("tarj-price")[0];
        var quantityElement = tarjBox.getElementsByClassName("tarj-quantity")[0];
        var precio = parseFloat(precioElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total += precio * quantity;

    }
    // si el precio tiene centavos
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-precio")[0].innerText = "$" + total;
    //guardar el total de la suma

    localStorage.setItem("tarjTotal", total);

}

// Mantener el artículo en el carrito cuando se actualice la página con almacenamiento local
function saveTarjItems() {
    var tarjContent = document.getElementsByClassName("tarjeta-contenido")[0];
    var tarjBoxes = tarjContent.getElementsByClassName("caja-tarjeta");
    var tarjItems = [];

    for(var i=0; i < tarjBoxes.length; i++) {
        var tarjBox = tarjBoxes [i];
        var titleElement = tarjBox.getElementsByClassName("tarj-producto-titulo")[0];
        var precioElement = cart.getElementsByClassName("tarj-price")[0];
        var quantityElement = tarjBox.getElementsByClassName("tarj-quantity")[0];
        var productImg = tarjBox.getElementsByClassName("tarj-img")[0].src;

        var item = {
            title: titleElement.innerText,
            precio: precioElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        tarjItems.push(item);
    }
    localStorage.setItem("tarjItems", JSON.stringify(tarjItems));
}

//Cargar en tarjeta 

function loadTarjItems() {
    var tarjItems = localStorage.getItem("tarjItems");
    if (tarjItems) { 
        tarjItems = JSON.parse(tarjItems);

        for (var i= 0; i < tarjItems.length; i++) {
            var item = tarjItems[i];
            addProductToTarj(item.title, item.precio, item.productImg);

            var tarjBoxes = document.getElementsByClassName ("caja-tarjeta");
            var tarjBox = tarjBoxes[tarjBoxes.length - 1];
            var quantityElement = tarjBox.getElementsByClassName("tarj-quantity")[0];
            quantityElement.value = item.quantity;
        }
    }

    var tarjTotal = localStorage.getItem("tarjTotal");
    if (tarjTotal) {
        document.getElementsByClassName("total-precio")[0].innerText = "$" + tarjTotal;
    }
    updateTarjIcon();
}

// Icono de cantidad en el carrito

function updateTarjIcon() {
    var tarjBoxes = document.getElementsByClassName ("caja-tarjeta");
    var quantity = 0;

    for (var i = 0; i < tarjBoxes.length; i++){
        var tarjBox = tarjBoxes[i];
        var quantityElement = tarjBox.getElementsByClassName("tarj-quantity")[0];
        quantity += parseInt(quantityElement.value);
    }
    var tarjIcon = document.querySelector("#tarjeta-icono");
    cartIcon.setAttribute("data-quantity",quantity);
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

