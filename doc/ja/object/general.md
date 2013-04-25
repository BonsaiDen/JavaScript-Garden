## オブジェクトの使用法とプロパティ

JavaScriptの全ての要素は2つの例外を除いて、オブジェクトのように振る舞います。
その2つとは[`null`](#core.undefined)と[`undefined`](#core.undefined)です。

    false.toString(); // 'false'
    [1, 2, 3].toString(); // '1,2,3'
    
    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

良くありがちな誤解として、数値リテラルがオブジェクトとして使用できないというものがあります。この理由としては、JavaScriptパーサーが浮動小数点のドットを*ドット記法*として解釈しようとしてしまうからです。

    2.toString(); // シンタックスエラーが発生する

数値リテラルをオブジェクトとして使用する為の回避策がいくつかあります。

    2..toString(); // 2つ目のドットが正しく解釈される
    2 .toString(); // ドットの左隣のスペースがポイント
    (2).toString(); // 2が一番最初に評価される

### オブジェクトはデータタイプ

JavaScriptのオブジェクトは[*ハッシュマップ*][1]としても使用されます。これは名前付きのプロパティと値として構成されています。

オブジェクトリテラル(`{}`記法)を使用すると、オブジェクトそのものを作る事ができます。この方法で作られたオブジェクトは`Object.prototype`から[継承](#object.prototype)され、[own properties](#object.hasownproperty)が何も設定されてない状態になります。

    var foo = {}; // 新しい空のオブジェクト

    // 12という値の'test'というプロパティを持った新しいオブジェクト
    var bar = {test: 12}; 

### プロパティへのアクセス

オブジェクトのプロパティには2通りのアクセス方法があります。1つはドット記法によるアクセス、もう1つはブラケット記法です。

    var foo = {name: 'Kitten'}
    foo.name; // kitten
    foo['name']; // kitten

    var get = 'name';
    foo[get]; // kitten

    foo.1234; // シンタックスエラー
    foo['1234']; // 動作する

どちらの記法も働きとしての違いは無いですが、唯一の違いとしてブラケット記法は通常のプロパティ名と同様に動的にプロパティを設定する事ができます。これ以外で動的にプロパティを設定しようとするとシンタックスエラーになります。

### プロパティの削除

実際にオブジェクトからプロパティを削除する唯一の方法は`delete`演算子を使う事です。プロパティに`undefined`や`null`をセットしても、プロパティ自身ではなく、*キー*に設定された*値*を削除するだけです。

    var obj = {
        bar: 1,
        foo: 2,
        baz: 3
    };
    obj.bar = undefined;
    obj.foo = null;
    delete obj.baz;

    for(var i in obj) {
        if (obj.hasOwnProperty(i)) {
            console.log(i, '' + obj[i]);
        }
    }

上記の例では、`baz`は完全に削除されて出力がされていませんが、それ以外の2つ`bar undefined`と`foo null`はどちらも出力されてしまっています。

### キーの記法

    var test = {
        'case': 'I am a keyword so I must be notated as a string',
        delete: 'I am a keyword too so me' // シンタックスエラーが起こる
    };

オブジェクトのプロパティは普通の文字か文字列として記述する事が出来ます。JavaScriptパーサーの設計ミスが原因ですが、ECMAScript5以前では上記のコードは`シンタックスエラー`を表示するでしょう。

このエラーは`delete`が*予約語*になっているのが原因なので、古いJavaScriptエンジンに正しく解釈させる為には*文字リテラル*を使って記述する事を推奨します。

[1]: http://en.wikipedia.org/wiki/Hashmap

