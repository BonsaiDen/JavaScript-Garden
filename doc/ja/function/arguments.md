## オブジェクトの`arguments`

JavaScriptの全ての関数スコープは`arguments`と呼ばれる特別な変数にアクセスできます。この変数は関数が受け取った全ての引数を保持する変数です。

> **注意:** `arguments`が既に`var`や正式なパラメーターにより
> 関数のスコープ内部で定義されている場合は
> `arguments`オブジェクトは作られません。

`arguments`オブジェクトは`Array`では**ありません**。これは配列と同じような -`length`プロパティと名付けられています- 文法を持っていますが、`Array.prototype`を継承している訳では無いので、実際`Object`になります。

この為、`arguments`で`push`や`pop`、`slice`といった通常の配列メソッドは使用する事が**出来ません**。プレーンな`for`ループのような繰り返しでは上手く動作しますが、通常の`Array`メソッドを使いたい場合は本当の`Array`に変換しなければなりません。

### 配列への変換

下のコードは`arguments`オブジェクトの全ての要素を含んだ新しい`Array`を返します。

    Array.prototype.slice.call(arguments);

この変換は**遅い**です。コードのパフォーマンスに関わる重要な部分での使用は**推奨しません**。

### 引き数の受け渡し

下記の例はある関数から別の関数に引数を引き渡す際に推奨される方法です。

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // do stuff here
    }

他のテクニックとして、高速で非結合のラッパーとして`call`と`apply`両方を一緒に使用するという物があります。

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // "メソッド"の非結合バージョンを作成する
    // このメソッドはthis, arg1, arg2...argNのパラメーターを持っている
    Foo.method = function() {

        // 結果: Foo.prototype.method.call(this, arg1, arg2... argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };


### 仮パラメーターと引数のインデックス

`arguments`オブジェクトは*ゲッター*と*セッター*機能を自身のプロパティと同様に関数の仮パラメーターとして作成します。

結果として、仮パラメーターを変更すると`arguments`の対応する値も変更されますし、逆もしかりです。

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

### パフォーマンスの神話と真実

`arguments`オブジェクトは、関数の内部の名前宣言と仮パラメーターという2つの例外を常に持ちながら生成されます。これは、使用されているかどうかは関係がありません。

*ゲッター*と*セッター*は両方とも**常に**生成されます。その為これを使用してもパフォーマンスに影響は全くといって言い程ありません。`arguments`オブジェクトのパラメーターに単純にアクセスしているような、実際のコードであれば尚更です。

> **ES5での注意:** strictモードでは、これら*ゲッター*と*セッター*は生成されません。

しかし、一つだけモダンJavaScriptエンジンにおいて劇的にパフォーマンスが低下するケースがあります。そのケースとは`arguments.callee`を使用した場合です。

    function foo() {
        arguments.callee; // この関数オブジェクトで何かする
        arguments.callee.caller; // そして関数オブジェクトを呼び出す
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // 通常はインライン展開する
        }
    }

上記のコードでは、`foo`は自身と自身の呼び出し元の両方を知らないと[インライン展開][1]の対象になる事が出来ません。この事は、インライン展開によるパフォーマンスの向上の機会を失くす事になり、また、特定のコンテクストの呼び出しに依存する関数のせいで、カプセル化が解除されてしまいます。

この為に`arguments.callee`を使用または、そのプロパティを**決して**使用しない事を**強く推奨**します。

> **ES5での注意:** strictモードでは、`arguments.callee`は推奨されていない為に
> `Typeerror`が返るようになっています。

[1]: http://en.wikipedia.org/wiki/Inlining


