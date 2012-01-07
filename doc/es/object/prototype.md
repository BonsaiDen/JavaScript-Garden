## Prototipo

JavaScript no posee en sus características un sistema clásico de herencia, sino que 
utiliza un *prototipo* para esto. 

Si bien a menudo se considera uno de los puntos débiles de JavaScript, el
modelo de herecia prototipado es de hecho más poderoso que el modelo clásico.
Por ejemplo, es bastante trivial construir un modelo clásico en la parte superior del mismo,
mientras esto es una tarea mucho más difícil.

Debido al hecho que JavaScript es básicamente el único lenguaje que utiliza
apliamente la herencia prototipada, se necesita algo de tiempo para adaptarse a
las diferencias entre los dos modelos.

La primera gran diferencia es que la herencia en JavaScript se realiza usando
llamadas de *cadenas de prototipo* (*prototype chains*).

> **Nota:** Simplemente usando `Bar.prototype = Foo.prototype` dará lugar a dos objetos 
 > que comparten el **mismo** prototipo. Por lo tanto, los cambios que se realicen en un 
> objeto afectará al otro objeto, así, en la mayoría de los casos no es el efecto 
> deseado.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Asigna el prototipo de Bar como una nueva instancia de Foo
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // Asegura que el constructor sea Bar
    Bar.prototype.constructor = Bar;

    var test = new Bar() // crea una nueva instancia de Bar

    // Resultado de cadena de prototipos (prototype chain)
    test [instance of Bar]
        Bar.prototype [instance of Foo] 
            { foo: 'Hello World' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* etc. */ }

En el código anterior, el objeto `test` hereda de `Bar.prototype` y `Foo.prototype`; 
por lo tanto, tendrá acceso a la función `method` que se ha definido en `Foo`. 
También se tendrá acceso a a la propiedad `value` de la **única** instancia de `Foo` 
que compone su prototipo. Es importante tomar en cuenta que `new Bar()` **no** creará una nueva 
instancia de `Foo`, pero retornará lo asignado en su prototipo; de este modo, todas las instancias 
de `Bar` tendrán que compartir el **mismo** `valor` de la propiedad.

> **Nota:** **No** utilice `Bar.prototype = Foo`, ya que no apunta al prototipo
> de `Foo`, sino al objeto de la función `Foo`. Así la cadena de prototipo
> cambiará a `Function.prototype` y no a `Foo.prototype`;
> Por lo tanto, el `método` no estará disponible en la cadena de prototipo.

### Búsqueda de propiedades

Cuando se accede a las propiedades de un objeto, JavaScript recorre la cadena de
prototipo hacia **arriba** hasta encontrar la propiedad con el nombre solicitado.

Cuando se llega al final de la cadena - concretamente `Object.prototype` - y aún
no se ha encontrado la propiedad especificada, se retornará un valor
[undefined](#core.undefined) en su lugar.

### La propiedad prototype

Aunque la propiedad prototype es usada por el lenguaje para construir la cadena
de prototipos, es posible asignar **cualquier** valor. Aunque los tipos primitivos 
serán ignorados cuando se asigne en prototype.

    function Foo() {}
    Foo.prototype = 1; // no tendrá efecto

La asignación de objetos, como se muestra en el ejemplo anterior, funcionará, y permitirá
la creación dinámica de cadena de prototipos.

### Rendimiento

El tiempo tomado en la búsqueda de propiedades es alta y la cadena de prototipo puede
presentar un impacto negativo critico en el rendimiento en partes del código. Además, 
si ha tratado de acceder a propiedades que no existen este saltara a la cadena de prototipo.

Además, al recorrer en [iteración](#object.forinloop) las propiedades de un objeto
y **cada** propiedad será encontrada en la cadena de prototipo de manera ennumerada.
 
### Extensión de prototipos nativos

Una mala característica que se suele utilizar para extender `Object.prototype` o cualquier
otro prototipo construido.

Esta técnica es conocida en inglés como [monkey patching][1] ya que *encapsula* lo que se interrumpe en el código.
Si bien es utilizado en frameworks como [Prototype][2], todavía no existen buenas razones para adoptarlo o integrarlo
como tipos de dato o como funcionalidad no estándar.

La **única** buena razón para extender un prototipo es acondicionarlo a nuevas
características en motores de JavaScript; por ejemplo, 
[`Array.forEach`][3].

### En conclusión

Se **debe** entender por completo el módelo de herencia prototipado antes de 
escribir código complejo que lo utlilice. Además, observe la longitud de la
cadena de prototipo y modificala si es necesario para evitar posibles problemas de 
rendimiento. Con relación a los prototipos nativos, estos **nunca** deben ser extendidos a 
menos que sea para mantener la compatibilidad con nuevas características de JavaScript.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

