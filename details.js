//tenemos que rellenar el detalle de cada evento del boton mas info pero de forma dinamica



const params = new URLSearchParams (location.search)
//con el método get del DOM va a traer el primer elemento que coincida con ese id, para luego compararlo 
const id = params.get("id")

//comparar el id de la url con el id de la data, haciendo un find para que guarde el primer true

let detalleCard = data.events.find(element => element._id === id)
console.log (detalleCard)

//ahora vamos a identificar donde pondremos esa tarjeta en nuestro html (detail.html)
const $detalle = document.getElementById("detalle")

//ahora creamos la tarjeta:

function crearTarjetaConInner (evento){
    const template = `
        <div class="card text-bg-dark mb-3" style="width: 18rem;">
            <img src="${evento.image}" class="card-img-top" alt="event">
            <div class="card-body">
                <h5 class="card-title">${evento.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${evento.category}</h6>
                <p class="card-text">Description: ${evento.description}</p>
                <p class="card-text">Date: ${evento.date}</p>
                <p class="card-text">Price: $${evento.price}</p>
                <p class="card-text">Place: ${evento.place}</p>
                <p class="card-text">Capacity: ${evento.capacity}</p>
                <p class="card-text">${evento.assistance ? "Assistance: " + evento.assistance : "Estimate: " + evento.estimate}</p>
                <a href="./details.html?id=${evento._id}" class="card-link">More Info</a>
            </div>
        </div>
        `
        return template
}

function renderCard (lista, elemento){
    let template = ""
    template += crearTarjetaConInner(lista)
    elemento.innerHTML = template
}

renderCard(detalleCard, $detalle)