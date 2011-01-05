### Equality in JavaScript

JavaScript has two different ways of comparing the values of objects. For one it
has the `==` equal operator and then there is the `===` equal operator.

There is an important difference why you should **only** ever use the latter one, 
and that is that the `==` does **type coercion** which results in the following:

    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

As you can see from this mess, there's absoulutely no **good** reason to use the 
`==` operator. All that type coercion does is, to introduce hard to track down
errors due to implicit conversion of types.

There's also a performance impact when type coercion is in play. So `==` might
end up being a lot slower, while `===` on the other hand, is always *at least* as 
fast as `==` or faster, when the types are identical.

**Best Practice:** Always, always use `===` there is never a good reason to use
`==` you will avoid a lot of potentionl bugs this way, in cases where you need
to coerce types, do it explicitly.


