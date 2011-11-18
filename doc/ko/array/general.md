## Array Iteration과 프로퍼티

JavaScript에서는 Array도 객체지만 Iterate를 할 때 [`for in`](#object.forinloop)을 사용해서 좋을 게 없다. 

> **Note:** JavaScript의 Array는 *Associative Array*가 **아니다**. JavaScript [객체](#object.general)는 key/value만 mapping 할 뿐이다. Associative Array는 순서를 보장하지만, 객체는 보장하지 않는다.

`for in`은 프로토타입 체인에 있는 프로퍼티를 모두 훑는(enumerate) 데다가 객체 자신의 프로퍼티만 훑으려면 [`hasOwnProperty`](#object.hasownproperty)를 사용해야 하기 때문에 `for`보다 20배 느리다.

### Iteration

Array를 Iterate 할 때에는 구식인 `for`를 사용하는 것이 가장 빠르다.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

위 예제에서 꼭 기억해야 하는 것은 `l = list.length`로 Array의 length 값을 캐시 했다는 것이다.

Array에 있는 `length` 프로퍼티를 iterate마다 사용하는 것은 좀 부담스럽다. 최신 JavaScript 엔진은 이 일을 알아서 처리하기도 하지만 코드가 새 엔진에서 실행되도록 보장할 방법이 없다.

실제로 캐시 하지 않으면 성능이 반으로 줄어든다.

### `length` 프로퍼티

`length` 프로퍼티의 *getter*는 단순히 Array 안에 있는 엘리먼트의 개수를 반환하고 *setter*는 할당한 수로 Array를 잘라 버린다.

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]

    foo.length = 6;
    foo; // [1, 2, 3]

현재 크기보다 더 작은 값을 할당하면 Array를 자르지만, 현재 크기보다 더 큰 값을 할당하면 아무것도 하지 않는다.

### 결론

최적의 성능을 위해서 `for`를 사용하고 `length` 프로퍼티 값을 캐시 하길 바란다. Array에 `for in`을 사용하면 성능도 떨어지고 버그 나기도 쉽다.
