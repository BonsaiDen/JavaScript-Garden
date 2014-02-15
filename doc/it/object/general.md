## Utilizzo di oggetti e proprietà

Tutto in JavaScript funziona come un oggetto, con la sola eccezione di
[`null`](#core.undefined) e [`undefined`](#core.undefined).

    false.toString(); // 'false'
    [1, 2, 3].toString(); // '1,2,3'

    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

Un'idea comunemente errata è che i numeri letterali non possano essere
usati come oggetti. Questo a causa di una scorretta gestione da parte del
parser di JavaScript, che tenta di analizzare la *dot notation* di un
numero come se fosse un letterale in virgola mobile.

    2.toString(); // solleva SyntaxError

Esistono un paio di soluzioni che possono essere usate per far sì che i
numeri letterali vengano considerati come oggetti.

    2..toString(); // il secondo punto viene correttamente riconosciuto
    2 .toString(); // notate lo spazio tra il numero e il punto
    (2).toString(); // viene prima valutato 2

### Oggetti come un tipo di dato

Gli oggetti in JavaScript possono anche essere usati come [*tabelle hash*][1] e
consistono principalmente di proprietà con un nome che mappano dei valori.

Usando un oggetto letterale (notazione `{}`) è possibile creare un
semplice oggetto. Questo nuovo oggetto [eredita](#object.prototype) da
`Object.prototype` e non ha [proprietà](#object.hasownproperty) definite.

    var foo = {}; // un nuovo oggetto vuoto

    // un nuovo oggetto con una proprietà `test` con valore 12
    var bar = {test: 12};

### Accedere alle proprietà

&Egrave; possibile accedere alle proprietà di un oggetto in due modi.
Usando il punto oppure attraverso l'uso delle parentesi quadre.

    var foo = {name: 'kitten'}
    foo.name; // kitten
    foo['name']; // kitten

    var get = 'name';
    foo[get]; // kitten

    foo.1234; // SyntaxError
    foo['1234']; // funziona

Le due notazioni funzionano quasi in modo identico, con la sola differenza
che usando le parentesi quadre è possibile impostare dinamicamente le
proprietà ed il loro nome identificatore, cosa che altrimenti genererebbe
un errore di sintassi.

### Cancellazione delle proprietà

Il solo modo per rimuovere una proprietà da un oggetto è quello di usare
l'operatore `delete`. Impostando la proprietà a `undefined` o `null`, infatti,
si rimuove solo il *valore* associato alla proprietà, ma non la *chiave*.

    var obj = {
        bar: 1,
        foo: 2,
        baz: 3
    };
    obj.bar = undefined;
    obj.foo = null;
    delete obj.baz;

    for(var i in obj) {
        if (obj.hasOwnProperty(i)) {
            console.log(i, '' + obj[i]);
        }
    }

Il codice qui sopra, stamperà sia `bar undefined` che `foo null`. Soltanto
`baz` è stato rimosso, e quindi non compare nell'output.

### Notazione delle chiavi

    var test = {
        'case': 'Parola chiave, scrivimi come stringa',
        // solleva SyntaxError
        delete: 'Parola chiave, anche io devo essere una stringa'
    };

Le proprietà di un oggetto possono essere scritte sia come normali caratteri
che come stringhe. A causa di un altro errore di progettazione del parser di
JavaScript, il codice appena visto genererà un `SyntaxError` in ECMAScript
precedente alla versione 5.

Questo errore nasce dal fatto che `delete` è una *parola chiave*, quindi,
deve essere scritta come una *stringa letterale* per assicurarsi che venga
correttamente interpretata dai vecchi motori JavaScript.

[1]: http://en.wikipedia.org/wiki/Hashmap

