## Jak działa `this`

JavaScript posiada inną koncepcję odnośnie tego na co wskazuje specjalna 
nazwa `this`, niż większość innych języków programowania. Istnieją dokładnie 
**pięć** różnych sytuacji w których wartość `this` zostaje przypisana w języku JavaScript.

JavaScript has a different concept of what the special name `this` refers to 
than most other programming languages do. There are exactly **five** different 
ways in which the value of `this` can be bound in the language.

### Zasięg globalny

    this;

Używanie `this` w globalnym zasięgu, zwróci po prostu referencje do obiektu *global*.


### Wywołanie funkcji

    foo();

Tutaj `this` również będzie wkazywało na obiekt *global*

> **Uwaga ES5:** W trybie strict mode, przypadki z globalnym zasięgiem nie mają miejsca.
> W tym przypadku `this` zwróci `undefined` zamiast wartości.

### Wywoływanie metody

    test.foo(); 

W tym przypadku `this` będzie wskazywało na `test`.

### Wywołanie konstruktora

    new foo(); 

Wywołanie funkcji, które jest poprzedzone słowem kluczowym `new` zachowuje się 
jak [konstruktor](#function.constructors). Wewnątrz funkcji `this` będzie 
wskazywało na *nowo utworzony* obiekt.

### Jawne ustawienie `this`

    function foo(a, b, c) {}
                          
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // tablica zostanie zamieniona w to co poniżej
    foo.call(bar, 1, 2, 3); // rezultat a = 1, b = 2, c = 3

Używając metod `call` lub `apply` z prototypu `Function.prototype`, wartość `this` 
wewnątrz wołanej funkcji zostanie **jawnie ustawiona** na pierwszy argument przekazany 
podczas wywołania tych metod.

Zatem w powyższym przykładzie przypadek *Wywoływanie metody* nie będzie miał 
miejsca i `this` wewnątrz `foo` będzie wskazywać na `bar`.

> **Uwaga:** `this` **nie może** zostać użyte jako referencja do obiektu wewnątrz literału 
> `Object`. Zatem `var obj = {me: this}` **nie** spowoduje, że `me` będzie wskazywać na `obj`,
> `this` zostaje związane z wartością tylko w powyższych pięciu wylistowanych przypadkach.

### Częste pułapki

Mimo iż Większość z tych przypadków ma sens, to pierwszy przypadek powinien być 
traktorany jako błąd podczas projektowania języka i **nigdy** nie wykorzystywany 
w praktyce.

    Foo.method = function() {
        function test() {
            // wewnątrz tej funkcji this wskazuje na obiekt global
        }
        test();
    }

Powszechnym nieporozumieniem jest, że `this` wewnątrz `test` wskazuje na `Foo`, 
podczas gdy w rzeczywistości tak **nie jest**.

Aby uzyskać dostęp do `Foo` wewnątrz `test` niezbędne jest stworzenie wewnątrz 
metody lokalnej zmiennej, która będzie wskazywała na `Foo`.

    Foo.method = function() {
        var that = this;
        function test() {
            // Należy używać that zamiast this wewnątrz tej funkcji
        }
        test();
    }

`that` jest zwykłą zmienną, ale jest to powszechnie stosowana konwencja, aby otrzymać 
wartość zewnętrznego `this`. W połączeniu z [domknięciami(closures)](#function.closures) 
jest to sposób na przekazywanie wartości `this` wokoło.

### Metody przypisywania

Kolejną rzeczą, która **nie** działa w języku JavaScript jest nadawanie aliasów 
funkcjom, co oznacza **przypisanie** metody do zmiennej.

    var test = someObject.methodTest;
    test();

Podobnie jak w pierwszym przypadku `test` zachowuje się jak wywołanie zwykłej 
funkcji, a zatem wewnątrz funkcji `this` już nie będzie wskazywało `someObject`.

Podczas gdy późne wiązanie `this` może się na początku wydawać złym pomysłem, 
to w rzeczywistości jest to rzecz, która powoduje że 
[dziedziczenie prototypowe](#object.prototype) działa.

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

Kiedy metoda `method` zostanie wywołana na instancji `Bar`, `this` będzie 
wskazywało właśnie tą instancję.

