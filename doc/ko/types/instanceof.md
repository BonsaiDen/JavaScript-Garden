## `instanceof` 연산자

`instanceof`연산자는 두 피연산자의 생성자를 비교할때 사용하고 직접 만든 객체를 비교할 때 매우 유용하다. 내장 타입에 쓰는 경우에는 [typeof](#types.typeof)처럼 거의 쓸모가 없다.

### 커스텀 객체를 `intanceof`로 비교하기

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // Bar.prototype에 함수 객체인 Foo를 할당하면
    // Bar의 인스턴스는 Foo의 인스턴스가 아니다.
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### 기본 내장 객체 타입을 `intanceof`로 비교하기

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

JavaScript 컨텍스트마다(웹 브라우저의 도큐먼트 같은) 객체의 생성자는 다를 수밖에 없어서 `instanceof`는 다른 JavaScript 컨텍스트에 있는(웹 브라우저의 다른 도큐먼트에 있는) 객체와는 비교할 수 없다.

### 결론

`instanceof`는 한 JavaScript 컨텍스트 내에서 사용자가 만든 타입의 객체를 비교할 때에만 유용하다. [`typeof`](#types.typeof)처럼 다른 목적으로는 사용하지 않는 것이 좋다.
