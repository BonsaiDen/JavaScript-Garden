## 배열 순회와 프로퍼티

JavaScript에서는 배열(Array)도 객체(Object)지만 객체 순회(Iterate)를 할 때 [`for in`](#object.forinloop)을 사용해서 좋을 게 없다. 실제로 배열을 탐색할때 `for in`문 사용하지 말아야 할 이유가 매우 많다.

> **Note:** JavaScript의 배열은 *연관 배열(Associative Array)*이 **아니다**. JavaScript는 오직 key/value를 맵핑한 [객체](#object.general)만 있을 뿐이다. 연관 배열은 순서를 보장해주지만 객체는 순서를 보장하지 않는다.

`for in`은 프로토타입 체인에 있는 프로퍼티를 모두 훑는(enumerate) 데다가 객체 자신의 프로퍼티만 훑으려면 [`hasOwnProperty`](#object.hasownproperty)를 사용해야 하기 때문에 `for`보다 20배 느리다.

### 배열 순회

배열을 순회 할때는 일반적인 `for`문을 사용하는 것이 가장 빠르다.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

이 예제에서 `l = list.length`로 배열의 length 값을 캐시해야 한다는 것을 꼭 기억해야 한다.

매번 반복할때마다 배열에 있는 `length` 프로퍼티에 접근하는 것은 좀 부담스럽다. 최신 JavaScript 엔진은 이 일을 알아서 처리해주기도 하지만 코드가 늘 새 엔진에서 실행되도록 보장할 방법이 없다.

실제로 캐시 하지 않으면 성능이 반으로 줄어든다.

### `length` 프로퍼티

`length` 프로퍼티의 *getter*는 단순히 Array 안에 있는 엘리먼트의 개수를 반환하고 *setter*는 배열을 할당한 수만큼 잘라 버린다.

    var arr = [1, 2, 3, 4, 5, 6];
    arr.length = 3;
    arr; // [1, 2, 3]

    arr.length = 6;
    arr.push(4);
    arr; // [1, 2, 3, undefined, undefined, undefined, 4]

현재 크기보다 더 작은 값을 할당하면 배열을 자른다. 배열의 크기를 증가시키면 드문드문(sparse)한 배열을 생성한다.

### 결론

최적의 성능을 위해서는 `for`문을 사용하고 `length` 프로퍼티 값을 캐시해야 한다. 배열에 `for in`을 사용하면 성능도 떨어지고 버그 나기도 쉽다.
