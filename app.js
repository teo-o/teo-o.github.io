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

    if(screen1 < 991.98){
        document.getElementById('result').rows = 5;
        document.getElementById('phrase').rows = 5;
        document.getElementById('letter').rows = 3;
        document.getElementById('encrypted').rows = 3;
    }
    else if(screen1 > 991.98){
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

document.getElementById('encrypt-button').addEventListener('click', () => {
    const phrase = document.getElementById('phrase').value;
    if (encrypter.isEmpty(phrase)) {
        const encrypted = encrypter.encrypter(phrase);
        document.getElementById('result').value = encrypted.join(' ');
        if (tel === 0) {
            tel = 1;
            shadow();
        }
    }
    else {
        document.getElementById('phrase').style.borderRadius = "2%";
        document.getElementById('phrase').style.border = "1px solid #0A3871";
        setTimeout(function () {
            document.getElementById('phrase').style.border = "";
        }, 1000);
    }
});

document.getElementById('decrypt-button').addEventListener('click', () => {
    const phrase = document.getElementById('phrase').value;
    if (encrypter.isEmpty(phrase)) {
        const dencripted = encrypter.dencripter(phrase);
        document.getElementById('result').value = dencripted.join(' ');
        if (tel === 0) {
            tel = 1;
            shadow();
        }
    }
    else {
        document.getElementById('phrase').style.borderRadius = "2%";
        document.getElementById('phrase').style.border = "1px solid #0A3871";
        setTimeout(function () {
            document.getElementById('phrase').style.border = "";
        }, 1000);
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
                document.getElementById('encrypted').placeholder = "El valor ingresado tiene espacios";
            }
        }
        else {
            document.getElementById('encrypted').placeholder = 'La letra ingresada no coincide con la primera letra del valor ingresado o ha ingresado más de una letra';
        }
        document.getElementById('encrypted').value = '';
    }
    else {
        document.getElementById('letter').style.borderRadius = "2%";
        document.getElementById('letter').style.border = "1px solid #0A3871";
        setTimeout(function () {
            document.getElementById('letter').style.border = "";
        }, 1000);
    }
});

document.getElementById('search-letter').addEventListener('click', (event) => {
    event.preventDefault();

    const letter = document.getElementById('letter').value;
    if (encrypter.isEmpty(letter)) {
        if (Edictionary[letter]) {
            document.getElementById('encrypted').value = Edictionary[letter].encrypted;
            document.getElementById('encrypted').placeholder = "Valor cifrado";
        }
        else {
            document.getElementById('encrypted').placeholder = "La letra " + letter + " no tiene un value en nuestro diccionario";
        }
    }
    else {
        document.getElementById('letter').style.borderRadius = "2%";
        document.getElementById('letter').style.border = "1px solid #0A3871";
        setTimeout(function () {
            document.getElementById('letter').style.border = "";
        }, 1000);
    }
});


