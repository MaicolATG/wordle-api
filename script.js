let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH']
let palabra;

const button = document.getElementById("guess-button");
button.addEventListener('click', intentar);

const endpoint = "https://random-word-api.herokuapp.com/word?length=5";

fetch(endpoint).then((response) => {
    response.json().then((data) => {
        console.log(data[0]);
        palabra = data[0].toUpperCase();
    });
});

function getWord(){
    let min = 0;
    let max = diccionario.length;
    let i = Math.floor(Math.random() * (max - min)) + min;
    return diccionario[i];
}

function intentar(){
    const INTENTO = leerIntento();
    console.clear();
    console.log(palabra);
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    const ERROR = document.getElementById("error");
    ROW.className="row";
    if(INTENTO.length !== 5){
        ERROR.innerHTML = "* La palabra debe de ser de 5 letras *";
        ERROR.style.display = "block";
    } else {
        ERROR.style.display = "none";
        for (let i in palabra){
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            if (INTENTO[i] === palabra[i]){ //VERDE
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#16db65';
            } else if(palabra.includes(INTENTO[i])) { //AMARILLO
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#ffd449';
            } else { //GRIS
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#a4aec4';
            }
            ROW.appendChild(SPAN);
        }
        GRID.appendChild(ROW);

        if (INTENTO === palabra ) {
            terminar("<h1>GANASTE!😀</h1>");
            return;
        }
        intentos--;
        if (intentos == 0){
            terminar("<h1>PERDISTE!😖</h1>");
            return;
        }
    }
}

function leerIntento(){
    let intento = document.getElementById("guess-input").value;
    return intento.toUpperCase(); 
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    button.innerHTML = "Reintentar";
    button.style.backgroundColor = '#16db65';
    button.disabled = false;
    button.removeEventListener('click', intentar);
    button.addEventListener('click', () => location.reload());
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}