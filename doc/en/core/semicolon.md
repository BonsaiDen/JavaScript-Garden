## Automatic Semicolon Insertion

Although JavaScript has C style syntax, it does **not** enforce the use of
semicolons in the source code, it is possible to omit them.

Every statement in JavaScript may end with either a semicolon or a new
line.

    var foo = function() {
    
    }
    test()

The parser sees that as if you had put your semicolons just fine.

    var foo = function() {
    
    };
    test();

Some tokens cause an implicit line continuation: `[`, `(`, `+`. `-` and `/`;
that is, the previous statement will span through the following line if any
of those tokens appear at the start of the next line.

    a = b + c
    (d + e).print()

Since the line following the assignment expression starts with one of
the line continuation tokens, JavaScript will accept it as part of the
preceding statement.

    a = b + c(d + e).print();


### Restricted production

Some statements require a slight special attention, since they might
end sooner than you'd expect due to semicolon insertion rules. These
are called **restricted production** statements, being: post-fix
increment/decrement (`++` and `--`), return, break, continue and throw.

In a nutshell, restricted productions can't have a line break between
the keyword and the rest of the statement. Thus, inserting a line break
right after the return keyword, will make the return statement end there.

    return
    { foo: 'foo'
    , bar: 'bar'
    }
    
The previous example will be parsed as a return statement, and a statement
block, and result in a syntax error:

    return;
    { foo: 'foo'
    , bar: 'bar' // error, not valid in a statement block
    };
    

### In Conclusion

It is recommended to **never** omit semicolons, it is also advocated to 
keep braces on the same line with their corresponding statements and to never omit 
them for one single-line `if` / `else` statements.

