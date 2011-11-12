## 세미콜론을 자동으로 삽입해준다.

JavaScript는 C와 문법이 비슷하지만, 꼭 코드에 semicolon을 사용하도록 강제하지 않는다. 그래서 생략할 수 있다.

사실 JavaScript는 semicolon이 꼭 있어야 하고 없으면 이해하지 못한다. 그래서 JavaScript 파서는 semicolon이 없으면 **자동으로** semicolon을 추가한다. 

    var foo = function() {
    } // 세미콜론이 없으니 에러 난다.
    test()

파서는 세미콜론을 삽입하고 다시 시도한다.

    var foo = function() {
    }; // 에러가 없어짐.
    test()

JavaScript에서 세미콜론을 자동으로 삽입한 것은 **대표적인** 설계 오류 중 하나다. 세미콜론 유무에 따라 *전혀* 다른 코드가 될 수 있다.

### 어떻게 다를까?

코드에 세미콜론이 없으면 파서가 어디에 넣을지 결정한다.

    (function(window, undefined) {
        function test(options) {
            log('testing!')

            (options.list || []).forEach(function(i) {

            })

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            )

            return
            {
                foo: function() {}
            }
        }
        window.test = test

    })(window)

    (function(window) {
        window.someLibrary = {}

    })(window)

파서는 다음과 같이 삽입한다.

    (function(window, undefined) {
        function test(options) {

            // 세미콜론을 넣는 것이 아니라 줄을 합친다.
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- 여기

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- 여기

            return; // <- 여기에 넣어서 그냥 반환시킨다.
            { // 파서는 단순 블럭이라고 생각하고

                // 단순한 레이블과 함수
                foo: function() {} 
            }; // <- 여기
        }
        window.test = test; // <- 여기

    // 이 줄도 합쳐진다.
    })(window)(function(window) {
        window.someLibrary = {}; // <- 여기

    })(window); //<- 여기에 파서는 세미콜론을 넣는다.

> **주의:** JavaScript 파서는 new line 문자가 뒤따라 오는 return 구문을 제대로 처리하지 못한다. 자동으로 세미콜론을 넣는 것 자체의 문제는 아니지만 어쨌든 여전히 문제로 남아있다.

파서는 완전히 다른 코드로 만들어 버린다. 이것은 **오류**다.

### Parenthesis

세미콜론 없이 괄호가 붙어 있으면 파서는 세미콜론을 넣지 않는다.

    log('testing!')
    (options.list || []).forEach(function(i) {})

파서는 다음과 같이 코드를 바꾼다.

    log('testing!')(options.list || []).forEach(function(i) {})

`log` 함수가 함수를 반환할 가능성은 거의 없다. 아마도 `undefined is not a function`이라는 `TypeError`가 발생할 거다.

### 결론

세미콜론은 반드시 사용해야 한다. 그리고 `{}`도 생략하지 않고 꼭 사용하는 것이 좋다. 한 줄밖에 안 되는 `if` / `else` 블럭에서도 꼭 사용해야 한다. 이 두 가지 규칙을 잘 지키면 JavaScript 파서가 잘못 해석하는 일을 미리 방지하고 코드도 튼튼해진다.
