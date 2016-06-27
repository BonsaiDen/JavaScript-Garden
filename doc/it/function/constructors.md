## Costruttori

I costruttori in JavaScript sono differenti da quelli di molti altri linguaggi.
Qualsiasi chiamata a funzione preceduta dalla parola chiave `new` agisce come
un costruttore.

Dentro al costruttore (la funzione chiamata) il valore di `this` fa riferimento
al nuovo oggetto creato. Il [prototype](#object.prototype) di questo **nuovo**
oggetto viene impostato al `prototype` dell'oggetto funzione che è stato invocato
come costruttore.

Se la funzione che è stata chiamata non ha un'istruzione `return` esplicita,
allora essa ritorna implicitamente il valore di `this` (il nuovo oggetto).

    function Person(name) {
        this.name = name;
    }

    Person.prototype.logName = function() {
        console.log(this.name);
    };

    var sean = new Person();

Questo esempio chiama `Person` come costruttore ed imposta il `prototype` del
nuovo oggetto creato a `Person.prototype`.

In caso di istruzione `return` esplicita, la funzione ritorna il valore
specificato da quell'istruzione, ma **solo** se il valore di ritorno è un
`Object`.

    function Car() {
        return 'ford';
    }
    new Car(); // un nuovo oggetto, non 'ford'

    function Person() {
        this.someValue = 2;

        return {
            name: 'Charles'
        };
    }
    new Person(); // l'oggetto ritornato ({name: 'Charles'}), escluso someValue

Quando la parola chiave `new` viene omessa, la funzione **non** ritornerà un
nuovo oggetto.

    function Pirate() {
        this.hasEyePatch = true; // imposta la proprietà nell'oggetto globale!
    }
    var somePirate = Pirate(); // somePirate è undefined

Mentre l'esempio precedente potrebbe sembrare essere funzionante in alcuni
casi, a causa del modo in cui lavora [`this`](#function.this) in JavaScript,
esso userà l'*oggetto globale* come valore di `this`.

### Factory (Fabbriche di oggetti)

Per poter omettere la parola chiave `new`, la funzione costruttore deve
esplicitamente ritornare un valore.

    function Robot() {
        var color = 'gray';
        return {
            getColor: function() {
                return color;
            }
        }
    }
    Robot.prototype = {
        someFunction: function() {}
    };

    new Robot();
    Robot();

Entrambe le chiamate a `Robot` ritornano lo stesso risultato, un nuovo oggetto
creato con una proprietà chiamata `method`, che è una [Closure](#function.closures).

Bisogna anche notare che la chiamata `new Robot()` **non** influisce sul prototipo
dell'oggetto ritornato. Mentre il prototipo sarà impostato con il nuovo oggetto
creato, `Robot` non ritornerà mai quel nuovo oggetto.

Nell'esempio sopra, non c'è differenza funzionale nell'usare o meno la parola
chiave `new`.

### Creare nuovi oggetti tramite factory

Viene spesso raccomandato di **non** usare `new` perché una sua dimenticanza
può portare a bug potenzialmente insidiosi da risolvere.

Per poter creare un nuovo oggetto, si dovrebbe invece usare una factory e
costruire un nuovo oggetto all'interno di quella factory.

    function CarFactory() {
        var car = {};
        car.owner = 'nobody';

        var milesPerGallon = 2;

        car.setOwner = function(newOwner) {
            this.owner = newOwner;
        }

        car.getMPG = function() {
            return milesPerGallon;
        }
        return car;
    }

Sebbene questo esempio sia a prova di omissione della parola chiave `new` e
renda sicuramente più semplice l'utilizzo delle [variabili private](#function.closures),
esso ha alcuni aspetti negativi.

 1. Usa più memoria dal momento che gli oggetti creati **non** condividono
    i metodi di un prototipo.
 2. Per poter ereditare, la factory deve copiare tutti i metodi da un altro
    oggetto oppure mettere quell'oggetto nel prototipo del nuovo oggetto.
 3. Perdere la catena di prototipi solo perché si vuole tralasciare la
    parola chiave `new` è contrario allo spirito del linguaggio.

### In conclusione

Sebbene l'omissione della parola chiave `new` possa portare all'introduzione di
bug, **non** è certo un motivo per privarsi completamente dell'uso dei prototipi.
Alla fine si tratta di decidere quale sia la soluzione più adatta per
l'applicazione. &Egrave; specialmente importante scegliere uno specifico stile
di creazione degli oggetti ed usarlo in maniera **consistente**.
