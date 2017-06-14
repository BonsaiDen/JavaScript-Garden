## Iterazione e proprietà degli Array

Sebbene gli array in JavaScript siano oggetti, non ci sono valide ragioni
per usare il ciclo [`for in`](#object.forinloop). Infatti, ci sono varie
buone ragioni per **evitare** l'utilizzo di `for in` con gli array.

> **Nota:** gli array in JavaScript **non** sono *array associativi*. JavaScript
> ha solo [oggetti](#object.general) per mappare chiavi con valori. E mentre
> gli array **preservano** il loro ordine, gli oggetti **non lo fanno**.

Dato che il ciclo `for in` enumera tutte le proprietà che sono presenti nella
catena di prototipi, e dal momento che il solo modo per escludere queste
proprietà è quello di usare [`hasOwnProperty`](#object.hasownproperty),
esso è già **venti volte** più lento di un normale ciclo `for`.

### Iterazione

Per poter ottenere la miglior performance durante l'iterazione degli array,
è meglio usare il classico ciclo `for`.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

In questo esempio c'è un ulteriore particolare da notare, che è il caching
della lunghezza dell'array tramite `l = list.length`.

Sebbene la proprietà `length` sia definita nell'array stesso, c'è ancora un
sovraccarico di lavoro dato dal fatto che deve essere ricercata ad ogni
iterazione del ciclo. E mentre i motori JavaScript recenti **potrebbero**
applicare delle ottimizzazioni in questo caso, non c'è modo di dire se il
codice verrà eseguito su uno di questi nuovi motori oppure no.

Infatti, l'omissione della parte di caching può risultare in un ciclo eseguito
soltanto alla **metà della velocità** con cui potrebbe essere eseguito facendo
il caching della lunghezza.

### La proprietà `length`

Mentre il *getter* della proprietà `length` ritorna semplicemente il numero di
elementi che sono contenuti nell'array, il *setter* può essere usato per
**troncare** l'array.

    var arr = [1, 2, 3, 4, 5, 6];
    arr.length = 3;
    arr; // [1, 2, 3]

    arr.length = 6;
    arr.push(4);
    arr; // [1, 2, 3, undefined, undefined, undefined, 4]

Assegnando una lunghezza più piccola si tronca l'array. Incrementandola si
crea un array frammentato.

### In conclusione

Per la miglior performance, si raccomanda di usare sempre il ciclo `for`
classico e fare il caching della proprietà `length`. L'uso di `for in` su di
un array è segno di un codice scritto male che è suscettibile a bug e pessima
performance.
