### Constructors 

Constructors in JavaScript are another thing many people get wrong, their
workings are pretty simple though.

Any function call that's preceded by the `new` keyword acts as a constructor.

Inside the constructor (the called function) the value of `this` refers to a 
newly create object. The `prototype` of this new object is set to the `prototype`
of the function object that was called.

If the function that was called has no explicit `return` statement, then it
implicitly returns the value of `this` (the new object). Otherwise it returns
the value of the `return` statement.

**Example**

    function Foo() {
        this.bla = 1;
    }
    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

The above calls `Foo` as constructor and sets the `prototype` of the newly
created object to `Foo.prototype`.


**Another Example**

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }

    new Bar();
    Bar();

Now, both these calls return the exact same thing, a newly create object which
has a property called `method` which is a closure.

Since `Bar` doesn't make any use of `this` the `new` keyword is superfluous in
this case. While the call with `new` can clearly be called constructor, the 
latter one works more like a factory.

**Best Practice:** Make sure you know whether the `constructor` you're calling
requires the `new` keyword. Since there's no side effect of using `new` for 
factories you can use `new` for both. But in the end you should always test your 
code to prevent such subtle mistakes.

