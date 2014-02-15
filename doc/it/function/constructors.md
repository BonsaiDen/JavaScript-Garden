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

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

Questo esempio chiama `Foo` come costruttore ed imposta il `prototype` del
nuovo oggetto creato a `Foo.prototype`.

In caso di istruzione `return` esplicita, la funzione ritorna il valore
specificato da quell'istruzione, ma **solo** se il valore di ritorno è un
`Object`.

    function Bar() {
        return 2;
    }
    new Bar(); // un nuovo oggetto

    function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // l'oggetto ritornato

Quando la parola chiave `new` viene omessa, la funzione **non** ritornerà un
nuovo oggetto.

    function Foo() {
        this.bla = 1; // imposta la proprietà dell'oggetto globale
    }
    Foo(); // undefined

Mentre l'esempio precedente potrebbe sembrare essere funzionante in alcuni
casi, a causa del modo in cui lavora [`this`](#function.this) in JavaScript,
esso userà l'*oggetto globale* come valore di `this`.

### Factory (Fabbriche di oggetti)

Per poter omettere la parola chiave `new`, la funzione costruttore deve
esplicitamente ritornare un valore.

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }
    Bar.prototype = {
        foo: function() {}
    };

    new Bar();
    Bar();

Entrambe le chiamate a `Bar` ritornano lo stesso risultato, un nuovo oggetto
creato con una proprietà chiamata `method`, che è una [Closure](#function.closures).

Bisogna anche notare che la chiamata `new Bar()` **non** influisce sul prototipo
dell'oggetto ritornato. Mentre il prototipo sarà impostato con il nuovo oggetto
creato, `Bar` non ritornerà mai quel nuovo oggetto.

Nell'esempio sopra, non c'è differenza funzionale nell'usare o meno la parola
chiave `new`.

### Creare nuovi oggetti tramite factory

Viene spesso raccomandato di **non** usare `new` perché una sua dimenticanza
può portare a bug potenzialmente insidiosi da risolvere.

Per poter creare un nuovo oggetto, si dovrebbe invece usare una factory e
costruire un nuovo oggetto all'interno di quella factory.

    function Foo() {
        var obj = {};
        obj.value = 'blub';

        var private = 2;
        obj.someMethod = function(value) {
            this.value = value;
        }

        obj.getPrivate = function() {
            return private;
        }
        return obj;
    }

Sebbene questo esempio sia a prova di omissione della parola chiave `new` e
renda sicuramente più semplice l'utilizzo delle [variabili private](#function.closures),
esso ha alcuni aspetti negativi.

 1. Usa più memoria dal momento che gli oggetti creati **non** condividono
    i metodi di un prototipo.
 2. Per poter ereditare, la factory deve copiare tutti i metodi da un altro
    oggetto oppure mettere quell'oggetto nel proptotipo del nuovo oggetto.
 3. Perdere la catena di prototipi solo perché si vuole tralasciare la
    parola chiave `new` è contrario allo spirito del linguaggio.

### In conclusione

Sebbene l'omissione della parola chiave `new` possa portare all'introduzione di
bug, **non** è certo un motivo per privarsi completamente dell'uso dei prototipi.
Alla fine si tratta di decidere quale sia la soluzione più adatta per
l'applicazione. &Egrave; specialmente importante scegliere uno specifico stile
di creazione degli oggetti ed usarlo in maniera **consistente**.

