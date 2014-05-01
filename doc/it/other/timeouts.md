### `setTimeout` e `setInterval`

Dato che JavaScript è asincrono, è possibile programmare l'esecuzione di una
funzione usando le funzioni `setTimeout` e `setInterval`.

> **Nota:** i timeout **non** sono parte dello standard ECMAScript. Essi
> vengono implementati come parte del [DOM][1].

    function foo() {}
    var id = setTimeout(foo, 1000); // ritorna un Number > 0

Quando chiamato, `setTimeout` ritorna l'ID del timeout e programma `foo` per
essere eseguito **approssimativamente** un migliaio di millisecondi nel futuro.
`foo` verrà quindi eseguito **una volta**.

Dipendendo dalla risoluzione del timer del motore JavaScript che esegue il codice,
come anche dal fatto che JavaScript è single threaded e quindi altro codice
potrebbe essere eseguito bloccando il thread, **non è mai** sicuro scommettere
che una funzione verrà eseguita esattamente al ritardo specifiato nella chiamata
a `setTimeout`.

La funzione che è stata passata come primo parametro verrà chiamata dall'*oggetto globale*,
e ciò significa che [`this`](#function.this) all'interno della funzione chiamata
farà riferimento all'oggetto globale.

    function Foo() {
        this.value = 42;
        this.method = function() {
            // this fa riferimento all'oggetto globale
            console.log(this.value); // stamperà undefined
        };
        setTimeout(this.method, 500);
    }
    new Foo();

> **Nota:** dato che `setTimeout` accetta un **oggetto funzione** come suo
> primo parametro, un errore comune è quello di usare `setTimeout(foo(), 1000)`,
> che userà il **valore di ritorno** della chiamata a `foo` e **non** `foo`.
> Questo è, la maggior parte delle volte, un errore silenzioso, dato che quando
> la funzione ritorna `undefined` `setTimeout` **non** solleverà alcun errore.

### Sovrapposizione di chiamate con `setInterval`

Mentre `setTimeout` esegue solo una volta la funzione, `setInterval` (come il
nome suggerisce) eseguirà la funzione **ogni** `X` millisecondi, ma il suo
utilizzo è sconsigliato.

Quando il codice che viene eseguito blocca la chiamata timeout, `setInterval`
eseguirà ancora più chiamate alla specifica funzione. Questo può, specialmente
con intervalli molto brevi, tradursi in chiamate a funzione che si sovrappongono.

    function foo(){
        // qualcosa che blocca per 1 secondo
    }
    setInterval(foo, 1000);

Nel codice precedente, `foo` verrà chiamato una volta e quindi bloccherà per
un secondo.

Mentre `foo` blocca il codice, `setInterval` continuerà a programmare ulteriori
chiamate ad essa. Ora, quando `foo` ha finito, ci saranno già **dieci** ulteriori
chiamate ad essa in attesa per essere eseguite.

### Gestione di potenziale codice bloccante

La soluzione più semplice, come anche la più controllabile, è quella di usare
`setTimeout` all'interno di se stessa.

    function foo(){
        // qualcosa che blocca per 1 secondo
        setTimeout(foo, 1000);
    }
    foo();

Non solo questo incapsula la chiamata a `setTimeout`, ma previene anche la
sovrapposizione delle chiamate e da un controllo addizionale. `foo` stessa
può ora decidere se vuole continuare ad essere eseguita oppure no.

### Pulizia manuale dei timeout

La pulizia di timeout ed intervalli funziona passando il rispettivo ID a
`clearTimeout` o `clearInterval`, in base a quale `set` di funzioni è stato
usato precedentemente.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### Pulizia di tutti i timeout

Dato che non c'è un metodo interno per la pulizia di tutti i timeout e/o
intervalli, è necessario usare la forza bruta per poter raggiungere questo
scopo.

    // pulisce "tutti" i timeout
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

Ma ci potrebbero ancora essere timeout che non vengono toccati da questo
numero arbitrario. Un altro modo per ottenere ciò, è considerare che l'ID
dato ad un timeout viene incrementato di uno ogni volta che si chiama
`setTimeout`.

    // pulisce "tutti" i timeout
    var biggestTimeoutId = window.setTimeout(function(){}, 1),
    i;
    for(i = 1; i <= biggestTimeoutId; i++) {
        clearTimeout(i);
    }

Sebbene questo funzioni con la maggior parte dei browser odierni, non è
specificato che gli ID debbano essere ordinati in quel modo e ciò potrebbe
anche cambiare in futuro. Perciò, si raccomanda di tener traccia di tutti
gli ID dei timeout, così che possano essere puliti in modo specifico.

### Uso nascosto di `eval`

`setTimeout` e `setInterval` possono anche accettare una stringa come loro
primo parametro. Questa caratteristica non dovrebbe essere **mai** usata
perché internamente fa uso di `eval`.

> **Nota:** dato che le funzioni di timeout **non** sono specificate dallo
> standard ECMAScript, l'esatto funzionamento quando viene passata una stringa
> potrebbe differire nelle varie implementazioni di JavaScript. Per esempio,
> JScript di Microsoft usa il costruttore `Function` al posto di `eval`.

    function foo() {
        // verrà chiamata
    }

    function bar() {
        function foo() {
            // non verrà mai chiamata
        }
        setTimeout('foo()', 1000);
    }
    bar();

Dal momento che `eval` non viene chiamata [direttamente](#core.eval) in questo
caso, la stringa passata a `setTimeout` verrà eseguita nello *scope globale*.
Quindi, non verrà usata la variabile locale `foo` dallo scope di `bar`.

Si raccomanda inoltre di **non** usare una stringa per passare argomenti alla
funzione che verrà chiamata da una delle funzioni di timeout.

    function foo(a, b, c) {}

    // non usare MAI questo
    setTimeout('foo(1, 2, 3)', 1000)

    // Usare invece una funzione anonima
    setTimeout(function() {
        foo(1, 2, 3);
    }, 1000)

> **Nota:** mentre è ancora possibile usare la sintassi
> `setTimeout(foo, 1000, 1, 2, 3)`, non la si raccomanda, dato che il suo
> utilizzo potrebbe portare ad errori subdoli quando usata con i
> [metodi](#function.this).

### In conclusione

Una stringa non dovrebbe **mai** essere usata come parametro di `setTimeout` o
`setInterval`. &Egrave; un chiaro segno di codice **veramente** pessimo, quando
gli argomenti necessitano di essere passati alla funzione che deve essere
chiamata. Dovrebbe invece essere passata una *funzione anonima* che si incarichi
di gestire l'effettiva chiamata.

Inoltre, l'uso di `setInterval` dovrebbe essere evitato perché il suo schedulatore
non viene bloccato dall'esecuzione di JavaScript.

[1]: http://en.wikipedia.org/wiki/Document_Object_Model "Document Object Model"

