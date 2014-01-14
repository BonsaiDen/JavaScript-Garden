## Automatic Semicolon Insertion

Although JavaScript has C style syntax, it does **not** enforce the use of
semicolons in the source code, so it is possible to omit them.

JavaScript is not a semicolon-less language. In fact, it needs the 
semicolons in order to understand the source code. Therefore, the JavaScript
parser **automatically** inserts them whenever it encounters a parse
error due to a missing semicolon.

    var foo = function() {
    } // parse error, semicolon expected
    test()

Insertion happens, and the parser tries again.

    var foo = function() {
    }; // no error, parser continues
    test()

The automatic insertion of semicolon is considered to be one of **biggest**
design flaws in the language because it *can* change the behavior of code.

### How it Works

The code below has no semicolons in it, so it is up to the parser to decide where
to insert them.

    (function(window, undefined) {
        function test(options) {
            log('testing!')

            (options.list || []).forEach(function(i) {

            })

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            )

            return
            {
                foo: function() {}
            }
        }
        window.test = test

    })(window)

    (function(window) {
        window.someLibrary = {}

    })(window)

Below is the result of the parser's "guessing" game.

    (function(window, undefined) {
        function test(options) {

            // Not inserted, lines got merged
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- inserted

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- inserted

            return; // <- inserted, breaks the return statement
            { // treated as a block

                // a label and a single expression statement
                foo: function() {} 
            }; // <- inserted
        }
        window.test = test; // <- inserted

    // The lines got merged again
    })(window)(function(window) {
        window.someLibrary = {}; // <- inserted

    })(window); //<- inserted

> **Note:** The JavaScript parser does not "correctly" handle return statements 
> that are followed by a new line. While this is not necessarily the fault of
> the automatic semicolon insertion, it can still be an unwanted side-effect. 

The parser drastically changed the behavior of the code above. In certain cases,
it does the **wrong thing**.

### Leading Parenthesis

In case of a leading parenthesis, the parser will **not** insert a semicolon.

    log('testing!')
    (options.list || []).forEach(function(i) {})

This code gets transformed into one line.

    log('testing!')(options.list || []).forEach(function(i) {})

Chances are **very** high that `log` does **not** return a function; therefore,
the above will yield a `TypeError` stating that `undefined is not a function`.

### In Conclusion

It is highly recommended to **never** omit semicolons. It is also recommended
that braces be kept on the same line as their corresponding statements and to
never omit them for single-line `if` / `else` statements. These measures will
not only improve the consistency of the code, but they will also prevent the
JavaScript parser from changing code behavior.

