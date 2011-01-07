### Automatic Semicolon Insertion

The JavaScript parser allows for ommitting semicolons, since they're still 
needed, it will automatically replace newlines (`\n`) with `;` as soon as it
encounters a parse error due to a missing semicolon.

    return
    {
        foo: 1
    }

This will **not** return an object which has a property called `foo`, it will
instead simply return `undefined`.

#### A Parser making things worse

    return // parse error, expected a semicolon, automatic insertion happens
    { // while JS has no block scope, it handles blocks just fine
        foo: 1 // this doesn't break either, foo is seen as a label here
               // JavaScript does support single expression evaluation so 
               // the number evaluates to 1 just fine

    } // another automatic insertion of a semicolon happens here

#### Results of the "intelligent" Parser

    return;
    // dead code
    {
        foo: 1
    };

#### Best Practices
Always have your `{}` always on the **same** line to avoid such sublte mistakes. 
It's also good style to **never** make use the possibility of omitting the curly 
braces for one line `if / else` statements.

