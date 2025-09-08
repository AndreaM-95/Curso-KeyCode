// FORMA BÁSICA
const numero = 10

if (isNaN(numero)) {
    console.log("Entrada invalida, no es un numero");
} else if (numero % 2 === 0) {
    console.log("Es par");
} else {
    console.log("Es impar");
}

//USO DE CONSOLA
const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Escribe un numero: ", (n) => {
    const numero = Number(n);

    if (isNaN(numero)) {
        console.log("Entrada invalida, no es un numero");
    } else if (numero % 2 === 0) {
        console.log("Es par");
    } else {
        console.log("Es impar");
    }

    rl.close();
});

// SWITCH
const option = 2;
switch (option) {
    case 1:
        console.log("Medicina general");
        break;
    case 2:
        console.log("Odontologia");
        break;
    case 3:
        console.log("Psicologia");
        break;
    default:
        console.log("Esa opcion no existe en este hospital");
        break;
}

// CICLOS
// For -> Cuando sabemos cuantas veces se va a repetir
for (let index = 0; index <= 5; index++) {
    console.log(`Vuelta numero: ${index}`); //Template String ${variable o expresion}
}

// While -> Repitase mientras se cumpla la condicion
//EJ: Con una contraseña, intente 3 veces ingresar la contraseña correcta y si no, bloquee la cuenta
let contador = 1;
while (contador <= 10) {
    console.log(`Vamos en el numero: ${contador}`)
    contador++;
}

// EJERCICIO TABLA DE MULTIPLICAR
let base = 7;
let indice = 1;

while (indice <= 10) {
    console.log(`${base} x ${indice} = ${base * indice}`);
    indice++;
}
