### Automatic Semicolon Insertion

The JavaScript parser allows for ommitting semicolons, since they're still 
needed, it will automatically replace newlines (`\n`) with `;` as soon as it
encounters a parse error due to a missing semicolon.

**Example**

    return
    {
        foo: 1
    }

This will **not** return an object which has a property called `foo`, it will
instead simply return `undefined`.

**How the parser "fixes" it**

    return // parse error, expected a semicolon, automatic insertion happens
    { // while JS has no block scope, it handles blocks just fine
        foo: 1 // this doesn't break either, foo is seen as a label here
               // JavaScript does support single expression evaluation so 
               // the number evaluates to 1 just fine

    } // another automatic insertion of a semicolon happens here

**The results**

    return;
    // dead code
    {
        foo: 1
    };

This is the **number one** reason to have your `{}` always on the **same** line
and to **never** use the short hand syntax of omitting the curly braces for one
line `if / else` statements.

