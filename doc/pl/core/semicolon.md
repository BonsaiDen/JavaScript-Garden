## Automatyczne wstawianie średnika

Mimo, że JavaScript ma składnię podobną do języka C, to **nie** wymusza stosowania 
średników w kodzie źródłowym. Istnieje możliwość ich pominięcia.  

Lecz JavaScript nie jest językiem bez średników, tak na prawdę potrzebuje 
średników aby zinterpretować kod źródłowy. Jednakże parser JavaScript 
**automatycznie** wstawia średniki o ile napotka błąd parsowania związany z 
brakiem średnika.

    var foo = function() {
    } // błąd parsowania, oczekiwany był w tym miejscu średnik
    test()

Parser dodaje średnik, i próbuje jeszcze raz sparsować skrypt.

    var foo = function() {
    }; // bez błędu parser kontynuuje
    test()

Automatyczne wstawianie średników jest uważane za jeden z **największych** błędów 
konstrukcji języka, ponieważ *może* ono zachowanie kodu.

### Jak działa wstawianie

Kod poniżej nie ma żadnych średników, więc parser zdecyduje, w których miejscach 
je wstawi.

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

Poniżej znajduje się rezultat "zgadywania" parsera.

    (function(window, undefined) {
        function test(options) {

            // Nie wstaniony średnik, linie zostały połączone
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- wstawiony

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- wstawiony

            return; // <- wstawiony, psując deklarację return
            { // potraktowane jako definicja bloku

                // etykieta oraz pojedyncze wyrażenie
                foo: function() {} 
            }; // <- wstawiony
        }
        window.test = test; // <- wstawiony

    // Kolejna połączona linia
    })(window)(function(window) {
        window.someLibrary = {}; // <- wstawiony

    })(window); //<- wstawiony

> **Uwaga:** Parser JavaScript nie potrafił "odpowiednio" zinterpretować 
> deklaracji return, po którje został dodany znak nowej linii. Mimo, że 
> niekoniecznie jest to błąd automatycznego wstawiania średników, to może to 
> jednak powodować niechciane efekty uboczne 

Parser drastycznie zmienił działanie powyższego kodu, w niektórych przypadkach 
**zmienił go źle**.

### Nawiasy

W przypadku, gdy w następnej linii znajduje się nawias, parser **nie** wstawi 
średnika.

    log('testing!')
    (options.list || []).forEach(function(i) {})

Ten kod zostanie zmieniony w poniższą jedną linię.

    log('testing!')(options.list || []).forEach(function(i) {})

Jest **bardzo** prawdopodobne, że `log` **nie** zwróci fukcji, co za tym idzie 
powyższy kod wyrzuci błąd `TypeError` oznajmując, że `undefined is not a 
function` - `undefined` nie jest funkcją.

### Wnioski

Zaleca się aby **nigdy** nie pomijać średników, pozostawiać nawias otwierający 
w tej samej linii co odpowiadająca mu definicja i nigdy nie pozostawiać deklaracji 
`if` / `else` bez nawiasów nawet jeżeli są jednolinijkowe. Wszystkie te uwagi nie 
tylko pomagają poprawić spójność kodu, ale również zapobiegają parser JavaScript 
przed zmianą działania kod.

