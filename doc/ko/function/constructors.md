## 생성자

JavaScript에서 생성자는 다른 언어들과 다르게 `new` 키워드로 호출되는 함수가 생성자다.

어쨌든 생성자로 호출된 함수의 this는 막 만들어진 객체를 참조한다. **막 만든** 객체의 [`prototype`](#object.prototype)에는 생성자의 prototype이 할당된다.

생성자에 `return` 구문이 없으면 this가 가리키는 객체를 반환한다.

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

`new` 키워드가 실행되는 시점에 `Foo`를 생성자로 호출하고 `Foo.prototype`을 새 객체의 prototype에 할당한다.

생성자에 `return` 구문이 있고 literal이 아니라 `객체`를 반환하면 그 객체가 반환된다.

    function Bar() {
        return 2;
    }
    new Bar(); // 새 객체를 만들어 반환

    function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // 명시한 객체를 반환

new 키워드가 없으면 그 함수는 객체를 반환하지 않는다.

    function Foo() {
        this.bla = 1; // gets set on the global object
    }
    Foo(); // undefined

이 함수는 그때그때 다르게 동작하지만 보통 [`this`](#function.this)의 규칙에 따라 `this`의 값으로 *Global 객체*가 사용된다.:w

### 팩토리

생성자가 객체를 반환하면 `new` 키워드를 생략할 수 있다.

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

new 키워드가 있으나 없으니 `Bar` 생성자는 똑같이 동작한다. [Closure](#function.closures)가 할당된 method 프로퍼티가 있는 객체를 만들어 반환한다.

`new Bar()`는 반환된 객체의 prototype 프로퍼티에 아무런 영향을 주지 않는다. 객체를 반환하지 않는 생성자로 만들어지는 경우에만 객체의 prototype이 생성자의 것으로 할당된다.

그러니까 이 예제에서 `new` 키워드의 유무는 아무 차이가 없다.

### 팩토리로 객체 만들기

`new` 키워드를 빼먹었을 때 버그가 생긴다는 이유로 **아예 new를 사용하지 말 것**을 권하기도 한다.

객체를 만들고 반환해주는 팩토리를 사용하여 `new` 키워드 문제를 회피할 수 있다.

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

`new` 키워드가 없어도 괜찮고 [private 변수](#function.closures)를 사용하기도 쉽다. 그렇지만, 단점도 있다.

 1. prototype으로 메소드를 공유하지 않으므로 메모리를 좀 더 사용한다.
 2. 팩토리를 상속하려면 모든 메소드를 복사하거나 객체의 prototype에 객체를 할당해 주어야 한다.
 3. `new` 키워드를 누락시켜서 prototype chain을 끊어버리는 것은 아무래도 언어의 의도에 어긋난다.

### 결론

`new` 키워드가 생략되면 버그가 생길 수 있지만 그렇다고 prototype을 사용하지 않을 이유가 되지 않는다. 애플리케이션에 맞는 방법을 선택하는 것이 나을 거고 어떤 방법이든 **엄격하고 한결같이* 지켜야 한다.
