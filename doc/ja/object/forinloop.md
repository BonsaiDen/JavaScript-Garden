## `for in`ループ

`in`オペレーターは単に、`for in`ループの中でオブジェクトのプロパティをプロトタイプチェーンの中で繰り返し遡る為にあるものです。

> **注意:** `for in`ループは`列挙`される属性が`false`にセットされているプロパティを反復処理**しません**。;
> 例えば、配列の`length`プロパティなどがそれに当たります。

    // Object.prototype汚染
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // barとmooが両方とも表示される
    }

`for in`ループそれ自体の動作を変更する事は不可能ですが、ループ内にある要らないプロパティをフィルタリングする必要があります。そんな時は`Object.prototype`の[`hasOwnProperty`](#object.hasownproperty)メソッドを使うと解決します。

> **注意:** `for in`は常にプロトタイプチェーンを完全に遡ります。これにより
> オブジェクトに追加されている継承が多ければ多い程、速度は遅くなります。

### `hasOwnProperty`をフィルタリングに使用する

    // 継承されているfoo
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

このループの唯一正しい使い方がこの方法です。`hasOwnProperty`を使用しているので、
`moo`**のみ**が表示されるようになります。`hasOwnProperty`が省略されている場合は、このコードは
組み込みのプロトタイプが存在する場合に(特に`Object.prototype`が拡張されている場合)エラーを発生しやすくなります。

一般に広く使用されているJavaScriptフレームワークとして[Prototype][1]が挙げられます。このフレームワークには、
`for in` 内で`hasOwnProperty`が使用されプロトタプチェーン内を頭まで遡るのを中断する事が保証されています。

### 終わりに

**常に**`hasOwnProperty`を使用する事を推奨します。コードの実行環境や、組み込みのプロトタイプが拡張されているかどうかを仮定して書くようなコードを絶対書いてはいけません。

[1]: http://www.prototypejs.org/

