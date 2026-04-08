const contenedor_dia = document.getElementById("day");
const contenedor_mes = document.getElementById("month");
const contenedor_año = document.getElementById("year");

let fecha_actual=new Date();//Fecha actual
//Determinar si el año es bisiesto
function esBisiesto(año) {
    return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
}

//Funcion pricipal del calendario
function calendario(fecha){
    contenedor_dia.innerHTML="";

    const año = fecha.getFullYear()
    const mes = fecha.getMonth()
    let dia_actual = new Date().getDate();//Dia actual
    let mes_actual = new Date().getMonth();//Mes actual
    let año_actual = new Date().getFullYear();//Año actual
    
    //Nombre de los meses
    const meses=[
        "Enero","Febrero","Marzo","Abril","Mayo","Junio",
        "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ]

    contenedor_año.innerHTML = año
    contenedor_mes.innerHTML= meses[mes]
    const mes_anterior= new Date(año, mes, 0).getDate();
    const dias = new Date(año, mes + 1, 0).getDate();

    let primerdia = new Date(año, mes, 1).getDay();
    primerdia = (primerdia + 6) % 7;

    //Determina el mes anterior y los espacios en blanco los llena con los ultimos dias del mes anterior
    for(let i = primerdia; i > 0; i--){
        const dia = document.createElement("li");
        dia.textContent = mes_anterior - i + 1;
        dia.classList.add("orden_dia", "fuera_mes");
        contenedor_dia.appendChild(dia);
    }

    //Determina el mes actual, la fecha actual y si es año bisiesto
    for(let i = 1; i <= dias; i++){
        const dia = document.createElement("li");
        dia.innerHTML= `<h5>${i}</h5>`;
        if(i == dia_actual && mes == mes_actual && año == año_actual){
            dia.classList.add("orden_dia", "dia_actual");//Agrega estilo al dia actual
        }
        
        if (esBisiesto(año) && mes === 1 && i === 29) {
            dia.classList.add("bisiesto");//agrega estilo al dia bisiesto
        }

        dia.classList.add("orden_dia");
        contenedor_dia.appendChild(dia);
    }

    const casillas = 42;
    const faltan = casillas - contenedor_dia.children.length;
    //En base a las casillas que quedan en blanco determina cuantas falta y las rellena con los dias del siguiente mes
    for(let i = 1; i<=faltan; i++){
        const dia = document.createElement("li");
        dia.textContent = i;
        dia.classList.add("orden_dia","fuera_mes");
        contenedor_dia.appendChild(dia);
    }

}

//Boton que retrocede por cada mes 
document.getElementById("prev-month").addEventListener("click", ()=>{
    fecha_actual.setMonth(fecha_actual.getMonth() -1);
    calendario(fecha_actual)
});
//Boton que avanza por cada mes 
document.getElementById("next-month").addEventListener("click", ()=>{
    fecha_actual.setMonth(fecha_actual.getMonth() +1);
    calendario(fecha_actual)
});

calendario(fecha_actual)

function guardado(){
    const mensaje = document.getElementById("saludo");
    let nombre = localStorage.getItem("nombre");
    
    if(!nombre){
        nombre = prompt("¿Cuál es tu nombre?");
        localStorage.setItem("nombre", nombre);
    }

    mensaje.textContent= "Hola "+ nombre + " ¡Bienvenido!"
}

function borrarnombre(){
    localStorage.removeItem("nombre");
    location.reload();
}

guardado()

let infantil = false;

const modo= document.getElementById("modo-btn");

modo.addEventListener("click", () => {
    infantil = !infantil;

    // alterna la clase en TODO el calendario
    document.querySelector(".calendar").classList.toggle("infantil");

    if(infantil){
        botonModo.textContent = "Modo normal";
    }else{
        botonModo.textContent = "Modo infantil";
    }
});