const fs = require('fs');

// Leemos el archivo y lo convertimos a un objeto JSON
let testObject = JSON.parse(fs.readFileSync(__dirname + '/source/MOCK_DATA.json'));

let counter = 0; // primera pista
let lowerCaseString = ""; // segunda pista
let maxNumber = 0; // tercera pista

for (let user of testObject) {
    if (user.last_name == "Nuwe"){
        counter++;
        // Si es el primer objeto con el last_name = "Nuwe" manadará la el id del usuario
        // a una función para remover las letras mayúsculas y minúsculas
        if (counter == 1){
            lowerCaseString = deleteLowerCaseLetters(user.id);
        }
    }

    // Si el usuario no tiene el atributo 'pet' se recogerá el primer elemento del ip
    // del usuario y se irá comparando con los demás elementos que cumplan la misma
    // condición, para así obtener el máximo valor posible.
    if (!user.pet){
        let ipFirstNumber = parseInt(user.ip.split('.')[0]);

        if (ipFirstNumber > maxNumber){
            maxNumber = ipFirstNumber;
        }
    }
}


/**
 * Fitra el texto para obtener solo los números
 * @param {string} string 
 * @returns 
 */
function deleteLowerCaseLetters(string){
    return string.split('')
                .filter(element => {
                    return !isNaN(element);
                }).join('');
    
}

// Almacenamos las 3 pistas para obtener la contraseña
let firstChallengePass = `${counter}-${lowerCaseString}-${maxNumber}`;

// Mostramos la contraseña por pantalla
console.log(`The password is: ${firstChallengePass}`);