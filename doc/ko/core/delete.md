## `delete`

간단히 말해서 global 변수, Function, 등은 `DontDelete` 속성이기 때문에 delete하지 못 한다.

### Global 코드와 Function 코드

Global이나 Function Scope에 정의한 Fuction이나 변수는 모두 Activation 객체나 Global 객체의 프로퍼티다. 이 프로퍼티는 모두 `DontDelete` 속성을 가진다. Global이나 Function 코드에서 변수나 Function의 정의하면 항상 `DontDelete` 프로퍼티로 만들어진다. 그러니까 delete할 수 없다:

    // Global 변수:
    var a = 1; // DontDelete가 설정된다.
    delete a; // false
    a; // 1

    // Function:
    function f() {} // DontDelete가 설정된다.
    delete f; // false
    typeof f; // "function"

    // 다시 할당해도 삭제할 수 없다:
    f = 1;
    delete f; // false
    f; // 1

### Explicit 프로퍼티

다음 예제에서 만드는 프로퍼티는 delete할 수 있다. 이런 걸 Explicit 프로퍼티라고 부른다:

    // Explicit 프로퍼티를 만든다:
    var obj = {x: 1};
    obj.y = 2;
    delete obj.x; // true
    delete obj.y; // true
    obj.x; // undefined
    obj.y; // undefined

`obj.x`와 `obj.y`는 `DontDelete` 속성이 아니라서 delete할 수 있다. 그러나 다음과 같은 코드도 잘 동작하기 때문에 헷갈린다:

    // IE를 빼고 잘 동작한다:
    var GLOBAL_OBJECT = this;
    GLOBAL_OBJECT.a = 1;
    a === GLOBAL_OBJECT.a; // true - 진짜 Global 변수인지 확인하는 것
    delete GLOBAL_OBJECT.a; // true
    GLOBAL_OBJECT.a; // undefined

[`this`](#function.this)가 Global 객체를 가리키는 것을 이용해서 명시적으로 프로퍼티 `a`를 선언하면 삭제할 수 있다. 이것은 꼼수다.

IE (적어도 6-8)는 버그가 있어서 안 된다.

### Argument들과 Function의 기본 프로퍼티

Function의 [`arguments` 객체](#function.arguments)와 기본 프로퍼티도 `DontDelete` 속성이다.

    // Function의 arguments와 프로퍼티:
    (function (x) {
    
      delete arguments; // false
      typeof arguments; // "object"
      
      delete x; // false
      x; // 1
      
      function f(){}
      delete f.length; // false
      typeof f.length; // "number"
      
    })(1);

### Host 객체

> **역주:** Host 객체는 document같은 DOM 객체를 말한다.

Host 객체를 delete하면 어떻게 될지 알 수 없다. 표준에는 어떻게 Host 객체를 delete해야 하는지 정의하지 않았다.

### 결론

`delete` 연산자는 엉뚱하게 동작할 때가 잦다. 명시적으로 정의한 일반 객체의 프로퍼티만 delete하는 것이 안전하다.
