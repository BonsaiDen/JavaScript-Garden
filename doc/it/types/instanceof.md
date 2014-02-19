## L'operatore `instanceof`

L'operatore `instanceof` confronta i costruttori dei suoi due operandi.
&Egrave; utile soltanto per la comparazione di oggetti realizzati dal
programmatore. Se usato sui tipi interni del linguaggio, esso è
praticamente inutile alla stregua dell'[operatore typeof](#types.typeof).

### Confronto di oggetti personalizzati

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // Questo imposta Bar.prototype all'oggetto funzione Foo,
    // ma non ad un'istanza di Foo
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### Uso di `instanceof` con i tipi nativi

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

Un'importante cosa da notare qui è che `instanceof` non funziona con oggetti
originati da differenti contesti JavaScript (ad esempio, differenti
documenti in un browser web), dato che i loro costruttori non saranno
esattamente lo stesso oggetto.

### In conclusione

L'operatore `instanceof` dovrebbe essere usto **solo** quando si ha a che fare
con oggetti personalizzati creati dal programmatore, che provengono dallo
stesso contesto JavaScript. Proprio come per l'operatore [`typeof`](#types.typeof),
ogni altro tipo di utilizzo dovrebbe essere **evitato**.

