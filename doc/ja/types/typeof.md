## `typeof`演算子

`typeof`演算子([`instanceof`](#types.instanceof)も同様です)は恐らくJavaScriptの最大の設計ミスです。**完全に壊れている**存在に近いものです。

`instanceof`はまだ限られた用途で使用できますが、`typeof`は本当に使用できる実用的なケースはオブジェクトの型を調べるという起こら**ない**ケース一つしかありません。

> **注意点:** `typeof`も関数のような構文で呼ぶ事もできます。(例：`typeof(obj)`)
> これは関数呼び出しではありません。2つのカッコは通常と同じように
> `typeof`演算子のオペランドの値を返す振る舞いをします。
> `typeof`関数は存在**しません**。

### JavaScript の型テーブル

    Value               Class      Type
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object (Nitro/V8ではfunction)
    new RegExp("meow")  RegExp     object (Nitro/V8ではfunction)
    {}                  Object     object
    new Object()        Object     object

上記のテーブルにおいて*Type*は`typeof`演算子が返す値を参照しています。はっきりと分かるように、この値はどれでも一貫しています。

*Class*はオブジェクト内部の`[[Class]]`プロパティの値を参照しています。

> **仕様より:** `[[Class]]`の値は以下の文字列のいずれかになります。
> `Arguments`, `Array`, `Boolean`, `Date`, `Error`,
> `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

`[[Class]]`の値を取得する為に、`Object.prototype`メソッドの`toString`を使う事があります。

### オブジェクトのクラス

仕様では`[[Class]]`の値にアクセスするためには`Object.prototype.toString`を使用した厳密な一つの方法が与えられています。

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }

    is('String', 'test'); // true
    is('String', new String('test')); // true

上記の例では[this](#function.this)の値と共に`Object.prototype.toString`が呼び出され`[[Class]]`の取得されている値がオブジェクトとして設定されます。

> **ES5での注意点:** 便宜上、ECMAScript 5では
> `Object.prototype.toString`の
> `null`と`undefined`は`Object`から
> `Null`と`Undefined`に**変更され**ました。

### 未定義変数のテスト

    typeof foo !== 'undefined'

上記では`foo`が実際に宣言されたかどうかを`ReferenceError`の結果を参照してチェックします。これは`typeof`が唯一実際に役に立つ場合です。

### 終わりに

オブジェクトの型をチェックする為には、`Object.prototype.toString`を使用する事を強くお勧めします。これが唯一信頼できる方法だからです。上述の型テーブルでも分かるように、`typeof`の戻り値は仕様で定義されていないものを返します。よって、実装によって別の結果になる事があります。

変数が定義されているかチェックしない限りは、`typeof`は**どんな事をしても**避けるべきです。
