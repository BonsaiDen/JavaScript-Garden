## `undefined` i `null`

JavaScript ma dwie różne wartości dla `pustych` wartości, bardziej użyteczną 
z tych dwóch jest `undefined`.

### Wartość `undefined`

`undefined` jest typem z dokładnie jedną wartością: `undefined`.

Język również definiuje globalną zmienną, która ma wartość `undefined` - zmienna 
ta jest nazwana `undefined`. Jednakże jest to zmienna a **nie** stała, czy słowo 
kluczowe. Oznacza to, że możliwe jest nadpisanie *wartości* tej zmiennej.

> Uwaga ES55: `undefined` w ECMAScript 5 **nie będzie już** *nadpisywalna* w trybie
> strict mode, ale jej nazwa może zostać przesłoniona przez na przykład funkcję o 
> nazwie `undefined`.

Kilka przykładów kiedy wartość `undefined` jest zwracana:

 - dostęp do (niemodyfikowalnej) zmiennej globalnej `undefined`,
 - wyjście z funkcji, która nie ma deklaracji `return`,
 - deklaracja `return`, która nic jawnie nie zwraca,
 - poszukiwanie nieistniejącej właściwości,
 - parametr funkcji, który nie został jawnie przekazany podczas wywołania funkcji,
 - wszystko czemu została przypisana wartość `undefined`.

### Obsługa przypadku zmiany wartości `undefined`

Ponieważ globalna zmienna `undefined` zawiera tylko kopię prawdziwej *wartości* typu 
`undefined`, przypisanie nowej wartości do tej zmiennej **nie** zmienia wartości 
*typu* `undefined`.

Jednak aby porównać coś z wartością `undefined`, trzeba odczytać wartość `undefined`.

Aby uchronić swój kod przed możliwym nadpisaniem zmiennej `undefined`, korzysta 
się z powszechnej techniki dodania dodatkowego parametru do 
[anonimowego wrappera](#function.scopes), do którego nie zostanie przekazany 
argument.

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined o lokalnym zasięgu znowu 
        // odnosi się do poprawnej wartości

    })('Hello World', 42);

Kolejnym sposobem na osiągnięcie tego samego efektu jest użycie deklaracji zmiennej 
wewnątrz wrappera.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

Jedyną różnicą pomiędzy tymi sposobami są dodatkowe 4 bajty przeznaczone na słowo 
kluczowe `var` i spację po nim.

### Zastosowanie `null`

Podczas gdy `undefined` w kontekście języka jest używany jak *null* w sensie 
tradycyjnych języków, `null` w JavaScript (jako literał i jako typ) jest po 
prostu kolejnym typem danych.

Jest wykorzystywany we wnętrzu JavaScript (np. deklaracji końca łańcucha prototypów 
poprzez ustawienie `Foo.prototype = null`), ale prawie w każdym przypadku można go 
zastąpić przez `undefined`.

