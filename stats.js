

function datosViaUrl(){
    const conseguirDatos = fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data =>{
        let listaAsistenciaSobreCapacidad = data.events.map(evento => {
            let aux = Object.assign({}, evento) // creo una nueva propiedad llamada percentage
            aux.percentage = (evento.assistance)/(evento.capacity)
            return aux})
            .filter(evento => evento.percentage)
        console.log(listaAsistenciaSobreCapacidad)

        let listaOrdenadaParaMaxMin = listaAsistenciaSobreCapacidad.sort((a,b) => (b.percentage - a.percentage));
        console.log(listaOrdenadaParaMaxMin);

        let percentageMax = listaOrdenadaParaMaxMin.slice(0,1)
        console.log(percentageMax)
        
        let percentageMin = listaOrdenadaParaMaxMin.slice(-1)
        console.log(typeof(percentageMin))
        
        let listaCapacidad = data.events.filter(evento => 
        evento.capacity)
        console.log(listaCapacidad)

        let listaOrdenadaParaCapacidad = listaCapacidad.sort((a,b) => (b.capacity - a.capacity));
        console.log(listaOrdenadaParaCapacidad);

        let capacidadMaxima = listaOrdenadaParaCapacidad.slice(0,1)
        console.log(capacidadMaxima)

        // para la SEGUNDA tabla de upcoming events (6 categorias de eventos):

        function filtrarListaEventosFuturos (lista){
            let evPas = [];
            for (let evento of data.events){
                if (evento.date > lista.currentDate){
                    evPas.push(evento);
                }
            } return evPas;
        }
        
        const eventosFuturos = filtrarListaEventosFuturos(data);

        let listaCategorias = eventosFuturos.filter(evento => evento.category)
        .map(evento => evento.category)
        .filter( (evento, indice, arrayOriginal) => indice == arrayOriginal.indexOf(evento))
        console.log(listaCategorias)

//para sacar los revenues de los eventos futuros (19 en total)
        let listaCategoriaRevenuesFuturos = eventosFuturos.map(evento => {
            let aux = Object.assign({}, evento)
            aux.revenue = (evento.estimate)*(evento.price)
            return aux})
            .filter(evento => evento.revenue)
        console.log(listaCategoriaRevenuesFuturos) 


        //para filtrar los eventos por cada categoria:

        let listaFood= listaCategoriaRevenuesFuturos.filter(evento => evento.category==="Food")
        console.log(listaFood)

        let listaBooks= listaCategoriaRevenuesFuturos.filter(evento => evento.category==="Books")
        console.log(listaBooks)

        let listaParty= listaCategoriaRevenuesFuturos.filter(evento => evento.category==="Party")
        console.log(listaParty)

        let listaRace= listaCategoriaRevenuesFuturos.filter(evento => evento.category==="Race")
        console.log(listaRace)

        let listaConcert= listaCategoriaRevenuesFuturos.filter(evento => evento.category==="Concert")
        console.log(listaConcert)

        let listaMuseum= listaCategoriaRevenuesFuturos.filter(evento => evento.category==="Museum")
        console.log(listaMuseum)

    // para obtener los revenues de cada categoria

        const booksRevenue = listaBooks.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(booksRevenue)

        const partyRevenue = listaParty.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(partyRevenue)

        const raceRevenue = listaRace.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(raceRevenue)

        const concertRevenue = listaConcert.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(concertRevenue)

        const museumRevenue = listaMuseum.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(museumRevenue)

    // Ahora tengo que obtener el porcentage de asistencia /estimacion por categoria de eventos futuros (Capacidad total de las 6 categorias = )

    const capacidadTotalFuturos = eventosFuturos.reduce( (acc, evento) => acc + evento.capacity, 0 )
    console.log(capacidadTotalFuturos)

    // para sacar los porcentages de asistencia de los eventos futuros (que son estimaciones para los 19 eventos, 
    //calculado en base a la capacidad total)
    let listaCategoriaEstimadosFuturos = eventosFuturos.map(evento => {
        let aux = Object.assign({}, evento)
        aux.estimatePercentage = ((evento.estimate)/(capacidadTotalFuturos))*100
        return aux})
        .filter(evento => evento.estimatePercentage)
    console.log(listaCategoriaEstimadosFuturos) 

    //ahora hay que sumar los porcentajes esos por cada categoria

    let listaFoodPer= listaCategoriaEstimadosFuturos.filter(evento => evento.category==="Food")
    console.log(listaFoodPer)

    let listaBooksPer= listaCategoriaEstimadosFuturos.filter(evento => evento.category==="Books")
    console.log(listaBooksPer)

    let listaPartyPer= listaCategoriaEstimadosFuturos.filter(evento => evento.category==="Party")
    console.log(listaPartyPer)

    let listaRacePer= listaCategoriaEstimadosFuturos.filter(evento => evento.category==="Race")
    console.log(listaRacePer)

    let listaConcertPer= listaCategoriaEstimadosFuturos.filter(evento => evento.category==="Concert")
    console.log(listaConcertPer)

    let listaMuseumPer= listaCategoriaEstimadosFuturos.filter(evento => evento.category==="Museum")
    console.log(listaMuseumPer)

        // para obtener los estimatePercentage de cada categoria

        const booksEstimatePercentage = listaBooksPer.reduce( (acc, evento) => acc + evento.estimatePercentage, 0 )
        console.log(booksEstimatePercentage)

        const partyEstimatePercentage = listaPartyPer.reduce( (acc, evento) => acc + evento.estimatePercentage, 0 )
        console.log(partyEstimatePercentage)

        const raceEstimatePercentage = listaRacePer.reduce( (acc, evento) => acc + evento.estimatePercentage, 0 )
        console.log(raceEstimatePercentage)

        const concertEstimatePercentage = listaConcertPer.reduce( (acc, evento) => acc + evento.estimatePercentage, 0 )
        console.log(concertEstimatePercentage)

        const museumEstimatePercentage = listaMuseumPer.reduce( (acc, evento) => acc + evento.estimatePercentage, 0 )
        console.log(museumEstimatePercentage)


        // para la TERCERA tabla de past events (7 categorias de eventos):

        function filtrarListaEventosPasados (lista){
            let evPas = [];
            for (let evento of data.events){
                if (evento.date < lista.currentDate){
                    evPas.push(evento);
                }
            } return evPas;
        }
        
        const eventosPasados = filtrarListaEventosPasados(data);

        let listaCategoriasPasados = eventosPasados.filter(evento => evento.category)
        .map(evento => evento.category)
        .filter( (evento, indice, arrayOriginal) => indice == arrayOriginal.indexOf(evento))
        console.log(listaCategoriasPasados)

        //para sacar los revenues de los eventos pasados (18 en total)
        let listaCategoriaRevenuesPasados = eventosPasados.map(evento => {
            let aux = Object.assign({}, evento)
            aux.revenue = (evento.assistance)*(evento.price)
            return aux})
            .filter(evento => evento.revenue)
        console.log(listaCategoriaRevenuesPasados) 

        //para filtrar los eventos por cada categoria:

            let listaFoodPas= listaCategoriaRevenuesPasados.filter(evento => evento.category==="Food")
            console.log(listaFoodPas)

            
            let listaMuseumPas= listaCategoriaRevenuesPasados.filter(evento => evento.category==="Museum")
            console.log(listaMuseumPas)

            let listaConcertPas= listaCategoriaRevenuesPasados.filter(evento => evento.category==="Concert")
            console.log(listaConcertPas)

            let listaRacePas= listaCategoriaRevenuesPasados.filter(evento => evento.category==="Race")
            console.log(listaRacePas)

            let listaBooksPas= listaCategoriaRevenuesPasados.filter(evento => evento.category==="Books")
            console.log(listaBooksPas)

            let listaCinemaPas= listaCategoriaRevenuesPasados.filter(evento => evento.category==="Cinema")
            console.log(listaCinemaPas)

            let listaPartyPas= listaCategoriaRevenuesPasados.filter(evento => evento.category==="Party")
            console.log(listaPartyPas)




                // para obtener los revenues de cada categoria

        const foodsRevenuePas = listaFoodPas.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(foodsRevenuePas)

        const museumRevenuePas = listaMuseumPas.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(museumRevenuePas)

        const concertRevenuePas = listaConcertPas.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(concertRevenuePas)

        const raceRevenuePas = listaRacePas.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(raceRevenuePas)

        const booksRevenuePas = listaBooksPas.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(booksRevenuePas)

        const cinemaRevenuePas = listaCinemaPas.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(cinemaRevenuePas)

        const partyRevenuePas = listaPartyPas.reduce( (acc, evento) => acc + evento.revenue, 0 )
        console.log(partyRevenuePas)

        // Ahora tengo que obtener el porcentage de asistencia /estimacion por categoria de eventos futuros (Capacidad total de las 6 categorias = )

    const capacidadTotalPasados = eventosPasados.reduce( (acc, evento) => acc + evento.capacity, 0 )
    console.log(capacidadTotalPasados)

    // para sacar los porcentages de asistencia de los eventos pasados (que son asistencias para los 18 eventos, 
    //calculado en base a la capacidad total)

    let listaCategoriaEstimadosPasados = eventosPasados.map(evento => {
        let aux = Object.assign({}, evento)
        aux.assistancePercentage = ((evento.assistance)/(capacidadTotalPasados))*100
        return aux})
        .filter(evento => evento.assistancePercentage)
    console.log(listaCategoriaEstimadosPasados) 

    //ahora hay que sumar los porcentajes esos por cada categoria

    let listaFoodPerPas= listaCategoriaEstimadosPasados.filter(evento => evento.category==="Food")
    console.log(listaFoodPerPas)
    
    let listaMuseumPerPas= listaCategoriaEstimadosPasados.filter(evento => evento.category==="Museum")
    console.log(listaMuseumPerPas)

    let listaConcertPerPas= listaCategoriaEstimadosPasados.filter(evento => evento.category==="Concert")
    console.log(listaConcertPerPas)

    let listaRacePerPas= listaCategoriaEstimadosPasados.filter(evento => evento.category==="Race")
    console.log(listaRacePerPas)

    let listaBooksPerPas= listaCategoriaEstimadosPasados.filter(evento => evento.category==="Books")
    console.log(listaBooksPerPas)

    let listaCinemaPerPas= listaCategoriaEstimadosPasados.filter(evento => evento.category==="Cinema")
    console.log(listaCinemaPerPas)

    let listaPartyPerPas= listaCategoriaEstimadosPasados.filter(evento => evento.category==="Party")
    console.log(listaPartyPerPas)



        // para obtener los estimatePercentage de cada categoria

        const foodsEstimatePercentagePas = listaFoodPerPas.reduce( (acc, evento) => acc + evento.assistancePercentage, 0 )
        console.log(foodsEstimatePercentagePas)

        const museumEstimatePercentagePas = listaMuseumPerPas.reduce( (acc, evento) => acc + evento.assistancePercentage, 0 )
        console.log(museumEstimatePercentagePas)

        const concertEstimatePercentagePas = listaConcertPerPas.reduce( (acc, evento) => acc + evento.assistancePercentage, 0 )
        console.log(concertEstimatePercentagePas)

        const raceEstimatePercentagePas = listaRacePerPas.reduce( (acc, evento) => acc + evento.assistancePercentage, 0 )
        console.log(raceEstimatePercentagePas)

        const booksEstimatePercentagePas = listaBooksPerPas.reduce( (acc, evento) => acc + evento.assistancePercentage, 0 )
        console.log(booksEstimatePercentagePas)

        const cinemaEstimatePercentagePas = listaCinemaPerPas.reduce( (acc, evento) => acc + evento.assistancePercentage, 0 )
        console.log(cinemaEstimatePercentagePas)

        const partyEstimatePercentagePas = listaPartyPerPas.reduce( (acc, evento) => acc + evento.assistancePercentage, 0 )
        console.log(partyEstimatePercentagePas)





// intento de bucle:
            // for (let evento of listaCategoriaRevenues ){
            //     let revenue = 0;
            //     if (evento.category === "Food"){
            //         let x = evento.revenue 
            //         console.log(x)
            //         revenueFood += x
            //         console.log(revenueFood)
            //         return revenueFood
                    
            //     } else if (evento.category === "Books"){
            //         let x = evento.revenue 
            //         console.log(x)
            //         revenueFood += x
            //         console.log(revenueFood)
            //         return revenueFood
            // }  


// creamos desde aca las 3 tablas y las pasamos al html usando DOM:


        function crearTablaUnoConInner (evento){
            const template = `
            
            <thead>
                <tr>
                    <th scope="row" colspan="3">Events Statistics</th>
                </tr>
                <tr>
                    <th scope="col">Event with the highest percentage of attendance</th>
                    <th scope="col">Event with the lowest percentage of attendance</th>
                    <th scope="col">Event with larger capacity</th>
                </tr>
            </thead>
            <tbody>
                <tr> 
                <td>${percentageMax[0].name}</td>
                <td> ${percentageMin[0].name}</td>
                <td> ${capacidadMaxima[0].name}</td>
                </tr>
            </tbody>

            `
            return template
        }

        
        const tablaUno = document.getElementById("tablaUno")
        tablaUno.innerHTML=crearTablaUnoConInner();
        
        function crearTablaDosConInner (evento){
            const template = `
            
            <thead>
                <tr>
                    <th scope="row" colspan="3">Upcoming events statistics by category</th>
                </tr>
                <tr>
                    <th scope="col">Categories</th>
                    <th scope="col">Revenues</th>
                    <th scope="col">Percentage of attendance</th>
                </tr>
            </thead>
            
            <tbody>
            <tr> 
                <td>${listaCategorias[0]}</td>
                <td>${listaFood[0].revenue}</td>
                <td>${listaFoodPer[0].estimatePercentage}</td>
            </tr>
            <tr> 
                <td>${listaCategorias[1]}</td>
                <td>${booksRevenue}</td>
                <td>${booksEstimatePercentage}</td>
            </tr>
            <tr> 
                <td>${listaCategorias[2]}</td>
                <td>${partyRevenue}</td>
                <td>${partyEstimatePercentage}</td>
            </tr>
            <tr> 
                <td>${listaCategorias[3]}</td>
                <td>${raceRevenue}</td>
                <td>${raceEstimatePercentage}</td>
            </tr>
            <tr> 
                <td>${listaCategorias[4]}</td>
                <td>${concertRevenue}</td>
                <td>${concertEstimatePercentage}</td>
            </tr>
            <tr> 
                <td>${listaCategorias[5]}</td>
                <td>${museumRevenue}</td>
                <td>${museumEstimatePercentage}</td>
            </tr>  
            </tbody>

            `
            return template
        }

        const tablaDos = document.getElementById("tablaDos")
        tablaDos.innerHTML=crearTablaDosConInner();

        //intento de imprimir las filas para la tabla 2 dinamicamente como habiamos hecho con las categorías:
        // const catTabla = listaCategorias.reduce( (acc, categoria) => {
        // return acc += `<tr> 
        // <td> ${category}</td>
        // <td> ${revenue}</td>
        // <td> ${percentage}</td>
        // </tr>`
        // }, "" );


        function crearTablaTresConInner (evento){
            const template = `
            <thead>
                <tr>
                    <th scope="row" colspan="3">Past events statistics by category</th>
                </tr>
                <tr>
                    <th scope="col">Categories</th>
                    <th scope="col">Revenues</th>
                    <th scope="col">Percentage of attendance</th>
                </tr>
            </thead>
            <tbody>
            <tr> 
                <td>${listaCategoriasPasados[0]}</td>
                <td>${foodsRevenuePas}</td>
                <td>${foodsEstimatePercentagePas}</td>
            </tr>
            <tr> 
                <td>${listaCategoriasPasados[1]}</td>
                <td>${museumRevenuePas}</td>
                <td>${museumEstimatePercentagePas}</td>
            </tr>
            <tr> 
                <td>${listaCategoriasPasados[2]}</td>
                <td>${concertRevenuePas}</td>
                <td>${concertEstimatePercentagePas}</td>
            </tr>
            <tr> 
                <td>${listaCategoriasPasados[3]}</td>
                <td>${raceRevenuePas}</td>
                <td>${raceEstimatePercentagePas}</td>
            </tr>
            <tr> 
                <td>${listaCategoriasPasados[4]}</td>
                <td>${booksRevenuePas}</td>
                <td>${booksEstimatePercentagePas}</td>
            </tr>
            <tr> 
                <td>${listaCategoriasPasados[5]}</td>
                <td>${cinemaRevenuePas}</td>
                <td>${cinemaEstimatePercentagePas}</td>
            </tr> 
            <tr> 
            <td>${listaCategoriasPasados[6]}</td>
            <td>${partyRevenuePas}</td>
            <td>${partyEstimatePercentagePas}</td>
            </tr>   
            </tbody>
    
                `
                return template
        }
        const tablaTres = document.getElementById("tablaTres")
        tablaTres.innerHTML=crearTablaTresConInner();



    })
    .catch(error => console.log(error));
}


datosViaUrl()



