## オブジェクトの`arguments`

JavaScriptの全ての関数スコープは`arguments`と呼ばれる特別な変数にアクセスできます。この変数は関数が受け取った全ての引数を保持する変数です。

> **注意:** `arguments`が既に`var`や正式なパラメーターにより
> 関数のスコープが定義されている場合は
> `arguments`オブジェクトは作られません。

`arguments`オブジェクトは`配列`では**ありません**。これは配列と同じような -`length`プロパティと名付けられています- 文法を持っていますが、`Array.prototype`を継承している訳では無いので、実際`Object`になります。

この為、`arguments`で`push`や`pop`、`slice`といった通常の配列メソッドは使用する事が**出来ません**。プレーンな`for`ループのような繰り返しでは上手く動作しますが、通常の`配列`メソッドを使いたい場合は本当の`配列`に変換しなければなりません。

### 配列への変換

下のコードは`arguments`オブジェクトの全ての要素を含んだ新しい`配列`を返します。

    Array.prototype.slice.call(arguments);

この変換は**遅い**です。コードのパフォーマンスに関わる重要な部分での使用は**推奨しません**。

### Passing Arguments

The following is the recommended way of passing arguments from one function to
another.

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // do stuff here
    }

Another trick is to use both `call` and `apply` together to create fast, unbound
wrappers.

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // Create an unbound version of "method" 
    // It takes the parameters: this, arg1, arg2...argN
    Foo.method = function() {

        // Result: Foo.prototype.method.call(this, arg1, arg2... argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };


### Formal Parameters and Arguments Indices

The `arguments` object creates *getter* and *setter* functions for both its 
properties as well as the function's formal parameters.

As a result, changing the value of a formal parameter will also change the value
of the corresponding property on the `arguments` object, and the other way around.

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2                                                           

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);

### Performance Myths and Truths

The `arguments` object is always created with the only two exceptions being the 
cases where it is declared as a name inside of a function or one of its formal 
parameters. It does not matter whether it is used or not.

Both *getters* and *setters* are **always** created; thus, using it has nearly 
no performance impact at all, especially not in real world code where there is 
more than a simple access to the `arguments` object's properties.

> **ES5 Note:** These *getters* and *setters* are not created in strict mode.

However, there is one case which will drastically reduce the performance in
modern JavaScript engines. That case is the use of `arguments.callee`.

    function foo() {
        arguments.callee; // do something with this function object
        arguments.callee.caller; // and the calling function object
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // Would normally be inlined...
        }
    }

In the above code, `foo` can no longer be a subject to [inlining][1] since it 
needs to know about both itself and its caller. This not only defeats possible 
performance gains that would arise from inlining, it also breaks encapsulation
since the function may now be dependent on a specific calling context.

It is **highly recommended** to **never** make use of `arguments.callee` or any of 
its properties.

> **ES5 Note:** In strict mode, `arguments.callee` will throw a `TypeError` since 
> its use has been deprecated.

[1]: http://en.wikipedia.org/wiki/Inlining


