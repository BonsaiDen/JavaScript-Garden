##对象使用和属性

JavaScript 中所有变量都可以当作对象使用，除了两个例外 [`null`](#core.undefined) 和 [`undefined`](#core.undefined)。

    false.toString(); // 'false'
    [1, 2, 3].toString(); // '1,2,3'
    
    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

一个常见的误解是数字的字面值（literal）不能当作对象使用。这是因为 JavaScript 解析器的一个错误，
它试图将*点操作符*解析为浮点数字面值的一部分。

    2.toString(); // 出错：SyntaxError

有很多变通方法可以让数字的字面值看起来像对象。

    2..toString(); // 第二个点号可以正常解析
    2 .toString(); // 注意点号前面的空格
    (2).toString(); // 2先被计算

###对象作为数据类型

JavaScript 的对象可以作为[*哈希表*][1]使用，主要用来保存命名的键与值的对应关系。

使用对象的字面语法 - `{}` - 可以创建一个简单对象。这个新创建的对象从 `Object.prototype`
[继承](#object.prototype)下来，没有任何[自定义属性](#object.hasownproperty)。

    var foo = {}; // 一个空对象

    // 一个新对象，拥有一个值为12的自定义属性'test'
    var bar = {test: 12}; 

### 访问属性

有两种方式来访问对象的属性，点操作符和中括号操作符。
    
    var foo = {name: 'kitten'}
    foo.name; // kitten
    foo['name']; // kitten
    
    var get = 'name';
    foo[get]; // kitten
    
    foo.1234; // SyntaxError
    foo['1234']; // works

两种语法是等价的，但是中括号操作符在下面两种情况下依然有效
 - 动态设置属性
 - 属性名不是一个有效的变量名（**[译者注][30]：**比如属性名中包含空格，或者属性名是 JS 的关键词）

> **[译者注][30]：**在 [JSLint][2] 语法检测工具中，点操作符是推荐做法。

###删除属性

删除属性的唯一方法是使用 `delete` 操作符；设置属性为 `undefined` 或者 `null` 并不能真正的删除属性，
而**仅仅**是移除了属性和值的关联。

    var obj = {
        bar: 1,
        foo: 2,
        baz: 3
    };
    obj.bar = undefined;
    obj.foo = null;
    delete obj.baz;

    for(var i in obj) {
        if (obj.hasOwnProperty(i)) {
            console.log(i, '' + obj[i]);
        }
    }

上面的输出结果有 `bar undefined` 和 `foo null` - 只有 `baz` 被真正的删除了，所以从输出结果中消失。

###属性名的语法

    var test = {
        'case': 'I am a keyword so I must be notated as a string',
        delete: 'I am a keyword too so me' // 出错：SyntaxError
    };

对象的属性名可以使用字符串或者普通字符声明。但是由于 JavaScript 解析器的另一个错误设计，
上面的第二种声明方式在 ECMAScript 5 之前会抛出 `SyntaxError` 的错误。

这个错误的原因是 `delete` 是 JavaScript 语言的一个*关键词*；因此为了在更低版本的 JavaScript 引擎下也能正常运行，
必须使用*字符串字面值*声明方式。

[1]: http://en.wikipedia.org/wiki/Hashmap
[2]: http://www.jslint.com/
[30]: http://cnblogs.com/sanshi/

