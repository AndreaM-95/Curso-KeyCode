//INSTANCIAS
const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

//Interactivo por medio de la terminal
//Consultar el saldo
//Depositar
//Retirar
//Salir

//Cuenta
let cuenta = {
    numero: '123456789',
    propietario: 'Jefferson Pulido',
    pin: '1234',
    saldo: 50000000
};

/*
    1. Consultar saldo
    2. Depositar dinero
    3. Retirar dinero
    4. Salir
*/

/*
* @typeParam {string} pregunta: Pregunta que quiero hacerle al usuario
* @returns {string} respuesta: Dato que ingresa el usuario
* @description
* Me permite que el usuario final interactúe con la lógica, para que la lógica realice la pregunta y el usuario la responda
*/
const preguntarOpcion = (pregunta) => {
    return new Promise((resolve, reject) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
}

const iniciarSesion = async () =>{
    console.log("=== Bienvenido a su cajero automatico ===");

    const numeroIngresado = await preguntarOpcion("Digite su número de cuenta: ");
    const pinIngresado = await preguntarOpcion("Digite su PIN: ");

    if (numeroIngresado === cuenta.numero && pinIngresado === cuenta.pin) {
        console.log("Inicio de sesión exitoso.");
        rl.close();
    } else {
        console.log("Número de cuenta o PIN incorrecto.");
        rl.close();
    }
}

iniciarSesion();