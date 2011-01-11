## Automatic Semicolon Insertion

Although JavaScript has C style syntax, it does not enforce the use of
semicolons in the source code, but since the parser still needs them in order to
be able to figure out what the code should do, it inserts them automatically.

When the parser encounters an error due to new line that is not preceded by a 
semicolon, it will insert a semicolon automatically and try again. When the
parser still hits an error, it will raise it, otherwise it will simply proceed.

This is one of the **biggest** flaws in the language since it makes the below
code work with a completely different result than intended.

    return
    {
        foo: 1
    }

After the JavaScript parser fixed it, this will **not** return an object which 
has a property called `foo`, it will instead simply return `undefined`.

### How the Parser "fixes" missing Semicolons

    return // parse error, expected a semicolon. Automatic insertion happens
    { // Although there's no block scope in JS, block syntax is handle fined

        // foo is not interpreted as an object key, but as a label
        foo: 1 // JavaScript supports single expression evaluation
               // So 1 evaluates to 1 and no error is being raised

    } // Another semicolon gets inserted here

After the parser has done its "magic", the resulting code has completely
different behavior.

    return; // implicitly returns undefined

    // dead code
    {
        foo: 1
    };

### Best Practices

**Never** omit semicolons. Also, always keep your `{}` on the **same** line to 
avoid such subtle mistakes. It's also good style to **never** make use the 
possibility of omitting the curly braces for one line `if / else` statements.

