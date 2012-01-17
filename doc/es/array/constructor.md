## El constructor `Array`

Desde el constructor `Array` es ambiguo en la forma en que ocupa sus párametros,
es recomendable siempre el uso de arrays literales - la notación `[]` - 
cuando se crean nuevos arrays.

    [1, 2, 3]; // Resultado: [1, 2, 3]
    new Array(1, 2, 3); // Resultado: [1, 2, 3]

    [3]; // Resultado: [3]
    new Array(3); // Resultado: []
    new Array('3') // Resultado: ['3']

En casos cuando sólo hay un argumento pasado al constructor del `Array`,
y que el argumento es un `Número`, el contructor devolverá un array *disperso* 
con la propiedad `length` establecida al valor del argumento. Esto debe señalarse
que la propiedad `length` **sólo** del nuevo array se establecerá de esa manera, 
los índices reales de la matriz no se iniciará. 

    var arr = new Array(3);
    arr[1]; // undefined
    1 in arr; // falso, el índice no se ha establecido

El comportamiento de poder establecer la longitud de un array inicial sólo es útil
en algunos casos array, como la repetición de una cadena, en la que se evita el uso 
del código de `bucle for`.

    new Array(count + 1).join(stringToRepeat);

### En conclusión

El uso de un constructor `Array` debe ser devuelto como sea posible. 
Los literales son definitivamente preferidos. Estos son más cortos y tienen una
sintaxis más limpia; por lo tanto, también se incrementa la legibilidad del código.

