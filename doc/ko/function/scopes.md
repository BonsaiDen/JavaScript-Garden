## Scope과 Namespace

JavaScript는 '{}' Block이 배배 꼬여 있어도 문법적으로는 잘 처리하지만, Block Scope은 지원하지 않는다. 그래서 JavaScript에서는 항상 *Function Scope*을 사용한다.

    function test() { // Scope
        for(var i = 0; i < 10; i++) { // Scope이 아님
            // count
        }
        console.log(i); // 10
    }

> **Note:** 할당할 때, 반환할 때, Function 인자에서 사용되는 것을 제외하면 `{...}`는 모두 객체 리터럴이 아니라 Block 구문으로 해석된다. 그래서 [세미콜론을 자동으로 넣어주면](#core.semicolon) 에러가 생길 수 있다.

그리고 JavaScript에는 Namepspace 개념이 없어서 *항상 공유하는* namepace가 딱 하나다.

변수를 사용할 때마다 JavaScript는 아는 Scope을 상위 방향으로 찾는다. Global Scope에까지 해당 변수를 찾지 못하면 `ReferenceError`가 난다.

### Global 변수 지옥.

    // script A
    foo = '42';

    // script B
    var foo = '42'

이 두 스크립트는 전혀 다르다. Script A는 *Global* Scope에 `foo`라는 변수를 정의하는 것이고 Script B는 *현* Scope에 변수 `foo`를 정의하는 것이다.

다시 말하지만, 이 둘은 전혀 다르고 `var`가 없을 때 특별한 의미가 있다.

    // Global Scope
    var foo = 42;
    function test() {
        // local Scope
        foo = 21;
    }
    test();
    foo; // 21

Function에서 `var` 구문을 빼버리면 Global Scope의 `foo`의 값을 바꿔버린다. '뭐 이게 뭐가 문제야'라고 생각될 수 있지만 수천 줄인 JavaScript 코드에서 `var`를 빼먹어서 생긴 버그를 해결하는 것은 정말 어렵다.

    // Global Scope
    var items = [/* some list */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }

    function subLoop() {
        // Scope of subLoop
        for(i = 0; i < 10; i++) { // var가 없다.
            // 내가 for문도 해봐서 아는데...
        }
    }

subLoop이 Global 변수 `i`의 값을 변경해버리기 때문에 외부 Loop은 `subLoop`을 한번 호출하고 나면 종료된다. 두 번째 `for` Loop에 `var`를 사용하여 `i`를 정의하면 이 문제는 생기지 않는다. 외부 Scope의 변수를 사용하는 것이 아니라면 `var`를 꼭 넣어야 한다.

### Local 변수

JavaScript에서 Local 변수는 [Function 파라미터](#function.general)와 `var`로 정의한 변수뿐이다.

    // Global Scope
    var foo = 1;
    var bar = 2;
    var i = 2;

    function test(i) {
        // test Function의 local Scope
        i = 5;

        var foo = 3;
        bar = 4;
    }
    test(10);

`foo`, `i`는 `test` Function Scope에 있는 Local 변수라서 Global의 `foo`, `i` 값은 바뀌지 않는다. 하지만 `bar`는 Global 변수이기 때문에 Global의 `bar` 값이 변경된다.

### Hoisting

JavaScript는 선언문을 모두 **Hoist**한다. Hoist는 `var` 구문이나 `function`을 선언문을 해당 Scope의 가장 처음으로 옮기는 것을 말한다.

    bar();
    var bar = function() {};
    var someValue = 42;

    test();
    function test(data) {
        if (false) {
            goo = 1;

        } else {
            var goo = 2;
        }
        for(var i = 0; i < 100; i++) {
            var e = data[i];
        }
    }

코드를 본격적으로 실행하기 전에 JavaScript는 `var` 구문과 `function` 선언문을 해당 Scope의 상위로 옮긴다.

    // var 구문이 여기로 옮겨짐.
    var bar, someValue; // default to 'undefined'

    // function 선언문도 여기로 옮겨짐
    function test(data) {
        var goo, i, e; // Block Scope은 없으므로 local 변수들은 여기로 옮겨짐
        if (false) {
            goo = 1;

        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // bar()가 아직 'undefined'이기 때문에 TypeError가 남
    someValue = 42; // Hoisting은 할당문까지 옮기지 않는다.
    bar = function() {};

    test();

Block Scope이 없으므로 Loop이나 if의 Block 안에 있는 `var` 구문들까지도 모두 Function Scope의 앞쪽으로 옮겨진다. 그래서 `if` Block의 결과는 좀 이상해진다.

원래 코드에서 `if` Block은 *Global 변수* `goo`를 바꾸는 것처럼 보였지만 Hoisting 후에는 *local 변수*를 바꾼다.

*Hoisting*을 모르면 다음과 같은 코드는 `ReferenceError`를 낼 것으로 생각할 것이다.

    // SomeImportantThing이 초기화됐는지 검사한다.
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

`var` 구문은 *Global Scope* 상단으로 옮겨지기 때문에 이 코드는 잘 동작한다.

    var SomeImportantThing;

    // SomeImportantThing을 여기서 초기화하거나 말거나...

    // SomeImportantThing는 선언돼 있다.
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### 이름 찾는 순서

JavaScript의 모든 Scope은 *현 객체*를 가리키는 [`this`](#function.this)를 가지고 있다. *Global Scope*에도 this가 있다.

Function Scope에는 [`arguments`](#function.arguments)라는 변수가 하나 더 있다. 이 변수는 Function에 넘겨진 인자들이 담겨 있다.

예를 들어 Function Scope에서 `foo`라는 변수에 접근할 때 JavaScript는 다음과 같은 순서로 찾는다.

 1. 해당 Scope에서 `var foo` 구문으로 선언된 것을 찾는다.
 2. Function 파라미터에서 `foo`라는 것을 찾는다.
 3. 해당 Function 이름이 `foo`인지 찾는다.
 4. 상위 Scope으로 있는지 확인하고 있으면 **#1**부터 다시 한다.
 
> **Note:** `arguments`라는 파라미터가 있으면 Function의 기본 객체인 `arguments`가 생성되지 않는다.

### Namespace

JavaScript에서는 Global Namepspace 하나밖에 없어서 변수 이름이 중복되기 쉽다. 하지만 *Anonymous Wrappers*가 있어서 쉽게 피해갈 수 있다.

    (function() {
        // 일종의 Namepspace라고 할 수 있다.
        
        window.foo = function() {
            // 이 Closure는 Global Scope에 노출된다.
        };

    })(); // Function를 정의하자마자 실행한다.

Unnamed Function은 [expressions](#function.general)이기 때문에 호출되려면 먼저 Evaluate돼야 한다.

    ( // 소괄호 안에 있는 것을 먼저 Evaluate한다.
    function() {}
    ) // 그리고 Function 객체를 반환한다.
    () // Evaluation된 결과를 호출한다.

같은 표기법이 두 가지 더 있다. 문법은 다르지만 똑같다.

    // 두 가지 다른 방법
    +function(){}();
    (function(){}());

### 결론

코드를 캡슐화할 때는 늘 *Anonymous Wrapper*로 Namepspace를 만들어 사용해야 한다. 이 Wrapper는 이름이 중복되는 것을 막아 주고 더 쉽게 모듈화할 수 있도록 해준다.

그리고 Global 변수를 사용하는 것은 악질적인 습관이다. 이유야 어쨌든 에러 나기 쉽고 관리하기도 어렵다.
