## Почему нельзя использовать `eval`

Функция `eval` выполняет строчку кода JavaScript в локальном области видимости.

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

Но `eval` исполняется в локальномй области видимости только когда он вызывается **напрямую** *и при этом* имя вызываемой функции именно `eval`.

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3

**Любой ценой** избегайте использования функции `eval`. 99.9% случаев её "использования" могут достигаться **без её использования**.

### `eval` под прикрытием

Обе [функции работы с интервалами времени](#other.timeouts) `setTimeout` и `setInterval` могут принимать строку в качестве первого аргумента. Эта строка **всегда** будет выполняться в глобальной области видимости, поскольку `eval` в этом случае не вызывается напрямую.

### Проблемы с безопасностью

Кроме всего прочего, функция `eval` — это проблема в безопасности, поскольку исполняется **любой** переданный в неё код, **никогда** не следует использовать её со строками из неизвестных или недоверительных источников.

### Заключение

Никогда не стоит использовать `eval`: любое применение такого кода поднимает вопросы о качестве его работы, производительности и безопасности. Если вдруг для работы вам необходим `eval`, эта часть должна тут же ставиться под сомнение и **не** должна использоваться в первую очередь — нужно использовать *лучший способ* , которому не требуются вызовы `eval`.
