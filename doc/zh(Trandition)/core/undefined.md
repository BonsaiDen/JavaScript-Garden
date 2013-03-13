## `undefined` 和 `null`

JavaScript 中有兩個表示空值的方式， `null` 和 `undefined` ， `undefined`式比較常用的一種。

### `undefined` 的值

`undefined` 是一個值為 `undefined` 的類型。

語言中也定義了一個全域變數，它的值為 `undefined`，這個變數的被稱作 `undefined` 。
這個變數 **不是** 一個常數，也不是一個關鍵字。這表示它的值可以被輕易的覆蓋。

> **ES5 提示: ** `undefined` 在 ECMAScript 5 裡 **不再是** *可寫* 的
> 但是它的名稱還是可以被隱藏，比如說定義一個函數為 `undefined`。

這裡有一些例子會回傳 `undefined` 的值：

 - Accessing the (unmodified) global variable `undefined`.
 - Accessing a declared *but not* yet initialized variable.
 - Implicit returns of functions due to missing `return` statements.
 - `return` statements that do not explicitly return anything.
 - Lookups of non-existent properties.
 - Function parameters that do not have any explicit value passed.
 - Anything that has been set to the value of `undefined`.
 - Any expression in the form of `void(expression)`

### Handling Changes to the Value of `undefined`

Since the global variable `undefined` only holds a copy of the actual *value* of 
`undefined`, assigning a new value to it does **not** change the value of the 
*type* `undefined`.

Still, in order to compare something against the value of `undefined`, it is
necessary to retrieve the value of `undefined` first.

To protect code against a possible overwritten `undefined` variable, a common
technique used is to add an additional parameter to an [anonymous
wrapper](#function.scopes) that gets no argument passed to it.

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined in the local scope does 
        // now again refer to the value `undefined`

    })('Hello World', 42);

Another way to achieve the same effect would be to use a declaration inside the 
wrapper.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

The only difference here is that this version results in 4 more bytes being
used in case it is minified, and there is no other `var` statement inside the
anonymous wrapper.

### Uses of `null`

While `undefined` in the context of the JavaScript language is mostly used in
the sense of a traditional *null*, the actual `null` (both a literal and a type)
is more or less just another data type.

It is used in some JavaScript internals (like declaring the end of the
prototype chain by setting `Foo.prototype = null`), but in almost all cases, it
can be replaced by `undefined`.


