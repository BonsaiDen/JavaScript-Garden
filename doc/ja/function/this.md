## `this`はどのように動作するのか

JavaScriptの`this`と名付けられた特殊なキーワードは他のプログラム言語と違うコンセプトを持っています。JavaScriptの`this`は正確に**5個**の別々の使い道が存在しています。

### グローバルスコープとして

    this;

`this`をグローバルスコープ内で使用すると、単純に*グローバル*オブジェクトを参照するようになります。


### 関数呼び出しとして

    foo();

この`this`は、再度*グローバル*オブジェクトを参照しています。

> **ES5での注意:** strictモードでは、このグローバルのケースは**もはや**存在していません。
> この場合`this`の代わりに`undefined`値を持つことになります。

### メソッド呼び出しとして

    test.foo(); 

この例では`this`は`test`を参照します。

### コンストラクター呼び出し

    new foo(); 

`new`キーワードが付いた関数呼び出しは[コンストラクター](#function.constructors)として機能します。関数内部では`this`は*新規に作成された*`Object`を参照します。

### `this`の明示的な設定

    function foo(a, b, c) {}

    var bar = {};
    foo.apply(bar, [1, 2, 3]); // 配列は下記で展開される
    foo.call(bar, 1, 2, 3); // 結果はa = 1, b = 2, c = 3

 `Function.prototype`の`call`や`apply`メソッドを使用した時には、呼び出された関数の内部での`this`の値は、対応する関数呼び出しの最初の引数に**明示的に設定**されます。

結果として、上記の例では*メソッドケース*が適用**されず**、`foo`の内部の`this`は`bar`に設定されます。

> **注意:** `this`は`Object`リテラル内部のオブジェクトを参照**しません**。
> ですので、`var obj = {me: this}`での`me`は`obj`を参照**しません**。
> `this`はここで紹介ている5個のケースの内どれか一つに束縛されます。

### 良くある落し穴

これらほとんどのケースで見てきたように、最初のケースでは**絶対に**実用化できないという言語設計のミスを考慮しないとなりません。

    Foo.method = function() {
        function test() {
            // このファンクションはグローバルオブジェクトに設定される
        }
        test();
    }

良くある誤解として`test`の中の`this`が`Foo`を参照しているというものがありますが、そのような事実は**一切**ありません。

`test`の中の`Foo`にアクセスする為には、`Foo`を参照する`method`のローカル変数を作る必要があります。

    Foo.method = function() {
        var that = this;
        function test() {
            // ここでthisの代わりに使用する
        }
        test();
    }

`that`は通常の変数名ですが、外部の`this`の参照の為に良く使われます。[クロージャ](#function.closures)と組み合わせる事で`this`の値を渡す事ができるようになります。

### メソッドの割り当て

JavaScriptを使用する上で、もう一つ動か**ない**ものが関数のエイリアスです。これは変数へメソッドを**割り当て**する事です。

    var test = someObject.methodTest;
    test();

最初のケースの`test`は通常の関数呼び出しになる為に、この中の`this`は、最早`someobject`を参照できなくなってしまいます。

`this`の遅延バインディングは最初見た時にはダメなアイデアに見えますが、[プロトタイプ継承](#object.prototype)により、きちんと動作します。

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

`method`が`Bar`のインスタンスにより呼び出された時に、`this`はまさにそのインスタンスを参照するようになります。
