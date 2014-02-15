## L'operatore `typeof`

L'operatore `typeof` (assieme a [`instanceof`](#types.instanceof)) è
probabilmente il più grande difetto di progettazione di JavaScript,
dato che è quasi **completamente inusabile**.

Sebbene `instanceof` abbia ancora limitati casi d'uso, `typeof` ha realmente
un solo caso d'uso, che **non** è quello di verificare il tipo di un oggetto.

> **Nota:** mentre `typeof` può anche essere richiamato usando una sintassi
> simile a quella di una funzione (ad esempio, `typeof(obj)`), questa non è
> una funzione. Le parentesi funzionano normalmente e il valore di ritorno
> viene usato come operando per l'operatore `typeof`. **Non** esiste una
> funzione `typeof`.

### Tabella dei tipi di JavaScript

    Valore              Classe     Tipo
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object (function in Nitro/V8)
    new RegExp("meow")  RegExp     object (function in Nitro/V8)
    {}                  Object     object
    new Object()        Object     object

In questa tabella, *Tipo* fa riferimento al valore ritornato dall'operatore `typeof`.
Come si può chiaramente vedere, questo valore è tutto fuorchè affidabile.

*Classe* si riferisce al valore della proprietà interna `[[Class]]` di un oggetto.

> **Da specifiche:** il valore di `[[Class]]` può essere una delle seguenti
> stringhe: `Arguments`, `Array`, `Boolean`, `Date`, `Error`, `Function`,
> `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

Per ottenere il valore di `[[Class]]`, bisogna usare il metodo `toString` di
`Object.prototype`.

### La classe di un oggetto

Le specifiche forniscono esattamente un modo per accedere al valore di
`[[Class]]`, con l'uso di `Object.prototype.toString`.

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }

    is('String', 'test'); // true
    is('String', new String('test')); // true

Nel esempio qui sopra, `Object.prototype.toString` viene chiamato con il valore
di [this](#function.this) impostato all'oggetto di cui si vuole ottenere il
valore di `[[Class]]`.

> **ES5 Nota:** per comodità, il valore di ritorno di `Object.prototype.toString`
> per `null` e `undefined` è stato **cambiato** da `Object` a `Null` e
> `Undefined` in ECMAScript 5.

### Testare variabili non definite

    typeof foo !== 'undefined'

Questo esempio verificherà se `foo` è stata attualmente dichiarata oppure no.
Un semplice referenziamento ad essa risulterebbe in un `ReferenceError`.
Questo è l'unico caso in cui `typeof` è utile a qualcosa.

### In conclusione

Per verificare il tipo di un oggetto, è altamente raccomandato l'utilizzo di
`Object.prototype.toString`, dato che questo è il solo modo affidabile per
fare ciò. Come mostrato nella tabella precedente, alcuni valori di ritorno
di `typeof` non sono definiti nelle specifiche, e ciò dimostra come essi
potrebbero differire tra implementazioni differenti.

A meno che non si debba verificare se una variabile è definta, `typeof`
dovrebbe essere evitato.

