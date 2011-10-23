### `setTimeout`と`setInterval`

JavaScriptは非同期なので、`setTimeout`と`setInterval`関数を使ってある関数の実行のスケジュールを決める事が可能です。

> **注意点:** タイムアウトはECMAScript標準の一部では**ありません**。
> これらは[DOM][1]の一部として実装されています。

    function foo() {}
    var id = setTimeout(foo, 1000); // Number > 0を返す

`setTimeout`が呼ばれた時に、タイムアウトのIDと`foo`この先の**おおよそ**1000msに実行するスケジュールを返します。`foo`は正確に**1度**だけ実行されます。

コードが実行されているJavaScriptエンジンのタイマー分解能によって決まります。この事実はJavaScriptがシングルスレッドのなので、他のスレッドでの実行を妨害してしまう事があるかもしれません。これは、`setTimeout`の呼び出しにより指定された正確なディレイで実行するという確実な賭けという**意味ではありません**。

第一パラメーターを渡された関数は*グローバルオブジェクト*によって呼び出されます。これは呼び出された関数の内部で[`this`](#functionis)がまさにこのオブジェクトを参照しているという事になります。

    function Foo() {
        this.value = 42;
        this.method = function() {
            // これはグローバルオブジェクトを参照しています
            console.log(this.value); // undefinedを記録するはずです
        };
        setTimeout(this.method, 500);
    }
    new Foo();


> **注意点:** `setTimeout`は**関数オブジェクト**を第一引数に取ります。
> 良く間違えてしまう使い方として`setTimeout(foo(), 1000)`というものがあります。
> `foo`と`foo`**以外**の呼び出しに対する**戻り値**としてしまいます。これは、大体において、
> 関数が`undefined`になる為に表に出ないエラーになるでしょう。`setTimeout`はどんな
> エラーも発生`させません`。

### Stacking Calls with `setInterval`

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

### Dealing with Possible Blocking Code

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

### Manually Clearing Timeouts

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
> various JavaScript implementations. For example, Microsoft's JScript makes use of
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

### In Conclusion

**Never** should a string be used as the parameter of `setTimeout` or 
`setInterval`. It is a clear sign of **really** bad code, when arguments need 
to be supplied to the function that gets called. An *anonymous function* should
be passed that then takes care of the actual call.

Further, the use of `setInterval` should be avoided since its scheduler is not
blocked by executing JavaScript.

[1]: http://en.wikipedia.org/wiki/Document_Object_Model "Document Object Model"

