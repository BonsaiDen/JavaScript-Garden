## `arguments` 객체

JavaScript의 모든 Function Scope에는 `arguments`라는 특별한 변수가 있다. 이 변수는 Function에 넘겨진 모든 인자에 대한 정보가 담겨 있다.

> **Note:** `arguments` 변수는 Function 안에서 다시 정의할 수 없다. `var` 구문이나 파라미터에 `arguments`라는 이름으로 변수를 정의해도 변수가 재정의되지 않는다.

`length` 프로퍼티도 있는 데다가 여러모로 Array와 비슷하게 생겼지만 Array.prototype을 상속받지 않았다. `arguments` 객체는 `Array`가 아니다. 

그래서 `arguments`에는 `push`, `pop`, `slice` 같은 표준 메소드가 없다. `for`로 하는 Iteration은 원래 잘되지만 `Array`의 메소드를 이용하려면 `arguments`를 Array로 변환해야 한다.

### Array로 변환하기

다음 코드는 arguments에 있는 객체를 새로운 Array에 담아 반환한다.

    Array.prototype.slice.call(arguments);

이 변환 과정은 **느리기** 때문에 성능이 중요한 부분에 사용하는 것은 **별로 바람직하지** 못 하다.

### arguemnts 객체 넘기기

어떤 Function에서 다른 Function로 arguments 객체를 넘길 때에는 다음과 같이 하는 것이 좋다.

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // 내곡동에 땅이라도 산다.
    }

`call`과 `apply`를 함께 사용하여 unbound wrapper도 쉽게 만들 수 있다.

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // "method"의 unbound 버전
    // 이 Function의 인자: this, arg1, arg2...argN
    Foo.method = function() {

        // 결과: Foo.prototype.method.call(this, arg1, arg2... argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };

### 파라미터와 arguments 객체 인덱스

파라미터와 `arguments` 객체의 프로퍼티는 모두 *getter*와 *setter*를 가진다.

그래서 파라미터나 `arguments` 객체의 프로퍼티의 값을 바꾸면 둘 다 바뀐다.

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);

### 성능에 대한 진실과 오해.

`arguments` 객체는 항상 만들어 지지만 예외도 있다. `arguments`라는 이름의 변수를 Function 안에 정의하거나 그 이름으로 파라미터를 만들면 `arguemnts` 객체는 만들어지지 않는다. 그렇지만, 이럴때는 어차피 안쓰겠다는 의미니까 상관 없다.

그리고 *getter*와 *setter*는 항상 생성되기 때문에 getter/setter를 사용하는 것은 성능에 별 영향을 끼치지 않는다. 예제처럼 단순한 코드가 아니라 `arguments` 객체를 다방면으로 활용하는 실제 코드에서도 마찬가지다.

> **ES5 Note:** strict 모드에서는 *getter*와 *setter*가 생성되지 않는다.

그러나 예외도 있다. 최신 JavaScript 엔진에서 `arguments.callee`를 사용하면 성능이 확 떨어진다.

    function foo() {
        arguments.callee; // 이 Function를 가리킨다.
        arguments.callee.caller; // 이 Function를 호출한 Function를 가리킨다.
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // 원래 인라인 돼야 하는디...
        }
    }

이 코드에서 Callee와 Caller를 알아야 하기 때문에 `foo`는 더는 [인라인][1]하지 않는다. 이렇게 쓰면 인라인이 주는 성능상 장점을 포기해야 하는데다가 Function이 호출되는 상황(calling context)에 의존하게 돼 버려서 Encapsulation도 해친다.

`arguments.callee`와 그 프로퍼티들은 **절대** 사용하지 말아야 한다.

> **ES5 Note:** strict 모드에서 `arguments.callee`는 deprecated됐기 때문에 사용하면 `TypeError`가 난다.

[1]: http://en.wikipedia.org/wiki/Inlining
