## 型変換

JavaScriptは*弱い型付け*の言語なので、可能な**限り**に*型強制*が適用されます。

    // これらはtrueです。
    new Number(10) == 10; // Number.toString()が変換される
                          // numberに戻る

    10 == '10';           // StringsがNumberに変換される
    10 == '+10 ';         // バカみたいに文字列を追加
    10 == '010';          // もっともっと
    isNaN(null) == false; // nullが0に変換される
                          // もちろんNaNではないです

    // これらはfalseです
    10 == 010;
    10 == '-10';

> **ES5での注意点:** `0`から始まるNumberリテラルは8進数(基数が8)として解釈されます。
> このような8進数のサポートはECMAScript5のstrict modeでは**削除されました**。

上記の自体を避ける為に、[strict equal operator](#types.equality)を使用する事を**強く**推奨します。また、これはたくさんある落し穴を避けますが、それでもまだJavaScriptの弱い型付けシステムから発生する色々な課題が残っています。

### 組み込み型のコンストラクタ

`Number`や`String`のような組み込み型のコンストラクタは、`new`キーワードの有無で振る舞いが違ってきます。

    new Number(10) === 10;     // False, ObjectとNumber
    Number(10) === 10;         // True, NumberとNumber
    new Number(10) + 0 === 10; // True, 暗黙の型変換によります

`Number`のような組み込み型をコンストラクタとして使うと、新しい`Number`オブジェクトが作られますが、`new`キーワードを除外すると`Number`関数がコンバーターのように振る舞います。

加えて、リテラルかオブジェトではない値を持っていると、さらに型強制が多くなります。

最良のオプションは以下の3つの方法の内、1つで型を**明示**する事になります。

### Casting to a String

    '' + 10 === '10'; // true

By prepending a empty string a value can easily be casted to a string.

### Casting to a Number

    +'10' === 10; // true

Using the **unary** plus operator it is possible to cast to a number.

### Casting to a Boolean

By using the **not** operator twice, a value can be converted a boolean.

    !!'foo';   // true
    !!'';      // false
    !!'0';     // true
    !!'1';     // true
    !!'-1'     // true
    !!{};      // true
    !!true;    // true


