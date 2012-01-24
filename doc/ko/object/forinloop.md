## `for in` Loop

`in` 연산자와 마찬가지로 `for in`도 객체의 프로퍼티뿐만 아니라 프로토타입 체인까지 Traverse 한다.

> **Note:** `for in`은 Array의 `length`처럼 `enumerable` 속성이 `false`인 프로퍼티는 Iterate 하지 않는다.

    // 원래는 Object.prototype을 바꾸면 안 된다.
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // bar와 moo 둘 다 출력한다.
    }

선택적으로 Iterate 하려면 `for in`은 바꿀 수 없으니까 Loop 바디에서 하는 수밖에 없다. `Object.prototype`의 [`hasOwnProperty`](#object.hasownproperty)메소드를 사용하면 객체의 프로퍼티만 골라낼 수 있다.

> **Note:** `for in`은 프로토타입 체인을 모두 Traverse 한다. 그래서 상속할 때마다 더 느려진다.

### `hasOwnProperty`로 필터링 하기

    // 위의 예제에 이어서 
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

실무에 사용할 작정이라면 이렇게 써야 옳다. `hasOwnProperty` 때문에 **오직** `moo`만 출력된다. `hasOwnProperty`가 없으면 `Object.prototype`같은 네이티브 프로토타입이 확장될 때 에러 날 수 있다.

네이티브 프로토타입을 확장하는 [Proptotype 라이브러리][1]을 사용하면 `hasOwnProperty`가 없는 `for in` Loop은 꼭 문제를 일으킨다.

### 결론

`hasOwnProperty`는 항상 사용해야 한다. 실제로 코드가 동작할 환경에서 네이티브 프로토타입의 확장 여부에 대해 어떠한 가정도 하지 말아야 한다. 

[1]: http://www.prototypejs.org/
