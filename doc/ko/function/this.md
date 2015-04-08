## `this`의 동작 원리

다른 프로그래밍 언어에서 `this`가 가리키는 것과 JavaScript에서 `this`가 가리키는 것과는 좀 다르다. `this`가 가리킬 수 있는 객체는 정확히 5종류나 된다.

### Global Scope에서

    this;

Global Scope에서도 this가 사용될 수 있고 이때에는 *Global* 객체를 가리킨다.

### 함수를 호출할 때

    foo();

이때에도 `this`는 *Global* 객체를 가리킨다.

> **ES5 Note:** strict 모드에서 더는 Global 객체를 가리키지 않고 대신 `undefined`를 가리킨다.

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

### 대표적인 함정

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
        var self = this;
        function test() {
            // 여기에서 this 대신에 self를 사용하여 Foo에 접근한다
        }
        test();
    }

`self`는 통상적인 변수 이름이지만, 바깥쪽의 `this`를 참조하기 위해 일반적으로 사용된다. 
또한 [클로저](#function.closures)와 결합하여 `this`의 값을 주고 받는 용도로 사용할 수도 있다.

ECMAScript 5부터는 익명 함수와 결합된 `bind` 메써드를 사용하여 같은 결과를 얻을 수 있다. 

    Foo.method = function() {
        var test = function() {
            // this는 이제 Foo를 참조한다
        }.bind(this);
        test();
    }

### Method 할당하기

JavaScript의 또다른 함정은 바로 함수의 별칭을 만들수 없다는 점이다. 별칭을 만들기 위해 메소드를 변수에 넣으면 자바스크립트는 별칭을 만들지 않고 바로 *할당*해 버린다.  

    var test = someObject.methodTest;
    test();

첫번째 코드로 인해 이제 `test`는 다른 함수와 똑같이 동작한다. 그래서 test 함수 내부의 `this`도 더이상 someObject를 가리키지 않는다. (역주: test가 methodTest의 별칭이라면 methodTest 함수 내부의 this도 someObject를 똑같이 가리켜야 하지만 test의 this는 더이상 someObject가 아니다.)

이렇게 `this`를 늦게 바인딩해서 나타나는 약점때문에 늦은 바인딩이 나쁜 거라고 생각할수도 있지만, 사실 이런 특징으로 인해 [프로토타입 상속(prototypal inheritance)](#object.prototype)도 가능해진다.

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

`Bar` 인스턴스에서 `method`를 호출하면 `method`에서 `this`는 바로 그 인스턴스를 가리킨다.
