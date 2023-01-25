const Edictionary = {
    a: { encrypted: 'ai' },
    e: { encrypted: 'enter' },
    i: { encrypted: 'imes' },
    o: { encrypted: 'ober' },
    u: { encrypted: 'ufat' },
};


Object.keys(Edictionary).forEach((key) => {
    const value = Edictionary[key];
    value.getEncrypted = function getEncrypted() {
        return this.encrypted;
    };
});

class Encrypter {
    encrypter(phrase) {
        const phrases = phrase.split(' ');
        for (let i = 0; i < phrases.length; i += 1) {
            const aux = phrases[i].split('');
            const letters = this.charToString(aux);
            for (let j = 0; j < letters.length; j += 1) {
                Object.keys(Edictionary).forEach((key) => {
                    const value = Edictionary[key];
                    if (letters[j] === key) {
                        letters[j] = value.getEncrypted();
                    }
                });
            }
            phrases[i] = letters.join('');
        }
        return phrases;
    }

    dencripter(phrase) {
        const phrases = phrase.split(' ');
        for (let i = 0; i < phrases.length; i += 1) {
            const letters = this.charToString(phrases[i].split(''));
            const aux2 = [...letters];
            for (let j = 0; j < aux2.length; j += 1) {
                Object.keys(Edictionary).forEach((key) => {
                    const value = Edictionary[key];
                    if (aux2[j] === key) {
                        var auxphrase = "";
                        if (j + value.getEncrypted().length <= aux2.length) {
                            for (let k = 0; k < value.getEncrypted().length; k++) {

                                auxphrase += aux2[j + k]
                            }
                            if (auxphrase === value.getEncrypted()) {
                                for (let k = 0; k < value.getEncrypted().length - 1; k += 1) {
                                    aux2.splice(j + 1, 1);
                                }
                            }
                        }
                    }
                });
            }
            phrases[i] = aux2.join('');
        }
        return phrases;
    }

    charToString(letters) {
        const phrases = new Array(letters.length);
        for (let i = 0; i < letters.length; i += 1) {
            phrases[i] = letters[i];
        }
        return phrases;
    }

    isEmpty(phrase) {
        if (phrase === '') {
            return false;
        }
        return true;
    }

}

const encrypter = new Encrypter();
const screen = window.innerWidth;
initial = setTimeout(initialy(), 0);

function initialy() {
    identificadordeWindow = setInterval(windowSize, 50);
}
function windowSize() {

    screen1 = window.innerWidth;

    if (screen1 < 991.98) {
        document.getElementById('result').rows = 5;
        document.getElementById('phrase').rows = 5;
        document.getElementById('letter').rows = 3;
        document.getElementById('encrypted').rows = 3;
    }
    else if (screen1 > 991.98) {
        document.getElementById('result').rows = 11;
        document.getElementById('phrase').rows = 11;
        document.getElementById('letter').rows = 7;
        document.getElementById('encrypted').rows = 7;
    }
}

if (screen < 991.98) {
    document.getElementById('result').rows = 5;
    document.getElementById('phrase').rows = 5;
    document.getElementById('letter').rows = 3;
    document.getElementById('encrypted').rows = 3;
}
var tel = 0;

function shadow() {
    identificadorIntervaloDeTiempo = setInterval(shadown, 50);
}

function shadown() {
    const phrase = document.getElementById('phrase').value;
    const encrypted = encrypter.encrypter(phrase);
    const screenWidth = window.innerWidth;
    if (document.getElementById('phrase').value === '') {
        const result = document.getElementById('result');
        result.value = '';
        if (screenWidth > 991.98) {
            result.placeholder = '';
        }
        else {
            result.placeholder = 'Resultado';
        }
        result.style.backgroundImage = "url('../images/muneco1.png')";
        result.style.backgroundRepeat = "no-repeat";
        result.style.backgroundSize = "80% 90%";
        result.style.backgroundPositionX = "center";
        result.style.backgroundPositionY = "3%";
        document.getElementById('result').innerHTML = encrypted.join(' ');
    }
    else {
        document.getElementById('result').style.backgroundColor = 'white';
        document.getElementById('result').style.backgroundImage = 'none';
        document.getElementById('result').placeholder = 'Resultado';
    }
}
function alerta(title, message, type, focus) {
    swal({
        title: title,
        text: message,
        icon: type,
        button: "Aceptar",
    }).then(() => {
        document.getElementById(focus).focus();
    });
}
function ValidateCharacter(phrase, focus) {
    const cadenaTxt = '^[a-z0-9 ñ,.!¡¿?_\n]+$';
    if (phrase.match(cadenaTxt) == null) {
        alerta("Caracteres no válidos", 'Solo se permiten letras minusculas', "warning", focus)
        return false;
    }
    return true;
}


document.getElementById('encrypt-button').addEventListener('click', () => {
    const phrase = document.getElementById('phrase').value;
    if (encrypter.isEmpty(phrase)) {
        if (ValidateCharacter(phrase, "phrase")) {
            const encrypted = encrypter.encrypter(phrase);
            document.getElementById('result').value = encrypted.join(' ');
            if (tel === 0) {
                tel = 1;
                shadow();
            }
        }
    }
    else {
        alerta("Ningún mensaje se ha encontrado", 'Ingrese el texto que desea encriptar o desenciptar', "warning", "phrase")
    }
});

document.getElementById('decrypt-button').addEventListener('click', () => {
    const phrase = document.getElementById('phrase').value;
    if (encrypter.isEmpty(phrase)) {
        if (ValidateCharacter(phrase, "phrase")) {
            const dencripted = encrypter.dencripter(phrase);
            document.getElementById('result').value = dencripted.join(' ');
            if (tel === 0) {
                tel = 1;
                shadow();
            }
        }
    }
    else {
        alerta("Ningún mensaje se ha encontrado", 'Ingrese el texto que desea encriptar o desenciptar', "warning", "phrase")
    }
});

document.getElementById('copy-button').addEventListener('click', () => {
    const result = document.getElementById('result');
    result.select();
    document.execCommand('copy');
});

document.getElementById('add-letter').addEventListener('click', (event) => {
    event.preventDefault();

    const letter = document.getElementById('letter').value;
    if (encrypter.isEmpty(letter)) {
        if (ValidateCharacter(letter, "letter")) {
            const encrypted = document.getElementById('encrypted').value;
            if (letter == encrypted[0]) {
                if (!encrypted.includes(' ')) {

                    Edictionary[letter] = { encrypted };
                    Edictionary[letter].getEncrypted = function getEncrypted() {
                        return this.encrypted;
                    };
                    document.getElementById('encrypted').placeholder = "Valor cifrado";
                    document.getElementById('letter').value = '';
                    document.getElementById('phrase').focus();
                }
                else {
                    alerta("Valor no posible", 'El valor ingresado no puede contener espacios', "warning", "encrypted");
                }
            }
            else {
                alerta("Valor no posible", 'La letra ingresada no coincide con la primera letra del valor ingresado o ha ingresado más de una letra', "warning", "encrypted");
            }
            document.getElementById('encrypted').value = '';
        }
    }
    else {
        alerta("Ningún letra se ha encontrado", 'Ingrese la letra que desea buscar o agregar', "warning", "letter")
    }
});

document.getElementById('search-letter').addEventListener('click', (event) => {
    event.preventDefault();

    const letter = document.getElementById('letter').value;
    if (encrypter.isEmpty(letter)) {
        if (letter.length > 1) {
            alerta("Valor no posible", 'No puede contener más de una letra', "warning", "letter");
        }
        else {
            if (ValidateCharacter(letter, "letter")) {
                if (Edictionary[letter]) {
                    document.getElementById('encrypted').value = Edictionary[letter].encrypted;
                    document.getElementById('encrypted').placeholder = "Valor cifrado";
                }
                else {
                    alerta("Valor no encontrado", 'El valor cifrado de la letra ' + letter + ' no se encuentra en el diccionario, puedes agregarla', "warning", "encrypted");
                }
            }
        }
    }
    else {
        alerta("Ningún letra se ha encontrado", 'Ingrese la letra que desea buscar o agregar', "warning", "letter")
    }
});


