## The `delete` Operator

In short, it's *impossible* to delete global variables, functions and some other
stuff in JavaScript which have a `DontDelete` attribute set.

### Global code and Function code

When a variable or a function is defined in a global 
or a [function scope](#function.scopes) it is a property of either 
Activation object or Global object. Such properties have a set of attributes, 
one of these is `DontDelete`. Variable and function declarations in global 
and function code always create properties with `DontDelete`, therefore 
cannot be deleted.

    // global variable:
    var a = 1; // DontDelete is set
    delete a; // false
    a; // 1

    // normal function:
    function f() {} // DontDelete is set
    delete f; // false
    typeof f; // "function"

    // reassigning doesn't help:
    f = 1;
    delete f; // false
    f; // 1

### Explicit properties

There are things which can be deleted normally: these are explicitly set 
properties.

    // explicitly set property:
    var obj = {x: 1};
    obj.y = 2;
    delete obj.x; // true
    delete obj.y; // true
    obj.x; // undefined
    obj.y; // undefined

In the example above `obj.x` and `obj.y` can be deleted because they have no 
`DontDelete` atribute. That's why an example below works too.

    // this works fine, except for IE:
    var GLOBAL_OBJECT = this;
    GLOBAL_OBJECT.a = 1;
    a === GLOBAL_OBJECT.a; // true - just a global var
    delete GLOBAL_OBJECT.a; // true
    GLOBAL_OBJECT.a; // undefined

Here we use a trick to delete `a`. [`this`](#function.this) here refers 
to the Global object and we explicitly declare variable `a` as its property 
which allows us to delete it.

IE (at least 6-8) has some bugs, so the code above doesn't work.

### Function arguments and built-ins

Functions' normal arguments, [`arguments` object](#function.arguments) 
and built-in properties also have `DontDelete` set.

    // function arguments and properties:
    (function (x) {
    
      delete arguments; // false
      typeof arguments; // "object"
      
      delete x; // false
      x; // 1
      
      function f(){}
      delete f.length; // false
      typeof f.length; // "number"
      
    })(1);

### Host objects
    
Behaviour of `delete` operator can be unpredictable for hosted objects. Due to 
specification, host objects are allowed to implement any kind of behavior. 

### In conclusion

`delete` operator often has an unexpected behaviour and can be safely used 
only for dealing with explicitly set properties on normal objects.
