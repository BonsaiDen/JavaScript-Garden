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

### プロパティとしての`hasOwnProperty`

JavaScriptはプロパティ名として`hasOwnProperty`を保護して**いません**。;従って、この名前のプロパティを持ったオブジェクトが存在する事がありえます。正しい結果を得る為には*外部*の`hasOwnProperty`を使う必要があります。

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // 常にfalseを返す

    // 他のオブジェクトのhasOwnPropertyを使い、fooの'this'にセットして呼び出す
    ({}).hasOwnProperty.call(foo, 'bar'); // true

### 終わりに

オブジェクトのプロパティの存在判定をする時は、`hasOwnProperty`が**唯一**のメソッドになります。
また、**全て**の[`for in` ループ](#object.forinloop)内で`hasOwnProperty`を使う事を推奨します。
そうする事により組み込みの[prototypes](#object.prototype)の拡張が原因のエラーを避ける事が出来ます。

