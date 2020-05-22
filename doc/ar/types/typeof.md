## The `typeof` Operator

The `typeof` operator (together with 
[`instanceof`](#types.instanceof)) is probably the biggest 
design flaw of JavaScript, as it is almost **completely broken**.

Although `instanceof` still has limited uses, `typeof` really has only one
practical use case, which does **not** happen to be checking the type of an 
object. 

> **Note:** While `typeof` can also be called with a function like syntax, i.e.
> `typeof(obj)`, this is not a function call. The parentheses behave as normal
> and the return value will be used as the operand of the `typeof` operator.
> There is **no** `typeof` function.

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

In the above table, *Type* refers to the value that the `typeof` operator returns.
As can be clearly seen, this value is anything but consistent.

The *Class* refers to the value of the internal `[[Class]]` property of an object.

> **From the Specification:** The value of `[[Class]]` can be one of the
> following strings. `Arguments`, `Array`, `Boolean`, `Date`, `Error`, 
> `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

### The Class of an Object

The only way to determine an object's `[[Class]]` value is using `Object.prototype.toString`. It
returns a string in the following format: `'[object ' + valueOfClass + ']'`, e.g `[object String]` or
`[object Array]`:

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
`Object.prototype.toString` because this is the only reliable way of doing so. 
As shown in the above type table, some return values of `typeof` are not defined 
in the specification; thus, they can differ between implementations.

Unless checking whether a variable is defined, `typeof` should be avoided.


