## `undefined` i `null`

JavaScript ma dwie różne wartości dla `pustych` wartości, bardziej użyteczną 
z tych dwóch jest `undefined`.

### Wartość `undefined`

`undefined` jest typem z dokładnie jedną wartością: `undefined`.

Język również definiuje globalną zmienną, która ma wartość `undefined`, zmienna 
ta jest nazwana `undefined`. Jednakże jest to zmienna a **nie** stała czy słowo 
kluczowe w języku. Oznacza to że możliwe jest nadpisanie *wartości* tej zmiennej.

> Uwaga ES55: `undefined` w ECMAScript 5 **nie będzie już** *nadpisywalna* w trybie
> strict mode, ale jej nazwa może zostać przysłonona przez na przykład funkcję o 
> nazwie `undefined`.

Kilka przykładów kiedy wartość `undefined` jest zwracana:

 - Dostęp do (niemodyfikowalnej) zmiennej globalnej `undefined`.
 - Wyjście z funkcji, która nie ma deklaracji `return`.
 - Deklaracja `return`, która nic jawnie nie zwraca.
 - Poszukiwanie nieistniejącej właściwości.
 - Parametr funkcji, który nie został jawnie przekazany podczas wywołania funkcji
 - Wszystko co zostało ustawione na wartość `undefined`

### Obsługa przypadku zmiany wartości `undefined`

Ponieważ globalna zmienna `undeined` tylko zawiera kopię prawdziwej *wartości* typu 
`undefined`, przypisanie nowej wartości do tej zmiennej **nie** zmienia wartości 
*typu* `undefined`.

Jednak, aby porównać coś do wartości `undefined` potrzebne jest odczytanie wartości 
`undefined`.

Aby uchronić swój kod przeciwko możliwemu nadpisaniu zmiennej `undefined`, korzysta 
się z powszechnej techniki dodania dodatkowego parametru do 
[anonimowego wrappera](#function.scopes), do którego nie zostanie przekazany 
argument.

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined lokalnym zasięgu znowu 
        // odnosi się do poprawnej wartości

    })('Hello World', 42);

Kolejnym sposobem aby osiągnąć ten sam efekt jest użycie deklaracji zmiennej 
wewnątrz wrappera.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

Jedyną różnicą pomięcy tymi sposobami są dodatkowe 4 bajty przeznaczone na słowo 
kluczowe `var` i spację po nim.

### Zastosowanie `null`

Podczas gdy `undefined` w kontekście języka jest używany jak *null* w sensie 
tradycyjnych języków, to `null` w JavaScript (jako literał i jako typ) jest po 
prostu kolejnym typem danych.

Jest wykorzystywany we wnętrzu JavaScript (np. deklaracji końca łańcucha prototypów 
poprzez ustawienie `Foo.prototype = null`), ale prawie w każdym przypadku można go 
zastąpić przez `undefined`.

