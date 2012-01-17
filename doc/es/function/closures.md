## Closures y referencias

Una de las características más poderosas de JavaScript es la disponibilidad de *closures* (cerraduras),
esto significa que los ámbitos **siempre** podrán ser accedidos por ámbitos externos donde
fueron definidos. Dado que sólo el alcance es único en JavaScript en el 
[ámbito de la función](#function.scopes), todas las funciones, por omisión, actúan como closures.

### Emulando variables privadas

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

En este caso, `Counter` retorna **dos** closures. La función `increment` y la
función `get`. Ambas funciones mantienen el ámbito de la **referencia** de  
`Counter` y, por lo tanto, siempre accede a la variable `count` que fue definido
en el ámbito.

### ¿Por qué las variables privadas trabajan?

Dado que no es posible referenciar o asignar ámbitos en JavaScript, **no** hay
manera de acceder a la variable `count` desde fuera. Sólo existe una forma para
interactuar con estos vía los dos closures.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

El código anterior **no** ha cambiado la variable `count` en el ámbito de `Counter`, 
desde `foo.hack` no es definido en **ese** ámbito. En su lugar se creará - o 
se anulará - la variable *global* `count`.

### Closures dentro de bucles

Un error frecuente en el uso de closures dentro de bucles, es como si se tratará
de copiar el valor del índice de la variable del bucle.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

El código anterior **no** tendrá como salida los números del `0` al `9`, sino 
simplementemente se imprimirá el número `10` diez veces.

La función *anónima* hace **referencia** a `i` y se llama a
`console.log`, el `bucle for` ya ha terminado y finalizo el valor de 
`i` a `10`.

Con el fin de obtener el comportamiento deseado, es necesario crear una **copia**
del valor de `i`.

### Evitando el problema de referencia

Con el fin de copiar el valor de la variable índice del bucle, lo mejor es utilizar
un [contenedor anónimo](#function.scopes).

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

La función anónima externa llamará inmediatamente a `i` como su primer 
argumento y recibirá la copia del **valor** de `i` como parámetro de `e`.

La función anónima que se pasa a `setTimeout` ahora es una referencia a 
`e`, cuyo valor **no** han sido cambiados por el bucle.

No hay otra manera de lograr esto; se debe retornar una función desde
el contenedor anónimo, que tendrá el mismo comportamiento que el código 
anterior.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }

