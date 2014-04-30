## Оператор `instanceof`

Оператор `instanceof` сравнивает конструкторы двух операндов. Это полезно только когда сравниваются пользовательские объекты. Использование на встроенных типах почти так же бесполезно, как и [оператор typeof](#types.typeof).

### Сравнение пользовательских объектов

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // Всего лишь присваиваем Bar.prototype объект функции Foo,
    // но не экземпляра Foo
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### Использование `instanceof` со встроенными типами

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

Здесь надо отметить одну важную вещь: `instanceof` не работает на объектах, которые происходят из разных контекстов JavaScript (например, из различных документов в web-браузере), так как их конструкторы и правда не будут конструкторами *тех самых* объектов.

### Заключение

Оператор `instanceof` должен использоваться **только** при обращении к пользовательским объектам, происходящим из одного контекста JavaScript. Так же, как и в случае оператора `typeof`, любого другого использования необходимо **избегать**.

