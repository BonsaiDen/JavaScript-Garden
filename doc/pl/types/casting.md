## Rzutowanie typów

JavaScript jest językiem słabo typowanym. Co za tym idzie, będzie stosować koercję 
typów **gdziekolwiek** jest to możliwe.

    // te zwracają true
    new Number(10) == 10; // Number.toString() zostanie przekształcone
                          // z powrotem do liczby

    10 == '10';           // stringi zostaną przekształcone do typu Number
    10 == '+10 ';         // kolejne wariacje
    10 == '010';          // i następne
    isNaN(null) == false; // null zostanie przekształcony do 0
                          // który oczywiście nie jest NaN
    
    // poniższe zwracają false
    10 == 010;
    10 == '-10';

> **Uwaga ES5: Literały liczbowe zaczynające sie od `0` są interpretowane jako
> liczby w systemie ósemkowym. W trybie strict mode w ECMAScript 5 wsparcie dla 
> liczb ósemkowych zostało porzucone.

Aby uniknąć powyższych problemów, należy **koniecznie** korzystać ze 
[ściełego operatora równości](#types.equality). Mimo, że pozwala to uniknąć wiele 
typowych problemów to nadal istnieje wiele innych, które powstają na bazie słabego 
typowania języka JavaScript.

### Konstruktory typów wbudowanych

Konstruktory typów wbudowanych, takich jak `Number` lub `String`, zachowują się 
inaczej kiedy są poprzedzone słowem kluczowym `new` a inaczej kiedy nie są.

    new Number(10) === 10;     // False, Object i Number
    Number(10) === 10;         // True, Number i Number
    new Number(10) + 0 === 10; // True, ponieważ dokonano jawnej konwersji

Korzystanie z wbudowanych typów jak `Number` jako konstruktora tworzy nowy obiekt 
typu `Number`, natomiast opuszczenie słowa kluczowego `new` powoduje, że funkcja 
`Number` zachowuje się jak konwerter.

Ponadto, użycie literałów lub wartości nieobiektowych zaowocuje jeszcze większą 
ilością rzutowań (koercją) typów.

Najlepszym rozwiązaniem jest **jawne** rzutowanie do jednego z trzech typów.

### Rzutowanie do typu String

    '' + 10 === '10'; // true

Konkatenacja pustego stringu i wartości powoduje rzutowanie do typu String. 

### Rzutowanie do typu Number

    +'10' === 10; // true

Zastosowanie **unarnego** operatora + spowoduje rzutowanie do typu Number.

### Rzutowanie do typu Boolean

Używając dwukrotnie operatora **negacji**, dowolna wartość może zostać zrzutowana 
do typu Boolean

    !!'foo';   // true
    !!'';      // false
    !!'0';     // true
    !!'1';     // true
    !!'-1'     // true
    !!{};      // true
    !!true;    // true


