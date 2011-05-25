## Operator `typeof` 

Operator `typeof` (razem z operatorem [`instanceof`](#types.instanceof)) jest 
prawdopodobnie najwiekszą wadą konstrukcji języka JavaScript, jest on praktycznie 
**całkowicie wadliwy**.

Mimo, że `instanceof` ma swoje wady to nadal ma ograniczone zastosowanie w praktyce, 
natomiast `typeof` ma tylko jeden praktyczny przypadek użycia, który na dodatek 
**nie** jest związany z sprawdzaniem typu obiektu.

> **Uwaga:** Do wywołania operatora `typeof` może zostać użyta składnia funkcyjna np. 
> `typeof(obj)`, ale nie jest to wywołanie funkcji. Dwa nawiasy zwrócą obiekt 
> znajdujący się wewnątrz i zwrócona wartość stanie się operandem operatora 
> `typeof`. **Nie istnieje** funkcja `typeof`. 

### Tablica typów JavaScript

    Wartość             Klasa      Typ
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object (function w Nitro i V8)
    new RegExp("meow")  RegExp     object (function w Nitro i V8)
    {}                  Object     object
    new Object()        Object     object

W powyższej tabeli *Typ* odnosi się do wartości zwracanej przez operator `typeof`. 
Wyraźnie widać, że zwracane wartości w ogóle nie są spójne.

*Klasa* odnosi sie do wartości wewnętrznej właściwości `[[Class]]` obiektu.

> **Fragment Specyfikacji:** Wartość `[[Class]]` może być jednym z poniższych 
> stringów. `Arguments`, `Array`, `Boolean`, `Date`, `Error`, 
> `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

W celu uzyskania wartości właściwości `[[Class]]` trzeba skorzystać z metody
`toString` z `Object.prototype`. 

### Klasa obiektu

Specyfikacja zawiera dokładnie jeden sposób dostepu do wartości `[[Class]]`, 
wykorzystując `Object.prototype.toString`. 

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }
    
    is('String', 'test'); // true
    is('String', new String('test')); // true

Powyższy przykład wywołuje `Object.prototype.toString` z wartością 
[this](#function.this) ustawioną na obiekt, dla której wartość właściwości 
`[[Class]]` ma zostać odczytana. 

> **Uwaga ES5:** Dla zwiększenia wygody wartość zwracana przez 
> `Object.prototype.toString` dla `null` i `undefined` została zmieniona 
> z `Object` na `Null` i `Undefined` w ECMAScript 5.

### Testowanie niezdefiniowania zmiennej

    typeof foo !== 'undefined'

Powyższy kod sprawdza czy `foo` została faktycznie zadeklarowana czy też nie. 
Próba odwołania się do zmiennej spowodowała by wyrzucenie błędu `ReferenceError`. 
Jest to jedyne praktyczne wykorzystanie operatora `typeof`.

### Wnioski

W celu sprawdzenia typu obiektu zalecane jest skorzystanie z 
`Object.prototype.toString`, ponieważ jest to jedyny wiarygodny sposób. Jak 
pokazano w powyższej tabeli typów, niektóre wartości zwracane przez `typeof` nie 
są zdefiniowane w specyfikacji, co za tym idzie mogą się różnić w różnych 
implementacjach.

O ile nie operator `typeof` nie jest użyty do sprawdzania czy zmienna została 
zdefiniowana, powinien być unikany **o ile to tylko możliwe**.

