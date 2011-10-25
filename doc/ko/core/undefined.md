## `undefined`와 `null`

JavaScript는 `nothing`을 두 가지로 표현할 수 있고 그중 `undefined`가 더 유용하다.

### `undefined`도 변수

`undefined`는 `undefined`라는 값을 가지는 데이터 형식이다.

`undefined`는 상수도 아니고 JavaScript의 키워드도 아니다. 그냥 `undefined`라는 이름의 글로벌 변수이고 이 변수에는 `undefined`라고 할당돼 있다. 그래서 이 글로벌 변수의 값을 쉽게 바꿀 수 있다.

> **ES5 Note:** ECMAScript 5의 strict 모드에서는 `undefined`를 더는 바꿀 수 없도록 했다. 하지만 `undefined`라는 함수를 만들면 여전히 할당할 수 있다.

`undefined` 값이 반환될 때:

 - global 변수 `undefined`에 접근할 때.
 - `return` 구문이 없는 함수는 `undefined`를 반환함.
 - `return` 구문으로 아무것도 반환하지 않을 때.
 - 없는 프로퍼티를 찾을 때.
 - 함수 인자가 생략될 때.
 - `undefined`가 할당된 모든 것.

### `undefined`가 바뀔 때를 대비하기

global 변수 `undefined`는 `undefined`라는 객체를 가리키는 것뿐이기 때문에 새로운 값을 할당한다고 해도 `undefined`의 값 자체가 바뀌는 것이 아니다.

그래서 `undefined`와 비교하려면 먼저 `undefined`의 값을 찾아와야 한다.

보통 `undefined` 변수가 바뀌어 있을 때를 대비해서 undefined라는 변수를 인자로 받는 [anonymous wrapper](#function.scopes)로 감싸고 아무런 인자를 넘기지 않는 꼼수를 사용한다. 

    var undefined = 123;
    (function(something, foo, undefined) {
        // 로컬 스콥에 undefined를 만들어서
        // 원래 값을 가리키도록 했다.

    })('Hello World', 42);

wrapper 안에서 변수를 새로 정의하는 방법으로도 같은 효과를 볼 수 있다.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

이 두 방법의 차이는 minified했을 때 4바이트만큼 차이 난다는 것과 한쪽은 wrapper 안에 var 구문이 없다는 것밖에 없다. 

### `Null` 객체의 용도

JavaScript 언어에서는 `undefined`를 다른 언어에서 *null*을 사용하듯이 쓰고 진짜 `null`은 그냥 다른 데이터 타입 중 하나일 뿐이다.

JavaScript 내부적인 곳에 사용하는 경우가 아니면 null 대신 `undefined`를 사용해도 된다(`Foo.prototype = null`같이 프로토타입 체인을 끊을 때는 null을 사용한다).
