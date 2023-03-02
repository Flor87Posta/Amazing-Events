

function filtrarListaEventosPasados (lista){
    let evPas = [];
    for (let evento of data.events){
        if (evento.date < lista.currentDate){
            evPas.push(evento);
        }
    } return evPas;
}

const eventosPasados = filtrarListaEventosPasados(data);
console.log(eventosPasados);



function crearTarjetaConInner (evento){
    const template = `
        <div class="card text-bg-dark mb-3" style="width: 18rem;">
            <img src= ${evento.image} class="card-img-top" alt="event">
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

let templateAcumuladoPas = "";
for (let evento of eventosPasados) {
    templateAcumuladoPas += crearTarjetaConInner(evento);
}


const esSectionTres = document.getElementById("esSectionTres");

esSectionTres.innerHTML = templateAcumuladoPas;

console.log(esSectionTres.innerhtml);