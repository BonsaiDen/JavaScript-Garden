## Constructors 

Constructors in JavaScript are yet again different from many other languages. Any
function call that is preceded by the `new` keyword acts as a constructor.

Inside the constructor (the called function) the value of `this` refers to a 
newly created `Object`. The [`prototype`](#prototype) of this **new** object is 
set to the `prototype` of the function object that was called.

If the function that was called has no explicit `return` statement, then it
implicitly returns the value of `this` (the new object). Otherwise it returns
the value of the `return` statement, **but** only if `typeof returnValue` is
`object`.

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

The above calls `Foo` as constructor and sets the `prototype` of the newly
created object to `Foo.prototype`.

Keep in mind that if you do not use the `new` keyword the function will **not**
return a new object. While it might still work due to the workings of
[`this`](#how-this-works-in-javascript) in JavaScript, it will use the *global*
object as the value of `this`.

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

Both these calls return the exact same thing, a newly create object which
has a property called `method` which is a [Closure](#closures-and-references).

Also note that the call `new Bar()` does **not** affect the prototype of the
returned object. While the prototype will be set on the newly created object,
`Bar` never returns that object.

So in the above example there is no functional difference between using and
omitting the `new` keyword.


### Creating new objects via factories

An often made recommendation is to **not** use `new` since forgetting the use of 
it may lead to a lot of bugs.

In order to create new object one now has to use a factory and set up the new
object inside it.

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

While the above is robust against forgetting to use `new` and makes the use of
[private variables](#closures) certainly easier, it comes with some down sides.

 1. It uses more memory since the created objects do **not** share the methods
 2. In order to inherit the factory needs to copy all the methods from another
    object
 3. It somehow goes against the spirit of the language, by dropping prototype
    chain just because a left out `new` keyword can break code

### In conclusion

While omitting the `new` keyword might lead to bugs, it is certainly **not** a 
reason to drop the use of prototypes altogether. In the end it comes down to 
which solution is better suited for the needs of the application, it is especially
important to choose a specific style of object creation **and** stick with it.

