async function listaImagenes(){
    const conexion = await fetch("http://localhost:3000/imagenes",{
        method:"GET",
        headers:{
        "Content-type":"application/json"
        }
    });
    
    const conexionConvertida=await conexion.json();
    /* console.log(conexion);
    console.log(conexionConvertida); */
    return conexionConvertida;
}

async function crearImagen(titulo,precio,imagen){
    const conexion= await fetch("http://localhost:3000/imagenes",{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify({
        titulo:titulo,
        precio:precio,
        imagen:imagen
    })
    })
    if(!conexion.ok){
        throw new Error("No fue posible enviar la imagen");
    }
    const conexionConvertida = await conexion.json();

    return conexionConvertida;
}

async function buscarVideo(referencia){
    const conexion=await fetch(`http://localhost:3000/imagenes?q=${referencia}`)
    const conexionConvertida=conexion.json();

    return conexionConvertida;
}

export const conectaAPI={
    listaImagenes,crearImagen,buscarVideo
}
