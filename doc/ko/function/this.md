## `this`

다른 프로그래밍 언어에서 `this`가 가리키는 것과 JavaScript에서 `this`가 가리키는 것과는 좀 다르다. `this`가 가리킬 수 있는 객체는 정확히 5종류나 된다.

### Global Scope에서

    this;

Global Scope에서도 this가 사용될 수 있고 이때에는 *Global* 객체를 가리킨다.

### 함수를 호출할 때

    foo();

이때에도 `this`는 *Global* 객체를 가리킨다.

> **ES5 Note:** strict 모드에서는 더는 Global 객체를 가리키지 않고 대신 `undefined`를 가리킨다.

### 메소드로 호출할 때

    test.foo(); 

이 경우에는 `this`가 `test`를 가리킨다.

### 생성자를 호출할 때

    new foo(); 

`new` 키워드로 [생성자](#function.constructors)를 실행시키는 경우에 이 생성자 안에서 `this`는 새로 만들어진 객체를 가리킨다.

### `this`가 가리키는 객체 정해주기.

    function foo(a, b, c) {}

    var bar = {};
    foo.apply(bar, [1, 2, 3]); // a = 1, b = 2, c = 3으로 넘어간다.
    foo.call(bar, 1, 2, 3); // 이것도... 

`Function.prototype`의 `call`이나 `apply` 메소드를 호출하면 `this`가 무엇을 가리킬지 *정해줄 수 있다*. 호출할 때 첫 번째 인자로 `this`가 가리켜야 할 객체를 넘겨준다.

그래서 `foo` Function 안에서 `this`는 위에서 설명했던 객체 중 하나를 가리키는 것이 아니라 `bar`를 가리킨다.

> **Note:** 객체 리터럴에서 this는 그 객체를 가리키지 않는다. 예를 들어 `var obj= {me:this}`에서 `me`가 `obj`를 가리키는 것이 아니라 위에 설명한 5가지 객체 중 하나를 가리킨다.

### 대표적인 결점

`this`가 Global 객체를 가리키는 것도 잘못 설계된 부분 중 하나다. 괜찮아 보이지만 실제로는 전혀 사용하지 않는다.

    Foo.method = function() {
        function test() {
            // 여기에서 this는 Global 객체를 가리킨다.
        }
        test();
    }

`test` 에서 `this`가 `Foo`를 가리킬 것으로 생각할 테지만 틀렸다. 실제로는 그렇지 않다.

`test`에서 `Foo`에 접근하려면 method에 Local 변수를 하나 만들고 `Foo`를 가리키게 하여야 한다.

    Foo.method = function() {
        var that = this;
        function test() {
            // 여기에서 this 대신에 that을 사용하여 Foo에 접근한다.
        }
        test();
    }

`that`은 this에 접근하기 위해 만든 변수다. [closures](#function.closures)와 함께 `this`의 값을 넘기는 데 사용할 수 있다.

### Method할당 하기

메소드를 변수에 *할당*해 버리기 때문에 Function Aliasing은 JavaScript에서 안된다.

    var test = someObject.methodTest;
    test();

`test`는 다른 함수를 호출하는 것과 다름없어서 `this`가 someObject를 가리키지 않는다.

처음에는 `this`를 늦게 바인딩하는 것이 나쁜 아이디어라고 생각할 수도 있지만, 이 점이 실제로 [prototypal inheritance](#object.prototype)를 가능케 해준다.

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

`Bar` 인스턴스에서 `method`를 호출하면 `method`에서 `this`는 바로 그 인스턴스를 가리킨다.
