## 関数の宣言と式

関数はJavaScriptの第一級オブジェクトです。この事は、その他の値と同じように渡す事が出来るという事です。この機能で良く使われる一つとして**匿名関数**を他のオジェクトにコールバックとして渡すというものがあり、これで非同期での実装が可能になります。

### The `function` Declaration

    function foo() {}

The above function gets [hoisted](#function.scopes) before the execution of the 
program starts; thus, it is available *everywhere* in the scope it was *defined* 
in, even if called before the actual definition in the source.

    foo(); // Works because foo was created before this code runs
    function foo() {}

### The `function` Expression

    var foo = function() {};

This example assigns the unnamed and *anonymous* function to the variable `foo`. 

    foo; // 'undefined'
    foo(); // this raises a TypeError
    var foo = function() {};

Due to the fact that `var` is a declaration, that hoists the variable name `foo` 
before the actual execution of the code starts, `foo` is already defined when 
the script gets executed.

But since assignments only happen at runtime, the value of `foo` will default
to [undefined](#core.undefined) before the corresponding code is executed.

### Named Function Expression

Another special case is the assignment of named functions.

    var foo = function bar() {
        bar(); // Works
    }
    bar(); // ReferenceError

Here `bar` is not available in the outer scope, since the function only gets
assigned to `foo`; however, inside of `bar` it is available. This is due to 
how [name resolution](#function.scopes) in JavaScript works, the name of the 
function is *always* made available in the local scope of the function itself.

