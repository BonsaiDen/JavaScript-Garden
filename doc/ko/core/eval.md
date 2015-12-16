## 왜 `eval`을 사용하면 안 될까?

`eval` 함수는 JavaScript 문자열을 지역 스코프에서 실행한다.

    var number = 1;
    function test() {
        var number = 2;
        eval('number = 3');
        return number;
    }
    test(); // 3
    number; // 1

`eval`함수는 `eval`이라는 이름으로 **직접** 실행할 때에만 지역 스코프에서 실행된다. 그리고 `eval`이라는 이름에 걸맞게 악명또한 높다.

    var number = 1;
    function test() {
        var number = 2;
        var copyOfEval = eval;
        copyOfEval('number = 3');
        return number;
    }
    test(); // 2
    number; // 1

어쨌든 `eval`은 사용하지 말아야 한다. eval을 사용하는 99.9%는 사실 eval 없이도 만들수있다.

### 가짜 `eval`

[`setTimeout`과 `setInterval`](#other.timeouts)은 첫 번째 인자로 스트링을 입력받을 수 있다. 이 경우에는 `eval`을 직접 호출하는 것이 아니라서 항상 Global Scope에서 실행된다.

### 보안 이슈

`eval`은 어떤 코드라도 **무조건** 실행하기 때문에 보안 문제도 있다. 따라서 신뢰하지 못하거나 모르는 코드가 포함되어 있을 경우 **절대로** 사용해서는 안된다.

### 결론

`eval`은 사용하지 않는 게 좋다. `eval`을 사용하는 모든 코드는 성능, 보안, 버그 문제를 일으킬 수 있다. 만약 `eval`이 필요해지면 *설계를 변경*하여 `eval`이 필요 없게 만들어야 한다.
