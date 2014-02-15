## Inserimento automatico dei punti-e-virgola

Sebbene JavaScript utilizzi lo stile di sintassi del C, esso **non**
obbliga l'uso dei punti-e-virgola nel codice sorgente, perciò è possibile
ometterli.

Detto questo, JavaScript non è un linguaggio che fa a meno dei punti-e-virgola.
Infatti, esso necessita di punti-e-virgola per poter comprendere il codice
sorgente. Quindi, il parser del JavaScript li inserisce **automaticamente**
ogni volta che incontra un errore di analisi dato dalla mancanza di un
punto-e-virgola.

    var foo = function() {
    } // errore di analisi, atteso punto-e-virgola
    test()

Quindi avviene l'inserimento, ed il parser prova nuovamente.

    var foo = function() {
    }; // nessun errore, il parser continua
    test()

L'inserimento automatico dei punti-e-virgola è considerato essere uno dei
**più grandi** errori di progettazione del linguaggio, perché *può*
modificare il comportamento del codice.

### Come funziona

Il codice qui sotto non ha punti-e-virgola, quindi sta al parser decidere dove
inserirli.

    (function(window, undefined) {
        function test(options) {
            log('testing!')

            (options.list || []).forEach(function(i) {

            })

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            )

            return
            {
                foo: function() {}
            }
        }
        window.test = test

    })(window)

    (function(window) {
        window.someLibrary = {}

    })(window)

Di seguito il risultato del gioco da "indovino" del parser.

    (function(window, undefined) {
        function test(options) {

            // Non inserito, linee unite
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- inserito

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- inserito

            return; // <- inserito, invalida l'istruzione return
            { // trattato come un blocco

                // un'etichetta e una singola espressione
                foo: function() {}
            }; // <- inserito
        }
        window.test = test; // <- inserito

    // Le linee vengono unite nuovamente
    })(window)(function(window) {
        window.someLibrary = {}; // <- inserito

    })(window); //<- inserito

> **Nota:** il parser del JavaScript non gestisce "correttamente" le istruzioni
> return che sono seguite da un ritorno a capo. Mentre questo non è necessariamente
> da considerarsi un errore dell'inserimento automatico di punti-e-virgola, esso
> può ancora essere considerato un effetto collaterale indesiderato.

Il parser ha drasticamente modificato il comportamento del codice. In alcuni casi,
questo porta ad eseguire **cose sbagliate**.

### Parentesi ad inizio riga

Nel caso di parentesi ad inizio riga, il parser **non** inserirà un punto-e-virgola.

    log('testing!')
    (options.list || []).forEach(function(i) {})

Questo codice viene trasformato in una sola linea.

    log('testing!')(options.list || []).forEach(function(i) {})

Le possibilità che `log` **non** ritorni una funzione sono **veramente** alte,
perciò il codice qui sopra porterà ad un `TypeError` dichiarando che
`undefined is not a function` (undefined non è una funzione).

### In conclusione

&Egrave; fortemente raccomandato di non omettere **mai** i punti-e-virgola.
Si raccomanda anche di mantenere le parentesi sulla stessa linea della
corrispondente istruzione, e di non ometterle mai in istruzioni `if` / `else`
a linea singola. Queste misure precauzionali non solo miglioreranno la
consistenza del codice, ma preverranno anche che il parser JavaScript
modifichi il comportamento del codice in modo inaspettato.

