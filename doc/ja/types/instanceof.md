## `instanceof`オペレーター

`instanceof`オペレーターは2つのオペランドのコンストラクタを比較します。これはカスタムで作ったオブジェクトを比較する時にのみ有用です。組み込みの型に使用するのは[typeof operator](#types.typeof)を使用するのと同じくらい意味がありません。

### カスタムオブジェクトの比較

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // これは単に関数オブジェクトFooにBar.prototypeをセットしただけです。
    // しかし、実際のFooのインスタンスではありません。
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### ネイティブ型で`instanceof`を使用する

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

ここで一つ重要な事は、この`instanceof`は異なるJavaScriptの文脈(例：ブラウザの異なるウィンドウ)では、そのコンストラクタが正確に同じオブジェクトになる訳では無いので、オリジナルのオブジェクトで動作しないという事です。

### 終わりに

`instanceof`オペレーターは同じJavaScriptのコンテキストが起源になっているカスタムメイドのオブジェクトを扱う場合**のみ**使うべきです。ちょうど[`typeof`](#types.typeof)オペレーターのように、その他での使用は**避けるべき**です。
