### `setTimeout`과 `setInterval`

JavaScript는 비동기이기 때문에 `setTimeout`과 `setInterval` 로 함수의 실행 순서를 조절할 수 있다.

> **Note:** Timeout은 ECMAScript 표준이 아니라 [DOM][1]때문에 구현됐다.

    function foo() {}
    var id = setTimeout(foo, 1000); // 0보다 큰 수를 반환한다.

`setTimeout`을 호출하면 timeout의 ID를 반환하고 **대충** 1,000밀리 초 후에 `foo`를 실행시킨다. `foo`는 **딱 한 번만** 실행한다.

JavaScript 엔진의 단위 시간(timer resolution)에 따라서 코드를 실행시키고 단일 쓰레드인 JavaScript를 특정 코드가 블록 시켜 버릴 수도 있기 때문에 `setTimeout`으로 코드가 실행돼야 할 시간을 정해줘도 **정확하게 그 시간에 실행되지 않는다.**.

첫 번째 인자로 넘긴 함수가 실행될 때 컨텍스트인 [`this`](#function.this)는 *Global* 객체를 가리킨다.

    function Foo() {
        this.value = 42;
        this.method = function() {
            // this는 Global 객체를 가리키기 때문에 
            console.log(this.value); // undefined를 출력한다.
        };
        setTimeout(this.method, 500);
    }
    new Foo();

> **Note:** `setTimeout`의 첫 번째 파라미터에 **함수** 객체를 넘겨야 하는 데 `setTimeout(foo(), 1000)`처럼 함수의 실행 결과를 넘기는 실수를 저지를 때가 잦다. 이럴 때 `setTimeout`은 그냥 `undefined`를 반환할 뿐이지 에러를 발생시키지 않는다.

### `setInterval`은 계속 함수 호출을 쌓는다(Stacking).

`setTimeout`은 딱 한 번 함수를 호출하지만 `setInterval`은 이름처럼 **지정한 시간마다** 함수를 실행해 준다. 이 `setInterval`은 별로다.

만약 실행하는 코드가 일정시간 동안 블럭되도 `setInterval`은 계속 함수를 호출시키려 든다. 특히 주기가 짧으면 밀리기 쉬워서 함수 호출은 계속 쌓일 수 있다.

    function foo(){
        // 1초 동안 블럭함.
    }
    setInterval(foo, 1000);

`foo`는 단순히 호출될 때마다 1초 동안 블럭하는 함수다.

`foo`가 블럭해도 `setInterval`은 계속 함수 호출을 쌓는다. `foo`의 첫 번째 호출이 끝나도 *10번* 이상의 함수 호출이 쌓여 대기하고 있다.

### 오래 걸리는 코드 다루기

`setTimeout` 으로 함수 자신을 호출하는 방법으로 해결하기가 가장 쉽다.

    function foo(){
        // something that blocks for 1 second
        setTimeout(foo, 1000);
    }
    foo();

함수 호출이 쌓이지도 않을 뿐만 아니라 `setTimeout` 호출을 해당 함수 안에서 관리하고 `foo` 함수에서 계속 실행할지 말지 조절할 수도 있다.

### Timeout 없애기

`clearTimeout`과 `clearInterval` 함수로 setTimeout과 setInterval로 등록한 timeout과 interval을 삭제할 수 있다. `set` 함수들이 반환한 id를 저장했다가 `clear` 함수를 호출하여 삭제한다.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### timeout을 전부 없애기

등록한 timeout과 interval을 한꺼번에 제거하는 메소드는 없다. 구현해서 사용해야 한다.

    // clear "all" timeouts
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

Id가 1부터 1000 사이에 있는 timeout들을 제거했지만, 그 외의 것은 아직 남아있다. 또 다른 방법이 있다. `setTimeout`은 항상 호출될 때마다 전보다 1만큼 큰 수를 ID로 반환한다. 이 점을 이용해 1부터 가장최근 ID까지 모두 삭제할 수 있다.

    // clear "all" timeouts
    var biggestTimeoutId = window.setTimeout(function(){}, 1),
    i;
    for(i = 1; i <= biggestTimeoutId; i++) {
        clearTimeout(i);
    }

이 방법은 모든 주요 브라우저에서 문제없이 잘 동작한다. 하지만 ID가 항상 순차적이어야 한다고 표준에 명시된 것이 아니다. 그러므로 timeout ID를 모두 저장했다가 삭제하는 것이 가장 안전하다. 그러면 전부 깨끗하게 제거할 수 있다.

### 숨겨진 `eval`

`setTimeout`과 `setInterval`의 첫 파라미터에 스트링도 넘길 수 있다. 그렇지만, 내부적으로 `eval`을 사용하는 것이기 때문에 절대 사용하지 말아야 한다.

> **Note:** timeout 함수는 ECMAScript 표준이 아녀서 첫 인자가 스트링 타입일 때에는 JavaScript 구현체마다 다르게 동작한다. 예를 들어, Microsoft의 JScript는 `eval`이 아니라 `Function` 생성자를 사용한다.

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

이 경우 `eval`이 [그냥(directly)](#core.eval) 호출되는 것이 아니다. `setTimeout`에 넘겨진 스트링은 *Global* Scope에서 실행되기 때문에 `bar`의 Local 함수 `foo`가 실행되는 것이 아니라 *Global* Scope의 `foo`가 실행된다.

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

`setTimeout`과 `setInterval`의 파라미터로 스트링은 절대 사용하지 말아야 한다. 핸들러 함수에 인자를 넘겨야 하는 경우도 **분명히** 탈 난다. *익명 함수*을 사용해서 호출해야 한다.

그리고 `setInterval`은 해당 핸들러가 블럭되든 말든 상관하지 않기 때문에 사용하면 안 된다.

[1]: http://en.wikipedia.org/wiki/Document_Object_Model "Document Object Model"
