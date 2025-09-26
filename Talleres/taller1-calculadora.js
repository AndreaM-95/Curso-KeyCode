const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const preguntar = (pregunta) => {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => resolve(respuesta));
  });
};

let resultado = 0; //Variable para almacenar el resultado de las operaciones

// Función para pedir dos números
const pedirNumeros = async () => {
  const num1 = Number(await preguntar("Ingrese el primer número: "));
  const num2 = Number(await preguntar("Ingrese el segundo número: "));
  return { num1, num2 };
};

//Función principal del menú de la calculadora.
//Realiza las operaciones: suma, resta, multiplicación, división, porcentaje y área de un rectángulo/cuadrado.
//Utiliza un switch para manejar las diferentes opciones del menú.
const menuCalculadora = async () => {
  console.clear();
  console.log("===== CALCULADORA BÁSICA =====");
  console.log("1. Sumar");
  console.log("2. Restar");
  console.log("3. Multiplicar");
  console.log("4. Dividir");
  console.log("5. Porcentaje");
  console.log("6. El área");
  console.log("7. Salir\n");

  const opcion = await preguntar("Selecciona una operación a realizar: ");

  switch (opcion) {
    case "1": {
      const { num1, num2 } = await pedirNumeros();
      resultado = num1 + num2;
      console.log(`✅ El resultado de la suma es: ${resultado}`);
      break;
    }
    case "2": {
      const { num1, num2 } = await pedirNumeros();
      resultado = num1 - num2;
      console.log(`✅ El resultado de la resta es: ${resultado}`);
      break;
    }
    case "3": {
      const { num1, num2 } = await pedirNumeros();
      resultado = num1 * num2;
      console.log(`✅ El resultado de la multiplicación es: ${resultado}`);
      break;
    }
    case "4": {
      const { num1, num2 } = await pedirNumeros();
      if (num2 === 0) {
        console.log("⚠️ No se puede dividir entre cero.");
      } else {
        resultado = num1 / num2;
        console.log(`✅ El resultado de la división es: ${resultado}`);
      }
      break;
    }
    case "5": {
      // Porcentaje
      const { num1, num2 } = await pedirNumeros();
      resultado = num1 * (num2 / 100);
      console.log(`✅ El resultado es: ${resultado}`);
      break;
    }
    case "6": {
      // Área de rectángulo/cuadrado
      const { num1: base, num2: altura } = await pedirNumeros();
      resultado = base * altura;
      console.log(`✅ El área es: ${resultado}`);
      break;
    }
    case "7":
      console.log("👋 Gracias por usar la calculadora.");
      rl.close();
      return;
    default:
      console.log("❌ Opción inválida.");
      break;
  }

  await preguntar("\nPresiona ENTER para continuar...");
  menuCalculadora();
};

menuCalculadora();