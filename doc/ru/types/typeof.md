## Оператор `typeof`

Оператор `typeof` (вместе с [`instanceof`](#types.instanceof)) — это, вероятно, самая большая недоделка в JavaScript, поскольку выходит, что он **поломан почти полностью**.

Хотя `instanceof` используется достаточно редко, `typeof` вообще имеет один практический случай применения, который при всём при этом неожиданно **не** оказывается проверкой типа объекта.

> **Замечаение:** Хотя для вызова `typeof` также можно использовать синтаксис функции, т.е. `typeof(obj)`, на самом деле это не функция. Двойные круглые скобки будут работать нормально и возвращаемое значение будет использоваться как операнд оператора `typeof`. Но функции `typeof` — **не существует**.

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

В таблице выше, в колонке *Тип* приводится значение, возвращаемое оператором `typeof` для указанного объекта. Как хорошо заметно, это значение может быть чем угодно, но не ожидаемым результатом.

В колонке *Класс* приведено значение внутреннего свойства объекта `[[Class]]`.

> **Из спецификации:** Значением `[[Class]]` может быть одна из следующих строк: `Arguments`, `Array`, `Boolean`, `Date`, `Error`, `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

Чтобы получить значение `[[Class]]` нужно применить к объекту метод `toString` из `Object.prototype`.

### Класс объекта

Спецификация предоставляет только один способ доступа к значению `[[Class]]` — используя `Object.prototype.toString`.

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }

    is('String', 'test'); // true
    is('String', new String('test')); // true

В примере выше `Object.prototype.toString` вызывается со значением [this](#function.this), ссылающимся на объект, значение `[[Class]]` которого нужно получить.

> **ES5 Замечание:** Для удобства, в ECMAScript 5 возвращаемое значение `Object.prototype.toString` для `null` и `undefined` было изменено с `Object` на `Null` и `Undefined` соответственно.

### Проверка переменных на определённость

    typeof foo !== 'undefined'

Выше проверяется, было ли `foo` действительно объявлено или нет; обычное обращение к несуществующей переменной приведёт к `ReferenceError`. И это единственное, чем на самом деле полезен `typeof`.

### Заключение

Для проверки типа объекта настоятельно рекомендуется использовать `Object.prototype.toString` — это единственный надежный способ для этих действий. Как показано выше в таблице типов, некоторые значения, возвращаемые `typeof`, не описаны в спецификации: таким образом, они могут отличаться в различных реализациях.

Кроме случая проверки, была ли определена переменная, `typeof` следует избегать.

