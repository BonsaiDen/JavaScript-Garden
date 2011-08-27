## スコープと名前空間

JavaScriptはブロックに2つのペアの中括弧を使うのが素晴しいですが、これはブロックスコープをサポートして**いません**。その為、この言語に残されているのは*関数スコープ*だけです。

    function test() { // スコープ
        for(var i = 0; i < 10; i++) { // スコープではない
            // 数える
        }
        console.log(i); // 10
    }

> **注意:** 代入が使用されてない時、return文や関数の引数、`{...}`表記はブロック文として
> 解釈されて、オブジェクトリテラルトは**なりません**。これは[セミコロン自動挿入](#core.semicolon)
> と連動して奇妙なエラーを引き起こすことになります。

JavaScriptはまた明確な名前空間を持ちません。この事は全て一つの*グローバルで共有された*名前空間で定義されるという事です。

変数が参照されるまでの間、JavaScriptはスコープ全てを遡って参照を探索します。グローバルスコープまで遡っても要求した名前が無いと`ReferenceError`が発生します。

### グローバル変数の致命傷

    // スクリプト A
    foo = '42';

    // スクリプト B
    var foo = '42'

上記の2つのスクリプトは同じ効果を持って**いません**。スクリプト Aは`foo`と呼ばれる変数を、*グローバル*スコープに定義しており、スクリプト Bは`foo`を*現在*のスコープで定義ています。

再び、`var`が重大な影響を持っていない、*同じ効果*では**無い**スクリプトになります。

    // グローバルスコープ
    var foo = 42;
    function test() {
        // ローカルスコープ
        foo = 21;
    }
    test();
    foo; // 21

`test`関数の中の`var`ステートメントを省略すると`foo`の値をオーバーライドします。最初の内は大した事ではないように思いますが、JavaScriptが何千行規模になると、`var`を使っていない事で恐怖とバグの追跡の困難さを招くことになります。

    // グローバルスコープ
    var items = [/* 同じリスト */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }

    function subLoop() {
        // サブループのスコープ
        for(i = 0; i < 10; i++) { // varステートメントが無くなった
            // 素敵な実装を！
        }
    }

外側のループは`subloop`が最初に呼ばれた後に終了します。なぜなら、`subloop`がグローバル変数`i`の値で上書きされているからです。2番目の`for`ループに`var`を使用する事によって簡単にこのエラーを回避する事ができます。`var`ステートメントは*希望する影響*を外側のスコープに与える場合を除いては、**絶対**に残してはいけません。

### ローカル変数

JavaScriptのローカル変数の為の唯一のソースは[function](#function.general)パラメーターと`var`ステートメントを宣言された変数になります。

    // グローバルスコープ
    var foo = 1;
    var bar = 2;
    var i = 2;

    function test(i) {
        // 関数testのローカル変数
        i = 5;

        var foo = 3;
        bar = 4;
    }
    test(10);

`foo`と`i`は、関数`test`のスコープ内のローカル変数ですが、`bar`の割り当ては同じ名前のグローバル変数で上書きされてしまいます。

### Hoisting

JavaScript **hoists** declarations. This means that both `var` statements and
`function` declarations will be moved to the top of their enclosing scope.

    bar();
    var bar = function() {};
    var someValue = 42;

    test();
    function test(data) {
        if (false) {
            goo = 1;

        } else {
            var goo = 2;
        }
        for(var i = 0; i < 100; i++) {
            var e = data[i];
        }
    }

The above code gets transformed before any execution is started. JavaScript moves
the `var` statements as well as the `function` declarations to the top of the 
nearest surrounding scope.

    // var statements got moved here
    var bar, someValue; // default to 'undefined'

    // the function declartion got moved up too
    function test(data) {
        var goo, i, e; // missing block scope moves these here
        if (false) {
            goo = 1;

        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // fails with a TypeError since bar is still 'undefined'
    someValue = 42; // assignments are not affected by hoisting
    bar = function() {};

    test();

Missing block scoping will not only move `var` statements out of loops and
their bodies, it will also make the results of certain `if` constructs 
non-intuitive.

In the original code the `if` statement seemed to modify the *global 
variable* `goo`, while actually it modifies the *local variable* - after hoisting 
has been applied.

Without the knowledge about *hoisting*, below code might seem to raise a 
`ReferenceError`.

    // check whether SomeImportantThing has been initiliazed
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

But of course, the above works due to the fact that the `var` statement is being 
moved to the top of the *global scope*.

    var SomeImportantThing;

    // other code might initiliaze SomeImportantThing here, or not

    // make sure it's there
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### Name Resolution Order

All scopes in JavaScript, including the *global scope*, have the special name 
[`this`](#function.this) defined in them, which refers to the *current object*. 

Function scopes also have the name [`arguments`](#function.arguments) defined in
them which contains the arguments that were passed to a function.

For example, when trying to access a variable named `foo` inside the scope of a 
function, JavaScript will lookup the name in the following order:

 1. In case there is a `var foo` statement in the current scope use that.
 2. If one of the function parameters is named `foo` use that.
 3. If the function itself is called `foo` use that.
 4. Go to the next outer scope and start with **#1** again.

> **Note:** Having a parameter called `arguments` will **prevent** the creation 
> of the default `arguments` object.

### Namespaces

A common problem of having only one global namespace is the likeliness of running
into problems where variable names clash. In JavaScript, this problem can
easily be avoided with the help of *anonymous wrappers*.

    (function() {
        // a self contained "namespace"
        
        window.foo = function() {
            // an exposed closure
        };

    })(); // execute the function immediately


Unnamed functions are considered [expressions](#function.general); so in order to
being callable, they must first be evaluated.

    ( // evaluate the function inside the paranthesis
    function() {}
    ) // and return the function object
    () // call the result of the evaluation

There are other ways for evaluating and calling the function expression; which, 
while different in syntax, do behave the exact same way.

    // Two other ways
    +function(){}();
    (function(){}());

### In Conclusion

It is recommended to always use an *anonymous wrapper* for encapsulating code in 
its own namespace. This does not only protect code against name clashes, it 
also allows for better modularization of programs.

Additionally, the use of global variables is considered **bad practice**. **Any**
use of them indicates badly written code that is prone to errors and hard to maintain.

