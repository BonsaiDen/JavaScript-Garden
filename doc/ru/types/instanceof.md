## Оператор `instanceof`

Оператор `instanceof` сравнивает конструкторы двух операндов. Он работает правильно только тогда, когда сравниваются пользовательские объекты. Использование его на встроенных типах практически так же бесполезно, как и использование [оператора typeof](#types.typeof).

### Сравнение пользовательских объектов

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // Всего-то лишь присваиваем Bar.prototype объект функции Foo,
    // а не экземпляр Foo
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### Использование `instanceof` со встроенными типами

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

Здесь нужно отметить одну важную вещь: `instanceof` не работает с объектами, которые происходят из разных контекстов JavaScript (например, из различных документов в web-браузере), так как их конструкторы на самом деле не будут конструкторами *тех же самых* объектов, что справедливо.

### Заключение

Оператор `instanceof` должен использоваться **только** при обращении к пользовательским объектам, происходящим из одного контекста JavaScript. Также, как и в случае оператора `typeof`, любого другого использования `instanceof` необходимо **избегать**.

