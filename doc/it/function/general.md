## Dichiarazioni ed espressioni di funzione

Le funzioni in JavaScript sono oggetti di prima classe. Ciò significa che
possono essere usate come ogni altro valore. Un uso comune di questa
caratteristica è quello di passare una *funzione anonima* come funzione di
callback ad un'altra funzione, possibilmente asincrona.

### La dichiarazione di `function`

    function foo() {}

La funzione qui sopra viene [elevata](#function.scopes) (hoisted) prima
che inizi l'esecuzione del programma. Questo vuol dire che essa è disponibile
da un *qualsasi* punto dello scope in cui è stata *definita*, anche se
richiamata prima dell'effettiva definizione nel sorgente.

    foo(); // funziona perché foo è stata creata prima di eseguire il codice
    function foo() {}

### L'espressione `function`

    var foo = function() {};

Questo esempio assegna la funzione *anonima* alla variabile `foo`.

    foo; // 'undefined'
    foo(); // questo solleva un TypeError
    var foo = function() {};

Dato che `var` è una dichiarazione che eleva il nome di variabile `foo`
prima che l'esecuzione del codice inizi, `foo` è già dichiarata quando lo
script viene eseguito.

Ma, dal momento che le assegnazioni avvengono solo a runtime, il valore di
`foo` sarà [undefined](#core.undefined) per default, prima che il relativo
codice sia eseguito.

### Espressione di funzione con nome

Un altro caso speciale è l'assegnazione di funzioni con nome.

    var foo = function bar() {
        bar(); // funziona
    }
    bar(); // ReferenceError

Qui, `bar` non è disponibile nello scope più esterno, dal momento che la
funzione viene assegnata solo a `foo`, mentre è disponibile all'interno di
`bar`. Ciò è dato dal modo in cui funziona la [risoluzione dei nomi](#function.scopes)
in JavaScript: il nome della funzione è *sempre* reso disponibile nello scope
locale della funzione stessa.

