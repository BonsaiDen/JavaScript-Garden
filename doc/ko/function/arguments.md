## `arguments` 객체

JavaScript의 모든 함수 스코프에는 `arguments`라는 특별한 변수가 있다. 이 변수는 함수에 넘겨진 모든 인자에 대한 정보가 담겨 있다.

> **Note:** `arguments` 변수는 Function 안에서 다시 정의할 수 없다. `var` 구문이나 파라미터에 `arguments`라는 이름으로 변수를 정의해도 변수가 재정의되지 않는다.

`arguments` 객체는 `Array`가 아니다. 물론 `length` 프로퍼티도 있고 여러모로 Array와 비슷하게 생겼지만 Array.prototype을 상속받지는 않았다.

그래서 `arguments`에는 `push`, `pop`, `slice` 같은 표준 메소드가 없다. 일반 `for`문을 이용해 순회는 할수 있지만, `Array`의 메소드를 이용하려면 `arguments`를 Array로 변환해야 한다.

### Array로 변환하기

다음 코드는 arguments에 있는 객체를 새로운 Array에 담아 반환한다.

    Array.prototype.slice.call(arguments);

이 변환 과정은 **느리기** 때문에 성능이 중요한 부분에 사용하는 것은 **별로 바람직하지** 못 하다.

### arguemnts 객체 넘기기

어떤 함수에서 다른 함수로 arguments 객체를 넘길 때에는 다음과 같은 방법을 권한다. (역주: foo 함수는 bar 함수 한번 랩핑한 함수다. )

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // 내곡동에 땅이라도 산다.
    }

또 다른 트릭은 `call`과 `apply`를 함께 사용하여 메써드(`this`의 값과 인자들을 사용하는 함수)를 
단지 인자들만 사용하는 일반 함수로 바꾸는 것입니다.

    function Person(first, last) {
      this.first = first;
      this.last = last;
    }

    Person.prototype.fullname = function(joiner, options) {
      options = options || { order: "western" };
      var first = options.order === "western" ? this.first : this.last;
      var last =  options.order === "western" ? this.last  : this.first;
      return first + (joiner || " ") + last;
    };

    // "fullname" 메써드의 비결합(unbound) 버전을 생성한다.
    // 첫번째 인자로 'first'와 'last' 속성을 가지고 있는 어떤 객체도 사용 가능하다.
    // "fullname"의 인자 개수나 순서가 변경되더라도 이 랩퍼를 변경할 필요는 없을 것이다.
    Person.fullname = function() {
      // 결과: Person.prototype.fullname.call(this, joiner, ..., argN);
      return Function.call.apply(Person.prototype.fullname, arguments);
    };

    var grace = new Person("Grace", "Hopper");

    // 'Grace Hopper'
    grace.fullname();

    // 'Turing, Alan'
    Person.fullname({ first: "Alan", last: "Turing" }, ", ", { order: "eastern" });

### 일반 파라미터와 arguments 객체의 인덱스

일반 파라미터와 `arguments` 객체의 프로퍼티는 모두 *getter*와 *setter*를 가진다.

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

### 성능에 대한 오해와 진실.

`arguments` 객체는 항상 만들어지지만 두가지 예외사항이 있다. `arguments`라는 이름으로 변수를 함수 안에 정의하거나 arguments 객체로 넘겨받는 인자중 하나라도 정식 인자로 받아서 사용하면 `arguemnts` 객체는 만들어지지 않는다. 하지만 뭐 이런 경우들은 어차피 arguments 객체를 안쓰겠다는 의미니까 상관 없다.

그리고 *getter*와 *setter*는 항상 생성되기 때문에 getter/setter를 사용하는 것은 성능에 별 영향을 끼치지 않는다. 예제처럼 단순한 코드가 아니라 `arguments` 객체를 다방면으로 활용하는 실제 코드에서도 마찬가지다.

> **ES5 Note:** strict 모드에서는 *getter*와 *setter*가 생성되지 않는다.

그러나 예외도 있다. 최신 JavaScript 엔진에서 `arguments.callee`를 사용하면 성능이 확 떨어진다.

    function foo() {
        arguments.callee; // 이 함수를 가리킨다.
        arguments.callee.caller; // 이 함수를 호출한 부모함수를 가리킨다.
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // 원래 인라인 돼야 하는디...
        }
    }

위 코드에서 'foo' 함수는 자기 자신과 자신을 호출한 함수를 알아야 하기 때문에 더이상 [인라인][1]되지 않는다. 이렇게 쓰면 인라인이 주는 성능상 장점을 포기해야 하는데다가 이 함수가 호출되는 상황(calling context)에 의존하게 돼 버려서 캡슐화(Encapsulation)도 해친다. 
(역주: 보통 코드가 컴파일 될때 코드를 인라인 시키면서 최적화 하는데, 위와 같이 arguments.callee나 caller를 사용하게 되면 런타임시에 해당 함수가 결정되므로 인라인 최적화를 할수가 없다.)

`arguments.callee`와 arguments.callee의 프로퍼티들은 **절대** 사용하지 말자!.

> **ES5 Note:** strict 모드에서 `arguments.callee`는 deprecated됐기 때문에 사용하면 `TypeError`가 난다.

[1]: http://en.wikipedia.org/wiki/Inlining
