## `undefined`と`null`

JavaScriptは`nothing`を表す2つの別個の値を持っています。`undefined`はこれら2つの内より便利な存在です。

### `undefined`の値

`undefined`はただ1つの値`undefined`を持つ型です。

この言語はまた、`undefined`の値を持つグローバル変数を定義しています。この値もまた`undefined`と呼ばれています。しかし、この変数は **どちらも** 言語のキーワードではなく、定数です。この事はこの*値*は簡単に上書きされてしまうという事になります。

> **ES5での注意点:** ECMAScript 5での`undefined`は **もはや** strict modeでは *書き変えられない*
> ようになっています。しかし、この名前は`undefined`という名前の関数の例に痕跡が見られるだけです。

`undefined`が帰される時の例をいくつか挙げます。

 - (未定義の)グローバル変数`undefined`にアクセスした時
 - `return`文が無い為に、暗黙のうちに関数が返された時
 - 何も返されない`return`がある時
 - 存在しないプロパティを探索する時
 - 関数のパラメーターで明示的な値が何も無い時
 - 全ての`undefined`が設定された値

### `undefined`の値に変更する処理

グローバル変数`undefined`のみが実際の`undefined`の*値*のコピーを保持するので、これに新しい値を代入しても`undefined`の*型* の値が変更される事は**ありません**。

まだ、`undefined`の値に対して何かしらの比較をしないといけない場合は、最初に`undefined`の値を取得する必要があります。

コードの`undefined`の変数の上書きを可能な限りしないよう保護する為には、一般的なテクニックとして[anonymous wrapper](#function.scopes)の引数にパラメーターを追加するというものがあります。

    var undefined = 123;
    (function(something, foo, undefined) {
        // ローカルスコープではundefined。
        // ここで値に対して参照がされる

    })('Hello World', 42);

同じ効果を得る事ができる別の方法として、ラッパーの内部での宣言を使うものがあります。

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

これらの唯一の違いは、こちらのバージョンの方が4バイト余計に短縮できるという物です。また、他に`var`ステートメントは匿名ラッパーの中にはありません。

### Uses of `null`

While `undefined` in the context of the JavaScript language is mostly used in
the sense of a traditional *null*, the actual `null` (both a literal and a type)
is more or less just another data type.

It is used in some JavaScript internals (like declaring the end of the
prototype chain by setting `Foo.prototype = null`), but in almost all cases it
can be replaced by `undefined`.


