## Il prototipo

JavaScript non segue il classico modello di ereditarietà ma, piuttosto,
utilizza quello *prototipale*.

Anche se ciò viene considerato come uno dei punti più deboli del JavaScript,
il modello ad ereditarietà prototipale è difatto più potente di quello
classico. Ad esempio, è piuttosto semplice creare un modello classico
sulle basi di quello prototipale, mentre l'operazione inversa è piuttosto
complessa.

JavaScript è il solo linguaggio ampiamente utilizzato che sfrutta l'ereditarietà
prototipale, quindi è possibile prendersi il proprio tempo per adeguarsi alle
differenze esistenti tra i due modelli.

La prima grande differenza è che l'ereditarietà in JavaScript utilizza le
*catene di prototipi*.

> **Nota:** il semplice utilizzo di `Bar.prototype = Foo.prototype` avrà come
> risultato che entrambe gli oggetti condivideranno lo **stesso** prototipo.
> Quindi le modifiche ad uno dei prototipi degli oggetti, si rifletteranno
> anche sull'altro prototipo, che nella maggior parte dei casi non è l'effetto
> che vogliamo.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Imposta il prototipo di Bar ad una nuova istanza di Foo
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // Si assicura di elencare Bar come l'attuale costruttore
    Bar.prototype.constructor = Bar;

    var test = new Bar(); // crea una nuova istanza di bar

    // La catena di prototipi finale
    test [istanza di Bar]
        Bar.prototype [istanza di Foo]
            { foo: 'Hello World' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* ecc. */ }

Nel codice qui sopra, l'oggetto `test` erediterà sia da `Bar.prototype` che da
`Foo.prototype`, e quindi avrà accesso alla funzione `method` che era stata
definita in `Foo`. Avrà anche accesso alla proprietà `value` dell'**unica**
istanza di `Foo`, cioè il suo prototipo. &Egrave; importante notare come
`new Bar()` **non** crei una nuova istanza di `Foo`, ma piuttosto riutilizzi
quella assegnata al suo prototipo. Perciò, tutte le istanze di `Bar`
condivideranno la **stessa** proprietà `value`.

> **Nota:** **non** usare `Bar.prototype = Foo`, dal momento che questo non
> lo farà puntare al prototipo di `Foo`, ma piuttosto alla funzione oggetto
> `Foo`. Quindi la catena di prototipi passerà per `Function.prototype`
> invece che `Foo.prototype`. Perciò, `method` non sarà presente nella catena
> di prototipi.

### Tabella delle proprietà

Quando si accede alle proprietà di un oggetto, JavaScript **risale** la
catena di prototipi fino a che non incontra una proprietà con il nome
richiesto.

Se raggiunge la cima della catena (cioè `Object.prototype`) senza aver
trovato le specifica proprietà, ritorna il valore [undefined](#core.undefined).

### La proprietà Prototype

Anche se la proprietà prototype viene usata dal linguaggio per creare la
catena di prototipi, è comunque sempre possibile assegnarvi un **qualsiasi**
dato valore. Nonostante cio, i dati primitivi verranno semplicemente ignorati
quando assegnati ad un prototipo.

    function Foo() {}
    Foo.prototype = 1; // nessun effetto

L'assegnazione di oggetti, come mostrato nell'esempio precedente, funzionerà,
e permette la creazione dinamica di catene di prototipi.

### Performance

Il tempo di ricerca per proprietà presenti in alto (all'inizio) della catena
di prototipi, può avere un impatto negativo sulla performance, e questo deve
essere tenuto bene in considerazione in codice dove la performance è un fattore
critico. Inoltre, il tentativo di accedere a proprietà inesistenti obbligherà
comunque ad attraversare tutta la catena di prototipi.

Oltre a ciò, [iterando](#object.forinloop) tra le proprietà di un oggetto,
**ogni** proprietà presente nella catena di prototipi verrà enumerata.

### Estensione di prototipi nativi

Una caratteristica che viene spesso abusata, è quella di estendere
`Object.prototype` o uno degli altri prototipi interni al linguaggio.

Questa tecnica viene detta [monkey patching][1] e vìola il principio di
*incapsulamento*. Anche se usata da popolari framework come [Prototype][2],
non c'è una valida ragione per pasticciare, aggiungendo ai tipi interni del
linguaggio funzionalità **non standard**.

La **sola** buona ragione per estendere un prototipo interno è quella di
effettuare il backport di funzionalità presenti nei motori JavaScript
più recenti, come ad esempio [`Array.forEach`][3].

### In conclusione

&Egrave; **essenziale** capire il modello di ereditarietà prototipale prima
di scrivere codice complesso che ne faccia uso. Bisogna, inoltre, tenere
sotto controllo la lunghezza della catena di prototipi nel proprio codice,
e suddividerla in più catene se necessario, per evitare possibili problemi di
performance. Inoltre, i prototipi nativi non dovrebbero **mai** essere
estesi a meno che non sia per garantire compatibilità con le funzionalità
più recenti di JavaScript.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

