## Function Declarations and Expressions

JavaScript의 Function은 first class object라서 일반 객체처럼 취급될 수 있다. 그래서 익명 함수를 비동기 함수의 callback 같은 거로 넘길 수 있다.

### `function` Declaration

    function foo() {}

코드를 실행하기 전에 이 함수 [hoist](#function.scopes)되기 때문에 해당 Scope 어디에서나 이 함수를 호출할 수 있다. 심지어 함수를 정의하기 전에 호출해도 된다.

    foo(); // 이 코드가 실행되기 전에 foo가 만들어져서 잘 호출된다.
    function foo() {}

### `function` Expression

    var foo = function() {};

`foo` 변수에 *익명* 함수를 할당하는 예를 보자.

    foo; // 'undefined'
    foo(); // TypeError가 난다.
    var foo = function() {};

JavaScript가 hoist하는 것은 `var`로 선언하는 부분뿐이기 때문에 코드가 실행하기 전에 `foo` 변수는 정의된다.

그러나 할당은 런타임에만 가능한 일이라 할당하는 코드가 실행될 때까지 `foo`변수는 기본 값인 [undefined](#core.undefined)다.

### Named Function Expression

Named Function을 할당하는 경우는 조금 특이하다.

    var foo = function bar() {
        bar(); // 된다.
    }
    bar(); // ReferenceError

함수 밖에서 `bar`를 사용할 수 없지만, 함수 안에서는 사용할 수 있다. JavaScript가 [이름을 찾는 방법](#function.scopes)이 있는데 function Scope에서는 항상 그 함수의 이름을 사용할 수 있다.

