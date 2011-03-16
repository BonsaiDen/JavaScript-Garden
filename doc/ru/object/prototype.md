## Великий Прототип

В JavaScript отсутствует классическая модель наследования — вместо неё использользуется [*прототипная модель*][1].

Хотя её часто расценивают как один из недостатков JavaScript, на самом деле прототипная модель наследования намного мощнее классической. К примеру, поверх неё предельно легко реализовать классическое наследование, а наоборот — тут уж придется сильно потрудиться.

Из-за того, что JavaScript — практически единственный широко используемый язык с прототипным наследованием, придётся потратить некоторое время на осознание различий между этими двумя моделями.

Первое важное отличие заключается в том, что наследование в JavaScript производится с использованием так называемых  *цепочек прототипов*.

> **Замечание:** В результате выполнения конструкции `Bar.prototype = Foo.prototype` оба объекта будут делить друг с другом **один и тот же** прототип. Так что изменение прототипа одного из объектов повлечёт за собой изменение прототипа другого и наоборот — вряд ли это окажется тем, чего вы ожидали.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Установим значением прототипа Bar новый экземпляр Foo
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // Убедимся, что Bar является действующим конструктором
    Bar.prototype.constructor = Bar;

    var test = new Bar() // создадим новый экземпляр bar

    // Цепочка прототипов, которая получится в результате
    test [instance of Bar]
        Bar.prototype [instance of Foo]
            { foo: 'Hello World' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* и т.д. */ }

В приведённом коде объект `test` наследует оба прототипа: `Bar.prototype` и `Foo.prototype`; следовательно, он имеет доступ к функции `method` которую мы определили в прототипе `Foo`. Также у него есть доступ к свойству `value` **одного уникального** экземпляра `Foo`, который является его протипом. Важно заметить, что код `new Bar()` **не** создаёт новый экземпляр `Foo`, а переиспользует тот, который был назначен его прототипом: таким образом все новые экземпляры `Bar` будут иметь **одинаковое** свойство `value`.

> **Замечание:** Никогда **не** используйте конструкцию `Bar.prototype = Foo`, поскольку ссылка будет указывать не на прототип `Foo`, а на объект функции `Foo`. Из-за этого цепочка прототипов будет проходить через `Function.prototype`, а не через `Foo.prototype` и в результате функция `method` не будет содержаться в цепочке прототипов.

### Property lookup

When accessing the properties of an object, JavaScript will traverse the
prototype chain **upwards** until it finds a property with the requested name.

When it reaches the top of the chain - namely `Object.prototype` - and still
hasn't found the specified property, it will return the value
[undefined](#core.undefined) instead.

### The prototype property

While the prototype property is used by the language to build the prototype
chains, it is still possible to assign **any** given value to it. Although
primitives will simply get ignored when assigned as a prototype.

    function Foo() {}
    Foo.prototype = 1; // no effect

Assigning objects, as shown in the example above, will work, and allows for dynamic
creation of prototype chains.

### Performance

The lookup time for properties that are high up on the prototype chain can have a
negative impact on performance critical sections of code. Additionally, trying to
access non-existent properties will always traverse the full prototype chain.

Also, when [iterating](#object.forinloop) over the properties of an object
**every** property that is on the prototype chain will get enumerated.

### Extension of native prototypes

One mis-feature that is often used is to extend `Object.prototype` or one of the
other built in prototypes.

This technique is called [monkey patching][2] and breaks *encapsulation*. While
used by widely spread frameworks such as [Prototype][3], there is still no good
reason for cluttering built-in types with additional *non-standard* functionality.

The **only** good reason for extending a built-in prototype is to backport
the features of newer JavaScript engines; for example,
[`Array.forEach`][4].

### In conclusion

It is a **must** to understand the prototypal inheritance model completely
before writing complex code which makes use of it. Also, watch the length of
the prototype chains and break them up if necessary to avoid possible
performance issues. Further, the native prototypes should **never** be extended
unless it is for the sake of compatibility with newer JavaScript features.

[1]: http://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D1%82%D0%BE%D1%82%D0%B8%D0%BF%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5
[2]: http://en.wikipedia.org/wiki/Monkey_patch
[3]: http://prototypejs.org/
[4]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

