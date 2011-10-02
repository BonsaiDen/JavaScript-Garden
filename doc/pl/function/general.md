## Deklaracje funkcji i wyrażenia funkcyjne

Funcje w języku JavaScript są [typami pierwszoklasowymi][1], co oznacza, że mogą 
być przekazywane jak każda inna wartość. Jednym z typowych zastosowań tej cechy 
jest przekazywanie *anonimowej funkcji* jako callback do innej, prawdopodobnie 
asynchronicznej funkcji.

### Deklaracja funckcji

    function foo() {}

Powyższa funkcja zostaje [wyniesiona](#function.scopes) zanim program wystartuje. Dzięki temu 
jest dostępna *wszędzie* w ramach zasięgu, w którym została *zadeklarowana*,
nawet, jeżeli ta funkcja została wywołana przed faktyczną definicją w kodzie źródłowym.

    foo(); // Działa ponieważ definicja funkcji została wyniesiona 
           // na początek zasięgu przed uruchomieniem kodu
    function foo() {}

### Wyrażenie funkcyjne

    var foo = function() {};

Ten przykład przypisuje nienazwaną i *anonimową* funkcję do zmiennej `foo`.  

    foo; // 'undefined'
    foo(); // wyrzuca błąd TypeError
    var foo = function() {};

Ze względu na fakt, że deklaracja `var` wynosi zmienną `foo` na początek zasięgu 
zanim kod faktycznie zostanie uruchomiony, `foo` będzie zdefiniowane kiedy skrypt 
będzie wykonywany.

Ale ponieważ przypisania robione są dopiero podczas wykonania, wartość `foo` będzie 
ustawiona na domyślną wartość [undefined](#core.undefined) zanim powyższy kod 
zostanie uruchomiony.

### Nazwane wyrażenia funkcyjne

Kolejnym specjalnym przypadkiem jest przypisanie nazwanej funkcji. 

    var foo = function bar() {
        bar(); // Działa
    }
    bar(); // wyrzuca ReferenceError

W zewnętrznym zakresie `bar` nie będzie dostępna, ponieważ funkcja zostaje 
przypisana do `foo`, jednakże w wewnętrznym zakresie `bar` będzie dostępna.
Jest to spowodowane tym, jak działa [rozwiązywanie nazw](#function.scopes) 
w języku JavaScript. Nazwa funkcji jest *zawsze* dostępna w lokalnym 
zakresie tej funkcji.

[1]: http://pl.wikipedia.org/wiki/Typ_pierwszoklasowy
