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

### どのように動くか

以下のコードはセミコロン無いので、パーサーはどこに挿入するか決めなくてはなりません。

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

下記がパーサーの「推測」ゲームの結果になります。

    (function(window, undefined) {
        function test(options) {

            // 行がマージされて、挿入されない
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- 挿入

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- 挿入

            return; // <- inserted, breaks the return statement
            { // ブロックとして扱われる

                // a label and a single expression statement
                foo: function() {} 
            }; // <- 挿入
        }
        window.test = test; // <- 挿入

    // 再度行がマージされる
    })(window)(function(window) {
        window.someLibrary = {}; // <- 挿入

    })(window); //<- 挿入

> **注意点:** JavaScriptパーサーは新しい行のreturn文を「正しく」返してはいないですが、
> これは必要という訳では無いので自動セミコロン挿入の障害になります。
> このお陰で不必要な副作用を無くす事にもなります。

パーサーは上記のコードの振舞いを劇的に変化させます。あるケースにおいては、**間違っている事**にもなってしまいます。

### 先頭の括弧

先頭に括弧がある場合、パーサーはセミコロンを挿入**しません**。

    log('testing!')
    (options.list || []).forEach(function(i) {})

このコードは1つの行に変形します。

    log('testing!')(options.list || []).forEach(function(i) {})

`log`が関数を返さ**ない**確率は**とても**高いです。しかし、上記では`undefined is not a function`という`TypeError`が繰り返されます。

### In Conclusion

It is highly recommended to **never** omit semicolons, it is also advocated to 
keep braces on the same line with their corresponding statements and to never omit 
them for one single-line `if` / `else` statements. Both of these measures will 
not only improve the consistency of the code, they will also prevent the 
JavaScript parser from changing its behavior.

