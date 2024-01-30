console.log("Inicio del programa");

const jordans = [
    { nombre: "Jordan 1", precio: 50000},
    { nombre: "Jordan 2", precio: 50000},
    { nombre: "Jordan 3", precio: 50000} 
];
console.log("Cantidad de Jordans en el array:", jordans.length);

let nombreUser = prompt("Cual es tu nombre?");
console.log("Nombre del usuario:", nombreUser);

function inicio(nombre) {
    console.log("Función inicio activada.");
    alert("Bienvenido " + nombre + " a mi pagina web, tengo 3 jordans para vender, tenemos la Jordan 1, Jordan 2 ó Jordan 3, ¿cuáles te interesan?");
}

function obtenerJordanPorNombre(nombre) {
    console.log("Función obtenerJordanPorNombre activada.");
    return jordans.find(jordan => jordan.nombre.toLowerCase() === nombre.toLowerCase());
}

function jordanFakeTrue(jordans) {
    console.log("Función jordanFakeTrue activada.");
    let montoTotalUsuario;

    do {
        montoTotalUsuario = parseInt(prompt("Ingrese el monto total que desea gastar (mínimo $50,000):"));
        console.log("Monto total del usuario:", montoTotalUsuario);

        if (montoTotalUsuario < 50000) {
            alert("El monto total debe ser igual o mayor a $50,000 para realizar la compra.");
        }
    } while (montoTotalUsuario < 50000);

    let totalCompra = 0;

    do {
        let seleccion = prompt("Ingrese el número o nombre de la Jordan que te interesa (1, 2 o 3):");
        let jordanSeleccionada;

        if (seleccion.toLowerCase() === '1' || seleccion.toLowerCase() === 'jordan 1') {
            jordanSeleccionada = jordans[0];
        } else if (seleccion.toLowerCase() === '2' || seleccion.toLowerCase() === 'jordan 2') {
            jordanSeleccionada = jordans[1];
        } else if (seleccion.toLowerCase() === '3' || seleccion.toLowerCase() === 'jordan 3') {
            jordanSeleccionada = jordans[2];
        }

        if (jordanSeleccionada) {
            totalCompra += jordanSeleccionada.precio;
            console.log("Jordan seleccionada:", jordanSeleccionada);
            alert("Perfecto, tus Jordans te llegan en 5 días hábiles, gracias! Total de compra hasta ahora: $" + totalCompra);

            if (totalCompra >= montoTotalUsuario) {
                alert("Has alcanzado o superado tu monto total. ¡Gracias por tu compra!");
                break;
            }
        } else {
            alert("La Jordan seleccionada no es válida.");
        }

        let seguirComprando = prompt("¿Quieres seguir comprando? (si/no)").toLowerCase();
        if (seguirComprando !== 'si') {
            break; // Salir del bucle si el usuario no quiere seguir comprando
        }
    } while (true);
}

inicio(nombreUser);
jordanFakeTrue(jordans);