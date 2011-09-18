## `typeof`演算子

`typeof`演算子([`instanceof`](#types.instanceof)も同様です)は恐らくJavaScriptの最大の設計ミスです。**完全に壊れている**存在に近いものです。

`instanceof`はまだ限られた用途で使用できますが、`typeof`は本当に使用できる実用的なケースはオブジェクトの型を調べるという起こら**ない**ケース一つしかありません。

> **注意点:** `typeof`も関数のような構文で呼ぶ事もできます。(例：`typeof(obj)`)
> これは関数呼び出しではありません。2つのカッコは通常と同じように
> `typeof`演算子のオペランドの値を返す振る舞いをします。
> `typeof`関数は存在**しません**。

### The JavaScript Type Table

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
    /abc/g              RegExp     object (function in Nitro/V8)
    new RegExp("meow")  RegExp     object (function in Nitro/V8)
    {}                  Object     object
    new Object()        Object     object

In the above table *Type* refers to the value, that the `typeof` operator returns.
As can be clearly seen, this value is anything but consistent.

The *Class* refers to the value of the internal `[[Class]]` property of an object.

> **From the Specification:** The value of `[[Class]]` can be one of the
> following strings. `Arguments`, `Array`, `Boolean`, `Date`, `Error`, 
> `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

In order to retrieve the value of `[[Class]]` one has to make use of the
`toString` method of `Object.prototype`.

### The Class of an Object

The specification gives exactly one way of accessing the `[[Class]]` value,
with the use of `Object.prototype.toString`. 

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }
    
    is('String', 'test'); // true
    is('String', new String('test')); // true

In the above example, `Object.prototype.toString` gets called with the value of
[this](#function.this) being set to the object whose `[[Class]]` value should be 
retrieved.

> **ES5 Note:** For convenience the return value of `Object.prototype.toString` 
> for both `null` and `undefined` was **changed** from `Object` to `Null` and 
> `Undefined` in ECMAScript 5.

### Testing for Undefined Variables

    typeof foo !== 'undefined'

The above will check whether `foo` was actually declared or not; just 
referencing it would result in a `ReferenceError`. This is the only thing
`typeof` is actually useful for.

### In Conclusion

In order to check the type of an object, it is highly recommended to use 
`Object.prototype.toString`; as this is the only reliable way of doing so. 
As shown in the above type table, some return values of `typeof` are not defined 
in the specification; thus, they can differ across various implementations.

Unless checking whether a variable is defined, `typeof` should be avoided at
**all costs**.


