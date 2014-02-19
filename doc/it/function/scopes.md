## Scope e spazi di nome (namespace)

Sebbene JavaScript non abbia problemi con la sintassi delle parentesi
graffe per la definizione di blocchi, esso **non** supporta lo scope
per blocco, quindi, tutto ciò che il linguaggio ci mette a disposizione
è lo *scope di funzione*.

    function test() { // questo è uno scope
        for(var i = 0; i < 10; i++) { // questo non è uno scope
            // conta
        }
        console.log(i); // 10
    }

> **Nota:** quando non usato in un'assegnazione, istruzione return o come
> argomento di una funzione, la notazione `{...}` verrà interpretata come
> una dichiarazione di blocco e **non** come un oggetto letterale. Questo,
> assieme all'[inserimento automatico dei punti-e-virgola](#core.semicolon),
> può portare ad errori alquanto subdoli.

Anche gli spazi di nome (namespace) non sono gestiti in JavaScript, e ciò
significa che ogni cosa viene definita in un namespace *globalmente condiviso*.

Ogni volta che ci si riferisce ad una variabile, JavaScript risale attraverso
tutti gli scope fino a che non la trova e, nel caso esso raggiunga lo scope
globale senza aver trovato il nome richiesto, solleva un `ReferenceError`.

### Il problema delle variabili globali

    // script A
    foo = '42';

    // script B
    var foo = '42'

Questi due script **non** hanno lo stesso effetto. Lo script A definisce una
variabile chiamata `foo` nello scope *globale*, mentre lo script B definisce
una `foo` nello scope *attuale*.

Ancora una volta. Questo esempio **non** sortisce lo *stesso effetto*: il
non utilizzo di `var` può avere importanti conseguenze.

    // scope globale
    var foo = 42;
    function test() {
        // scope locale
        foo = 21;
    }
    test();
    foo; // 21

L'omissione dell'istruzione `var` all'interno della funzione `test` sostituirà
il valore di `foo`. Sebbene questo possa non sembrare un grosso problema in
un primo momento, ritrovarsi con migliaia di linee di JavaScript senza
utilizzare `var` introdurrà orribili bug molto difficili da individuare.

    // scope globale
    var items = [/* un elenco */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }

    function subLoop() {
        // scope di subLoop
        for(i = 0; i < 10; i++) { // istruzione var omessa
            // fai qualcosa di eccezionale!
        }
    }

Il ciclo esterno terminerà dopo la prima chiamata a `subLoop`, dato che `subLoop`
sovrascriverà il valore globale di `i`. L'utilizzo di una `var` per il secondo ciclo
`for` avrebbe facilmente evitato questo errore. L'istruzione `var` non dovrebbe
**mai** essere omessa a meno che l'*effetto desiderato* non sia proprio quello
di influenzare lo scope esterno.

### Variabili locali

In JavaScript le sole sorgenti per le variabili locali sono i parametri
[funzione](#function.general) e le variabili dichiarate tramite l'istruzione
`var`.

    // scope globale
    var foo = 1;
    var bar = 2;
    var i = 2;

    function test(i) {
        // scope locale della funzione test
        i = 5;

        var foo = 3;
        bar = 4;
    }
    test(10);

Mentre `foo` e `i` sono variabili locali all'interno dello scope della funzione
`test`, l'assegnazione di `bar` sostituirà la variabile globale con lo stesso
nome.

### Elevamento (hoisting)

JavaScript **eleva** le dichiarazioni. Questo significa che le istruzioni `var`
e le dichiarazioni `function` verranno spostate in cima agli scope che le
racchiudono.

    bar();
    var bar = function() {};
    var someValue = 42;

    test();
    function test(data) {
        if (false) {
            goo = 1;

        } else {
            var goo = 2;
        }
        for(var i = 0; i < 100; i++) {
            var e = data[i];
        }
    }

Il codice qui sopra, viene trasformato prima che inizi l'esecuzione. JavaScript
sposta sia le istruzioni `var` che le dichiarazioni `function` in cima al più
vicino scope che le racchiude.

    // le istruzioni var vengono spostate qui
    var bar, someValue; // di default a 'undefined'

    // la dichiarazione function viene spostate qui
    function test(data) {
        var goo, i, e; // il blocco scope mancante sposta qui queste istruzioni
        if (false) {
            goo = 1;
        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // fallisce con un TypeError dato che bar è ancora 'undefined'
    someValue = 42; // le assegnazioni non vengono influenzate dall'elevazione
    bar = function() {};

    test();

L'omissione del blocco di scope non solo muoverà le istruzioni `var` fuori dal
corpo dei cicli, ma renderà anche i risultati di certi costrutti `if` poco
intuitivi.

Nel codice originale, sebbene l'istruzione `if` sembrasse modificare la
*variabile globale* `goo`, effettivamente essa va a modificare la *variabile locale*
(dopo che l'elevazione è stata eseguita).

Senza la conoscenza dell'*elevazione*, uno potrebbe pensare che il codice
qui sotto sollevi un `ReferenceError`.

    // verifica se SomeImportantThing è stato inizializzato
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

Ma ovviamente tutto funziona grazie al fatto che l'istruzione `var` è stata
spostata all'inzio dello *scope globale*.

    var SomeImportantThing;

    // qui altro codice potrebbe o meno inizializzare SomeImportantThing

    // ci assicuriamo che ci sia
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### Ordine di risoluzione dei nomi

Tutti gli scope in JavaScript, *scope globale* incluso, hanno lo speciale
nome [`this`](#function.this) definito in essi, che fa riferimento
all'*oggetto attuale*.

Gli scope di funzione hanno anche il nome [`arguments`](#function.arguments)
definito in essi, che contiene gli argomenti passati alla funzione.

Per esempio, cercando di accedere ad una variabile di nome `foo` all'interno
dello scope di una funzione, JavaScript effettuerà una ricerca del nome nel
seguente ordine:

 1. Nel caso ci sia un'istruzione `var foo` nello scope attuale, usa quella.
 2. Se uno dei parametri funzione si chiama `foo`, usa quello.
 3. Se la funzione stessa si chiama `foo`, usa quella.
 4. Vai al successivo scope esterno e ricomincia dal numero **1**.

> **Nota:** avere un parametro di nome `arguments` **preverrà** la creazione
> dell'oggetto `arguments` di default.

### Spazi di nome (Namespace)

Un comune problema associato al fatto di avere un solo spazio nomi globale,
è che facilmente si incappa in problemi dove i nomi di variabile si
sovrappongono. In JavaScript queso problema può essere facilmente evitato
con l'aiuto dei *contenitori anonimi*.

    (function() {
        // "namespace" auto contenuto

        window.foo = function() {
            // una closure esposta
        };

    })(); // esecue immediatamente la funzione

Le funzioni anonime sono considerate [espressioni](#function.general), quindi
per poter essere richiamabili, esse devono prima essere valutate.

    ( // valuta la funzione dentro le parentesi
    function() {}
    ) // e ritorna l'oggetto funzione
    () // richiama il risultato della valutazione

Ci sono altri modi per valutare e chiamare direttamente l'espressione funzione
i quali, sebbene differenti nella sintassi, hanno tutti il medesimo effetto.

    // Alcuni modi per invocare direttamente la
    !function(){}()
    +function(){}()
    (function(){}());
    // e così via...

### In conclusione

Si raccomanda sempre di usare un *contenitore anonimo* per incapsulare il
codice nel suo proprio namespace. Questo non solo protegge il codice da
eventuali conflitti con i nomi, ma permette anche una migliore modularizzazione
dei programmi.

Inoltre, l'uso delle variabili globali è considerato una **cattiva pratica**.
**Qualsiasi** loro uso indica codice scritto male che è suscettibile ad errori
e difficile da mantenere.

