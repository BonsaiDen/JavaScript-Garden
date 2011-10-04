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

### `eval` in Disguise

The [timeout functions](#other.timeouts) `setTimeout` and `setInterval` can both 
take a string as their first argument. This string will **always** get executed 
in the global scope since `eval` is not being called directly in that case.

### Security Issues

`eval` also is a security problem as it executes **any** code given to it,
it should **never** be used with strings of unknown or untrusted origins.

### In Conclusion

`eval` should never be used, any code that makes use of it is to be questioned in
its workings, performance and security. In case something requires `eval` in 
order to work, its design is to be questioned and should **not** be used in the 
first place, a *better design* should be used, that does not require the use of 
`eval`. 

