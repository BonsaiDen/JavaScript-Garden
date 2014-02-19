## `undefined` e `null`

JavaScript usa due valori distinti per il nulla, `null` e `undefined`, e
quest'ultimo è il più utile.

### Il valore `undefined`

`undefined` è un tipo con esattamente un valore: `undefined`.

Il linguaggio definisce anche una variabile globale che ha il valore di `undefined`.
Questa variabile è anche chiamata `undefined`. Comunque, questa variabile **non** è
né una costante né una parola chiave del linguaggio. Ciò significa che il suo *valore*
può facilmente essere sovrascritto.

> **ES5 Nota:** `undefined` in ECMAScript 5 **non è più** *scrivibile* in strict
> mode, ma il suo nome può ancora essere sostituito da, per esempio, una funzione
> con nome `undefined`.

Ecco alcuni esempi di quando il valore `undefined` viene ritornato:

 - Accedendo la variabile globale (non modificata) `undefined`.
 - Accedendo una variabile dichiarata *ma non* ancora inizializzata.
 - Ritorno implicito da funzioni che non hanno l'istruzione `return`.
 - Istruzioni `return` che non ritornano esplicitamente alcun valore.
 - Ricerca di proprietà inesistenti.
 - Parametri funzione a cui non viene esplicitamente passato alcun valore.
 - Qualsiasi cosa a cui sia stato assegnato il valore `undefined`.
 - Qualsiasi espressione nella forma di `void(espressione)`.

### Gestire le modifiche al valore di `undefined`

Dato che la variabile globale `undefined` mantiene solo una copia dell'attuale
valore di `undefined`, assegnandole un nuovo valore **non** cambia il valore del
*tipo* `undefined`.

Inoltre, per confrontare qualcosa con il valore di `undefined`, è necessario
ottenere prima il valore di `undefined`.

Per proteggere il codice da possibili sovrascritture della variabile `undefined`,
viene usata una comune tecnica che prevede l'aggiunta di un ulteriore parametro
ad un [contenitore anonimo](#function.scopes) al quale non viene passato alcun
argomento.

    var undefined = 123;
    (function(something, foo, undefined) {
        // ora undefined nello scope locale
        // fa nuovamente riferimento al valore `undefined`

    })('Hello World', 42);

Un altro modo per ottenere lo stesso effetto sarebbe quello di usare una
dichiarazione all'interno del contenitore.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

La sola differenza è che questa versione si traduce in 4 byte in più quando
minificata, e non c'è nessun'altra istruzione `var` al'interno del contenitore
anonimo.

### Utilizzi di `null`

Mentre `undefined` nel contesto del linguaggio JavaScript viene principalmente
usato come un tradizionale *null*, l'attuale `null` (sia letterale che tipo di
dati) è più o meno solo un altro tipo di dato.

Viene usato in alcune funzioni interne al JavaScript (come la dichiarazione
del termine della catena di prototipi, impostando `Foo.prototype = null`), ma
nella maggior parte dei casi, può essere rimpiazzato da `undefined`.

