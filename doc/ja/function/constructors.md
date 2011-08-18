## コンストラクタ

JavaScriptのコンストラクタは色々ある他のプログラム言語とは一味違います。`new`キーワードが付いているどんな関数呼び出しも、コンストラクタとして機能します。

コンストラクタ内部では -呼び出された関数の事です- `this`の値は新規に生成された`Object`を参照しています。この**新規**のオブジェクトの[`prototype`](#object.prototype)は、コンストラクタとして起動した関数オブジェクトの`prototype`として設定されています。

もし呼び出された関数が、`return`ステートメントを明示していない場合は、暗黙の了解で`this`の値を -新規のオブジェクトとして- 返します。

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

上記で`Foo`はコンストラクタとして呼び出され、`Foo.prototype`として新規に生成された`prototype`を設定されています。

明示的に`return`ステートメントがある場合、`Object`の値を返す**だけでなく**関数はこのステートメントを返します。

    function Bar() {
        return 2;
    }
    new Bar(); // 新しいオブジェクト

    function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // 返ってきたオブジェクト

`new`キーワードが省略されている場合は、関数は新しいオブジェクトを返す事は**ありません**。

    function Foo() {
        this.bla = 1; // グローバルオブジェクトに設定される
    }
    Foo(); // undefinedが返る

上記の例では、いくつかのケースでは動作するように見える場合があります。JavaScriptの[`this`](#function.this)の働きのせいで、*グローバルオブジェクト*が`this`の値として使用されるからです。

### ファクトリー

`new`キーワードを省略するためには、コンストラクタ関数が明示的に値を返す必要があります。

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

`Bar`で呼び出されたものは両方とも全く同じものものになります。これには、`method`と呼ばれるプロパティを持ったオブジェクトが新しく生成されますが、これは[クロージャ](#function.closures)です。

また、注意する点として呼び出された`new Bar()`は返ってきたオブジェクトのプロトタイプに影響**しません**。プロトタイプが新しく生成されたオブジェクトにセットされるまで、`Bar`は絶対に新しいオブジェクトを返さないのです。

上記の例では、`new`キーワードの使用の有無は機能的に違いがありません。


### Creating New Objects via Factories

An often made recommendation is to **not** use `new` since forgetting its use
may lead to bugs.

In order to create new object, one should rather use a factory and construct a 
new object inside of that factory.

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

While the above is robust against a missing `new` keyword and certainly makes 
the use of [private variables](#function.closures) easier, it comes with some 
downsides.

 1. It uses more memory since the created objects do **not** share the methods
    on a prototype.
 2. In order to inherit the factory needs to copy all the methods from another
    object or put that object on the prototype of the new object.
 3. Dropping the prototype chain just because of a left out `new` keyword
    somehow goes against the spirit of the language.

### In Conclusion

While omitting the `new` keyword might lead to bugs, it is certainly **not** a 
reason to drop the use of prototypes altogether. In the end it comes down to 
which solution is better suited for the needs of the application, it is 
especially important to choose a specific style of object creation **and stick** 
with it.

