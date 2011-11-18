## `Array` 생성자

`Array` 생성자가 파라미터를 처리하는 방법은 모호하기 때문에 항상 `[]` 노테이션으로 Array를 만들어야 한다.

    [1, 2, 3]; // Result: [1, 2, 3]
    new Array(1, 2, 3); // Result: [1, 2, 3]

    [3]; // Result: [3]
    new Array(3); // Result: []
    new Array('3') // Result: ['3']

`Array` 생성자에 인자로 숫자 하나를 넘기면 생성자는 `length`가 그 숫자인 텅 빈 `Array` 하나를 반환한다. 생성자는 **오직** `length` 프로퍼티에 할당하기만 하고 실제 `Array`는 초기화하지 않는다는 것을 기억해야 한다.

    var arr = new Array(3);
    arr[1]; // undefined
    1 in arr; // false, 이 인덱스는 초기화되지 않음.

Array의 length 프로퍼티에 숫자를 할당해주는 이 기능이 유용할 때도 있긴 있다. `for loop`을 사용하지 않고 스트링을 더하는 경우가 그렇다.

    new Array(count + 1).join(stringToRepeat);

### 결론

`Array` 생성자는 가능하면 사용하지 말아야 한다. `[]` 노테이션이 더 알맞다. 더 간략하고 명확하기 때문에 보기도 좋다.
