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


> **Note:** As `setTimeout` takes a **function object** as its first parameter, an
> often made mistake is to use `setTimeout(foo(), 1000)`, which will use the
> **return value** of the call `foo` and **not** `foo`. This is, most of the time,
> a silent error, since when the function returns `undefined` `setTimeout` will
> **not** raise any error.

### Stacking calls with `setInterval`

While `setTimeout` only runs the function once, `setInterval` - as the name
suggests - will execute the function **every** `X` milliseconds. But its use is
discouraged.

When code that is being executed blocks the timeout call, `setInterval` will
still issue more calls to the specified function. This can, especially with small
intervals, result in function calls stacking up.

    function foo(){
        // something that blocks for 1 second
    }
    setInterval(foo, 100);

In the above code `foo` will get called once and will then block for one second.

While `foo` blocks the code `setInterval` will still schedule further calls to
it. Now, when `foo` has finished, there will already be **ten** further calls to
it waiting for execution.

### Dealing with possible blocking code

The easiest as well as most controllable solution, is to use `setTimeout` within
the function itself.

    function foo(){
        // something that blocks for 1 second
        setTimeout(foo, 100);
    }
    foo();

Not only does this encapsulate the `setTimeout` call, but it also prevents the
stacking of calls and it gives additional control.`foo` itself can now decide
whether it wants to run again or not.

### Manually clearing timeouts

Clearing timeouts and intervals works by passing the respective ID to
`clearTimeout` or `clearInterval`, depending which `set` function was used in
the first place.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### Clearing all timeouts

As there is no built-in method for clearing all timeouts and/or intervals,
it is necessary to use brute force in order to achieve this functionality.

    // clear "all" timeouts
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

There might still be timeouts that are unaffected by this arbitrary number;
therefore, is is instead recommended to keep track of all the timeout IDs, so
they can be cleared specifically.

### Hidden use of `eval`

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

[1]: http://en.wikipedia.org/wiki/Document_Object_Model

