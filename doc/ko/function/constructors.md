## 생성자

JavaScript의 생성자는 다른 언어들과 다르게 `new` 키워드로 호출되는 함수가 생성자가 된다.

생성자로 호출된 함수의 this 객체는 새로 생성된 객체를 가리키고, **새로 만든** 객체의 [prototype](#object.prototype)에는 생성자의 prototype이 할당된다.

그리고 생성자에 명시적인 `return` 구문이 없으면 this가 가리키는 객체를 반환한다.

    function Person(name) {
        this.name = name;
    }

    Person.prototype.logName = function() {
        console.log(this.name);
    };

    var sean = new Person();

위 코드는 `Person`을 생성자로 호출하고 새로 생성된 객체의 `prototype`을 `Person.prototype`으로 설정한다.

아래 코드와 같이 생성자에 명시적인 `return` 문이 있는 경우에는 반환하는 값이 객체인 경우에만 그 값을 반환한다.

    function Car() {
        return 'ford';
    }
    new Car(); // 'ford'가 아닌 새로운 객체를 반환

    function Person() {
        this.someValue = 2;

        return {
            name: 'Charles'
        };
    }
    new Person(); // someValue가 포함되지 않은 ({name:'Charles'}) 객체 반환

new 키워드가 없으면 그 함수는 객체를 반환하지 않는다.

    function Pirate() {
        this.hasEyePatch = true; // 전역 객체를 준비!
    }
    var somePirate = Pirate(); // somePirate = undefined

위 예제는 그때그때 다르게 동작한다. 그리고 [`this`](#function.this) 객체의 동작 원리에 따라서 Foo 함수안의 `this`의 값은 *Global 객체*를 가리키게된다. 
(역주: 결국 new 키워드를 빼고, 코드를 작성할 경우 원치 않은 this 참조 오류가 발생할 수 있다.)

### 팩토리

생성자가 객체를 반환하면 `new` 키워드를 생략할 수 있다.

    function Robot() {
        var color = 'gray';
        return {
            getColor: function() {
                return color;
            }
        }
    }
    Robot.prototype = {
        someFunction: function() {}
    };

    new Robot();
    Robot();

new 키워드의 유무과 관계없이 `Robot` 생성자의 동작은 동일하다. 즉 [클로저](#function.closures)가 할당된 method 프로퍼티가 있는 새로운 객체를 만들어 반환한다.

`new Robot()`으로 호출되는 생성자는 반환되는 객체의 prototype 프로퍼티에 아무런 영향을 주지 않는다. 객체를 반환하지 않는 생성자로 만들어지는 경우에만 객체의 prototype이 생성자의 것으로 할당된다.

그러니까 이 예제에서 `new` 키워드의 유무는 아무런 차이가 없다.
(역주: 생성자에 객체를 만들어 명시적으로 반환하면 new 키워드에 관계없이 잘 동작하는 생성자를 만들수있다. 즉, new 키워드가 빠졌을때 발생하는 this 참조 오류를 방어해준다.)

### 팩토리로 객체 만들기

`new` 키워드를 빼먹었을 때 버그가 생긴다는 이유로 **아예 new를 사용하지 말 것**을 권하기도 한다.

객체를 만들고 반환해주는 팩토리를 사용하여 `new` 키워드 문제를 회피할 수 있다.

    function CarFactory() {
        var car = {};
        car.owner = 'nobody';

        var milesPerGallon = 2;

        car.setOwner = function(newOwner) {
            this.owner = newOwner;
        }

        car.getMPG = function() {
            return milesPerGallon;
        }

        return car;
    }

`new` 키워드가 없어도 잘 동작하고 [private 변수](#function.closures)를 사용하기도 쉽다. 그렇지만, 단점도 있다.

 1. prototype으로 메소드를 공유하지 않으므로 메모리를 좀 더 사용한다.
 2. 팩토리를 상속하려면 모든 메소드를 복사하거나 객체의 prototype에 객체를 할당해 주어야 한다.
 3. `new` 키워드를 누락시켜서 prototype chain을 끊어버리는 것은 아무래도 언어의 의도에 어긋난다.

### 결론

`new` 키워드가 생략되면 버그가 생길 수 있지만 그렇다고 prototype을 사용하지 않을 이유가 되지 않는다. 애플리케이션에 맞는 방법을 선택하는 것이 나을 거고 어떤 방법이든 **엄격하고 한결같이* 지켜야 한다.
