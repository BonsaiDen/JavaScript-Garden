## Perché non usare `eval`

La funzione `eval` eseguirà una stringa di codice JavaScript nello scope locale.

    var number = 1;
    function test() {
        var number = 2;
        eval('number = 3');
        return number;
    }
    test(); // 3
    number; // 1

Comunque, `eval` esegue solo nello scope locale quando viene chiamata
direttamente *e* quando il nome della funzione chiamata è `eval`.

    var number = 1;
    function test() {
        var number = 2;
        var copyOfEval = eval;
        copyOfEval('number = 3');
        return number;
    }
    test(); // 2
    number; // 1

L'uso di `eval` dovrebbe essere evitato. Il 99.9% dei suoi "utilizzi" può
essere ottenuto **senza** di essa.

### `eval` sotto mentite spoglie

Le [funzioni di timeout](#other.timeouts) `setTimeout` e `setInterval` possono
entrambe accettare una stringa come loro primo argomento. Questa stringa verrà
**sempre** eseguita nello scope globale dato che `eval` non viene chiamato
direttamente in questo caso.

### Problemi di sicurezza

`eval` è anche un problema di sicurezza, perché essa esegue **qualsiasi**
codice le viene passato. Non si dovrebbe **mai** usare con stringhe di origine
sconosciuta o inaffidabile.

### In conclusione

`eval` non dovrebbe mai essere usata. Qualsiasi codice che ne faccia uso dovrebbe
essere messo in discussione sotto l'aspetto della funzionalità, della performance
e della sicurezza. Se qualcosa richiede `eval` per poter funzionare, allora **non**
dovrebbe essere usato in primo luogo, ma si dovrebbe prevedere una
*miglior progettazione* che non richieda l'uso di `eval`.
