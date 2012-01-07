## El objeto `arguments`

Cada ámbito de la función de JavaScript puede acceder a la variable especial `arguments`.
Está variable contiene una lista de todos los argumentos que se pasan a la función.

> **Nota:** En este caso `arguments` ya se ha definido dentro del ámbito de la
> función ya sea através de la sentencia `var` o como un parámetro formal,
> el objeto `arguments` no se creará.

El objeto `arguments` **no** es un `Array`. Si bien cuenta con la semántica
de un array - concretamente la propiedad `length` - no hereda de 
`Array.prototype` y es de hecho un `Objeto`.

Debido a esto, **no** es posible usar los métodos estándar de los arrays como `push`,
`pop` o `slice` en `arguments`. Mientras que la iteración es un simple bucle `for` que 
funciona muy bien, esto se convierte necesariamente en un `Array` real con el
fin de utilizar los métodos de un `Array`.

### Conversión de un Array

El siguiente código devuelve un nuevo `Array` que contiene todos los elementos del
objeto `arguments`.

    Array.prototype.slice.call(arguments);

Esta conversión es **lenta**, **no es recomendable** usarlo en puntos criticos que
afecten el rendimiento del código.

### Pasar Argumentos

El siguiente método es recomendado para pasar argumentos desde una función a 
otra.

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // do stuff here
    }

Otro truco es utilizar tanto `call` y `apply` juntos para crear contenedores rápidos y
consolidados.

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // Crea una versión sin consolidar de "method" 
    // Se toma los parámetros: this, arg1, arg2...argN
    Foo.method = function() {

        // Resultado: Foo.prototype.method.call(this, arg1, arg2... argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };


### Los parámetros formales y argumentos de índices

El objeto `arguments` crea las funciones de *getter* y *setter* para sus
propiedades, así como parámetros formales de la función.

Como resultado, se ha cambiado el valor formal del parámetro también se cambio el 
valor de la propiedad correspondiente del objeto `arguments`, y al revés.

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2                                                           

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);

### Mitos y verdades sobre el rendimiento

El objeto `arguments` es siempre creado con las dos únicas excepciones cuando es
el caso en que declarado como un nombre dentro de la función o uno de los 
parámetros formales. No importa si se utiliza o no.

Ambos *getters* y *setters* son **siempre** creados; por lo tanto, con que casi no se
tiene un impacto en el rendimiento en todo, especialemente no en el código real donde no 
es más que un simple acceso a las propiedades del objeto `arguments`.

> **Nota ES5:** Estos *getters* y *setters* no son creados en modo estricto.

Sin embargo, hay casos en que se reducirá drásticamente el rendimiento en los motores
modernos de JavaScript. Este es el caso del uso de `arguments.callee`.

    function foo() {
        arguments.callee; // realiza algo con la función del objeto
        arguments.callee.caller; // y llama a la función del objeto
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // Debería ser normalmente entre líneas...
        }
    }

El código anterior, `foo` no puede estar sujeto a la [expansión en línea][1] ya que se 
necesita saber acerca de sí mismo y la llamada. Esto no sólo denota los posibles beneficios
de rendimiento que surgen con la expansión en línea, ya que también interrumpe la encapsulación
ya que la función ahora puede ser dependiente de un contexto específico de llamada.

Es **muy recomendable**  **nunca** hacer uso de `arguments.callee` o de cualquier
de sus propiedades.

> **Nota ES5:** En modo estricto, `arguments.callee` generará una excepción de `TypeError` ya que 
> su uso ha quedado obsoleto.

[1]: http://en.wikipedia.org/wiki/Inlining


