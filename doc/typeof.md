### The `typeof` operator

The `typeof` operator (together with 
[instanceof operator](#the-instanceof-operator)) is probably the biggest 
design flaw of JavaScript. It is near of being **completely broken**.

Although `instanceof` still has its limited uses, `typeof` really has only one
practical use case, which **not happens** to be checking the type of an object. 

> **Note:** While `typeof` can also be called with a function like syntax
> i.e. `typeof(obj)`, this is just syntactic sugar. There is **no**
> `typeof` function.

**The JavaScript Typetable**

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

> **From the Specification:**  *Class* can be one of the following values: 
> `"Arguments"`, `"Array"`, `"Boolean"`, `"Date"`, `"Error"`, `"Function"`,
> `"JSON"`, `"Math"`, `"Number"`, `"Object"`, `"RegExp"`, `"String"`

In order to retrieve the value of *Class* one can has to make use of the
`toString` method of `Object`.

**Checking the Class of an Object**

    function is(type, obj) {
        return Object.prototype.toString.call(obj).slice(8, -1) === type;
    }
    
    is('String', 'test'); // true
    is('String', new String('test')); // true

In the above code `Object.prototype.toString` gets called with 
[this](#how-this-works-in-javascript) being set to the object which its 
*Class* value should be retrieved.

**Checking whether a variable has been defined**

    typeof foo !== 'undefined'

The above will check whether `foo` was actually declared or not, since just 
referencing it would result in a `ReferenceError`. This is the only thing
`typeof` is actually useful for.

#### Best Practices
If you need to check the type of an object, always use the call to
`Object.prototype.toString` it's the only reliable way of doing so. As shown in
the type table, some return values of `typeof` are not defined in the
specification and can therefore differ in different implementations. So unless
you're checking for a variable being defined, **do not** use the `typeof`
operator.

