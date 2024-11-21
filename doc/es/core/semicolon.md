## Inserción automática de punto y coma (;)

Aunque JavaScript tiene una sintaxis parecida a C, **no** impone el uso de 
punto y coma en el código fuente, por lo que es posible omitirlos.

JavaScript no es un lenguaje sin punto y coma. De hecho, necesita el punto y coma 
para comprender el código fuente. Por lo tanto, el analizador de JavaScript 
los inserta **automáticamente** cada vez que encuentra un error de análisis debido a 
que falta un punto y coma.

    var foo = function() {
    } // parse error, punto y coma esperado
    test()

Se produce la inserción y el analizador vuelve a intentarlo.

    var foo = function() {
    }; // sin error, el analizador continúa
    test()

La inserción automática de punto y coma se considera uno de los **más grandes**
defectos de diseño en el lenguaje porque *puede* cambiar el comportamiento del código.

### ¿Cómo funciona?

El siguiente código no tiene punto y coma, por lo que depende del analizador decidir dónde
insertarlos.

    (function(window, undefined) {
        function test(options) {
            log('testing!')

            (options.list || []).forEach(function(i) {

            })

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            )

            return
            {
                foo: function() {}
            }
        }
        window.test = test

    })(window)

    (function(window) {
        window.someLibrary = {}

    })(window)

A continuación se muestra el resultado del juego de "adivinanzas" 
del analizador.

    (function(window, undefined) {
        function test(options) {

            // No insertado, las líneas se fusionaron
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- insertado

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- inserted

            return; // <- insertado, rompe la declaración de devolución
            { // tratado como un bloque

                // una etiqueta y una declaración de expresión única
                foo: function() {} 
            }; // <- insertado
        }
        window.test = test; // <- insertado

    // Las líneas se fusionaron de nuevo
    })(window)(function(window) {
        window.someLibrary = {}; // <- insertado

    })(window); //<- insertado

> **Nota:** El analizador de JavaScript no maneja "correctamente" las declaraciones de retorno
> que van seguidos de una nueva línea, aunque esto no es necesariamente culpa de
> la inserción automática del punto y coma, aún puede ser un efecto secundario no deseado. 

El analizador cambió drásticamente el comportamiento del código anterior. En algunos casos,
lo hace de forma **incorrecta**.

### Paréntesis principal

En el caso de un paréntesis inicial, el analizador **no** insertará un punto y coma.

    log('testing!')
    (options.list || []).forEach(function(i) {})

Este código se transforma en una línea.

    log('testing!')(options.list || []).forEach(function(i) {})

Las posibilidades son **muy** altas de que `log` **no** devuelva una función; por lo tanto,
lo anterior producirá un `TypeError` que indica que `undefined no es una función`.

### En conclusión

Se recomienda **nunca** omitir el punto y coma; también se aboga por que se
mantengan las llaves en la misma línea con sus declaraciones correspondientes 
y nunca las omita para una sola línea de declaraciones `if` / ` else`. Ambas medidas
no solo mejoran la consistencia del código, sino que también evitarán que
el analizador de JavaScript cambie su comportamiento.

