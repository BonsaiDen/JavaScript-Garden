## Closure와 Reference

*Closure*는 JavaScript의 특장점 중 하나다. Closure에서는 그 Closure를 만든 외부 Scope에 접근할 있다. JavaScript에서 Scope을 만들려면 [Function Scope](#function.scopes)을 사용하는 방법밖에 없기 때문에 Closure는 함수로 만든다.

### private 변수

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

`Counter`는 `increment` Closure와 `get` Closure 두 개를 반환한다. 이 두 Closure는 `Counter` Scope에 대한 **reference**를 유지하고 있기 때문에 그 Scope에 있는 count 변수에 계속 접근할 수 있다.

### Private 변수가 진짜 맞나?

JavaScript에서 Scope을 어딘가에 할당하거나 저장해두는 것이 불가능하다. 그래서 Scope 밖에서는 count 변수에 직접 접근할 수 없다. 꼭 Scope 안에서 정의한 두 closure를 통해서만 접근할 수 있다.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

이 코드의 count는 `Counter` Scope의 변수 count가 아니다. `foo.hack`은 그 Scope 안에 정의되지 않았기 때문에 이 `count`는 *Global* 변수를 사용하는 것이다.

### Loop에서 Closure 사용하기

많은 사람은 Loop에서 Closure를 사용할 때 자주 index 변수를 잘못 사용한다.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

이 코드는 `0`부터 `9`까지의 수를 출력하지 않고 `10`만 열 번 출력한다.

이 *Anonymous* Function은 변수 `i`에 대한 참조를 저장했다가 `console.log`가 호출되는 시점에 `i`의 값을 사용한다. `console.log`가 호출되는 시점은 `for loop`이 이미 끝난 상태라서 `i` 값은 10이다.

기대한 결과를 얻으려면 `i` 값을 복사해 두어야 한다.

### 이 Reference 문제 해결하기

[Anonymous Wrapper](#function.scopes)로 index 값을 복사하는 것이 좋다.

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

이 Anonymous Function의 인자로 `i`를 넘기면 이 함수의 파라미터 e에 i의 **값**이 복사된다.

이 `setTimeout`는 anonymous function 파라미터인 `e`에 대한 참조를 갖게 되고 `e`는 loop의 상태에 따라 변하지 않는다.

함수를 반환하는 Anonymous Wrapper를 이용하는 방법도 있다. 다음 코드는 위 코드와 같다.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }
