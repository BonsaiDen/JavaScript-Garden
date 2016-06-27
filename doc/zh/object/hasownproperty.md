##`hasOwnProperty` 函数

为了判断一个对象是否包含*自定义*属性而*不是*[原型链](#object.prototype)上的属性，
我们需要使用继承自 `Object.prototype` 的 `hasOwnProperty` 方法。

> **注意:** 通过判断一个属性是否 `undefined` 是**不够**的。
> 因为一个属性可能确实存在，只不过它的值被设置为 `undefined`。

`hasOwnProperty` 是 JavaScript 中唯一一个处理属性但是**不**查找原型链的函数。

    // 修改 Object.prototype
    Object.prototype.bar = 1;
    var foo = {goo: undefined};
    
    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

只有 `hasOwnProperty` 可以给出正确和期望的结果。可以查看 [`for in` 循环](#object.forinloop)
章节来获取关于在迭代遍历对象属性的时候，何时使用 `hasOwnProperty` 的更多信息。

###`hasOwnProperty` 作为属性

JavaScript **不会**保护 `hasOwnProperty` 被非法占用，因此如果一个对象碰巧存在这个属性，
就需要使用*外部*的 `hasOwnProperty` 函数来获取正确的结果。

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // 总是返回 false

    // 使用其它对象的 hasOwnProperty，并将其上下文设置为 foo
    ({}).hasOwnProperty.call(foo, 'bar'); // true

###结论

当检查对象上某个属性是否存在时，`hasOwnProperty` 是**唯一**可用的方法。
同时在使用 [`for in` loop](#object.forinloop) 遍历对象时，推荐**总是**使用 `hasOwnProperty` 方法，
这将会避免[原型](#object.prototype)对象扩展带来的干扰。

