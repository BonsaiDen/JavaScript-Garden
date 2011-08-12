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

### Closures Inside Loops

One often made mistake is to use closures inside of loops, as if they were
copying the value of the loops index variable.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

The above will **not** output the numbers `0` through `9`, but will simply print
the number `10` ten times.

The *anonymous* function keeps a **reference** to `i` and at the time 
`console.log` gets called, the `for loop` has already finished and the value of 
`i` as been set to `10`.

In order to get the desired behavior, it is necessary to create a **copy** of 
the value of `i`.

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

