## Prototype

Javascript는 클래스 스타일의 상속 모델을 사용하지 않고 *프로토타입* 스타일의 상속 모델을 사용한다.

'이 점이 JavaScript의 약점이다.'라고 말하는 사람들도 있지만 실제로는 prototypal inheritance 모델이 훨씬 더 강력하다. 그 이유는 프로토타입 모델에서 클래스 모델을 흉내 내기는 매우 쉽지만, 반대로 클래스 모델에서 프로토타입 모델을 흉내 내기란 매우 어렵기 때문이다.

실제로 Prototypal Inheritance 모델을 채용한 언어 중에서 JavaScript만큼 널리 사용된 언어가 없었기 때문에 두 모델의 차이점이 다소 늦게 정리된 감이 있다.

먼저 가장 큰 차이점은 *프로토타입 체인*이라는 것을 이용해 상속을 구현한다는 점이다.

> **Note:** 간단히 말해서 `Bar.prototype = Foo.prototype`은 두 객체가 **하나의 프로토타입**을 공유하는 것이다. 그래서 한 객체의 프로토타입을 변경하면 그 프로토타입 객체를 사용하는 다른 객체도 영향을 받는다. 따라서 대부분의 경우 프로토타입을 변경하지는 않는다.

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

    // Bar 함수를 생성자로 만들고
    Bar.prototype.constructor = Bar;

    var test = new Bar() // bar 인스턴스를 만든다.

    // 결과적으로 만들어진 프로토타입 체인은 다음과 같다. 
    test [instance of Bar]
        Bar.prototype [instance of Foo] 
            { foo: 'Hello World', value: 42 }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* etc. */ }

위 코드에서 `test` 객체는 `Bar.prototype`과 `Foo.prototype`을 둘 다 상속받았기 때문에 Foo에 정의한 `method` 함수에 접근할 수 있다. 그리고 프로토타입 체인에 있는 `Foo` 인스턴스의 `value` 프로퍼티도 사용할 수 있다. `new Bar()`를 해도 `Foo` 인스턴스는 새로 만들어지지 않고 Bar의 prototype에 있는 것을 재사용한다. 그래서 모든 Bar 인스턴스는 **같은** `value` 프로퍼티를 공유한다.

> **Note:** `Bar.prototype = Foo`라고 하는 것은 `Foo`의 prototype을 가리키는 것이 아니라 Foo라는 Function의 prototype을 가리키는 것이다. 그래서 프로토타입 체인에 `Foo.prototype` 대신 `Function.prototype`이 들어가 있기 때문에 `method` 프로퍼티는 찾지 못한다.

### 프로토타입 탐색

객체의 프로퍼티에 접근하려고 하면 JavaScript는 해당 이름의 프로퍼티를 찾을 때까지 프로토타입 체인을 거슬러 올라가면서 탐색하게 된다.

프로토타입 체인을 끝까지 탐색했음에도(보통은 `Object.prototype`임) 불구하고 원하는 프로퍼티를 찾지 못하면 [undefined](#core.undefined)를 반환한다.

### prototype 프로퍼티

prototype 프로퍼티는 프로토타입 체인을 만드는 데 사용하고 어떤 값이든 할당할 수 있지만, primitive 값을 할당되면 무시한다.

    function Foo() {}
    Foo.prototype = 1; // 무시됨

반면에 위 예제처럼 객체를 할당하면 프로토타입 체인이 동적으로 잘 만들어진다.

### 성능

프로토타입 체인을 탐색하는 시간이 오래걸릴수록 성능에 부정적인 영향을 줄수있다. 특히 성능이 중요한 코드에서 프로퍼티 탐색시간은 치명적인 문제가 될수있다. 가령, 없는 프로퍼티에 접근하려고 하면 항상 프로토타입 체인 전체를 탐색하게 된다.

뿐만아니라 객체를 [순회(Iterate)](#object.forinloop)할때도 프로토타입 체인에 있는 **모든** 프로퍼티를 탐색하게 된다.

### 네이티브 프로토타입의 확장

종종 `Object.prototype`을 이용해 내장 객체를 확장하는 경우가 있는데, 이것도 역시 잘못 설계된 것중에 하나다.

위와 같이 확장하는 것을 [Monkey Patching][1]라고 부르는데 *캡슐화*를 망친다. 물론 [Prototype][2]같은 유명한 프레임워크들도 이런 확장을 사용하지만, 기본 타입에 표준도 아닌 기능들을 너저분하게 추가하는 이유를 여전히 설명하지 못하고 있다.

기본 타입을 확장해야하는 유일한 이유는 [`Array.forEach`][3]같이 새로운 JavaScript 엔진에 추가된 기능을 대비해 미리 만들어 놓는 경우 말고는 없다.

### 결론

프로토타입을 이용해 복잡한 코드를 작성하기 전에 반드시 프로토타입 상속 (Prototypal Inheritance) 모델을 완벽하게 이해하고 있어야 한다. 뿐만아니라 프로토타입 체인과 관련된 성능 문제로 고생하지 않으려면 프로토타입 체인이 너무 길지 않도록 항상 주의하고 적당히 끊어줘야 한다. 마지막으로 새로운 JavaScript 기능에 대한 호환성 유지 목적이 아니라면 절대로 네이티브 프로토타입을 확장하지마라.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
