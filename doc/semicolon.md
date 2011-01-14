## Automatic semicolon insertion

Although JavaScript has C style syntax, it does **not** enforce the use of
semicolons in the source code. Since the parser still needs semicolons in order 
to be able to figure out what the code should do, it inserts them 
**automatically**.

When the parser encounters an error due to newline that is not preceded by a 
semicolon, it will insert a semicolon automatically and try again. When the
parser still hits an error, it will raise it, otherwise it will simply proceed.

The automatic insertion of semicolon is considered to be one of **biggest**
design flaws in the language. It makes the below code work, but  with a 
completely different result than intended.

    return
    {
        foo: 1
    }

After the JavaScript parser fixed it, this will **not** return an object which 
has a property called `foo`, it will instead simply return `undefined`.

### How the parser "fixes" missing semicolons

    return // Error, semicolon expected. Automatic insertion happens
    { // Block syntax is handle just fine

        // foo is not interpreted as property name, but as a label
        foo: 1 // JavaScript supports single expression evaluation
               // So 1 evaluates to 1 and no error is being raised

    } // Automatic semicolon insertioN

After the parser has done its "magic", the resulting code has completely
different behavior.

    return; // implicitly returns undefined

    // dead code
    {
        foo: 1
    };

### Best practices

It is **highly** recommended to **never** omit semicolons, it is further
recommended to keep braces on the same line with their associated statements and
never omit them for one line `if` / `else` statements.

