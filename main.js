//Creo una clase y objeto cripto para poder usar el fetch 
class cripto{
    constructor(symbol, precio){
        this.symbol= symbol;
        this.precio = precio;

    }
}
var criptos= [];
//Llamo a la Api de binance
fetch ('https://api.binance.com/api/v3/ticker/price')
.then(response => response.json())
.then(response => {
    for(const crip of response){
        criptos.push(new cripto(crip.symbol, crip.price));

    }
    //Localstorage pasando a string y luego a objet. 
    function savecripto(critpos){
    localStorage.setItem("criptos", JSON.stringify(criptos));
    }
    function chargecripto(){
    return JSON.parse(localStorage.getItem(criptos));
    }
    console.log(criptos);
savecripto();
chargecripto();
    //Utilizo Find para filtrar el array

var btccripto = criptos.find(element =>{
    return element.symbol === "BTCUSDT";
    
    
})
ethcripto = criptos.find(element =>{
    return element.symbol === "ETHUSDT";
    
});
// console.log(btccripto);
// console.log(ethcripto);
//Funcion para cambiar el value del select de index.html
function changeContent(id, new_value){
    var opt= document.getElementById('eleccion').options[id];
    opt.value =  new_value;
} 
changeContent(0, btccripto.precio);
changeContent(1, ethcripto.precio);

//Editando el valor de las cards del index, para que se muestre el precio actualizado dia a dia
function cardmaking(){
    cardbtc = document.getElementById ("btccard");
    cardbtc.innerHTML = `<h6>El valor del BTC actual es de ${btccripto.precio}</h6>`
    
}
cardmaking();
function cardmakingeth(){
    cardbtc = document.getElementById ("ethcard");
    cardbtc.innerHTML = `<h6>El valor del ETH actual es de ${ethcripto.precio} </h6>`
    
}
cardmakingeth();
function cardmakingusd(){
    cardbtc = document.getElementById ("usdcard");
    cardbtc.innerHTML = `<h6>El valor del USD es de ${usdfijo.precio} Pesos Args</h6>`
    
}
// hago un array aparte para el precio del dolar a peso argentino.
const monedas = [
    {id:3, nombre:"USD", precio: 200,}   
]
function savemonedasLS(monedas){
    localStorage.setItem("monedas", JSON.stringify(monedas));
}
function cargarmonedasLS(){
    return JSON.parse(localStorage.getItem("monedas"));
}
//Uso find para poder extraer la variable precio dentro del objeto. 
usdfijo = monedas.find(element => {
return element.id === 3;
});
cardmakingusd();

// Aca comienza el listenevent del boton del index, segun la moneda que se elige arbitrar.

let boton = document.getElementById("boton");
boton.onclick = () => {
    const ele = document.getElementById("eleccion");
    const mony = parseFloat(ele.options[ele.selectedIndex].value); 
    

    //Primer eleccion BTC
    if(ele.selectedIndex == [0]){
        let dived = document.getElementById("pedit");
        dived.innerHTML = "";
        let btcbody = document.createElement("form");
        btcbody.innerHTML = "<label for='cantidadbtc' class='me-4'>Ingrese Cantidad de BTC : </label>" +
                            "<input type='number' id='cantbtc' placeholder= 'Cantidad BTC' class='form-control shadow p-3 mb-5 bg-body rounded'><br>" +
                            "<label for='valorcompra' class='me-4'>Ingrese Valor de compra:</label>" +
                            "<input type='number' id='valuebtcbuy' name='lname' placeholder='Valor compra' class= 'mt-2 form-control shadow p-3 mb-5 bg-body rounded'></input><br>" + 
                            "<button type='button' value='Calcular Arbitraje' id='bot' class='btn btn-light mt-2'>Calcular</button>";
        pedit.appendChild(btcbody);
        let button = document.getElementById("bot");
        button.onclick = () => {
            var resultusd = (mony * document.getElementById("cantbtc").value) - (document.getElementById("cantbtc").value* document.getElementById("valuebtcbuy").value);
        changetoarg();
        
        
        // se da la opcion de pasar el resultado del arbitraje a pesos !
        function changetoarg (){
            let nuevodiv = document.getElementById("pedit");
            nuevodiv.innerHTML = `<h1> Su arbitraje obtuvo la diferencia de $${resultusd} </h1> <br>
            <div>
            <h6 class="display-6"> Queres pasarlo a pesos? </h6>
            <select id="elect" class="form-select d-flex justify-content-center">
            <option value="0">Si</option>
            <option value="0">No</option>
            </select></div>
            <button type='button' value='pasar a pesos' id='pesosarg' class='btn btn-light mt-2'>Cambiar Valor</button>` 
            let bott = document.getElementById("pesosarg");
            bott.onclick = () => {
            let eleccion = document.getElementById("elect");    
            if(eleccion.selectedIndex == [0]){
            const pasar_pesos = (resultusd*usdfijo.precio);
            let leyend = document.createElement("div");
            leyend.innerHTML = `<h6 class="display-6"> Su arbitraje a pesos tiene un valor de: $${pasar_pesos} Pesos Argentinos </h6><br>
            <a href="" script= "location.reload()">Volver al incio</a>`
            nuevodiv.appendChild(leyend);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Gracias por visitarnos',
                showConfirmButton: false,
                timer: 1500
            })
            }else if(eleccion.selectedIndex == [1]){
                let negativebody = document.getElementById("pedit");
                negativebody.innerHTML = `<h6 class="display-6"> Su arbitraje final en dolares es: $${resultusd}</h6><br>
                <a href="" script= "location.reload()">Volver al incio</a>`
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Gracias por visitarnos',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                alert("Respuesta invalida");
            } 
        }
        } 
    }


//Segunda opcion ETH 

}else if(ele.selectedIndex == [1]){
    let dived = document.getElementById("pedit");
        dived.innerHTML = "";
        let ethbody = document.createElement("form");
        ethbody.innerHTML = "<label for='cantidadbtc'>Ingrese Cantidad de ETH</label>" +
                            "<input type='number' id='canteth' placeholder='Cantidad de ETH' class='form-control shadow mb-5 bg-body rounded'><br>" +
                            "<label for='valorcompra'>Ingrese Valor de compra:</label>" +
                            "<input type='number' id='valueethbuy' name='lname' placeholder='Precio de compra' class='form-control shadow  mb-5 bg-body rounded'></input><br>" + 
                            "<button type='button' value='Calcular Arbitraje' id='bot' class='btn btn-light mt-2'>Calcular</button>";
        dived.appendChild(ethbody);
        let button = document.getElementById("bot");
        button.onclick = () => {
            var resultusd = (mony * document.getElementById("canteth").value) - (document.getElementById("canteth").value* document.getElementById("valueethbuy").value);
            changetoarg();
        // Se da la opcion de pasar el resultado del arbitraje a pesos
            function changetoarg (){
            let nuevobody = document.getElementById("pedit");
            nuevobody.innerHTML = `<h6 class="display-6"> Su arbitraje obtuvo la diferencia de $${resultusd} </h6> <br>
            <div>
            <h6 class="display-6"> Queres pasarlo a pesos? </h6>
            <select id="elect" class="form-select d-flex justify-content-center">
            <option value="0">Si</option>
            <option value="0">No</option>
            </select></div>
            <button type='button' value='pasar a pesos' id='pesosarg' class='btn btn-light mt-2'>Cambiar Valor</button>` 
            let bott = document.getElementById("pesosarg");
            bott.onclick = () => {
            let eleccion = document.getElementById("elect");
            if(eleccion.selectedIndex == [0]){
                const pasar_pesos = (resultusd*usdfijo.precio);
                let leyend = document.createElement("div");
                leyend.innerHTML = `<h6 class="display-6"> Su arbitraje a pesos tiene un valor de: $${pasar_pesos} Pesos Argentinos</h6> <br>
                <a href="" script= "location.reload()">Volver al incio</a>`
                nuevobody.appendChild(leyend);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Gracias por visitarnos',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(eleccion.selectedIndex == [1]){
                let negativebody = document.getElementById("pedit");
                negativebody.innerHTML = `<h6 class="display-6"> Su arbitraje final en dolares es: $${resultusd}</h6><br>
                <a href="" script= "location.reload()">Volver al incio</a>`
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Gracias por visitarnos',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                alert("Respuesta invalida");
            }
        }
    }
            
        }


// Tercera opcion arbitraje en dolares. 
}else if (ele.selectedIndex == [2]){  
    let body = document.getElementById("pedit");
        body.innerHTML = "";
        let usdbody = document.createElement("form");
        usdbody.innerHTML = "<label for='cantidusd'>Ingrese cantidad de dolares comprados</label>" +
                            "<input type='number' id='cantusd' placeholder='Cantidad de USD' class='form-control shadow mb-5 bg-body rounded'><br>" +
                            "<label for='valorcompra'>Ingrese Valor de compra:</label>" +
                            "<input type='number' id='valueusdbuy' name='lname' placeholder= 'Precio compra en pesos' class='form-control shadow mb-5 bg-body rounded'></input><br>" + 
                            "<button type='button' value='Calcular Arbitraje' id='bot' class='btn btn-light mt-2'>Calcular</button>";
                            body.appendChild(usdbody);
        let button = document.getElementById("bot");
        button.onclick = () => {
            let evaluacion = document.createElement("div")
            evaluacion.innerHTML = `Usted compro ${document.getElementById("cantusd").value} a ${document.getElementById("valueusdbuy").value}`
            body.appendChild(evaluacion);
            var resultpesos = (mony * document.getElementById("cantusd").value) - (document.getElementById("cantusd").value* document.getElementById("valueusdbuy").value);
        changecripto();   
    
        // Se da la opcion de cambiar el resultado en pesos a alguna cripto, sea btc o eth. 
        function changecripto (){
            var usdss = document.getElementById("cantusd").value;
            let nuevobody = document.getElementById("pedit");
            nuevobody.innerHTML = `<h1> Su compra de ${usdss} obtuvo la diferencia de $${resultpesos} Pesos Argentinos </h1> <br>
            <div>
            <h6 class="display-6"> Queres pasarlo a alguna Cripto?</h6>
            <select id="electcript" class="form-select d-flex justify-content-center"">
            <option value="0">BTC</option>
            <option value="0">ETH</option>
            </select></div>
            <button type='button' value='pasar a pesos' id='pasarcripto' class='btn btn-light mt-2'>Cambiar Valor</button>
            <a href="" script= "location.reload()">Volver</a>` 
            let bott = document.getElementById("pasarcripto");
            bott.onclick = () => {
            if(electcript.selectedIndex == [0]){
                const pasar_btc = usdss / btccripto.precio;
                let leyend = document.createElement("div");
                leyend.innerHTML = `<h6 class="display-6"> Su pasaje a BTC tiene un valor de: ${pasar_btc} BitCoins </h6> <br> <br>
                <a href="" script= "location.reload()">Volver al incio</a>`
                nuevobody.appendChild(leyend);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Gracias por visitarnos',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (electcript.selectedIndex == [1]) {
                const pasar_eth = usdss / (ethcripto.precio);
                let leyend = document.createElement("div");
                leyend.innerHTML = `<h6> Su pasaje a ETH tiene un valor de: ${pasar_eth} Ethereum's </h6> <br>
                <a href="" script= "location.reload()">Volver al incio</a>`
                nuevobody.appendChild(leyend);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Gracias por visitarnos',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }
}     
}   
};    
})
