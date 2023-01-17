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
                        for (let k = 0; k < value.getEncrypted().length - 1; k += 1) {
                            aux2.splice(j + 1, 1);
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

}

const encrypter = new Encrypter();
var tel = 0;

function shadow() {
    identificadorIntervaloDeTiempo = setInterval(shadown, 1000);
}

function shadown() {
    const phrase = document.getElementById('phrase').value;
    const encrypted = encrypter.encrypter(phrase);
    if (document.getElementById('phrase').value === '') {
        document.getElementById('shadow').style.visibility = 'visible';
        document.getElementById('result').innerHTML = encrypted.join(' ');
    }
    else {
        document.getElementById('shadow').style.visibility = 'hidden';
    }
}

document.getElementById('encrypt-button').addEventListener('click', () => {
    const phrase = document.getElementById('phrase').value;
    const encrypted = encrypter.encrypter(phrase);
    document.getElementById('result').innerHTML = encrypted.join(' ');
    document.getElementById('shadow').style.visibility = 'hidden';
    if (tel === 0) {
        tel = 1;
        shadow();
    }
});

document.getElementById('decrypt-button').addEventListener('click', () => {
    const phrase = document.getElementById('phrase').value;
    const dencripted = encrypter.dencripter(phrase);
    document.getElementById('result').innerHTML = dencripted.join(' ');
    document.getElementById('shadow').style.visibility = 'hidden';
    if (tel === 0) {
        tel = 1;
        shadow();
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
    const encrypted = document.getElementById('encrypted').value;
    if (letter == encrypted[0]) {
        if (!encrypted.includes(' ')) {

            Edictionary[letter] = { encrypted };
            Edictionary[letter].getEncrypted = function getEncrypted() {
                return this.encrypted;
            };
            document.getElementById('encrypted').placeholder = "Valor cifrado";
            document.getElementById('letter').value = '';
        }
        else {
            document.getElementById('encrypted').placeholder = "El valor ingresado tiene espacios";
        }
    }
    else {
        document.getElementById('encrypted').placeholder = 'La letra ingresada no coincide con la primera letra del valor ingresado o ha ingresado más de una letra';
    }
    document.getElementById('encrypted').value = '';
});

document.getElementById('search-letter').addEventListener('click', (event) => {
    event.preventDefault();

    const letter = document.getElementById('letter').value;
    if (Edictionary[letter]) {
        document.getElementById('encrypted').value = Edictionary[letter].encrypted;
        document.getElementById('encrypted').placeholder = "Valor cifrado";
    }
    else {
        document.getElementById('encrypted').placeholder = "La letra " + letter + " no tiene un value en nuestro diccionario";
    }
});


