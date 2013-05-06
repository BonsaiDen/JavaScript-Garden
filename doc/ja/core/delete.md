## `delete`演算子

端的に言って、JavaScriptの関数やその他の要素は`DontDelete`属性が設定されているので、グローバル変数を消去する事は*不可能*です。

### グローバルコードと関数コード

変数や、関数がグローバルまたは[関数スコープ](#function.scopes)で定義された時は、そのプロパティは有効なオブジェクトかグローバルオブジェクトになります。このようなプロパティは属性のセットを持っていますが、それらの内の1つが`DontDelete`になります。変数や関数がグローバルや関数コードで宣言されると、常に`DontDelete`属性を作るために、消去できません。

    // グローバル変数:
    var a = 1; // DontDelete属性が設定される
    delete a; // false
    a; // 1

    // 通常関数:
    function f() {} // DontDelete属性が設定される
    delete f; // false
    typeof f; // "function"

    // 再代入も役に立たない:
    f = 1;
    delete f; // false
    f; // 1

### 明示的なプロパティ

普通にプロパティを消去できる方法が存在します：プロパティを明示的に設定するのです。

    // プロパティを明示的に設定する
    var obj = {x: 1};
    obj.y = 2;
    delete obj.x; // true
    delete obj.y; // true
    obj.x; // undefined
    obj.y; // undefined

上記の例の中で、`obj.x`と`obj.y`はそれぞれ`DontDelete`属性が無い為に削除できます。これが下記の例でも動作する理由です。

    // IE以外では、これも動作する
    var GLOBAL_OBJECT = this;
    GLOBAL_OBJECT.a = 1;
    a === GLOBAL_OBJECT.a; // true - ただのグローバルのvar
    delete GLOBAL_OBJECT.a; // true
    GLOBAL_OBJECT.a; // undefined

ここでは`a`. [`this`](#function.this)を消す為にグローバルオブジェクトと明示的に宣言した`a`をそのプロパティとして参照させて、消去する事を許可するトリックを使います。

IE(最低でも6-8で)は多少のバグがある為に、上記のコードは動作しません。


### 関数の引数と組み込み引数

関数の通常の引数である、[`arguments` object](#function.arguments)と組み込みのプロパティもまた、`DontDelete`が設定されています。

    // 関数の引数とプロパティ:
    (function (x) {

      delete arguments; // false
      typeof arguments; // "object"

      delete x; // false
      x; // 1

      function f(){}
      delete f.length; // false
      typeof f.length; // "number"

    })(1);

### ホストオブジェクト

`delete`演算子の挙動はホストオブジェクトにとって予測不可能になりかねません。仕様によりホストオブジェクトは、あらゆる挙動の実行が許可されている為です。

### 終わりに

`delete`演算子は、しばしば予期せぬ挙動をします。唯一安全な使用方法は通常のオブジェクトに明示的に設定されたプロパティを扱う場合だけです。
