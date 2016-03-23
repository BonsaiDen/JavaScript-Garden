## La declaración de funciones y expresiones

Las funciones en JavaScript son funciones de primera clase `(first class functions)`.
Esto significa que se pueden tratar como objetos. Un uso común de esta característica es pasar de
una *función anónima* a otra, posiblemente una función asíncrona. Esto se conoce como `callback`.

### La declaración `function`

    function foo() {}

La función anterior se [carga](#function.scopes) así mismo antes de iniciar la ejecución del
programa; por lo tanto, está disponible en *todo* el scope (ámbito) de la aplicación
donde se ha *definido*, aunque hubiera sido llamado antes de definirse en el código.

    foo(); // Funciona porque foo ha sido creado antes que este código se ejecute
    function foo() {}

### La expresión `function`

    var foo = function() {};

Este ejemplo asigna una función sin nombre y anónima a la variable `foo`. 

    foo; // 'undefined'
    foo(); // Lanza TypeError
    var foo = function() {};

Debido a la declaración de `var`, que carga el nombre de la variable `foo` antes
de la ejecución real del inicio del código, `foo` ya estará definidido cuando se
ejecute el script.

Pero se asigna sólo si ocurre en tiempo de ejecución, el valor de `foo` de forma 
predetermina es [undefined](#core.undefined) antes de que el código se ejecute.

### Expresión nombre de función

Otro caso especial de asignación de nombre de funciones.

    var foo = function bar() {
        bar(); // Funciona
    }
    bar(); // ReferenceError

Aquí `bar` no está disponible en el ámbito externo (scope), ya que la función sólo es 
asignada a `foo`; Sin embargo, dentro de `bar` si está disponible. Esto se debe a la forma
en como trabaja la [resolución de nombres](#function.scopes) en JavaScript, el nombre de 
la función esta *siempre* disponible en el ámbito local de la propia función.

