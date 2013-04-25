## `for in` Loop

객체의 프로퍼티를 탐색할때 `in` 연산자와 마찬가지로 `for in` 문도 프로토타입 체인까지 탐색한다.

> **Note:** `for in`문은 배열의 `length`프로퍼티처럼 `enumerable` 속성이 `false`인 프로퍼티는 탐색하지 않는다. 

    // Object.prototype을 오염시킨다.
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // bar와 moo 둘 다 출력한다.
    }

`for in`문에 정의된 기본 동작을 바꿀순 없기 때문에 루프 안에서 불필요한 프로퍼티를 필터링 해야한다. 그래서 `Object.prototype`의 [`hasOwnProperty`](#object.hasownproperty)메소드를 이용해 본래 객체의 프로퍼티만 골라낸다.

> **Note:** `for in`은 프로토타입 체인을 모두 탐색하기 때문에 상속할 때마다 더 느려진다.

### `hasOwnProperty`로 필터링 하기

    // 위의 예제에 이어서 
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

위와 같이 사용해야 올바른 사용법이다. `hasOwnProperty` 때문에 **오직** `moo`만 출력된다. `hasOwnProperty`가 없으면 이 코드는 `Object.prototype`으로 네이티브 객체가 확장될 때 에러가 발생할 수 있다.

따라서 [Proptotype 라이브러리][1]처럼 네이티브 객체를 프로토타입으로 확장한 프레임워크를 사용할 경우 `for in` 문에 `hasOwnProperty`를 사용하지 않을 경우 문제가 발생할 수 있다.

### 결론

`hasOwnProperty`를 항상 사용하길 권한다. 실제 코드가 동작하는 환경에서는 절대로 네이티브 객체가 프로토타입으로 확장됐다 혹은 확장되지 않았다를 가정하면 안된다.

[1]: http://www.prototypejs.org/
