// inicio task 4 con fetch como hice en el home;
function datosViaUrl(){
    const conseguirDatos = fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data =>{

        function filtrarListaEventosPasados (lista){
            let evPas = [];
            for (let evento of data.events){
                if (evento.date < lista.currentDate){
                    evPas.push(evento);
                }
            } return evPas;
        }
        
        const eventosPasados = filtrarListaEventosPasados(data);

        const esSectionTres = document.getElementById("esSectionTres");
        

        pintarTarjeta(eventosPasados, esSectionTres );

        let listaCategorias = eventosPasados.filter(evento => evento.category).map(evento => evento.category).filter( (evento, indice, arrayOriginal) => indice == arrayOriginal.indexOf(evento));
        const opciones = listaCategorias.reduce( (acc, categoria) => {
            return acc += `<input class="form-check-input" type="checkbox" id="check1" name="option1" value="${categoria}">
            <label class="form-check-label">${categoria}</label>`
        }, "" );
        const $categorias = document.getElementById("categorias")
        $categorias.innerHTML = opciones;


        function filtroCategorias (lista){
            const categoriasChecked = document.querySelectorAll( 'input[type="checkbox"]:checked' )
            const arrayCategoriasChecked = Array.from(categoriasChecked).map($categorias => $categorias.value)
            console.log(arrayCategoriasChecked)
            if (arrayCategoriasChecked.length === 0){
                return lista;
            } else {
                return lista.filter(evento => arrayCategoriasChecked.includes(evento.category))
            }
            }

        const pal = document.getElementById("buscar-pal");
        
        function filtroPorTexto(lista) {
            const ingresoPal = pal.value.toLowerCase(); //texto o letra q ingresa el usuario
            const filtro = lista.filter(evento => evento.name.toLowerCase().includes(ingresoPal))
            return filtro
        }
        
        function filtroCruzado (){
            const filtrado = filtroCategorias(eventosPasados)
            return filtroPorTexto(filtrado)
        }
        $categorias.addEventListener("change", e => {
            const filtrado = filtroCruzado();
            pintarTarjeta(filtrado, esSectionTres );
        });
      
        pal.addEventListener("input", e => {
            const filtrado = filtroCruzado();
            if (filtroCruzado()==0){
                return esSectionTres.innerHTML = `<h2> There are no events matching your search </h2>`
            }
            pintarTarjeta(filtrado, esSectionTres );
        })
    })
    .catch(error => console.log(error));
}

datosViaUrl()

                                    //TASK 2

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

                                              // para Task 3:

//1) armo lista con las categorias, aplico filter para que solo guarde en listaCategorias a los eventos que tienen como condicion true la category;
//2) y luego le Aplico Map (crea un array de la misma longitud que el original pero en cada iteracion guarda lo que ejecuta dp de la flecha):
//3) Pero como la lista de categorias tiene elementos repetidos aplico nuevamente filter con la condicion de que se quede solo con los valores en que sea true la condicion de que
// el indice del array o lista original sea igual al indexOff (el primer elemento que encuentra), de esta forma se queda con el primer elemento de cada iteracion y no hay repetidos:
// siempre se ejecuta de izq a derecha y de adentro hacia afuera;
for (let evento of eventosPasados) {
    console.log (evento.category)
}

let listaCategorias = eventosPasados.filter(evento => evento.category).map(evento => evento.category).filter( (evento, indice, arrayOriginal) => indice == arrayOriginal.indexOf(evento))

console.log(listaCategorias)

//4) vamos a armar las opciones o checkbox:
// hacer uno de los siguientes para cada categoria:

/* <input class="form-check-input" type="checkbox" id="check1" name="option1" value="something" checked>
<label class="form-check-label">Option 1</label> */

//primero identifico el div contenedor donde van a estar los checkbox en el home:

const $categorias = document.getElementById("categorias")

//ahora si armamos los checkbox, de la listaCategorias quiero que arme una opcion en cada iteracion, usamos un reduce (al estilo del template generado antes):

const opciones = listaCategorias.reduce( (acc, categoria) => {
    return acc += `<input class="form-check-input" type="checkbox" id="check1" name="option1" value="${categoria}">
    <label class="form-check-label">${categoria}</label>`
}, "" )

console.log(opciones)

//ahora lo paso al HTML con la propiedad de DOM o metodo .innerHTML en el div donde puse el id "categorias":

$categorias.innerHTML = opciones

//5) agregar los eventos propiamente dichos, es decir detectar cuando cambia el cliente una de las opciones:
// para ello aplico un escuchador de eventos al contenedor (que contiene las opciones), que en este caso es $categorias:
// en target (propiedad del objeto eventos) nos dice desde donde se generó el click o el cambio  change de casilla o el evento que hayamos creado (checked):,
// es decir, si se genero de un div, section o donde y cual, lo identifica, y como dentro de ese target el value nos da la categoria al seleccionar o cambiar la
// opcion sale en consola la categoria que estamos haciendo el click, identificando el evento click;

$categorias.addEventListener("change", e => {
    const filtrado = filtroCruzado();
    pintarTarjeta(filtrado, esSectionTres );
})

//todo esto que pongo acá es lo que despues lo use para la funcion filtroCategorias, por eso en este punto solo la llamo a la funcion;
   //usar queryselectorAll y adentro el identificador es el input que tengo en el style, que le di tb estilo a cada checkbox

// const categoriasChecked = document.querySelectorAll( 'input[type="checkbox"]:checked' )
// console.log (categoriasChecked[0].value)

// console.log (e.target.value) // para que me muestre por value, por categorias, podria llegar tb a lo mismo haciendo categoriasChecked.value


//6) ahora para aparezcan los eventos en el home vamos con las funciones de crearTarjeta y pintarTarjeta; la de crear ya la tenemos, la traemos de nuevo acá, y hacemos una de
// orden superior que la incluya y al iterar (con el bucle) nos imprima todas las tarjetas de la lista que querramos pasarle, en este caso la
// nueva lista de $categorias:

function crearTarjetaConInner (evento){
    const template = `
        <div class="card text-bg-dark mb-3" style="width: 18rem;">
            <img src="${evento.image}" class="card-img-top" alt="event">
            <div class="card-body">
                <h5 class="card-title">${evento.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${evento.category}</h6>
                <p class="card-text">${evento.description}</p>
                <a href="./details.html?id=${evento._id}" class="card-link">More Info</a>
            </div>
        </div>
        `
        return template
}
//de forma generica para cualquier lista, evento seria el elemento;

function pintarTarjeta (lista, elemento){
    let templateDos = ""
    lista.forEach(evento => templateDos +=crearTarjetaConInner(evento))
    elemento.innerHTML=templateDos
}

//llamo a la funcion pintarTarjeta pasando la lista completa de mis eventos y como elemento a la seccion donde quiero que se impriman, que
// en mi caso venia usando el id esSection, del main:

pintarTarjeta(eventosPasados, esSectionTres )

//7) ahora quiero que al seleccionar una categoria me filtre los eventos (2 eventos en cada categoria), seria filtro por categoria;
// y despues vamos a tener que hacer otra funcion que filtre por el buscador, para luego hacer un ultimo filtro que es cruzado;

function filtroCategorias (lista){
    const categoriasChecked = document.querySelectorAll( 'input[type="checkbox"]:checked' )
    const arrayCategoriasChecked = Array.from(categoriasChecked).map($categorias => $categorias.value)
    console.log(arrayCategoriasChecked)
    if (arrayCategoriasChecked.length === 0){
        return lista;
    } else {
        return lista.filter(evento => arrayCategoriasChecked.includes(evento.category))
    }
    }

// 8) ahora hay que pasar al html los eventos filtrados en el punto anterior (que son las categorias que seleccionaron): lo hacemos en la linea
// 98 con  pintarTarjeta(filtrado, esSection ), filtrado es la constante que habiamos creado en la 97 con el filtro.

//9) ahora hay que filtrar lo que se ingresa por el buscador (search): primero capturar el dato que ingresa el usuario,  y
// pasarlo a minuscula; para luego realizar un filtro cruzado;


 //creamos una constante "pal" que guarda el id "buscar-pal" que puse en el input del search del past html:
const pal = document.getElementById("buscar-pal");
//aplicamos el metodo addEventListener del tipo input a pal, y ahi mismo en la funcion le paso el filtro por texto (que hice abajo), 
// y pintar las tarjetas para que las muestre en html tb, sino quedan en la consola: 
pal.addEventListener("input", e => {
    const filtrado = filtroCruzado();
    if (filtroCruzado()==0){
        return esSectionTres.innerHTML = `<h2> There are no events matching your search  </h2>`
    }
    pintarTarjeta(filtrado, esSectionTres );
})
// creo una funcion que vaya filtrando cada palabra o caracter que ingresa el usuario en input pal (lo convierto a minuscula) y lo filtro
// con la lista de eventos (los nombres de cada eventos)
function filtroPorTexto(lista) {
    const ingresoPal = pal.value.toLowerCase(); //texto o letra q ingresa el usuario
    const filtro = lista.filter(evento => evento.name.toLowerCase().includes(ingresoPal))
    return filtro
}
//ahora hay que hacer el filtro cruzado, que contenga primero aplique el filtro por categrorias y al resultado eso le haga el filtro por texto :

function filtroCruzado (){
    const filtrado = filtroCategorias(eventosPasados)
    return filtroPorTexto(filtrado)
}

// ahora vuelvo al event "change" de arriba que le aplique a mi variable $categorias (es el sector donde referencie en el html que quiero que imprima)
// que es la linea 96 y vuelvo a cambiar las funciones pero ahora con el filtro cruzado (que me incluyen los 2 filtros: por categoria y por texto ingresado en el input); 
// la linea 96 estaba asi antes de este cambio (ver los anteriores cambios tb porque empezamos solo con el evento), y esas 2 lineas de filtro cruzado (lineas 97 y 98) 
// las pego tal cual estan en el otro listener creado de input (lineas 167 y 168). EN RESUMEN ESTO HACE QUE TANTO CUANDO SE EJECUTE EL EVENTO CHANGE DE LAS 
// CATEGORIAS COMO EL EVENTO INPUT DEL TEXTO INGRESADO EN EL BUSCADOR EL FILTRO CRUZADO APLICADO EN LA FUNCION DE CADA EVENTO SEA EL MISMO, POR LO QUE
// PODREMOS ELEGIR CUALQUIER CATEGORIA POR EJ QUE NOS RETORNE LOS EVENTOS Y LUEGO SI PONEMOS UNA SOLA LETRA EN EL BUSCADOR QUE NOS ARROJE EL EVENTO QUE LA CONTIENE A ESA LETRA



// $categorias.addEventListener("change", e => {
//     const filtrado = filtroCategorias(data.events);
//     pintarTarjeta(filtrado, esSection );
// })


//10) AHORA VAMOS CON LA PARTE DE HACER EL DETALLE DE LA TARJETA (DETAILS) DE FORMA DINAMICA: pag nueva details.js