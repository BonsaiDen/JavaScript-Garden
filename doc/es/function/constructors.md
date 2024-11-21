## Constructores 

Los constructores en JavaScript todavía son diferentes a los de otros lenguajes.
Cualquier llamada que es precedida por la palabra `new` actua como un constructor.

Dentro del constructor - la función llama - el valor de `this` se refiere a un
`Objeto` recién creado. El [`prototipo`](#object.prototype) de este **nuevo** 
objeto se establece en el `prototipo` de la función que es invocado como el
constructor.

Si la función que se llama no tiene una sentencia `return` explícita, entonces
implícitamente devuelve el valor de `this` - el nuevo objeto.  

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

La llamada de `Foo` por encima del constructor y establece el `prototipo` del objeto
recién creado a `Foo.prototype`.

En caso explícito de la sentencia `return` de la función devuelva el valor especificado
que la declaración, **pero sólo** si el valor devuelto es un `Object`.                                     

    function Bar() {
        return 2;
    }
    new Bar(); // a new object

    function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // the returned object

Cuando una `nueva` keyword es omitida, la función **no** devuelve un nuevo objeto. 

    function Foo() {
        this.bla = 1; // se establece en el objeto global
    }
    Foo(); // undefined

Aunque el ejemplo anterior puede parecer que trabaja en algunos casos, debido
a los trabajos de [`this`](#function.this) en JavaScript, que usará el
*objeto global* como valor de `this`.

### Fábricas

Con el fin de ser capaz de omitir un `nuevo` keyword, la función del tiene 
explícitamente devolver un valor.

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }
    Bar.prototype = {
        foo: function() {}
    };

    new Bar();
    Bar();

Ambos llamadas a `Bar` devuelven exactamente lo mismo, un reciente objeto creado que
tiene como propiedad llamada el `method`, esto es un 
[Closure](#function.closures).

También hay que notar que la llamada `new Bar()` **no** afecta al prototipo
del objeto devuelto. Mientras que el prototipo se establece en el objeto recién creado,
 `Bar` nunca devuelve un nuevo objeto.

En el ejemplo anterior, no hay diferencia funcional entre usar y no usar
el keyword `new`.


### Creación de nuevos objetos vía Factorias

Una recomendación a menudo es **no** utilizar `new` ya que su uso puede
conducir a errores.

Con el fin de crear un nuevo objeto, uno bien debe utilizar una fábrica y un 
constructor para crear un nuevo objeto dentro de la fábrica.

    function Foo() {
        var obj = {};
        obj.value = 'blub';

        var private = 2;
        obj.someMethod = function(value) {
            this.value = value;
        }

        obj.getPrivate = function() {
            return private;
        }
        return obj;
    }

Aunque lo anterior es robusto frente a la keyword `new` y, ciertamente hace
que el uso de [variables privadas](#function.closures) sea fácil, esto viene con
algunas desventajas.

 1. Se utiliza más memoria, ya que los objetos creados **no** comparten los métodos de
    un prototipo.
 2. Con el fin de heredar de una fábrica se necesita copiar todos los métodos a otro
    objeto o poner todo en un prototipo de nuevo objeto.
 3. La eliminación de una cadena de prototipo sólo por dejar la keyword `new` de
    alguna manera va en contra del espíritu del lenguaje.

### En conclusión

Mientras que se omite el keyword `new` podría dar a errores,  **no** es ciertamente 
una razón para abandonar el uso de prototipos por completo. Al final todo se reduce a 
la solución que se adapta mejor a las necesidades de la aplicación, especialmente si es 
importante elegir un estilo específico en la creación de objetos 
**y resistirse**.


