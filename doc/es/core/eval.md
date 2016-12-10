## ¿Por qué no usar `eval`?

La función `eval` ejecuta un string como código JavaScript en el ámbito local.

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

Pero `eval` sólo ejecutará en ámbito local cuando es llamado **directamente** *y* 
el nombre de la función llamada es `eval`.

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 1

El uso de `eval` debe evitarse **a toda costa**. El 99.9% de su "uso" puede 
lograrse **sin** su uso..
    
### `eval` disfrazado

Las funciones de [tiempo de espera](#other.timeouts) `setTimeout` y `setInterval` pueden
tomar un string como primer argumento. En este caso, el string **siempre** se ejecutará en
el ámbito global ya que `eval` no ha sido llamado directamente.

### Problemas de seguridad

`eval` es también un problema de seguridad ya que ejecuta **cualquier** código enviado,
y **nunca** debe usarse con strings que no se conozcan o tengan un origen no confiable.

### En conclusión

`eval` nunca debe ser usado, cualquier código que haga uso del mismo debe ser cuestionado
en su funcionamiento, rendimiento y seguridad. En caso de que se necesite trabajar con
`eval`, el diseño ha de ser cuestionado y **no** debe  utilizarse en primer lugar, se
debe usar un *mejor diseño*, que no requiera el uso de `eval`. 

