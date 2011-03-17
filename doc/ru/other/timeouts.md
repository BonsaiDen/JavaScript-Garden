### `setTimeout` и `setInterval`

Поскольку JavaScript поддерживает асинхронность, есть возможность запланировать выполнение функции, используя функции `setTimeout` и `setInterval`.

> **Замечание:** Таймауты **не** являются частью стандарта ECMAScript, они были разработаны как раздел [DOM][1].

    function foo() {}
    var id = setTimeout(foo, 1000); // возвращает число > 0

Функция `setTimeout` возвращает идентификатор таймаута и планирует вызвать `foo` через, **примерно**, тысячу миллисекунд. Фунция `foo` будет вызвана ровно **один** раз.

В зависимости от разрешения таймера в используемом для запуска кода движке JavaScript, а также с учётом факта, что JavaScript является однопоточным языком и посторонний код может заблокировать выполнение потока, нет **никакой** гарантии, что код переданный будет выполнен ровно через указанное в вызове `setTimeout` время.

Переданная через первый параметр функция будет вызвана как *глобальный объект* — это значит что оператор [`this`](#function.this) в вызываемой функции будет ссылаться на этот самый объект.

    function Foo() {
        this.value = 42;
        this.method = function() {
            // this ссылается на глобальный объект
            console.log(this.value); // выведет в лог undefined
        };
        setTimeout(this.method, 500);
    }
    new Foo();


> **Замечание:** Поскольку `setTimeout` принимает **объект функции** в качестве первого параметра часто совершается ошибка в использовании `setTimeout(foo(), 1000)`, при котором будет использоваться **возвращённое значение** от вызова `foo`, а **не** вызвана функция `foo`. В большинстве случаев ошибка пройдёт незамеченной, а в случае если функция возвращает `undefined`, `setTimeout` вообще **не** породит никакой ошибки.

### Поочерёдные вызовы с использованием `setInterval`

`setTimeout` вызывает функцию единожды; `setInterval` — как и предполагает название — вызывает функцию **каждые** `X` миллисекунд. И его использование не рекомендуется.

В то время, когда исполняющийся код будет блокироваться во время вызова с таймаутом, `setInterval` будет продолжать планировать последующие вызовы переданной функции. Это может, особенно в случае небольших интервалов, повлечь за собой выстраивание вызовов функций в очередь.

    function foo(){
        // что-то, что выполняется одну секунду
    }
    setInterval(foo, 100);

В приведённом коде `foo` выполнится один раз и заблокирует этим главный поток на одну секунду.

Пока `foo` блокирует код, `setInterval` продолжает планировать последующие её вызовы. Теперь, когда первая `foo` закончила выполнение, в очереди будут уже **десять** ожидающих выполнения вызовов `foo`.

### Разбираемся с потенциальной блокировкой кода

Самый простой и контролируемый способ — использовать `setTimeout` внутри самой функции.

    function foo(){
        // что-то, выполняющееся одну секунду
        setTimeout(foo, 100);
    }
    foo();

Такой способ не только инкапсулирует вызов `setTimeout`, но и предотвращает от очередей блокирующих вызовов и обеспечивает дополнительный контроль. Сама функция `foo` теперь принимает решение, хочет ли она запускаться ещё раз или нет.

### Очистка таймаутов вручную

Удаление таймаутов и интервалов работает через передачу соответствуюего идентификатора либо в функцию `clearTimeout`, либо в функцию `clearInterval` — в зависимости от того, какая функция `set...` использовалась для его получения.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### Очистка всех таймаутов

Из-за того, что встроенного метода для удаления всех таймаутов и/или интервалов не существует, для достижения этой цели приходится использовать брутфорс.

    // удаляем "все" таймауты
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

Вполне могут остаться таймауты, которые не будут захвачены этим произвольным числом; так что рекомендуется следить за идентификаторами всех создающихся таймаутов, засчёт чего их можно будет удалять индивидуально.

### Скрытое использование `eval`

`setTimeout` and `setInterval` can also take a string as their first parameter.
This feature should **never** be used, since it internally makes use of `eval`.

> **Note:** Since the timeout functions are **not** specified by the ECMAScript
> standard, the exact workings when a string is passed to them might differ in
> various JavaScript implementations. As a fact, Microsoft's JScript makes use of
> the `Function` constructor in place of `eval`.

    function foo() {
        // will get called
    }

    function bar() {
        function foo() {
            // never gets called
        }
        setTimeout('foo()', 1000);
    }
    bar();

Since `eval` is not getting called [directly](#core.eval) in this case, the string
passed to `setTimeout` will get executed in the *global scope*; thus, it will
not use the local variable `foo` from the scope of `bar`.

It is further recommended to **not** use a string for passing arguments to the
function that will get called by either of the timeout functions.

    function foo(a, b, c) {}

    // NEVER use this
    setTimeout('foo(1,2, 3)', 1000)

    // Instead use an anonymous function
    setTimeout(function() {
        foo(a, b, c);
    }, 1000)

> **Note:** While it is also possible to use the syntax
> `setTimeout(foo, 1000, a, b, c)`, it is not recommended, as its use may lead
> to subtle errors when used with [methods](#function.this).

### In conclusion

**Never** should a string be used as the parameter of `setTimeout` or
`setInterval`. It is a clear sign of **really** bad code, when arguments need
to be supplied to the function that gets called. An *anonymous function* should
be passed that then takes care of the actual call.

Further, the use of `setInterval` should be avoided since its scheduler is not
blocked by executing JavaScript.

[1]: http://ru.wikipedia.org/wiki/Document_Object_Model

