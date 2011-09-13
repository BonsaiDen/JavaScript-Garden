## 等価と比較

JavaScriptはオブジェクトの値の等価の比較方法が2種類持っています。

### 等価演算子

等価演算子は2つのイコール記号: `==`から成っています。

JavaScriptは*弱い型付け*を特徴としています。これは等価演算子が比較をする際に型付けを**強制**するという意味です。

    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

上記の表では型強制の結果が表示されています。`==`の使用が一般に悪い習慣とみなされる大きな理由として、変換ルールが複雑な為、バグの追跡が困難になる事が挙げられます。

加えて、型強制が行なわれるとパフォーマンスにも影響してしまいます。例えば、文字列は他の数字と比較する前に数値に変換されなければなりません。

### The Strict Equality Operator

The strict equality operator consists of **three** equal signs: `===`

It works exactly like the normal equality operator, except that strict equality 
operator does **not** perform type coercion between its operands.

    ""           ===   "0"           // false
    0            ===   ""            // false
    0            ===   "0"           // false
    false        ===   "false"       // false
    false        ===   "0"           // false
    false        ===   undefined     // false
    false        ===   null          // false
    null         ===   undefined     // false
    " \t\r\n"    ===   0             // false

The above results are a lot clearer and allow for early breakage of code. This
hardens code to a certain degree and also gives performance improvements in case
the operands are of different types.

### Comparing Objects

While both `==` and `===` are stated as **equality** operators, they behave 
different when at least one of their operands happens to be an `Object`.

    {} === {};                   // false
    new String('foo') === 'foo'; // false
    new Number(10) === 10;       // false
    var foo = {};
    foo === foo;                 // true

Here both operators compare for **identity** and **not** equality; that is, they
will compare for the same **instance** of the object, much like `is` in Python 
and pointer comparison in C.

### In Conclusion

It is highly recommended to only use the **strict equality** operator. In cases
where types need to be coerced, it should be done [explicitly](#types.casting) 
and not left to the language's complicated coercion rules.

