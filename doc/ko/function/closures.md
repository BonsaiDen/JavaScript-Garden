## 클로져(Closure)와 참조(Reference)

*클로져*는 JavaScript의 특장점 중 하나다. 클로저를 만들면 클로저 스코프 안에서 클로저를 만든 외부 스코프(Scope)에 항상 접근할 있다. JavaScript에서 스코프는 [함수 스코프](#function.scopes)밖에 없기 때문에 기본적으로 모든 함수는 클로저가 될수있다.

### private 변수 만들기

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

여기서 `Counter`는 `increment` 클로저와 `get` 클로저 두 개를 반환한다. 이 두 클로저는 `Counter` 함수 스코프에 대한 **참조**를 유지하고 있기 때문에 이 함수 스코프에 있는 count 변수에 계속 접근할 수 있다.

### Private 변수의 동작 원리

JavaScript에서는 스코프(Scope)를 어딘가에 할당해두거나 참조할수 없기 때문에 스코프 밖에서는 count 변수에 직접 접근할 수 없다. 접근할수 있는 유일한 방법은 스코프 안에 정의한 두 클로저를 이용하는 방법밖에 없다. 

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

위 코드에서 `foo.hack` 함수는 Counter 함수 안에서 정의되지 않았기 때문에 이 함수가 실행되더라도 `Counter` 함수 스코프 안에 있는 count 값은 변하지 않는다. 대신 foo.hack 함수의 `count`는 *Global* 스코프에 생성되거나 이미 만들어진 변수를 덮어쓴다.

### 반복문에서 클로저 사용하기

사람들이 반복문에서 클로저를 사용할 때 자주 실수를 하는 부분이 있는데 바로 인덱스 변수를 복사할때 발생한다.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

이 코드는 `0`부터 `9`까지의 수를 출력하지 않고 `10`만 열 번 출력한다.

타이머에 설정된 *익명* 함수는 변수 `i`에 대한 참조를 들고 있다가 `console.log`가 호출되는 시점에 `i`의 값을 사용한다. `console.log`가 호출되는 시점에서 `for loop`는 이미 끝난 상태기 때문에 `i` 값은 10이 된다.

기대한 결과를 얻으려면 `i` 값을 복사해 두어야 한다.

### 앞의 참조 문제 해결하기

반복문의 index 값을 복사하는 가장 좋은 방법은 익명함수로 랩핑[Anonymous Wrapper](#function.scopes)하는 방법이다.

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

이 익명 함수에 `i`를 인자로 넘기면 이 함수의 파라미터 e에 i의 **값**이 복사되어 넘어갈 것이다.

그리고 `setTimeout`는 익명 함수의 파라미터인 `e`에 대한 참조를 갖게 되고 `e`값은 복사되어 넘어왔으므로 loop의 상태에 따라 변하지 않는다.

또다른 방법으로 랩핑한 익명 함수에서 출력 함수를 반환하는 방법도 있다. 아래 코드는 위 코드와 동일하게 동작한다.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }
