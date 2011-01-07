### Equality in JavaScript

JavaScript has two different ways of comparing the values of objects for else
equality. It has both the `==` (double equal) operator and the `===`
(triple equal) operator.

There is an important difference between those two and a good reason for 
**only** triple version

JavaScript has *weak typing* and therefore the creators of the language built in
a way of doing *type coerion* when comparing two values. The only problem is
that, instead of making *type coercin* optional, they made it the **default**.

So the `==` operator will try everything that the language spec allows for to
convert the two values to the same type and then compare them.

#### The Double Equal Operator
    
    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

As you can see from this mess, there's absolutely **no** good reason to use the 
`==` operator. All that *type coercion* does is, is to introduce hard to track 
down errors due to implicit conversion of types.

There's also a performance impact when type coercion is in play. So `==` might
end up being a lot slower, while `===` on the other hand, is always **at least**
as fast - or faster, when dealing with different types.

#### The Triple Equal Operator

    ""           ===   "0"           // false
    0            ===   ""            // false
    0            ===   "0"           // false
    false        ===   "false"       // false
    false        ===   "0"           // false
    false        ===   undefined     // false
    false        ===   null          // false
    null         ===   undefined     // false
    " \t\r\n"    ===   0             // false

These are the results one coming from a strongly typed language would expect.

#### Best Practices
**Always** use the `===` operator, there is never a **any** reason at all to 
use `==`. You will avoid a lot of potential - yet again - subtle bugs this way. 
In cases where you need to coerce types, do so **explicitly**.

