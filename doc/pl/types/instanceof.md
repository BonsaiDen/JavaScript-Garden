## Operator `instanceof`

Operator `instanceof` porównuje konstruktory obiektów przekazanych jako operendy. 
Jest on jedynie użyteczny do porównywania obiektów utworzonych klas. Stosowanie 
go na wbudowanych typach jest praktycznie tak samo bezużyteczne jak operatora
[typeof](#types.typeof).

### Porównywanie obiektów utworzonych klas

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // Poniżej kod który przypisuje do Bar.prototype obiekt funkcji Foo
    // a nie faktyczną instancję Foo
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### Stosowanie `instanceof` na natywnych typach

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

Jedną ważną rzeczą, którą należy zauważyć jest to, że `instanceof` nie zadziała 
na obiektach, które pochodzą z różnych kontekstów JavaScript (np. z różnych 
dokumentów wewnątrz przeglądarki), ponieważ ich konstruktory nie będą tymi 
samymi obiektami.

### Wnioski

Operator `instanceof` powinien być **tylko** używany podczas korzystania z obiektów 
klas utworzonych, które były zdefiniowane w tym samym kontekscie JavaScriptowym. 
Podobnie jak operator [`typeof`](#types.typeof), należy **unikać** korzystania 
z tego operatora w innych sytuacjach.

