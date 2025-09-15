//Instancias
const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Cuentas disponibles
let cuentas = [
    {
        numero: "101",
        propietario: "Jefferson",
        pin: "1234",
        saldo: 50000000,
    },
    {
        numero: "102",
        propietario: "Andrea",
        pin: "5678",
        saldo: 98000000,
    },
    {
        numero: "103",
        propietario: "Paola",
        pin: "9876",
        saldo: 105000000,
    },
    {
        numero: "104",
        propietario: "Melissa",
        pin: "4321",
        saldo: 0,
    },
];

// Cuenta logueada
let cuentaActiva = null;


/**
 *
 * @typeParam {string} pregunta: Solicitud de consola al usuario final
 * @returns  {string} respuesta: Dato que ingresa el usuario
 * @description
 * Permite que el usuario final interactúe con la consola, para que la lógica realice la pregunta y el usuario la responda
 */
const preguntar = (pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
};

/**
 *
 * @returns  {string} respuesta: Dato que ingresa el usuario dentro del switch
 * @description
 * Permite que el usuario final interactúe con la consola, según la opción que elija en el menú, se ejecutará una acción u otra
 */
const menu = async () => {
    console.log("\n===== MENU ===== ");
    console.log(`Usuario: ${cuentaActiva.propietario} | Cuenta: ${cuentaActiva.numero}`);
    console.log("1. Consultar saldo");
    console.log("2. Depositar dinero");
    console.log("3. Retirar dinero");
    console.log("4. Cerrar Sesion");
    console.log("5. Salir\n");

    const opcionIngresada = await preguntar("Selecciona una opcion: ");

    switch (opcionIngresada) {
        case "1":
            console.clear();
            console.log("===== Consulta de saldo =====");
            console.log(`\n💵 Tu saldo actual es: $${cuentaActiva.saldo}`);
            break;

        case "2":
            console.clear();
            console.log("===== Depositar dinero =====");
            const valorDeposito = Number(
                await preguntar("Monto a depositar: ")
            );

            if (valorDeposito > 0) {
                cuentaActiva.saldo += valorDeposito;
                console.log(`✅ Deposito exitoso. Su nuevo saldo es: $${cuentaActiva.saldo}`);
            } else {
                console.log("⚠️ Monto invalido");
            }
            break;

        case "3":
            console.clear();
            console.log("===== Retirar dinero =====");
            const valorRetiro = Number(await preguntar("Monto a retirar: "));

            if (valorRetiro > 0 && valorRetiro <= cuentaActiva.saldo) {
                cuentaActiva.saldo -= valorRetiro;
                console.log(`✅ Retiro exitoso. Su nuevo saldo es: $${cuentaActiva.saldo}`);
            } else {
                console.log("⚠️ Fondos insuficientes o Monto invalido");
            }
            break;

        case "4":
            console.clear();
            console.log("===== Sesion cerrada, ¡Hasta luego! =====");
            cuentaActiva === null;
            return iniciar();

        case "5":
            console.log("===== Gracias por usar el cajero, ¡Hasta luego! =====");
            rl.close();
            return;

        default:
            console.log("❌ Opcion no valida");
            break;
    }

    menu();
};

const iniciar = async () => {
    console.clear();
    console.log("===== BIENVENIDOS AL CAJERO =====");

    const numeroIngresado = await preguntar("Digite el numero de su cuenta: ");
    const pinIngresado = await preguntar("Digite el pin: ");

    const cuentaEncontrada = cuentas.find(
        (cuenta) =>
            cuenta.numero === numeroIngresado && cuenta.pin === pinIngresado
    );

    if (cuentaEncontrada) {
        cuentaActiva = cuentaEncontrada;
        console.log(`\n✅ Bienvenida/o ${cuentaActiva.propietario ?? "Invitado"} ✅`); // Si no hay propietario, muestra "Invitado" (Operador OR)
        menu();
    } else {
        console.log("❌ Credenciales invalidas ❌");
        rl.close();
    }
};

iniciar();
