## `hasOwnProperty`

W celu sprawdzenia, czy dana właściwość została zdefiniowana *w tym* obiekcie, a **nie** 
w [łańcuchu prototypów](#object.prototype), niezbędne jest skorzystanie z metody 
`hasOwnProperty`, której wszystkie obiekty dziedziczą z `Object.prototype`.

> **Uwaga:** **Nie** wystarczy sprawdzić, czy właściwość jest `undefined`,
> ponieważ właściwość może istnieć, ale jej wartość być ustawiona na `undefined`. 

`hasOwnProperty` jest jedyną metodą w języku JavaScript, która operuje na właściwościach 
i **nie** przegląda całego łańcucha prototypów. 

    // Zatrucie Object.prototype
    Object.prototype.bar = 1; 
    var foo = {goo: undefined};
    
    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

Tylko `hasOwnProperty` da prawidłowy i oczekiwany rezultat. Jest to istotne podczas 
iteracji po właściwościach obiektu. **Nie** ma innego sposobu na ominięcie
właściwości, która nie została zdefiniowana przez ten **konkretny** obiekt, 
ale gdzieś indziej w łańcuchu prototypów. 

### `hasOwnProperty` jako właściwość

JavaScript **nie** chroni właściwości o nazwie `hasOwnProperty`, zatem istnieje 
możliwość, że obiekt będzie posiadać tak nazwaną właściwość. Konieczne jest użycie
*zewnętrznego* `hasOwnProperty`, aby otrzymać poprawne rezultaty.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // zawsze zwraca false

    // Została użyta metoda innego obiektu i wywołana z kontekstem 
    // `this` ustawionym na foo
    ({}).hasOwnProperty.call(foo, 'bar'); // true

### Wnioski

**Jedyną** metodą służącą do sprawdzenia istnienia jakiejś właściwości w konkretnym 
obiekcie jest metoda `hasOwnProperty`. Zaleca się korzystać z `hasOwnProperty` w 
**każdej** [pętli `for in`](#object.forinloop). Pozwoli to uniknąć błędów pochodzących 
z rozszerzonych natywnych [prototypów](#object.prototype).

