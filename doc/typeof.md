## The `typeof` operator

The `typeof` operator (together with 
[`instanceof`](#instanceof)) is probably the biggest 
design flaw of JavaScript, as it is near of being **completely broken**.

Although `instanceof` still has its limited uses, `typeof` really has only one
practical use case, which does **not** happen to be checking the type of an 
object. 

> **Note:** While `typeof` can also be called with a function like syntax
> i.e. `typeof(obj)`, this is not a function call. The two parenthesis will
> behave like normal and there return value will be used as the operand of the
> `typeof` operator. There is **no** `typeof` function.

### The JavaScript type table

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

In the above table *Type* refers to the value the `typeof` operator returns. As
you can see this is anything but consistent.

The *Class* refers to the value of the internal `[[Class]]` property of an object.

> **From the Specification:** The value of `[[Class]]` can be one of the
> following strings. `Arguments`, `Array`, `Boolean`, `Date`, `Error`, 
> `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

In order to retrieve the value of `[[Class]]` one can has to make use of the
`toString` method of `Object`.

### The Class of an object

The specification gives exactly one way of accessing the `[[Class]]` value,
which the use of `Object.prototype.toString`. 

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }
    
    is('String', 'test'); // true
    is('String', new String('test')); // true

In the above example, `Object.prototype.toString` gets called with the value of
[this](#this) being set to the object whose `[[Class]]` value should be retrieved.

### Testing for undefined variables

    typeof foo !== 'undefined'

The above will check whether `foo` was actually declared or not; just 
referencing it would result in a `ReferenceError`. This is the only thing
`typeof` is actually useful for.

### In conclusion

In order to check the type of an object, it is highly recommended to use 
`Object.prototype.toString`; as this is the only reliable way of doing so. 
As shown in the above type table, some return values of `typeof` are not defined 
in the specification; thus, they can differ across various implementations.

Unless checking whether a variable is defined, `typeof` should be avoided at
**all costs**.

