## Prototype

Javascript는 클래스 스타일의 상속 모델을 사용하지 않고 *프로토타입* 스타일의 상속 모델을 사용한다.

'이 점이 JavaScript의 약점이다.'라고 말하는 사람들도 있지만 실제로는 prototypal inheritance 모델이 훨씬 더 강력하다. 왜냐하면, 프로토타입 모델에서 클래스 모델을 흉내 내기는 매우 쉽지만, 반대로 클래스 모델에서 프로토타입 모델을 흉내 내기란 너무 어렵다.

실제로 Prototypal Inheritance 모델을 채용한 언어 중에서 JavaScript만큼 널리 사용되는 언어는 없었기 때문에 너무 늦게 두 모델의 차이점이 정리된 감이 있다.

JavaScript는 *프로토타입 체인*이라는 것으로 상속을 구현한다.

> **Note:** 간단히 말해서 `Bar.prototype = Foo.prototype`은 두 객체가 **하나의 프로토타입**을 공유하는 것이다. 그래서 한 객체의 프로토타입을 변경하면 그 프로토타입 객체를 사용하는 다른 객체에도 영향을 끼친다. 대부분은 나쁜 결과로 이어진다.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Foo의 인스턴스를 만들어 Bar의 prototype에 할당한다.
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // Bar function을 생성자로 만들고
    Bar.prototype.constructor = Bar;

    var test = new Bar() // bar 인스턴스를 만든다.

    // 결과적으로 만들어진 프로토타입 체인은 다음과 같다. 
    test [instance of Bar]
        Bar.prototype [instance of Foo] 
            { foo: 'Hello World' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* etc. */ }

`Bar.prototype`과 `Foo.prototype`을 둘 다 상속받았기 때문에 `test` 객체는 Foo에 정의한 `method` 함수에 접근할 수 있다. 프로토타입 체인에 있는 `Foo` 인스턴스의 `value` 프로퍼티도 사용할 수 있다. `new Bar()`를 해도 `Foo` 인스턴스는 새로 만들어지지 않고 Bar의 prototype에 있는 것을 재사용한다. 그래서 모든 Bar 인스턴스의 `value` 프로퍼티에 들어 있는 객체는 전부 **같은 객체다**.

> **Note:** `Bar.prototype = Foo`라고 하는 것은 `Foo`의 prototype을 가리키는 것이 아니라 Foo라는 Function의 prototype을 가리키는 것이다. 그래서 프로토타입 체인에 `Foo.prototype` 대신 `Function.prototype`이 들어서는 것이기 때문에 `method` 프로퍼티는 못 찾는다.

### 프로토타입 찾기

객체의 프로퍼티에 접근을 시도하면 JavaScript는 해당 이름의 프로퍼티를 찾을 때까지 위쪽으로 프로토타입 체인을 뒤진다.

체인의 끝까지 찾았는데도(보통은 `Object.prototype`임) 발견하지 못하면 [undefined](#core.undefined)를 반환한다.

### prototype 프로퍼티

prototype 프로퍼티는 프로토타입 체인을 만드는 데 사용하고 어떤 거라도 할당할 수 있지만, primitive 값을 할당하면 무시된다.

    function Foo() {}
    Foo.prototype = 1; // 무시됨

객체를 할당하면 프로토타입 체인이 동적으로 잘 만들어진다.

### 성능

성능이 중요한 부분에서는 프로토타입 체인을 따라 프로퍼티를 찾는 것이 부담일 수 있다. 게다가 없는 프로퍼티에 접근하면 항상 프로토타입 체인 전체를 뒤진다.

객체를 [Iterate](#object.forinloop)하면 프로토타입 체인에 있는 **모든** 프로퍼티가 나열된다.

### 네이티브 프로토타입의 확장

JavaScript에서는 `Object.prototype`같이 네이티브 객체들의 프로토타입도 확장할 수 있지만, 이것도 잘못 설계됐다.

이것을 [Monkey Patching][1]라고 부르는데 *캡슐화*를 망친다. 굉장히 많이 사용하는 [Prototype][2]도 굳이 기본 타입에 표준도 아닌 것들을 추가하는 이유를 아직 설명하지 못하고 있다.

기본 타입을 확장하는 것이 좋을 때도 있다. [`Array.forEach`][3]같이 새 JavaScript 엔진에 추가된 기능을 위한 backport를 만들 때는 유용하다.

### 결론

Prototypal Inheritance 모델을 사용하는 코드를 작성하기 전에는 이 모델을 완벽하게 이해해야 한다. 프로토타입 체인과 관련된 성능 문제로 고생하지 않으려면 프로토타입 체인의 길이에 주의하고 너무 길지 않게 적당히 끊어줘야 한다. JavaScript의 새 기능에 대한 호환성을 유지하려는 경우를 제외하고 절대로 네이티브 프로토타입을 확장하면 안 된다.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
