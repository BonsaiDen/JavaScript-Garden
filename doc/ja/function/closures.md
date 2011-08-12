## クロージャと参照

JavaScriptの一番パワフルな特徴の一つとして*クロージャ*が使える事が挙げられます。これはスコープが**いつも**外部に定義されたスコープにアクセスできるという事です。JavaScriptの唯一のスコープは[関数スコープ](#function.scopes)ですが、全ての関数は標準でクロージャとして振る舞います。

### プライベート変数をエミュレートする

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

ここで`Counter`は**2つ**のクロージャを返します。関数`increment`と同じく関数`get`です。これら両方の関数は`Counter`のスコープを**参照**し続けます。その為、そのスコープ内に定義されている`count`変数に対していつもアクセスできるようになっています。

### なぜプライベート変数が動作するのか？

JavaScriptでは、スコープ自体を参照・代入する事が出来無い為に、外部から変数`count`にアクセスする手段が**ありません**。唯一の手段は、2つのクロージャを介してアクセスする方法だけです。

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

上記のコードは`Counter`のスコープ中にある変数`count`の値を変更する事は**ありません**。`foo.hack`は**その**スコープで定義されていないからです。これは*グローバル*変数`count`の作成 -またはオーバーライド- の代わりになるでしょう。

### ループ中のクロージャ

一つ良くある間違いとして、ループのインデックス変数をコピーしようとしてか、ループの中でクロージャを使用してしまうというものがあります。

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);
        }, 1000);
    }

上記の例では`0`から`9`の数値が出力される事は**ありません**。もっと簡単に`10`という数字が10回出力されるだけです。

**匿名**関数は`i`への**参照**を維持しており、同時に`forループ`は既に`i`の値に`10`をセットし終った`console.log`が呼ばれてしまいます。

期待した動作をする為には、`i`の値の**コピー**を作る必要があります。

### Avoiding the Reference Problem

In order to copy the value of the loop's index variable, it is best to use an 
[anonymous wrapper](#function.scopes).

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

The anonymous outer function gets called immediately with `i` as its first 
argument and will receive a copy of the **value** of `i` as its parameter `e`.

The anonymous function that gets passed to `setTimeout` now has a reference to 
`e`, whose value does **not** get changed by the loop.

There is another possible way of achieving this; that is to return a function 
from the anonymous wrapper, that will then have the same behavior as the code 
above.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }

