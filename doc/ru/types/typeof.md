## Оператор `typeof`

Оператор `typeof` (вместе с [`instanceof`](#types.instanceof)) — это, вероятно, самая большая недоделка в JavaScript, поскольку, похоже, он **поломан более, чем полностью**.

Хотя `instanceof` еще имеет ограниченное применение, `typeof` на самом деле имеет *только один* практический случай применения, который при всём при этом **не** является проверкой типа объекта.

> **Замечание:** Хотя для вызова `typeof` также можно использовать синтаксис функции, т.е. `typeof(obj)`, на самом деле это не функция. Двойные круглые скобки будут работать нормально и возвращаемое значение будет использоваться как операнд оператора `typeof`. Но функции `typeof` — **не существует**.

### Таблица типов JavaScript

    Значение            Класс      Тип
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object (function в Nitro/V8)
    new RegExp("meow")  RegExp     object (function в Nitro/V8)
    {}                  Object     object
    new Object()        Object     object

В таблице выше *Тип* представляет собой значение, возвращаемое оператором `typeof`. Как хорошо видно, это значение может быть абсолютно любым, но не логичным результатом.

*Класс* представляет собой значение внутреннего свойства `[[Class]]` объекта.

> **Из спецификации:** Значением `[[Class]]` может быть одна из следующих строк: `Arguments`, `Array`, `Boolean`, `Date`, `Error`, `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

Для того, чтобы получить значение `[[Class]]`, необходимо вызвать метод `toString` у `Object.prototype`.

### Класс объекта

Спецификация предоставляет только один способ доступа к значению `[[Class]]` — используя `Object.prototype.toString`.

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }

    is('String', 'test'); // true
    is('String', new String('test')); // true

В примере выше `Object.prototype.toString` вызывается со значением [this](#function.this), являющимся объектом, значение `[[Class]]` которого нужно получить.

> **ES5 Замечание:** Для удобства  в ECMAScript 5 возвращаемое значение `Object.prototype.toString `для `null` и `undefined` было изменено с `Object` на `Null` и `Undefined` соответственно.

### Проверка переменных на определённость

    typeof foo !== 'undefined'

Выше проверяется, было ли `foo` действительно объявлено или нет; просто обращение к переменной приведёт к `ReferenceError`. Это единственное, чем на самом деле полезен `typeof`.

### Заключение

Для проверки типа объекта настоятельно рекомендуется использовать` Object.prototype.toString` — это единственный надежный способ. Как показано выше в таблице типов, некоторые возвращаемые `typeof` значения не определены в спецификации: таким образом, они могут отличаться в различных реализациях.

Кроме случая проверки, была ли определена переменная, `typeof` следует избегать **во что бы то ни стало**.

