##构造函数 

JavaScript 中的构造函数和其它语言中的构造函数是不同的。
通过 `new` 关键字方式调用的函数都被认为是构造函数。

在构造函数内部 - 也就是被调用的函数内 - `this` 指向新创建的对象 `Object`。
这个**新创建**的对象的 [`prototype`](#object.prototype) 被指向到构造函数的 `prototype`。

如果被调用的函数没有显式的 `return` 表达式，则隐式的会返回 `this` 对象 - 也就是新创建的对象。

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

上面代码把 `Foo` 作为构造函数调用，并设置新创建对象的 `prototype` 为 `Foo.prototype`。

显式的 `return` 表达式将会影响返回结果，但**仅限**于返回的是一个对象。                                 

    function Bar() {
        return 2;
    }
    new Bar(); // 返回新创建的对象
	
	function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // 返回的对象

	
**[译者注][30]：**`new Bar()` 返回的是新创建的对象，而不是数字的字面值 2。
因此 `new Bar().constructor === Bar`，但是如果返回的是数字对象，结果就不同了，如下所示
	
	function Bar() {
		return new Number(2);
    }
    new Bar().constructor === Number
	
	
**[译者注][30]：**这里得到的 `new Test()`是函数返回的对象，而不是通过`new`关键字新创建的对象，因此：

	(new Test()).value === undefined
	(new Test()).foo === 1


如果 `new` 被遗漏了，则函数**不会**返回新创建的对象。

    function Foo() {
        this.bla = 1; // 获取设置全局参数
    }
    Foo(); // undefined

虽然上例在有些情况下也能正常运行，但是由于 JavaScript 中 [`this`](#function.this) 的工作原理，
这里的 `this` 指向*全局对象*。

### 工厂模式

为了不使用 `new` 关键字，构造函数必须显式的返回一个值。

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }
    Bar.prototype = {
        foo: function() {}
    };

    new Bar();
    Bar();

上面两种对 `Bar` 函数的调用返回的值完全相同，一个新创建的拥有 `method` 属性的对象被返回，
其实这里创建了一个[闭包](#function.closures)。

还需要注意， `new Bar()` 并**不会**改变返回对象的原型（**[译者注][30]：**也就是返回对象的原型不会指向 `Bar.prototype`）。
因为构造函数的原型会被指向到刚刚创建的新对象，而这里的 `Bar` 没有把这个新对象返回（[译者注][30]：而是返回了一个包含 `method` 属性的自定义对象）。 

在上面的例子中，使用或者不使用 `new` 关键字没有功能性的区别。

**[译者注][30]：**上面两种方式创建的对象不能访问 `Bar` 原型链上的属性，如下所示：
	
	var bar1 = new Bar();
	typeof(bar1.method); // "function"
	typeof(bar1.foo); // "undefined"
	
	var bar2 = Bar();
	typeof(bar2.method); // "function"
	typeof(bar2.foo); // "undefined"

###通过工厂模式创建新对象

我们常听到的一条忠告是**不要**使用 `new` 关键字来调用函数，因为如果忘记使用它就会导致错误。

为了创建新对象，我们可以创建一个工厂方法，并且在方法内构造一个新对象。

    function Foo() {
        var obj = {};
        obj.value = 'blub';

        var private = 2;
        obj.someMethod = function(value) {
            this.value = value;
        }

        obj.getPrivate = function() {
            return private;
        }
        return obj;
    }

虽然上面的方式比起 `new` 的调用方式不容易出错，并且可以充分利用[私有变量](#function.closures)带来的便利，
但是随之而来的是一些不好的地方。


 1. 会占用更多的内存，因为新创建的对象**不能**共享原型上的方法。
 2. 为了实现继承，工厂方法需要从另外一个对象拷贝所有属性，或者把一个对象作为新创建对象的原型。
 3. 放弃原型链仅仅是因为防止遗漏 `new` 带来的问题，这似乎和语言本身的思想相违背。

###总结

虽然遗漏 `new` 关键字可能会导致问题，但这并**不是**放弃使用原型链的借口。
最终使用哪种方式取决于应用程序的需求，选择一种代码书写风格并**坚持**下去才是最重要的。

[30]: http://cnblogs.com/sanshi/
