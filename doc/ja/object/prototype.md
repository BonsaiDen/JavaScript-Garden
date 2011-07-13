## プロトタイプ

JavaScriptはクラスベース継承モデルは実装されておらず、この代わりに*プロトタイプ*を用いています。

プロトタイプモデルを使っている事が、JavaScriptの弱点の一つになっていると良く考えられがちですが、プロトタイプ継承モデルはクラスベース継承モデルよりパワフルだというのは事実です。この事はちょっとしたものでもクラスベースの継承で実装しようとすると、プロトタイプベースの継承よりも作業が難しくなるという事でも分かります。

JavaScriptはプロトタイプベースが採用されている唯一の広範に使用されている基本的なプログラミング言語という現実があるので、プロトタイプベースとクラスベースの違いを時々調整しないとなりません。

最初の大きな違いはJavaScriptの継承は*プロトタイプチェーン*と呼ばれるもので実行されているという事です。

> **注意:** 単に`Bar.prototype = Foo.prototype`を使った場合、両方のオブジェクトは、
> **同じ**プロトタイプを共有する事になります。その為、片方のオブジェクトのプロトタイプの変更は
> もう一方のオブジェクトに影響します。大部分の場合、このような影響を及ぼしたく無いと思います。

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // BarのプロトタイプをFooの新しいインスタンスとしてセットする
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // Barを実際のコンストラクタとして確実にする為に代入する
    Bar.prototype.constructor = Bar;

    var test = new Bar() // 新しくbarインスタンスを作成

    // プロトタイプチェーンの結果
    test [instance of Bar]
        Bar.prototype [instance of Foo] 
            { foo: 'Hello World' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* その他 */ }

上記では`test`は`Bar.prototype`と`Foo.prototype`の2つのオブジェクトより継承されます。その為`Foo`の中で設定された`method`関数にアクセスできるようになります。また、`Foo`のプロトタイプとしてのインスタンス**それ自体**の`value`プロパティにもアクセスが可能です。`new Bar()`は`Foo`のインスタンスを新しく作ら**ない**という事は非常に注目されるべき点ですが、それ自身のプロトタイプを再利用しています。従って全ての`Bar`インスタンスは**同じ**`value`プロパティを共有します。

> **注意:** `Bar.prototype = Foo`のような使い方は**しない**で下さい。`Foo`はそのプロトタイプではなく、
> 関数オブジェクト`Foo`自体を指しているからです。
> プロトタイプチェーンは`Foo.prototype`ではなく`Function.prototype`まで遡るので、
> `method`はプロトタイプチェーン上に出現しなくなります。

### プロパティ探索

オブジェクトのプロパティにアクセスする時には、JavaScriptはプロトタイプチェーンを要求された名前を見つけるまで**遡って**探索します。

チェーンの先頭(すなわち`Object.prototype`)に到達した際に、まだ指定されたプロパティが見つからなければ、代わりに[undefined](#core.undefined)という値を返します。

### プロトタイププロパティ

プロトタイププロパティはJavaScriptの中でプロトタイプチェーンを構築する為に使われていますが、**任意**の値を代入する事も可能になっています。この時プロトタイプに代入されている値は単に無視されるだけです。

    function Foo() {}
    Foo.prototype = 1; // 効果無し

割り当てられているオブジェクトは上記の例で示されている通りに動作し、動的にプロトタイプチェーンを作ります。

### Performance

The lookup time for properties that are high up on the prototype chain can have a
negative impact on performance critical sections of code. Additionally, trying to 
access non-existent properties will always traverse the full prototype chain. 

Also, when [iterating](#object.forinloop) over the properties of an object 
**every** property that is on the prototype chain will get enumerated.

### Extension of Native Prototypes

One mis-feature that is often used is to extend `Object.prototype` or one of the
other built in prototypes.

This technique is called [monkey patching][1] and breaks *encapsulation*. While 
used by widely spread frameworks such as [Prototype][2], there is still no good 
reason for cluttering built-in types with additional *non-standard* functionality.

The **only** good reason for extending a built-in prototype is to backport 
the features of newer JavaScript engines; for example, 
[`Array.forEach`][3].

### In Conclusion

It is a **must** to understand the prototypal inheritance model completely 
before writing complex code which makes use of it. Also, watch the length of 
the prototype chains and break them up if necessary to avoid possible 
performance issues. Further, the native prototypes should **never** be extended 
unless it is for the sake of compatibility with newer JavaScript features.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

