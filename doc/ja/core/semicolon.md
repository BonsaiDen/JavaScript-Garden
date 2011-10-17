## セミコロン自動挿入

JavaScriptはC言語スタイルのシンタックスを持っていますが、これはソースコードの中でセミコロンの使用を強制している事には**ならない**ので、これらを省略する事も可能です。

JavaScriptはセミコロン無しの言語ではありません。実際に、ソースコードを理解する為にもセミコロンは必要になります。ですので、JavaScriptのパーサーはセミコロンが無い事によるパースエラーを検出する度に、**自動的**にセミコロンを挿入します。

    var foo = function() {
    } // セミコロンが入っている事が期待されるので、パースエラーになる
    test()

挿入が起こると、パーサーはもう一度パースします。

    var foo = function() {
    }; // エラーが無いので、パーサーは次の解析をする
    test()

セミコロンの自動挿入は、コードの振る舞いを変えられる為に、言語の**最大**の欠陥の内の一つと考えられています。

### How it Works

The code below has no semicolons in it, so it is up to the parser to decide where
to insert them.

    (function(window, undefined) {
        function test(options) {
            log('testing!')

            (options.list || []).forEach(function(i) {

            })

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            )

            return
            {
                foo: function() {}
            }
        }
        window.test = test

    })(window)

    (function(window) {
        window.someLibrary = {}

    })(window)

Below is the result of the parser's "guessing" game.

    (function(window, undefined) {
        function test(options) {

            // Not inserted, lines got merged
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- inserted

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- inserted

            return; // <- inserted, breaks the return statement
            { // treated as a block

                // a label and a single expression statement
                foo: function() {} 
            }; // <- inserted
        }
        window.test = test; // <- inserted

    // The lines got merged again
    })(window)(function(window) {
        window.someLibrary = {}; // <- inserted

    })(window); //<- inserted

> **Note:** The JavaScript parser does not "correctly" handle return statements 
> which are followed by a new line, while this is not neccessarily the fault of 
> the automatic semicolon insertion, it can still be an unwanted side-effect. 

The parser drastically changed the behavior of the code above, in certain cases
it does the **wrong thing**.

### Leading Parenthesis

In case of a leading parenthesis, the parser will **not** insert a semicolon.

    log('testing!')
    (options.list || []).forEach(function(i) {})

This code gets transformed into one line.

    log('testing!')(options.list || []).forEach(function(i) {})

Chances are **very** high that `log` does **not** return a function; therefore,
the above will yield a `TypeError` stating that `undefined is not a function`.

### In Conclusion

It is highly recommended to **never** omit semicolons, it is also advocated to 
keep braces on the same line with their corresponding statements and to never omit 
them for one single-line `if` / `else` statements. Both of these measures will 
not only improve the consistency of the code, they will also prevent the 
JavaScript parser from changing its behavior.

