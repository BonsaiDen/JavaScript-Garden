## Ámbitos y Namespaces

A pesar que JavaScript tiene una muy buena sintaxis de dos llaves para los bloques,
esta **no** es compatible con el soporte de ámbito de bloques; por lo que todo se deja
al lenguaje con el *ámbito de la función*.

    function test() { // un ámbito
        for(var i = 0; i < 10; i++) { // no es un ámbito
            // cuenta
        }
        console.log(i); // 10
    }

> **Nota:** Cuando no use una instrucción, de retorno o una función como
> argumento, la notación de `{...}` serán interpretadas como una declaración de bloques y
> **no** como un objeto literal. Esto, en conjunto con la
> [inserción automática de punto y coma](#core.semicolon), puede conducir a errores sutiles.

Tampoco hay distintos namespaces en JavaScript, lo que significa que todo se define
en un namespace *global y compartido*.

Cada vez que una variable es referenciada, JavaScript recorre hacia arriba a través de todos
los ámbitos hasta encontrarlo. En este caso que llegue al ámbito global y todavía no ha
encontrado el nombre solicitado, se generará un error `ReferenceError`.

### El terror de las variables globales

    // script A
    foo = '42';

    // script B
    var foo = '42'

Estos dos scripts **no** tienen el mismo efecto. El script A define una variable
llamada `foo` en el ámbito *global* y el script B define `foo` en el 
*actual* ámbito.

Una vez más, esto **no** tiene el *mismo efecto* para todo, no usar `var` puede tener
mayor implicación.

    // ámbito global
    var foo = 42;
    function test() {
        // ámbito local
        foo = 21;
    }
    test();
    foo; // 21

Dejando de lado la sentencia `var` dentro de la función `test` sobrescribiría el
valor de `foo`. Si bien al principio puede parecer un gran cambio, si tiene
miles de líneas de código en JavaScript y no se usaría `var` introduciendose en un
horrible y difícil detección de errores.
    
    // ámbito global
    var items = [/* some list */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }

    function subLoop() {
        // ámbito de subLoop
        for(i = 0; i < 10; i++) { // falta la sentencia var
            // ¡realizar cosas asombrosas!
        }
    }
    
El bucle externo terminará después de la primera llamada a `subLoop`,  desde `subLoop`
sobreescribe el valor global de `i`. Usando `var` para el segundo bucle `for` se hace
fácil evitar este error. La sentencia `var` no debe **nunca** dejarse a menos que
el *efecto deseado* es afectado por el ámbito exterior.

### Variables locales

La única fuente para las variables locales en JavaScript son los parámetros de la
[función](#function.general) y variables que fueron declaradas vía la sentencia
`var`.

    // ámbito global
    var foo = 1;
    var bar = 2;
    var i = 2;

    function test(i) {
        // ámbito local de la función test
        i = 5;

        var foo = 3;
        bar = 4;
    }
    test(10);

Mientras `foo` y `i` son variables locales dentro del ámbitor de la función `test`,
la asignación de `bar` sobreescribe la variable global con el mismo nombre.

### Hoisting

La declaración de **hoists** en JavaScript. Esto significa que tanto la declaración de `var` y
la `función` declarada se traslada a la parte superior de su ámbito que lo contiene.

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

El código anterior transforma antes de ejecutarse. JavaScript mueve
las declaraciones `var` así como las declaraciones de la `función` a la parte superior a
lo más cercano del ámbito circundante.

    // declaraciones var movidas aquí
    var bar, someValue; // por omisión 'undefined'

    // la función declarada es movida aquí también
    function test(data) {
        var goo, i, e; // se pierde el ámbito del bloque movido aquí
        if (false) {
            goo = 1;

        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // falla con TypeError desde bar sigue en 'undefined'
    someValue = 42; // las asignaciones no se ven afectadas por hoisting
    bar = function() {};

    test();

La falta de alcance del bloque no sólo moverá la declaración `var` fuera de los bucles y
su contenido, sino también hará que los resultados de ciertos constructores `if`
no sean intuitivas.

En el código original la declaración de `if` si parecía modificar la *variable 
global* `goo`, mientras actualmente este modifica la *variable local* - después hoisting 
ha sido aplicado.

Sin el conocimiento acerca de *hoisting*, a continuación el código puede parecer
un `ReferenceError`.

    // comprueba si SomeImportantThing ha iniciado
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

Pero, por supuesto, lo anterior funciona debido a que la declaración `var` es movida
a la parte superior del *ámbito global*.

    var SomeImportantThing;

    // otro código podría iniciar SomeImportantThing aqui, o no

    // asegúrese de que está ahí
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### Name Resolution Order

All scopes in JavaScript, including the *global scope*, have the special name 
[`this`](#function.this), defined in them, which refers to the *current object*. 

Function scopes also have the name [`arguments`](#function.arguments), defined in
them, which contains the arguments that were passed to a function.

For example, when trying to access a variable named `foo` inside the scope of a 
function, JavaScript will lookup the name in the following order:

 1. In case there is a `var foo` statement in the current scope, use that.
 2. If one of the function parameters is named `foo`, use that.
 3. If the function itself is called `foo`, use that.
 4. Go to the next outer scope, and start with **#1** again.

> **Note:** Having a parameter called `arguments` will **prevent** the creation 
> of the default `arguments` object.

### Namespaces

A common problem of having only one global namespace is the likeliness of running
into problems where variable names clash. In JavaScript, this problem can
easily be avoided with the help of *anonymous wrappers*.

    (function() {
        // a self contained "namespace"
        
        window.foo = function() {
            // an exposed closure
        };

    })(); // execute the function immediately


Unnamed functions are considered [expressions](#function.general); so in order to
being callable, they must first be evaluated.

    ( // evaluate the function inside the paranthesis
    function() {}
    ) // and return the function object
    () // call the result of the evaluation

There are other ways for evaluating and calling the function expression; which, 
while different in syntax, do behave the exact same way.

    // Two other ways
    +function(){}();
    (function(){}());

### In Conclusion

It is recommended to always use an *anonymous wrapper* for encapsulating code in 
its own namespace. This does not only protect code against name clashes, but it 
also allows for better modularization of programs.

Additionally, the use of global variables is considered **bad practice**. **Any**
use of them indicates badly written code that is prone to errors and hard to maintain.

