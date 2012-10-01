## 객체와 프로퍼티

JavaScript에서 [`null`](#core.undefined)과 [`undefined`](#core.undefined)를 제외한 모든 것은 객체다.

    false.toString(); // 'false'
    [1, 2, 3].toString(); // '1,2,3'

    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

숫자 리터럴은 객체가 아니라는 오해가 있는데 단지 JavaScript 파서의 문제일 뿐이다. JavaScript 파서는 숫자에 *Dot Notation*이 들어가면 오류라고 생각한다.

    2.toString(); // SyntaxError가 난다.

하지만, 숫자를 객체로 인식하는 꼼수가 몇 가지 있다.

    2..toString(); // 두 번째 점은 잘 된다.
    2 .toString(); // 왼쪽 공백이 있으면 잘 된다.
    (2).toString(); // 2를 먼저 해석한다.

### Object 타입

JavaScript 객체는 name/value 쌍으로 된 프로퍼티로 구성되기 때문에 [*Hashmap*][1]으로도 사용할 수 있다. 

객체 리터럴인 Object Notation으로 객체를 만들면 `Object.prototype`을 상속받고 [프로퍼티를 하나도 가지지 않은](#object.hasownproperty) 객체가 만들어진다.

    var foo = {}; // 깨끗한 새 객체를 만든다.

    // 값이 12인 'test' 프로퍼티가 있는 객체를 만든다.
    var bar = {test: 12}; 

### 프로퍼티

객체의 프로퍼티는 Dot Notation이나 Square Bracket Notation으로 접근할 수 있다.

    var foo = {name: 'Kitten'}
    foo.name; // kitten
    foo['name']; // kitten

    var get = 'name';
    foo[get]; // kitten

    foo.1234; // SyntaxError
    foo['1234']; // works


'[]'은 프로퍼티를 동적으로 할당할 수 있고 변수 이름 규칙에도 구애받지 않는다. 그렇지만, 두 가지 방법은 근본적으로 서로 똑같다. 

### 프로퍼티 삭제

객체의 프로퍼티는 `delete`로만 삭제할 수 있다. 프로퍼티에 `undefined`나 `null`을 할당하는 것은 프로퍼티를 삭제하는 것이 아니라 프로퍼티에 할당된 *value*만 지우고 *key*는 그대로 두는 것이다.

    var obj = {
        bar: 1,
        foo: 2,
        baz: 3
    };
    obj.bar = undefined;
    obj.foo = null;
    delete obj.baz;

    for(var i in obj) {
        if (obj.hasOwnProperty(i)) {
            console.log(i, '' + obj[i]);
        }
    }


`baz`만 제거했기 때문에 `bar undefined`와 `foo null`은 출력되고 `baz`와 관련된 것은 출력되지 않는다.

### Notation of Keys

    var test = {
        'case': 'I am a keyword, so I must be notated as a string',
        delete: 'I am a keyword, so me too' // SyntaxError가 난다.
    };

프로퍼티의 key에 문자열이나 스트링을 사용할 수 있다. 이 부분도 JavaScript 파서의 설계 오류다. ECMAScript 5 이전에는 `SystaxError`가 났었다.

이 에러는 `delete`가 키워드이기 때문에 발생하는 것이다. key를 스트링 리터럴로 정의하면 JavaScript 엔진은 언제나 잘 해석한다.

[1]: http://en.wikipedia.org/wiki/Hashmap
