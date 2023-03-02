

function filtrarListaEventosFuturos (lista){
    let evFut = [];
    for (let evento of data.events){
        if (evento.date > lista.currentDate){
            evFut.push(evento);
        }
    } return evFut;
}

const eventosFuturos = filtrarListaEventosFuturos(data);
console.log(eventosFuturos);



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

let templateAcumuladoFut = "";
for (let evento of eventosFuturos) {
    templateAcumuladoFut += crearTarjetaConInner(evento);
}


const esSectionDos = document.getElementById("esSectionDos");

esSectionDos.innerHTML = templateAcumuladoFut;

console.log(esSectionDos.innerhtml);
