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

### `hasOwnProperty` for Filtering

    // still the foo from above
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

This version is the only correct one to use. Due to the use of `hasOwnProperty` it
will **only** print out `moo`. When `hasOwnProperty` is left out, the code is 
prone to errors in cases where the native prototypes - e.g. `Object.prototype` - 
have been extended.

One widely used framework which does this is [Prototype][1]. When this 
framework is included, `for in` loops that do not use `hasOwnProperty` are 
guaranteed to break.

### In Conclusion

It is recommended to **always** use `hasOwnProperty`. Never should any 
assumptions be made about the environment the code is running in, or whether the 
native prototypes have been extended or not. 

[1]: http://www.prototypejs.org/

