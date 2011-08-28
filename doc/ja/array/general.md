## 配列の繰り返しとプロパティ

JavaScriptの配列もまたオブジェクトですので[`for in ループ`](#object.forinloop)を配列の繰り返しで使用するような理由はありません。実際、配列に`for in`を使用**しない**為の正当な理由はたくさんあります。

> **注意:** JavaScriptの配列は*連想配列*では**ありません**。JavaScriptは[objects](#object.general)だけがキーバリューをマッピングするものです。
> また、連想配列は順序を**保持**しますが、オブジェクトは**保持しません**。

`for in`ループはプロトタイプチェーン上の全てのプロパティを列挙するため、[`hasOwnProperty`](#object.hasownproperty)をそれらのプロパティの存在判定に使います。この為、通常の`for`ループよりも**20倍**遅くなります。

### Iteration

In order to achieve the best performance when iterating over arrays, it is best
to use the classic `for` loop.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

There is one extra catch in the above example, that is the caching of the 
length of the array via `l = list.length`.

Although the `length` property is defined on the array itself, there is still an
overhead for doing the lookup on each iteration of the loop. And while recent 
JavaScript engines **may** apply optimization in this case, there is no way of
telling whether the code will run on one of these newer engines or not. 

In fact, leaving out the caching may result in the loop being only **half as
fast** as with the cached length.

### The `length` Property

While the *getter* of the `length` property simply returns the number of
elements that are contained in the array, the *setter* can be used to 
**truncate** the array.

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]

    foo.length = 6;
    foo; // [1, 2, 3]

Assigning a smaller length does truncate the array, but increasing the length 
does not have any effect on the array.

### In Conclusion

For the best performance it is recommended to always use the plain `for` loop
and cache the `length` property. The use of `for in` on an array is a sign of
badly written code that is prone to bugs and bad performance. 

