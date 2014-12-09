## Zasięg zmiennych i przestrzenie nazw

Mimo że JavaScript radzi sobie dobrze ze składnią opisującą dwa pasujące 
nawiasy klamrowe jako blok, to jednak **nie** wspiera zasięgu blokowego. 
Jedynym zasięgiem jaki istnieje w JavaScript jest *zasięg funkcyjny*.

    function test() { // definiuje zasięg (scope)
        for(var i = 0; i < 10; i++) { // nie definiuje zasięgu (scope)
            // count
        }
        console.log(i); // 10
    }

> **Uwaga:** Jeżeli notacja `{...}` nie jest użyta w przypisaniu, deklaracji return
> lub jako argument funkcji, to zostanie zinterpretowana jako deklaracja bloku, 
> a **nie** jako literał obiektu. W połączeniu z [automatycznym wstawianiem średnika](#core.semicolon), 
> może prowadzić do subtelnych błędów.

W JavaScripcie nie ma również przestrzeni nazw, co oznacza, że wszystko jest 
definiowane w jednej *globalnie współdzielonej* przestrzeni nazw. 

Z każdym odwołaniem do zmiennej, JavaScript przeszukuje w górę wszystkie zasięgi 
dopóki nie znajdzie tej zmiennej. W przypadku, gdy przeszukiwanie dotrze do globalnego 
zasięgu i nadal nie znajdzie żądanej nazwy, to wyrzuca błąd `ReferenceError`.

### Zmora globalnych zmiennych

    // script A
    foo = '42';

    // script B
    var foo = '42'

Powyższe dwa skrypty **nie** dają tego samego efektu. Skrypt A definiuje zmienną 
nazwaną `foo` w *globalnym* zasięgu, natomiast skrypt B definiuje `foo` 
w *aktualnym* zasięgu.

Jeszcze raz, to wcale nie daje *tego samego efektu*. Nie użycie `var` może mieć 
poważne konsekwencje.

    // globalny zasięg
    var foo = 42;
    function test() {
        // lokalny zasięg
        foo = 21;
    }
    test();
    foo; // 21

Pominięcie słowa `var` w deklaracji wewnątrz funkcji `test` nadpisze wartość 
zmiennej globalnej `foo`. Mimo że nie wygląda to na początku na duży problem, 
posiadanie wielu tysięcy linii kodu w JavaScript i nie korzystanie z `var` 
wprowadzi straszne i trudne do wyśledzenia błędy.
    
    // globalny zasięg 
    var items = [/* jakaś lista */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }

    function subLoop() {
        // scope of subLoop
        for(i = 0; i < 10; i++) { // brakuje słowa var w deklaracji
            // do amazing stuff!
        }
    }

Zewnętrzna pętla zakończy działanie po pierwszym wywołaniu `subLoop`, ponieważ 
`subLoop` nadpisuje wartość globalnej zmiennej `i`. Użycie `var` w drugiej pętli 
`for` pozwoliłoby łatwo uniknąć problemu. Słowo kluczowe `var` nie powinno być 
**nigdy** pominięte w deklaracji, chyba że *pożądanym skutkiem* jest wpłynięcie na 
zewnętrzny zasięg.

### Lokalne zmienne

Jedynym źródłem zmiennych lokalnych w JavaScripcie są parametry [funkcji](#function.general) 
oraz zmienne zadeklarowane poprzez deklaracje `var` wewnątrz funkcji.

    // globalny zasięg
    var foo = 1;
    var bar = 2;
    var i = 2;

    function test(i) {
        // lokalny zasięg fukcji test
        i = 5;

        var foo = 3;
        bar = 4;
    }
    test(10);

Zmienne `foo` oraz `i` są lokalnymi zmiennymi wewnątrz zasięgu funkcji `test`, 
natomiast przypisanie wartości do `bar` nadpisze zmienną globalną o tej samej nazwie.
 
### "Hoisting" - wywindowanie, podnoszenie 

JavaScript **winduje** deklaracje. Oznacza to, że zarówno deklaracja ze słowem 
kluczowym `var` jak i deklaracje funkcji `function` zostaną przeniesione na 
początek otaczającego zasięgu.

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

Powyższy kod zostanie przekształcony przed rozpoczęciem wykonania. JavaScript 
przeniesie deklarację zmiennej `var` oraz deklarację funkcji `function` na szczyt 
najbliższego zasięgu.

    // deklaracje var zostaną przeniesione tutaj
    var bar, someValue; // ustawione domyślnie na 'undefined'

    // deklaracje funkcji zostaną również przeniesione na górę
    function test(data) {
        var goo, i, e; // brak blokowego zasięgu spowoduje przeniesienie tutaj
        if (false) {
            goo = 1;

        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // powoduje błąd TypeError ponieważ bar jest nadal 'undefined'
    someValue = 42; // przypisania nie zostają zmienione przez 'hoisting'
    bar = function() {};

    test();

Brak blokowego zasięgu nie tylko przeniesie deklaracje `var` poza ciało pętli,
ale również spowoduje, że niektóre porównania `if` staną się nieintuicyjne.

W oryginalnym kodzie instrukcja warunkowa `if` zdaje się modyfikować *zmienną 
globalną* `goo`, podczas gdy faktycznie modyfikuje ona *zmienną lokalną* - po tym 
jak zostało zastosowane windowanie (hoisting).

Bez wiedzy na temat podnoszenia (hoistingu), poniższy kod może sprawiać wrażenie,
że zobaczymy błąd `ReferenceError`.

    // sprawdz czy SomeImportantThing zostało zainicjalizowane
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

Oczywiście powyższy kod działa ze względu na fakt, że deklaracja `var` zostanie 
przeniesiona na początek *globalnego zasięgu*.

    var SomeImportantThing;

    // inny kod który może ale nie musi zainicjalizować SomeImportantThing

    // upewnienie się, że SomeImportantThing zostało zainicjalizowane
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### Kolejność rozwiązywania nazw

Wszystkie zasięgi w JavaScripcie, włączając *globalny zasięg*, posiadają 
zdefiniowaną wewnątrz specjalną nazwę [`this`](#function.this), która wskazuje 
na *aktualny obiekt*. 

Zasięg funkcyjny posiada również zdefiniowaną wewnętrznie nazwę 
[`arguments`](#function.arguments), która zawiera listę argumentów przekazaną do 
funkcji.

Na przykład, kiedy próbujemy odczytać zmienną `foo` wewnątrz zasięgu funkcji, 
JavaScript będzie szukać nazwy w określonej kolejności:
 1. Jeżeli wewnątrz aktualnego zasięgu znajduje się deklaracja `var foo` skorzystaj z niej.
 2. Jeżeli jeden z parametrów fukcji został nazwany `foo` użyj go.
 3. Jeżeli fukcja została nazwana `foo` skorzystaj z tego.
 4. Przejdz do zewnętrznego zasięgu i przejdz do kroku **#1**.

> **Uwaga:** Jeżeli jeden z parametrów fukcji został nazwany `arguments`, zapobiegnie 
> to utworzeniu domyślnego obiektu `arguments`.

### Przestrzenie nazw

Powszechnym problemem posiadania tylko jednej globalnej przestrzeni nazw jest 
prawdopodobieństwo wystąpienia kolizji nazw. W JavaScripcie, można łatwo uniknąć 
tego problemu korzystając z *anonimowych wrapperów*.

    (function() {
        // autonomiczna "przestrzeń nazw"
        
        window.foo = function() {
            // wyeksponowane domkniecie (closure)
        };

    })(); // natychmiastowe wykonanie funkcji

Anonimowe funkcje są rozpoznane jako [wyrażenia](#function.general), więc 
aby mogły zostać wywołane muszą zostać zewaluowane.

    ( // zewaluowanie funkcji znajdującej się wewnątrz nawiasów
    function() {}
    ) // zwrócenie obiektu funkcji
    () // wywołanie rezultatu ewaluacji

Istnieją inne sposoby aby zewaluować i wykonać wyrażenie funkcyjne. Mimo że 
mają inną składnię, zachowują się dokładnie tak samo.

    // Trzy inne sposoby
    !function(){}();
    +function(){}();
    (function(){}());

### Wnioski

Zaleca się, aby zawsze używać *anonimowych wrapperów* do hermetyzacji kodu wewnątrz 
jego własnej przestrzeni nazw. To nie tylko chroni kod przed kolizją nazw, ale 
również wprowadza lepszą modularyzację programów.

Ponadto, stosowanie zmiennych globalnych jest uznawane za złą praktykę. 
Wykorzystanie zmiennych globalnych wskazuje na źle napisany kod, który 
jest podatny na błędy i trudny do utrzymania.

