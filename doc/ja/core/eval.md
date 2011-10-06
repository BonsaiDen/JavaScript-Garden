## なぜ、`eval`を使ってはいけないのか

`eval`関数はローカルスコープ中のJavaScriptコードの文字列を実行します。

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

しかし、`eval`は**直接**ローカルスコープから呼ばれて、*かつ*呼んだ関数の名前が実際の`eval`でないと実行しません。

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3

`eval`の使用は**全てのコスト**を払ってでも回避するべきです。その「使用法」の99.9%で、これ**無し**でも実装できます。

### 偽装された`eval`

[timeout functions](#other.timeouts)である`setTimeout`と`setInterval`はどちらも最初の引数として文字列を取る事ができます。この文字列は`eval`がこの場合直接呼ばれていないので、**常に**グローバルスコープで実行されてしまいます。

### セキュリティの問題

`eval`はまたセキュリティの問題もあります。なぜなら、**どんな**コードを与えられても実行してしまうからで、**絶対**に不明または信頼できない発行元の文字列は使ってはいけません。

### In Conclusion

`eval` should never be used, any code that makes use of it is to be questioned in
its workings, performance and security. In case something requires `eval` in 
order to work, its design is to be questioned and should **not** be used in the 
first place, a *better design* should be used, that does not require the use of 
`eval`. 

