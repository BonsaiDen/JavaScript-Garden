## El bucle `for in`

Al igual que el operador `in`, el bucle `for in` también recorre sobre la 
cadena de prototipo cuando este se repite en una iteración en las propiedades de un objeto.

> **Nota:** El bucle `for in` **no** se repetirá en cualquier propiedad que 
> tenga atributos `enumerables` asignados a `false`; por ejemplo, la propiedad 
> `length` de un array.
    
    // Envenenamiento en Object.prototype
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // Imprime ambos bar y moo
    }

Dado que no es posible cambiar el comportamiento del bucle `for in` en sí mismo, es
necesario filtrar las propiedades internas no deseadas dentro del bucle, 
esto se hace mediante el uso del método [`hasOwnProperty`](#object.hasownproperty) del 
`Object.prototype`.

> **Nota:** Dado que `for in` siempre recorre por completo la cadena de prototipo, 
> este se pondrá más lento con cada capa adicional que un objeto herede.

### Usando `hasOwnProperty` para filtrado

    // Aún es el foo del código de arriba
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

Está versión es la única forma correcta de uso. Esto se debe **sólo** al uso de 
`hasOwnProperty` que imprimirá `moo`. Cuando `hasOwnProperty` se omita, el código es 
propenso a errores  en los casos de prototipos nativos - ej. `Object.prototype` - 
se ha extendedido.

Uno de los frameworks más usado que implementa estas funcionalidades es [Prototype][1]. Cuando el 
framework es incluido, el bucle `for in` que no utilicen `hasOwnProperty` no podrá garantizar que 
se interrumpa.

### En conclusión

Se recomienda utilizar **siempre** el uso de `hasOwnProperty`. Nunca debe suponer  
ningún entorno donde el código se ejecute, o si los prototipos
nativos han sido extendidos o no. 

[1]: http://www.prototypejs.org/

