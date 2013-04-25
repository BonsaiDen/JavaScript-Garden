## Iteración de un Array y sus propiedades

A pesar que los arrays en JavaScript son objetos, no existe un buena razón para
usarlo en un [`bucle for`](#object.forinloop) para una interación de este. De 
hecho, hay un número de buenas razones **contra** el uso de `for in` en arrays.

> **Nota:** Los arrays de JavaScript **no** son *arrays asociativos*. JavaScript sólo 
> tiene [objetos](#object.general) para el mapeo de keys a valores. Y mientras
> que los arrays asociativos **preservan** el orden, los objetos **no**.

Dado que el bucle `for in` enumera todas las propiedades que están en una cadena
de prototipo y la única manera para excluir estas propiedades es el uso de
[`hasOwnProperty`](#object.hasownproperty), ya que es **veinte veces** más
lento que un bucle `for` normal.

### Iteración

Con el fin de obtener el mejor rendimiento cuando se repite la interación de arrays, 
es lo mejor hacer uso del clásico bucle `for`.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

Hay una captura adicional en el ejemplo anterior, que es el almacenamiento de la
caché de longitud del array vía `l = list.length`.

Aunque la propiedad `length` es definida en el mismo array, todavía posee una sobrecarga
para realizar la búsqueda en cada interación del bucle. Y mientras que los últimos 
motores de JavaScript **pueden** aplicar optimizaciones en este caso, no hay manera 
de saber si el ćodigo se ejecutará en uno de estos nuevos motores nuevos o no.

De hecho, dejando de lado el almacenamiento en caché puede resultar que el bucle
inicie sólo la **mitad de rápido** que con la longitud de la caché.

### La propiedad `length`

Mientras que *getter* de la propiedad `length` simplemente retorne el número de
elementos son contenidos en un array, el *setter* puede ser usado para 
**truncar** el array.

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]

    foo.length = 6;
    foo; // [1, 2, 3]

La asignación de un menor número de longitud trunca al array, pero incrementando la
longitud no tiene ningún efecto sobre el array.

### En conclusión

Para obtener el mejor rendimiento es recomendable siempre usar el bucle `for`
y alamacenar en caché la propiedad `length`. El uso del bucle `for in` en un array 
es señal de un código mal escrito propenso a errores y un mal desempeño. 

