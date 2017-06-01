## Constructors 

Constructors in JavaScript are yet again different from many other languages. Any
function call that is preceded by the `new` keyword acts as a constructor.

Inside the constructor - the called function - the value of `this` refers to a 
newly created object. The [prototype](#object.prototype) of this **new** 
object is set to the `prototype` of the function object that was invoked as the
constructor.

If the function that was called has no explicit `return` statement, then it
implicitly returns the value of `this` - the new object. 

    function Person(name) {
        this.name = name;
    }

    Person.prototype.logName = function() {
        console.log(this.name);
    };

    var sean = new Person();

The above calls `Person` as constructor and sets the `prototype` of the newly
created object to `Person.prototype`.

In case of an explicit `return` statement, the function returns the value 
specified by that statement, but **only** if the return value is an `Object`.

    function Car() {
        return 'ford';
    }
    new Car(); // a new object, not 'ford'

    function Person() {
        this.someValue = 2;

        return {
            name: 'Charles'
        };
    }
    new Person(); // the returned object ({name:'Charles'}), not including someValue

When the `new` keyword is omitted, the function will **not** return a new object. 

    function Pirate() {
        this.hasEyePatch = true; // gets set on the global object!
    }
    var somePirate = Pirate(); // somePirate is undefined

While the above example might still appear to work in some cases, due to the
workings of [`this`](#function.this) in JavaScript, it will use the
*global object* as the value of `this`.

### Factories

In order to be able to omit the `new` keyword, the constructor function has to 
explicitly return a value.

    function Robot() {
        var color = 'gray';
        return {
            getColor: function() {
                return color;
            }
        }
    }

    new Robot();
    Robot();

Both calls to `Robot` return the same thing, a newly created object that
has a property called `getColor`, which is a 
[Closure](#function.closures).

It should also be noted that the call `new Robot()` does **not** affect the
prototype of the returned object. While the prototype will be set on the newly
created object, `Robot` never returns that new object.

In the above example, there is no functional difference between using and
not using the `new` keyword.


### Creating New Objects via Factories

It is often recommended to **not** use `new` because forgetting its use may
lead to bugs.

In order to create a new object, one should rather use a factory and construct a 
new object inside of that factory.

    function CarFactory() {
        var car = {};
        car.owner = 'nobody';

        var milesPerGallon = 2;

        car.setOwner = function(newOwner) {
            this.owner = newOwner;
        }

        car.getMPG = function() {
            return milesPerGallon;
        }

        return car;
    }

While the above is robust against a missing `new` keyword and certainly makes 
the use of [private variables](#function.closures) easier, it comes with some 
downsides.

 1. It uses more memory since the created objects do **not** share the methods
    on a prototype.
 2. In order to inherit, the factory needs to copy all the methods from another
    object or put that object on the prototype of the new object.
 3. Dropping the prototype chain just because of a left out `new` keyword
    is contrary to the spirit of the language.

### In Conclusion

While omitting the `new` keyword might lead to bugs, it is certainly **not** a
reason to drop the use of prototypes altogether. In the end it comes down to
which solution is better suited for the needs of the application. It is
especially important to choose a specific style of object creation and use it
**consistently**.

