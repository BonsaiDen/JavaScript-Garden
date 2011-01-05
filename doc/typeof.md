### The `typeof` operator

To make it short, both `typeof` and `instanceof` are near to being 
**completely broken**, although `instanceof` still has its limited uses, 
but first let's take a look at this nice table:

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

In the above table `Type` refers to the value the `typeof` operator returns. As
you can see this is anything but consistent.

The value of `Class` refers to the *internal [[Class]] property* of an object
(see the EcmaScript specification for more details.).

According to the specification `Class` can be one of the following values:  

    "Arguments", "Array", "Boolean", "Date", "Error", "Function", "JSON", 
    "Math",  "Number", "Object", "RegExp", "String"

The following function can be used to check the type of an object:

    function is(type, obj) {
        return Object.prototype.toString.call(obj).slice(8, -1) === type;
    }
    
    is('String', 'test'); // true
    is('String', new String('test')); // true

So before you set up your build tool and pre commit hooks to warn you about 
every occurrence of `typeof`, let me tell you that there is actually one 
**and only one** legitimate use for it:

    typeof foo !== 'undefined'

The above will check whether `foo` was actually declared or not, since just 
referencing it would result in a `ReferenceError`. But besides that, there's no
good use for `typeof`.

**Best Practice:** If you're dealing with built in types, always use the `Class` 
value. It's the only *reliable* and cross engine way of getting the type of an 
object.

