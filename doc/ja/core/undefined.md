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

### Handling Changes to the Value of `undefined`

Since the global variable `undefined` only holds a copy of the actual *value* of 
`undefined`, assigning a new value to it does **not** change the value of the 
*type* `undefined`.

Still, in order to compare something against the value of `undefined` it is
necessary to retrieve the value of `undefined` first.

In order to protect code against a possible overwritten `undefined` variable, a 
common technique used is to add an additional parameter to an
[anonymous wrapper](#function.scopes), that gets no argument passed to it.

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined in the local scope does 
        // now again refer to the value

    })('Hello World', 42);

Another way to achieve the same effect would be to use a declaration inside the 
wrapper.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

The only difference being here, that this version results in 4 more bytes being
used in case it is minified and there is no other `var` statement inside the
anonymous wrapper.

### Uses of `null`

While `undefined` in the context of the JavaScript language is mostly used in
the sense of a traditional *null*, the actual `null` (both a literal and a type)
is more or less just another data type.

It is used in some JavaScript internals (like declaring the end of the
prototype chain by setting `Foo.prototype = null`), but in almost all cases it
can be replaced by `undefined`.


