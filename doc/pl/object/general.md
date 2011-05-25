## Wykorzystanie obiektów i ich właściwości

Wszystko w JavaScripcie zachowuje sie jak obiekt, z dwoma wyjątkami
[`null`](#core.undefined) oraz [`undefined`](#core.undefined). 

    false.toString() // 'false'
    [1, 2, 3].toString(); // '1,2,3'
    
    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

Popularnym błędem jest wykorzystanie literałów liczbowych jako obiektu.
Spowodowanie jest to usterką w parserze JavaScript, który interpretuje kropkę
po literale liczbowym jako rozdzielenie części całkowitej od części po przecinku 
liczby.

    2.toString(); // wyrzuca błąd SyntaxError

Istnieje kilka rozwiązań, dzieki którym literał liczbowy będzie zachowywał się 
jak obiekt.

    2..toString(); // druga kropka jest poprawnie rozpoznana
    2 .toString(); // zauważ, że pozostawiona jest spacja przed kropką
    (2).toString(); // 2 zostanie zewaluowane najpiewr

### Obiekty jako typy danych

Obiekty w języku JavaScript mogą być używana jako [*tablice asocjacyjne*][1]. 
Ponieważ obiekty głównie składają się z mapowań pomiędzy nazwanymi właściwościami (kluczami)
a wartościami dla tych atrybutów.

Używając literału obiektu - notacji `{}` - istnieje możliwość stworzenie obiektu prostego.
Ten nowy obiekt bedzie [dziedziczył](#object.prototype) z `Object.prototype` oraz 
nie bedzie posiadał żadnych [własnych właściwości](#object.hasownproperty) zdefiniowanych w sobie.

    var foo = {}; // nowy pusty obiekt

    // nowy obiekt z właściwością test o wartości 12
    var bar = {test: 12}; 

### Dostęp do właściwości

Właściwości obiektu można uzyskać na dwa sposoby, poprzez notację z kropką
lub notacje z nawiasami kwadratowymi.
    
    var foo = {name: 'Kitten'}
    foo.name; // kitten
    foo['name']; // kitten
    
    var get = 'name';
    foo[get]; // kitten
    
    foo.1234; // wyrzuca błąd SyntaxError
    foo['1234']; // działa, zwraca undefined

Obie notacje są identyczne w swoim działaniu, z tą tylko różnicą że notacja z nawiasami 
kwadratowymi pozwala na dynamiczne dodawanie właściwości i nie prowadzi do wyrzycenia
błędu podczas odczytu nieistniejącej właściwości.

### Usuwanie właściwości

Jedynym sposobem na faktycze usunięcie własności z obiektu jest użycie operatora 
`delete`. Ustawienie własności na `undefined` lub `null` usunie tylko *wartość* 
związaną z własnością, ale nie usunie to *klucza* (nazwy własności) z obiektu.

    var obj = {
        bar: 1,
        foo: 2,
        baz: 3
    };
    obj.bar = undefined;
    obj.foo = null;
    delete obj.baz;

    for(var i in obj) {
        if (obj.hasOwnProperty(i)) {
            console.log(i, '' + obj[i]);
        }
    }

Powyższy kod wypisuje dwie linie `bar undefined` i `foo null` - tylko własność `baz`
została usunięta i dlatego nie została wypisana.

### Notacja właściwości

    var test = {
        'case': 'I am a keyword so I must be notated as a string',
        delete: 'I am a keyword too so me' // wyrzuca błąd SyntaxError
    };

Nazwy właściwości obiektu mogą być zarówno zapisane jako tekst(bez cudzysłowów 
lub apostrofów) lub jako string (w cudzisłowach lub apostrofach). 
Ze względu na kolejne niedociągnięcie w parserze JavaScript
powyższy kod wyrzuci błąd `SyntaxError` dla implementacji JavaScript ponizej ECMAScript 5.

Ten błąd wynika z faktu, że `delete` jest *słowem kluczowym*, dlatego musi zostać 
zapisany jako *string* (z cudzysłowami lub apostrofami), aby zapewnić, że zostanie 
to poprawnie zinterpretowane przez starsze silniki języka JavaScript.

[1]: http://pl.wikipedia.org/wiki/Tablica_asocjacyjna

