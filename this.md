### How `this` works in JavaScript

`this` in JavaScript is different from other languages, so many people get 
confused by it, but there are only three different cases in which the value of
`this` gets set.

    // function case
    foo(); // this inside foo will refer to the global object

    // method case
    test.foo(); // this inside foo will refer to test

    // constructor case
    new foo(); // this inside foo will refer to the newly created object

These are **all** the possible values of `this`, it also gets clear that `this`
will never refer to an outer function, due to the implicit binding to the
`global` object in case of a plain function call.

**Example**

    Foo.method = function() {
        function test() {
            console.log(this); // this is set to the global object
        }
        test();
    }

Another common misconception is that something like this would work:

    var str = 'Hello World';
    var ord = str.charCodeAt;

    var out = '';
    for(var i = 0, l = str.length; i < l; i++) {
        out += String.fromCharCode(ord(i));
    }
    console.log(out); // prints '[object DOM' in Chrome

Since the value of `this` never gets determined *before* the actual call, the
above call to `ord` will work like a plain function call. Therefore not
`charCodeAt` will not use the string `Hello World`, but the results of 
`window.toString()`.

The late binding of `this` might seem like a bad thing but in fact it is what
makes the prototypical inheritance work. The only **real** problem here is the
implicit setting of `this` to the `global` object when doing a plain function
call, which is never of any use.

