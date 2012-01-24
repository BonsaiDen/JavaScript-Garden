## 객체 비교하기

JavaScript에서 객체를 비교하는 방법은 두 가지다.

### Equality Operator

`==`가 Equality Operator이다.

JavaScript는 Weak Typing을 따르기 때문에 equality operator가 비교할 때 두 객체의 자료형을 **강제로** 변환한다.

    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

이 표는 왜 Equality Operator를 사용하면 안 되는지를 보여준다. 이 복잡한 변환 규칙은 실제로 골치 아픈 버그를 만들어 낸다.

게다가 강제로 타입을 변환하는 것은 성능 문제도 일으킨다. 예를 들어 스트링과 숫자를 비교하려면 반드시 숫자로 변환해야 한다.

### Strict Equality Operator

Strict Equality Operator는 `===`이다.

강제로 타입을 변환하지 않는 것을 제외하고는 Equality Operator와 똑같다.

    ""           ===   "0"           // false
    0            ===   ""            // false
    0            ===   "0"           // false
    false        ===   "false"       // false
    false        ===   "0"           // false
    false        ===   undefined     // false
    false        ===   null          // false
    null         ===   undefined     // false
    " \t\r\n"    ===   0             // false

이 결과가 훨씬 명확하고 문제를 빨리 발견할 수 있게 해준다. 이 Operator를 사용하면 코드가 좀 더 튼튼하고 비교하는 두 객체의 타입이 다르면 성능도 빠르다.

### 객체 비교하기

`==`와 `===`는 둘 다 **Equality** Operator지만 비교하는 객체 중 적어도 한 개가 Object 타입일 때에는 다르게 동작한다.

    {} === {};                   // false
    new String('foo') === 'foo'; // false
    new Number(10) === 10;       // false
    var foo = {};
    foo === foo;                 // true

두 Operator 모두 **같은 객체(identity)**인지 비교하는 것이지 객체의 값이 같은지 비교하는 것이 아니다. C에서 포인터를 비교하거나 Python의 is처럼 같은 인스턴스인지 비교하는 것이다.

### 결론

반드시 **Strict Equality Operator**를 사용해야 한다. 비교하기 위해서 꼭 타입 변환이 필요하면 언어의 복잡한 변환 규칙에 맡기지 말고 꼭 명시적으로 변환하고 나서 비교해야 한다.
