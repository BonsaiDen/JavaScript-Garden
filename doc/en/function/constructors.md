## Constructors 

Constructors in JavaScript are yet again different from many other languages. Any
function call that is preceded by the `new` keyword acts as a constructor.

Inside the constructor - the called function - the value of `this` refers to a 
newly created `Object`. The [`prototype`](#object.prototype) of this **new** 
object is set to the `prototype` of the function object that was invoked as the
constructor.

If the function that was called has no explicit `return` statement, then it
implicitly returns the value of `this` - the new object. 

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

The above calls `Foo` as constructor and sets the `prototype` of the newly
created object to `Foo.prototype`.

In case of an explicit `return` statement the function returns the value 
specified that statement, **but only** if the return value is an `Object`.                                     

    function Bar() {
        return 2;
    }
    new Bar(); // a new object

    function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // the returned object

When the `new` keyword is omitted, the function will **not** return a new object. 

    function Foo() {
        this.bla = 1; // gets set on the global object
    }
    Foo(); // undefined

While the above example might still appear to work in some cases, due to the 
workings of [`this`](#function.this) in JavaScript, it will use the 
*global object* as the value of `this`.

### Factories

In order to be able to omit the `new` keyword, the constructor function has to 
explicitly return a value.

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }
    Bar.prototype = {
        foo: function() {}
    };

    new Bar();
    Bar();

Both calls to `Bar` return the exact same thing, a newly create object which
has a property called `method` on it, that is a 
[Closure](#function.closures).

It is also to note that the call `new Bar()` does **not** affect the prototype 
of the returned object. While the prototype will be set on the newly created 
object, `Bar` never returns that new object.

In the above example, there is no functional difference between using and
not using the `new` keyword.


### Creating New Objects via Factories

A recommendation frequently made is to **not** use `new` since forgetting its use
may lead to bugs.

In order to create new object, one should rather use a factory and construct a 
new object inside of that factory.

    function Foo() {
        var obj = {};
        obj.value = 'blub';

        var private = 2;
        obj.someMethod = function(value) {
            this.value = value;
        }

        obj.getPrivate = function() {
            return private;
        }
        return obj;
    }

While the above is robust against a missing `new` keyword and certainly makes 
the use of [private variables](#function.closures) easier, it comes with some 
downsides.

 1. It uses more memory since the created objects do **not** share the methods
    on a prototype.
 2. In order to inherit the factory needs to copy all the methods from another
    object or put that object on the prototype of the new object.
 3. Dropping the prototype chain just because of a left out `new` keyword
    somehow goes against the spirit of the language.

### In Conclusion

While omitting the `new` keyword might lead to bugs, it is certainly **not** a 
reason to drop the use of prototypes altogether. In the end it comes down to 
which solution is better suited for the needs of the application, it is 
especially important to choose a specific style of object creation **and stick** 
with it.

