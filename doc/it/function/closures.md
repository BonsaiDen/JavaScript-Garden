## Closures e riferimenti

Una delle caratteristiche più potenti di JavaScript è la disponibilità delle
*closure*. Con le closure, gli scope hanno **sempre** accesso allo scope
più esterno nel quale sono state definite. Dal momento che il solo scope che
JavaScript ha è lo [scope di funzione](#function.scopes), tutte le funzioni,
per default, agiscono da closure.

### Emulare variabili private

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

Qui, `Counter` ritorna **due** closure: la funzione `increment` e `get`.
Entrambe mantengono un **riferimento** allo scope di `Counter` e, quindi,
hanno sempre accesso alla variabile `count` definita in quello scope.

### Perché le variabili private funzionano

Dato che non è possibile fare riferimento o assegnare scope in JavaScript,
**non** c'è modo per accedere alla variabile `count` dall'esterno. Il solo
modo per interagire con essa è tramite le due closure.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

Il codice sopra **non** modificherà la variabile `count` nello scope di `Counter`,
dato che `foo.hack` non è stato definito in **quello** scope. Invece, creerà
(o meglio, sostituirà) la variabile *globale* `count`.

### Closure nei cicli

Un errore che spesso viene fatto è quello di usare le closure all'interno dei
cicli, come se stessero copiando il valore della variabile dell'indice del ciclo.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);
        }, 1000);
    }

Questo esempio **non** stamperà i numeri da `0` a `9`, ma semplicemente il
numero `10` dieci volte.

La funzione *anonima* mantiene un riferimento ad `i`, ma al momento in cui
`console.log` viene richiamata, il `ciclo for` è già terminato, ed il valore
di `i` è stato impostato a `10`.

Per ottenere l'effetto desiderato, è necessario creare una **copia** del valore
di `i`.

### Evitare il problema del riferimento

Per copiare il valore della variabile indice del ciclo, è meglio usare un
[contenitore anonimo](#function.scopes).

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);
            }, 1000);
        })(i);
    }

La funzione anonima più esterna viene chiamata immediatamente con `i` come
suo primo argomento e riceverà una copia del **valore** di `i` come suo
parametro `e`.

La funzione anonima che viene passata a `setTimeout` ora ha un riferimento a
`e`, il cui valore **non** viene modificato dal ciclo.

C'è anche un altro possibile modo per ottenere il medesimo risultato, e cioè
ritornare una funzione dal contenitore anonimo che avrà quindi lo stesso
comportamento del codice visto precedentemente.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }

C'è un ulteriore modo per ottenere ciò, usando `.bind`, che può assegnare un
contesto `this` e degli argomenti ad una funzione. Esso funziona allo stesso
modo degli esempi precedenti

    for(var i = 0; i < 10; i++) {
        setTimeout(console.log.bind(console, i), 1000);
    }
