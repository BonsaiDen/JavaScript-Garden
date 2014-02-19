## L'oggetto `arguments`

Ogni scope di funzione in JavaScript può accedere alla speciale variabile
`arguments`. Questa variabile mantiene un elenco di tutti gli argomenti
che sono stati passati alla funzione.

> **Nota:** nel caso `arguments` sia stato già definito nello scope della
> funzione tramite una dichiarazione `var` o come parametro formale,
> l'oggetto `arguments` non sarà creato.

L'oggetto `arguments` **non** è un `Array`. Sebbene abbia in parte la
semantica di un array (nello specifico la proprietà `length`), esso non
eredita da `Array.prototype` ed è a tutti gli effetti un `Object`.

Proprio per questo motivo, **non** è possibile usare su `arguments` i metodi
standard degli array come `push`, `pop`, `slice`. E mentre l'iterazione con
un semplice ciclo `for` funzionerà senza problemi, sarà necessario convertire
l'oggetto in un vero `Array` per poter usare i metodi standard di `Array` con
esso.

### Conversione ad array

Il codice seguente ritornerà un nuovo `Array` contenenente tutti gli elementi
dell'oggetto `arguments`.

    Array.prototype.slice.call(arguments);

Dato che questa conversione è **lenta**, **non è raccomandato** usarla in sezioni
di codice in cui la performance è un fattore critico.

### Passaggio di argomenti

Quello che segue è il metodo raccomandato per passare argomenti da una funzione
ad un'altra.

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // codice da eseguire
    }

Un altro trucco è quello di usare `call` e `apply` insieme per creare veloci
contenitori senza vincoli.

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // Crea una versione senza vincoli di "method"
    // Richiede i parametri: this, arg1, arg2...argN
    Foo.method = function() {

        // Risultato: Foo.prototype.method.call(this, arg1, arg2... argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };


### Parametri formali e indici degli argomenti

L'oggetto `arguments` crea funzioni *getter* e *setter* sia per le sue
proprietà che per i parametri formali della funzione.

Come risultato, la modifica del valore di un parametro formale modificherà
anche il valore della corrispondente proprietà nell'oggetto `arguments`, e
vice versa.

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);

### Miti e verità sulla performance

Il solo caso in cui l'oggetto `arguments` non viene creato, è quando esso
viene dichiarato come un nome all'interno di una funzione o uno dei suoi
parametri formali. Non importa che venga usato o meno.

Sia i *getter* che i *setter* vengono **sempre** creati. Perciò, il loro
utilizzo non ha praticamente alcun impatto sulle prestazioni, specialmente
nel mondo reale dove nel codice c'è più di un semplice accesso alle proprietà
dell'oggetto `arguments`.

> **ES5 Nota:** questi *getter* e *setter* non vengono creati in strict mode.

Ad ogni modo, c'è un caso che ridurrà drasticamente la performance nei motori
JavaScript moderni. &Egrave; il caso dell'utilizzo di `arguments.callee`.

    function foo() {
        arguments.callee; // fa qualcosa con questo oggetto funzione
        arguments.callee.caller; // e l'oggetto funzione chiamante
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // normalmente sarebbe sostituito con il suo codice...
        }
    }

Nel codice qui sopra, `foo` non può più essere soggetto ad [inlining][1]
dal momento che necessita di conoscere sia se stesso che il suo chiamante.
Questo non solo annulla possibili guadagni prestazionali ottenibili con
l'inlining, ma spezza anche il principio di incapsulazione perché la funzione
ora potrebbe essere dipendente da uno specifico contesto di esecuzione.

L'utilizzo di `arguments.callee` o di qualsiasi altra delle sue proprietà
è **altamente sconsigliato**.

> **ES5 Nota:** In strict mode, `arguments.callee` lancierà un `TypeError`
> dato che il suo utilizzo è stato deprecato.

[1]: http://en.wikipedia.org/wiki/Inlining

