## The `arguments` Object

Every function scope in JavaScript can access the special variable `arguments`.
This variable holds a list of all the arguments that were passed to the function.

> **Note:** In case `arguments` has already been defined inside the function's
> scope either via a `var` statement or being the name of a formal parameter,
> the `arguments` object will not be created.

The `arguments` object is **not** an `Array`. While it has some of the 
semantics of an array - namely the `length` property - it does not inherit from 
`Array.prototype` and is in fact an `Object`.

Due to this, it is **not** possible to use standard array methods like `push`,
`pop` or `slice` on `arguments`. While iteration with a plain `for` loop works 
just fine, it is necessary to convert it to a real `Array` in order to use the 
standard `Array` methods on it.

### Converting to an Array

The code below will return a new `Array` containing all the elements of the 
`arguments` object.

    Array.prototype.slice.call(arguments);

Because this conversion is **slow**, it is **not recommended** to use it in
performance-critical sections of code.

### Passing Arguments

The following is the recommended way of passing arguments from one function to
another.

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // do stuff here
    }

Another trick is to use both `call` and `apply` together to turn methods - functions that use the
value of `this` as well as their arguments - into normal functions which only use their arguments.

    function Person(first, last) {
      this.first = first;
      this.last = last;
    }

    Person.prototype.fullname = function(joiner, options) {
      options = options || { order: "western" };
      var first = options.order === "western" ? this.first : this.last;
      var last =  options.order === "western" ? this.last  : this.first;
      return first + (joiner || " ") + last;
    };

    // Create an unbound version of "fullname", usable on any object with 'first'
    // and 'last' properties passed as the first argument. This wrapper will
    // not need to change if fullname changes in number or order of arguments.
    Person.fullname = function() {
      // Result: Person.prototype.fullname.call(this, joiner, ..., argN);
      return Function.call.apply(Person.prototype.fullname, arguments);
    };

    var grace = new Person("Grace", "Hopper");

    // 'Grace Hopper'
    grace.fullname();

    // 'Turing, Alan'
    Person.fullname({ first: "Alan", last: "Turing" }, ", ", { order: "eastern" });


### Formal Parameters and Arguments Indices

The `arguments` object creates *getter* and *setter* functions for both its 
properties, as well as the function's formal parameters.

As a result, changing the value of a formal parameter will also change the value
of the corresponding property on the `arguments` object, and the other way around.

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);

### Performance Myths and Truths

The only time  the `arguments` object is not created is where it is declared as
a name inside of a function or one of its formal parameters. It does not matter
whether it is used or not.

Both *getters* and *setters* are **always** created; thus, using it has nearly 
no performance impact at all, especially not in real world code where there is 
more than a simple access to the `arguments` object's properties.

> **ES5 Note:** These *getters* and *setters* are not created in strict mode.

However, there is one case which will drastically reduce the performance in
modern JavaScript engines. That case is the use of `arguments.callee`.

    function foo() {
        arguments.callee; // do something with this function object
        arguments.callee.caller; // and the calling function object
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // Would normally be inlined...
        }
    }

In the above code, `foo` can no longer be a subject to [inlining][1] since it 
needs to know about both itself and its caller. This not only defeats possible 
performance gains that would arise from inlining, but it also breaks encapsulation
because the function may now be dependent on a specific calling context.

Making use of `arguments.callee` or any of its properties is **highly discouraged**.

> **ES5 Note:** In strict mode, `arguments.callee` will throw a `TypeError` since 
> its use has been deprecated.

[1]: http://en.wikipedia.org/wiki/Inlining


