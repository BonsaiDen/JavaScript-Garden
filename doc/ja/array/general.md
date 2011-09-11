## 配列の繰り返しとプロパティ

JavaScriptの配列もまたオブジェクトですので[`for in ループ`](#object.forinloop)を配列の繰り返しで使用するような理由はありません。実際、配列に`for in`を使用**しない**為の正当な理由はたくさんあります。

> **注意:** JavaScriptの配列は*連想配列*では**ありません**。JavaScriptは[objects](#object.general)だけがキーバリューをマッピングするものです。
> また、連想配列は順序を**保持**しますが、オブジェクトは**保持しません**。

`for in`ループはプロトタイプチェーン上の全てのプロパティを列挙するため、[`hasOwnProperty`](#object.hasownproperty)をそれらのプロパティの存在判定に使います。この為、通常の`for`ループよりも**20倍**遅くなります。

### 繰り返し

配列の要素を繰り返すとのに、最高のパフォーマンスを出したければ昔ながらの`for`ループを使うのが一番です。

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

上記の例では一つ余分に変数がありますが、それは配列の長さを取るための`l = list.length`の部分です。

また、`length`プロパティは配列自身に定義されていますが、ループのそれぞれの繰り返しで探索する為のオーバーヘッドがまだあります。最近のJavaScriptエンジンはこのような場合に最適化する**はず**です。新しいエンジンか古いエンジンで実行されるかどうかをコードが知る方法はありません。

実際には、キャッシュを抜きにするとループの結果はキャッシュされたものに比べて、**半分だけ高速**になっています。

### `length`プロパティ

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

