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

### 巻き上げ

JavaScriptの**巻き上げ**宣言。この言葉の意味は`var`ステートメントと`function`宣言が、それらの外側のスコープに移動するというものです。

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

上記のコードは何も実行されないうちに変換されてしまいます。JavaScriptは`var`ステートメントと同じように、直近で囲んでいる`function`宣言を先頭に移動させます。

    // varステートメントはここに移動する
    var bar, someValue; // 'undefined'がデフォルト

    // function宣言もここに移動する
    function test(data) {
        var goo, i, e; // 無くなったブロックスコープはこちらに移動する
        if (false) {
            goo = 1;

        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // barが'undefined'のままなので、Typeerrorで呼び出し失敗
    someValue = 42; // 割り当てすると巻き上げの影響を受けない
    bar = function() {};

    test();

ブロックスコープの欠落はループ外の`var`ステートメントの移動だけでなく、その本体も移動させます。これはまた`if`が直感的じゃない結果になってしまいます。

元のコードの中の`if`ステートメントは*グローバル変数*である`goo`も変更しているように見えますが、実際には -巻き上げが適用された後に- *ローカル変数*を変更しています。

*巻き上げ*についての知識がないと、下に挙げたコードは`ReferenceError`になるように見えます。

    // SomeImportantThingが初期化されているかチェックする
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

しかし、勿論上記の動きは`val`ステートメントが*グローバルスコープ*の上に移動しているという事実に基づいています。

    var SomeImportantThing;

    // 他のコードがSomeImportantThingをここで初期化するかもしれないし、しないかもしれない

    // SomeImportantThingがある事を確認してください
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

