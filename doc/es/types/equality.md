## Igualdad y Comparación

JavaScript posee 2 maneras diferentes para comparar valores entre objetos para comprobar igualdad.

### El Operador de Igualdad

El operador de igualdad consiste en 2 signos es igual: `==`

JavaScript utiliza *tipado débil*. Esto significa que el operador de igualdad 
**obliga** una conversión de tipos para poder compararlos.
    
    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

La tabla anterior muestra los resultados de la conversión de tipos, éste es el motivo principal
de por qué el uso de `==` es ampliamente considerado una mala práctica. Introduce errores
difíciles de identificar debido a la complejidad de sus reglas de conversión.

Además, existe un impacto en el rendimiento cuando entra en juego la conversión de tipos;
por ejemplo, una cadena debe ser convertida a número antes de poder ser comparada
con otro número.

### El Operador de Igualdad Estricto

El operador de igualdad estricto consiste en **tres** signos es igual: `===`:

Funciona exactamente  igual que el operador de igualdad, excepto que el operador de igualdad
estricto **no** utiliza conversión de tipos entre sus operandos.

    ""           ===   "0"           // false
    0            ===   ""            // false
    0            ===   "0"           // false
    false        ===   "false"       // false
    false        ===   "0"           // false
    false        ===   undefined     // false
    false        ===   null          // false
    null         ===   undefined     // false
    " \t\r\n"    ===   0             // false

Los resultados anteriores son mucho más claros y permiten una detección de errores temprana.
Esto permite un código más sólido en cierto grado y también mejora el rendimiento
en el caso que los operandos sean de tipos diferentes.

### Comparando Objetos

Aunque `==` como `===` son considerados operadores de **igualdad**, se comportan
de maneras diferentes cuando al menos uno de sus operandos es `Object`.

    {} === {};                   // false
    new String('foo') === 'foo'; // false
    new Number(10) === 10;       // false
    var foo = {};
    foo === foo;                 // true

En este caso, los dos operadores comparan por **referencia** y **no** por igualdad; esto es,
comparan por la misma **instancia** del objeto, parecido 
al operador `is` en Python y la comparación entre punteros en C.

### En Conclusión

Es altamente recomendable usar sólo el operador de **igualdad estricta**. En los casos
donde los tipos de datos necesitan ser convertidos, debe hacerse [explícitamente](#types.casting)
y no dejárselo a las complicadas reglas de conversión del lenguaje.

