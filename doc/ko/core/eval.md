## 왜 `eval`을 사용하면 안 될까?

`eval` 함수는 스트링으로 된 JavaScript 코드를 Local Scope에서 실행한다.

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

`eval`을 `eval`이라는 이름으로 **직접** 직행할 때에만 Local Scope에서 실행된다.

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3

어쨌든 `eval`은 사용하지 말아야 한다. eval을 사용하는 경우의 99.9%는 사실 eval이 필요 없다.

### 가짜 `eval`

[`setTimeout`과 `setInterval`](#other.timeouts)은 첫 번째 인자로 스트링을 입력받을 수 있다. 이 경우에는 `eval`을 직접 호출하는 것이 아니라서 항상 Global Scope에서 실행된다.

### 보안 이슈

`eval`은 보안 문제도 있다. 단순히 **모든** 코드를 실행하기 때문에 신뢰하지 못하는 코드가 **절대로** 포함되지 않도록 주의해야 한다.

### 결론

`eval`은 사용하지 않는 게 좋다. `eval`을 사용하는 모든 코드는 성능, 보안, 버그 문제를 일으킬 수 있다. 만약 `eval`이 필요해지면 *설계를 변경*하여 `eval`이 필요 없게 만들어야 한다.
