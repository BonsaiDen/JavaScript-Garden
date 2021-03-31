## Ámbitos y Namespaces

A pesar que JavaScript tiene una muy buena sintaxis de dos llaves para los bloques,
está **no** es compatible con el soporte de ámbito de bloques; por lo que todo se deja
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

Dejando de lado la sentencia `var` dentro de la función `test` sobre escribiría el
valor de `foo`. Si bien al principio puede parecer un gran cambio, se tiene
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
ela asignación de `bar` sobreescribe la variable global con el mismo nombre.

### Hoisting

La declaración de **hoists** en JavaScript. Esto significa que tanto la declaración de `var` y
la `función` declarada se translada a la parte superior de su ámbito que lo contiene.

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
la declaración `var` así como las declaraciones de la `función` a la parte superior a
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

### Orden de Resolución de Nombres

Todos los ámbitos en JavaScript, incluyendo el *Ámbito Global* tienen el nombre
especial [`this`](#function.this) definido en ellos, que se refiere al *objecto actual*.

Los ámbitos de las funciones también tienen el nombre [`arguments`](#function.arguments)
, definido en ellas, que contiene los argumentos que se pasaron a la función.

Por ejemplo, cuando se intenta acceder a una variable llamada `foo` dentro del 
ámbito de una función, JavaScript buscará el nombre en el siguiente orden:

 1. En caso de que haya una sentencia `var foo` en el ámbito actual, utilícela.
 2. Si uno de los parámetros de la función se llama `foo`, utilícelo.
 3. Si la propia función se llama `foo`, utilícela.
 4. Vaya al siguiente ámbito exterior, y empiece con el paso **#1** nuevamente.

> **Nota:** Tener un parametro llamado `arguments` **evitará** la creación
> del objeto `arguments` por defecto.

### Namespaces

Un problema común de tener solo un namespace global es la probabilidad de encontrarse
con problemas donde los nombres de variables chocan. En JavaScript, este problema se puede
evitar facílmente con la ayuda de *anonymous wrappers*

    (function() {
        // un "namespace" auto contenido
        
        window.foo = function() {
            // un closure expuesto
        };

    })(); // se ejecuta la función inmediatamente


Las funciones sin nombre son consideradas [expressions](#function.general); 
así que para poderlas invocar, primero deben evaluarse.

    ( // evaluar la función dentro de los paréntesis
    function() {}
    ) // y retornar el objeto de la función
    () // llama al resultado de la evaluación

Hay otras formas de evaluar y llamar a la función expression; tanto que
mientras difieren en la sintaxis, se comportan exactamente igual.

    // Dos alternativas
    +function(){}();
    (function(){}());

### En Conclusión

Es recomendable que siempre se use un *anonymous wrapper* para encapsular el código en 
su propio namespace. Esto no sólo proteje al código contra los choques de nombres,
sino que tambien permite una mejor modularización de los programas.

Además, el uso de variables globales es considerado una **mala practica**.
**Cualquier** uso de ellas indica que el código está mal escrito, será propenso a errores y 
dificil de mantener.
