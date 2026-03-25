const contenedor_dia = document.getElementById("day");
const contenedor_mes = document.getElementById("month");
const contenedor_año = document.getElementById("year");

let fecha_actual=new Date();

function esBisiesto(año) {
    return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
}

function calendario(fecha){
    contenedor_dia.innerHTML="";

    const año = fecha.getFullYear()
    const mes = fecha.getMonth()
    let dia_actual = new Date().getDate();
    let mes_actual = new Date().getMonth();
    let año_actual = new Date().getFullYear();
    

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


    for(let i = primerdia; i > 0; i--){
        const dia = document.createElement("li");
        dia.textContent = mes_anterior - i + 1;
        dia.classList.add("orden_dia", "fuera_mes");
        contenedor_dia.appendChild(dia);
    }


    for(let i = 1; i <= dias; i++){
        const dia = document.createElement("li");
        dia.innerHTML= `<h5>${i}</h5>`;
        if(i == dia_actual && mes == mes_actual && año == año_actual){
            dia.classList.add("orden_dia", "dia_actual");
        }
        
        if (esBisiesto(año) && mes === 1 && i === 29) {
            dia.classList.add("bisiesto");
        }

        dia.classList.add("orden_dia");
        contenedor_dia.appendChild(dia);
    }

    const casillas = 42;
    const faltan = casillas - contenedor_dia.children.length;

    for(let i = 1; i<=faltan; i++){
        const dia = document.createElement("li");
        dia.textContent = i;
        dia.classList.add("orden_dia","fuera_mes");
        contenedor_dia.appendChild(dia);
    }

}


document.getElementById("prev-month").addEventListener("click", ()=>{
    fecha_actual.setMonth(fecha_actual.getMonth() -1);
    calendario(fecha_actual)
});

document.getElementById("next-month").addEventListener("click", ()=>{
    fecha_actual.setMonth(fecha_actual.getMonth() +1);
    calendario(fecha_actual)
});

calendario(fecha_actual)




