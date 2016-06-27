##`typeof` 操作符

`typeof` 操作符（和 [`instanceof`](#types.instanceof) 一起）或许是 JavaScript 中最大的设计缺陷，
因为几乎不可能从它们那里得到想要的结果。

尽管 `instanceof` 还有一些极少数的应用场景，`typeof` 只有一个实际的应用（**[译者注][30]：**这个实际应用是用来检测一个对象是否已经定义或者是否已经赋值），
而这个应用却**不是**用来检查对象的类型。

> **注意:** 由于 `typeof` 也可以像函数的语法被调用，比如 `typeof(obj)`，但这并不是一个函数调用。
> 那两个小括号只是用来计算一个表达式的值，这个返回值会作为 `typeof` 操作符的一个操作数。
> 实际上**不存在**名为 `typeof` 的函数。

###JavaScript 类型表格

    Value               Class      Type
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object (function in Nitro/V8)
    new RegExp("meow")  RegExp     object (function in Nitro/V8)
    {}                  Object     object
    new Object()        Object     object

上面表格中，*Type* 一列表示 `typeof` 操作符的运算结果。可以看到，这个值在大多数情况下都返回 "object"。

*Class* 一列表示对象的内部属性 `[[Class]]` 的值。

> **JavaScript 标准文档中定义:** `[[Class]]` 的值只可能是下面字符串中的一个：
> `Arguments`, `Array`, `Boolean`, `Date`, `Error`, 
> `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

为了获取对象的 `[[Class]]`，我们需要使用定义在 `Object.prototype` 上的方法 `toString`。

###对象的类定义

JavaScript 标准文档只给出了一种获取 `[[Class]]` 值的方法，那就是使用 `Object.prototype.toString`。

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }
    
    is('String', 'test'); // true
    is('String', new String('test')); // true

上面例子中，`Object.prototype.toString` 方法被调用，[this](#function.this) 被设置为了需要获取 `[[Class]]` 值的对象。

**[译者注][30]：**`Object.prototype.toString` 返回一种标准格式字符串，所以上例可以通过 `slice` 截取指定位置的字符串，如下所示：
	
	Object.prototype.toString.call([])	// "[object Array]"
	Object.prototype.toString.call({})	// "[object Object]"
	Object.prototype.toString.call(2)	// "[object Number]"

> **ES5 提示:** 在 ECMAScript 5 中，为了方便，对 `null` 和 `undefined` 调用 `Object.prototype.toString` 方法，
> 其返回值由 `Object` 变成了 `Null` 和 `Undefined`。


**[译者注][30]：**这种变化可以从 IE8 和 Firefox 4 中看出区别，如下所示：
	
	// IE8
	Object.prototype.toString.call(null)	// "[object Object]"
	Object.prototype.toString.call(undefined)	// "[object Object]"
	
	// Firefox 4
	Object.prototype.toString.call(null)	// "[object Null]"
	Object.prototype.toString.call(undefined)	// "[object Undefined]"
	
	
###测试为定义变量

    typeof foo !== 'undefined'

上面代码会检测 `foo` 是否已经定义；如果没有定义而直接使用会导致 `ReferenceError` 的异常。
这是 `typeof` 唯一有用的地方。


###结论

为了检测一个对象的类型，强烈推荐使用 `Object.prototype.toString` 方法；
因为这是唯一一个可依赖的方式。正如上面表格所示，`typeof` 的一些返回值在标准文档中并未定义，
因此不同的引擎实现可能不同。

除非为了检测一个变量是否已经定义，我们应尽量避免使用 `typeof` 操作符。


[30]: http://cnblogs.com/sanshi/


