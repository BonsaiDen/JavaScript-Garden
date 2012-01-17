## Cómo trabaja `this`

JavaScript tiene un concepto diferente sobre el nombre especial `this` referido a la 
mayoría de lenguajes de programación. Hay exactamente **cinco** formas distintas en donde 
es posible ver el valor de `this` dentro de lo posible en el lenguaje.

### El ámbito global (Global Scope)

    this;

Cuando se utiliza `this` en el ámbito global, simplemente se refiere al objeto *global*.


### Llamar a una función

    foo();

Aquí `this` se refiere al objeto *global*.

> **Nota ES5:** En modo estricto (strict mode), global **ya no** existe.
> `this` tendrá el valor de `undefined` en este caso.

### Llamar a un método

    test.foo(); 

En este ejemplo `this` se referiere a `test`.

### Llamar a un constructor

    new foo(); 

Llamar a una función que esta precedida por la palabra clave `new` actúa como
un [constructor](#function.constructors). Dentro de la función, `this` se refiere 
al `Objeto` *recién creado*.

### Ajuste explícito de `this`

    function foo(a, b, c) {}
                          
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // array que se apilará
    foo.call(bar, 1, 2, 3); // resultados a = 1, b = 2, c = 3

Cuando se utiliza los métodos `call` o `apply` en `Function.prototype`, el valor de
`this` dentro de la función llamada se ajustará **explícitamente** al primer argumento
correspondiente a la llamada de la función.

Como resultado, el ejemplo anterior sobre los *casos de métodos* estos **no** se aplican, y `this` 
dentro de `foo` puede establecerse en `bar`.

> **Nota:** `this` **no puede** ser usado para referirse a un objeto dentro de un `Objeto`
> literal. Así `var obj = {me: this}` **no**  dará ninǵun resultado en `me` refiriendose a
> `obj`, ya que `this` sólo será obtenido por uno de los cincos casos enumerados.

### Errores comunes

Si bien en la mayoría de los casos esto tiene sentido, el primero puede cosiderarse como otro
mal diseño del lenguaje, ya que **nunca** tiene un uso práctico.

    Foo.method = function() {
        function test() {
            // this es establecido como un objeto global
        }
        test();
    }

Un error común es que `this` dentro de `test` haga referencia a `Foo`, mientras que en
realidad esto **no es así**.

Con el fin de acceder a `Foo` desde dentro de `test` es necesario crear una variable local
dentro del `método` para referirse a `Foo`.

    Foo.method = function() {
        var that = this;
        function test() {
            // Use that instead of this here
        }
        test();
    }

`that` es justo un nombre normal, pero es comúnmente usado para referenciar a `this`
de forma externa. En combinación con [closures](#function.closures), esto puede ser
también usado para pasar `this` como valor.

### Asignación de métodos

Otra cosa que **no** funciona en JavaScript son los alias en las funciones, es decir,
**asignar** un método a una variable.

    var test = someObject.methodTest;
    test();

Debido al primer caso, `test` actúa como una función de llamada; por lo que 
`this` dentro de este no estará referido a `someObject`.

Mientras que la unión de `this` puede parecer una mala idea en un principio, esto es en
realidad lo que hace trabajar a la [herencia de prototipo](#object.prototype). 

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

Cuando los `métodos` son llamados desde una instancia de `Bar`, `this` se referirá a una
instancia.


