## `hasOwnProperty`

オブジェクトは*自分自身*と**自分以外**のどちらで定義されたプロパティかを[prototype chain](#object.prototype)のどこかでチェックしなくてはなりません。これは`Object.prototype`から継承される全てのオブジェクトの`hasOwnProperty`メソッドを使う必要があります。

> **注意:** この方法はプロパティが`undefined`かどうかを調べるには十分では**無い**方法です。
> プロパティは、ほとんどのオブジェクトで存在しているはずの物ではありますが、`undefined`が
> 値に設定される事態は起こり得ます。

`hasOwnProperty`はJavaScriptで唯一プロトタイプチェーン内を**遡らず**にプロパティを扱う事が出来ます。

    // Object.prototype汚染
    Object.prototype.bar = 1; 
    var foo = {goo: undefined};

    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

`hasOwnProperty`だけが、正しく期待した結果を出すでしょう。これはあらゆるオブジェクトのプロパティの繰り返し処理をする時必須の事です。オブジェクト*自身*に定義されておらず、プロトタイプチェーンのどこかには定義されているというプロパティを除外する手段が他に**ありません**。

### `hasOwnProperty` as a Property

JavaScript does **not** protect the property name `hasOwnProperty`; thus, if the
possibility exists that an object might have a property with this name, it is
necessary to use an *external* `hasOwnProperty` in order to get correct results.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // always returns false

    // Use another Object's hasOwnProperty and call it with 'this' set to foo
    ({}).hasOwnProperty.call(foo, 'bar'); // true

### In Conclusion

When checking for the existence of a property on a object, `hasOwnProperty` is 
the **only** method of doing so. It is also recommended to make `hasOwnProperty`
part of **every** [`for in` loop](#object.forinloop), this will avoid errors from 
extended native [prototypes](#object.prototype).

