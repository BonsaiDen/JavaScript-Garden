### Constructors 

Constructors in JavaScript are another thing many people get wrong, their
workings are pretty simple though.

Any function call that's preceded by the `new` keyword acts as a constructor.

Inside the constructor (the called function) the value of `this` refers to a 
newly created `Object`. The `prototype` of this **new** object is set to the 
`prototype` of the function object that was called.

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

Keep in mind that if you don't use the `new` keyword the function will **not**
return a new object. While it might still work due to the fact how
[this](#how-this-works-in-javascript) works in JavaScript, it will use the
*global* object as the value of `this` and therefore result in completely
unexpected results.

If you want to omit the `new` keyword you can do that by - as stated above
- explicitly returning from the constructor.

**Example**

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
has a property called `method` which is a [Closure](#closures-and-references).

Since `Bar` doesn't make any use of `this`, the `new` keyword is superfluous
here. But from a technical point of view, this is no longer a *constructor*, but
a *factory*.

#### Best Practices
Make sure you know whether you're calling a *constructor* or a *factory*. 
If in doubt, always use the `new` keyword, since it doesn't have any side effect
when its not required, leaving it out on the other hand can lead to subtle and
hard to track down bugs.

