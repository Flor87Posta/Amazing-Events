//voy a crear el div que contiene a todos los eventos:

// const divCards = document.createElement("divCards");

// divCards.className = "cards";

// voy a crear la card que despues pongo en el bucle:

// const template = `
//         <div class="card text-bg-dark mb-3" style="width: 18rem;">
//           <img src= ${data.image} class="card-img-top" alt="event">
//           <div class="card-body">
//             <h5 class="card-title">${data.name}</h5>
//             <h6 class="card-subtitle mb-2 text-muted">${data.category}</h6>
//             <p class="card-text"> ${data.description}</p>
//             <a href="./details.html" class="card-link">More Info</a>
//           </div>
//         </div>
//         `
// ahora creo la funcion y adentro ejecuto esa variable, y luego hago el bucle con esa funcion que cree; 
//luego asigno como variable la seccion donde quiero que se guarden las tarjetas (dentro de la section que le puse el id = esSection, que a su vez esta dentro del main)
// y por ultimo le hago un innerhtml a la const esSection para que lo pase al html (pero no funciona).

function crearTarjetaConInner (evento){
    const template = `
        <div class="card text-bg-dark mb-3" style="width: 18rem;">
            <img src="${evento.image}" class="card-img-top" alt="event">
            <div class="card-body">
                <h5 class="card-title">${evento.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${evento.category}</h6>
                <p class="card-text">${evento.description}</p>
                <a href="./details.html" class="card-link">More Info</a>
            </div>
        </div>
        `
        return template
}

let templateAcumulado = "";
for (let evento of data.events) {
    templateAcumulado += crearTarjetaConInner(evento);
}


const esSection = document.getElementById("esSection");

esSection.innerHTML = templateAcumulado;

console.log(esSection.innerhtml);





