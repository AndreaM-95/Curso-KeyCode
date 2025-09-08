// // Spread
// console.log("=== SPREAD  ===");
const a = [1,2,3,4,5]
const b = [6,7,8,9,10]
const c = ['Perro', 'Gato', 'Loro']

console.log(...a, ...b)

const user = {
    'name': 'Jefferson',
    'lastName': 'Pulido',
    'age': 23
}

const food = {
    'drink': 'Monster',
    'candy': 'chips'
}

console.log({
    ...user,
    food: {...food}
})

// RESULTADO
// {
//     'name': 'Jefferson',
//     'lastName': 'Pulido',
//     'age': 23,
//     food: {
//         'drink': 'Monster',
//         'candy': 'chips'
//     }
// }


// // Ternary operator
// console.log("=== SPREAD  ===");

if (age > 12) {
    console.log('Mayor de edad')
} else {
    console.log("menor de edad")
}

age > 12 ? console.log('Mayor de edad') : console.log("Menor de edad")