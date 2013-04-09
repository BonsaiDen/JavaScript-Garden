### `setTimeout`과 `setInterval`

JavaScript는 `setTimeout`과 `setInterval`함수를 이용해 비동기로 함수를 실행시킬수있다.

> **Note:** Timeout은 ECMAScript 표준이 아니라 [DOM][1]때문에 구현됐다.

    function foo() {}
    var id = setTimeout(foo, 1000); // 0보다 큰 수를 반환한다.

`setTimeout`을 호출하면 타이머의 ID를 반환하고 **대략** 1,000밀리 초 후에 `foo`를 실행시킨다. `foo`는 **딱 한 번만** 실행한다.

JS엔진은 타이머에 설정한 시간(timer resolution)에 따라서 코드를 실행하지만 단일 쓰레드이기 때문에 특정 코드는 실행이 지연 될수도 있다. 따라서 `setTimeout`으로 코드가 실행돼야 할 시간을 정해줘도 **정확하게 그 시간에 실행되지 않을수도 있다.**.

첫 번째 인자로 넘긴 함수는 전역 객체가 실행시킨다. 따라서 인자로 넘겨진 함수 내부의 [`this`](#function.this)는 *전역* 객체를 가리키게 된다.

    function Foo() {
        this.value = 42;
        this.method = function() {
            // this는 전역 객체를 가리키기 때문에 
            console.log(this.value); // undefined를 출력한다.
        };
        setTimeout(this.method, 500);
    }
    new Foo();

> **Note:** `setTimeout`의 첫 번째 파라미터에 **함수** 객체를 넘겨야 하는 데 `setTimeout(foo(), 1000)`처럼 함수의 실행 결과를 넘기는 실수를 저지를 때가 잦다. 이럴 때 `setTimeout`은 그냥 `undefined`를 반환할 뿐이지 에러를 발생시키지 않는다.

### 함수 호출을 쌓는(Stacking) `setInterval`함수.

`setTimeout`은 딱 한 번 함수를 호출하지만 `setInterval`은 이름처럼 **지정한 시간마다** 함수를 실행시켜준다. 하지만 이 함수의 사용은 좀 생각해봐야한다.

`setInterval`은 실행하는 코드가 일정시간 동안 블럭되도 계속해서 함수를 호출하기 때문에 주기가 짧은 경우 함수 호출이 쉽게 쌓여버린다.

    function foo(){
        // 1초 동안 블럭함.
    }
    setInterval(foo, 1000);

위 코드에서 `foo`함수는 호출될 때마다 1초씩 실행을 지연시킨다.

하지만 `foo`함수가 블럭되더라도 `setInterval`함수는 계속해서 함수 호출을 쌓기 때문에 `foo`함수 호출이 끝나면 *10번* 이상의 함수 호출이 쌓여서 대기하고 있을수도 있다.
(역주: 따라서 함수 호출이 쌓이게 되면 원래 기대했던 실행 주기를 보장받지 못한다.)

### 블럭되는 코드 해결법

앞에 문제를 해결하는 가장 쉽고 일반적인 방법은 `setTimeout` 함수에서 자기 자신을 다시 호출하는 방법이다.

    function foo(){
        // something that blocks for 1 second
        setTimeout(foo, 1000);
    }
    foo();

이 방법은 함수 호출이 쌓이지도 않을 뿐만 아니라 `setTimeout` 호출을 해당 함수 안에서 관리하기 때문에 `foo` 함수에서 계속 실행할지 말지도 조절할 수 있다.

### 타이머 없애기

`clearTimeout`과 `clearInterval` 함수로 setTimeout과 setInterval로 등록한 timeout과 interval을 삭제할 수 있다. `set` 함수들이 반환한 id를 저장했다가 `clear` 함수를 호출해서 삭제한다.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### 모든 타이머 없애기

등록한 timeout과 interval을 한꺼번에 제거하는 내장 함수는 없다. 따라서 좀 무식하지만 직접 구현해야 한다.

    // "모든" 타이머 지우기
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

위와 같은 방법은 숫자가 미치지 못하는 타이머는 여전히 남아있을수 있다는 단점이 있다. 또 다른 해결 방법은 타이머가 반환하는 값이 항상 전보다 1만큼 큰 수를 반환한다는 점을 착안한 방법이다.

    // "모든" 타이머 지우기
    var biggestTimeoutId = window.setTimeout(function(){}, 1),
    i;
    for(i = 1; i <= biggestTimeoutId; i++) {
        clearTimeout(i);
    }

이 방법은 모든 주요 브라우저에서 문제없이 잘 동작하지만 ID가 항상 순차적이어야 한다고 표준에 명시된 것이 아니다. 그러므로 timeout ID를 모두 저장했다가 삭제하는 것이 가장 안전하다. 그러면 전부 깨끗하게 제거할 수 있다.

### 보이지 않게 사용되는 `eval`함수

`setTimeout`과 `setInterval`의 첫 파라미터로 문자열을 넘길 수 있다. 하지만 내부적으로 `eval`을 사용하는 것이기 때문에 절대 사용해서는 안된다.

> **Note:** timeout 함수는 ECMAScript 표준이 아니기 때문에 문자열로 넘어오는 첫번째 인자에 대한 해석은 구현체마다 다르다. 예를 들어, Microsoft의 JScript는 `eval`이 아니라 `Function` 생성자를 사용한다.

    function foo() {
        // 이게 호출됨
    }

    function bar() {
        function foo() {
            // 이것은 절대 호출 안 됨
        }
        setTimeout('foo()', 1000);
    }
    bar();

이 경우 `eval`이 [그냥(directly)](#core.eval) 호출되는 것이 아니다. `setTimeout`에 인자로 넘어간 문자열은 *전역* 스코프에서 실행되기 때문에 `bar`함수 영역에 있는 지역 변수 `foo`가 실행되는 것이 아니라 *전역* 스코프에 있는 `foo`가 실행된다.

함수에 파라미터를 넘겨야 하면 스트링을 사용하지 말아야 한다.

    function foo(a, b, c) {}
    
    // 절대 사용하면 안 됨
    setTimeout('foo(1, 2, 3)', 1000)

    // 대신 익명 함수를 사용하는 게 좋다.
    setTimeout(function() {
        foo(a, b, c);
    }, 1000)

> **Note:** `setTimeout(foo, 1000, a, b, c)`처럼 사용하는 것도 가능하지만, 이것도 권장하지 않는다. [메소드](#function.this)를 사용할 때 잡아내기 어려운 에러가 날 수 있다.

### 결론

`setTimeout`과 `setInterval`함수에 문자열 인자를 절대 사용해서는 안된다. 핸들러 함수에 인자를 넘기는 코드도 **절대** 좋은 코드가 아니다. *익명 함수*을 사용해서 호출해야 한다.

그리고 `setInterval`은 해당 핸들러가 블럭되든 말든 상관하지 않기 때문에 되도록이면 쓰지말자.

[1]: http://en.wikipedia.org/wiki/Document_Object_Model "Document Object Model"
