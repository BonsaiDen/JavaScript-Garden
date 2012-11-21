## 객체와 프로퍼티

JavaScript에서 [`null`](#core.undefined)과 [`undefined`](#core.undefined)를 제외한 모든 것들은 객체처럼 동작한다.

    false.toString() // 'false'
    [1, 2, 3].toString(); // '1,2,3'

    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

숫자 리터럴은 객체처럼 사용되지 못할꺼라는 오해가 있는데 이것은 단지 JavaScript 파서의 문제일 뿐이다. JavaScript 파서는 숫자에 *Dot Notation*이 들어가면 오류라고 생각한다.

    2.toString(); // SyntaxError가 난다.

하지만, 숫자를 객체처럼 사용할수 있는 꼼수가 몇 가지 있다.

    2..toString(); // 두 번째 점은 잘 된다.
    2 .toString(); // 왼쪽 공백이 있으면 잘 된다.
    (2).toString(); // 2를 먼저 해석한다.

### Object 타입

JavaScript 객체는 name/value 쌍으로 된 프로퍼티로 구성되기 때문에 [*Hashmap*][1]처럼 사용될 수도 있다. 

객체 리터럴인 Object Notation으로 객체를 만들면 `Object.prototype`을 상속받고 [프로퍼티를 하나도 가지지 않은](#object.hasownproperty) 객체가 만들어진다.

    var foo = {}; // 깨끗한 새 객체를 만든다.

    // 값이 12인 'test' 프로퍼티가 있는 객체를 만든다.
    var bar = {test: 12}; 

### 프로퍼티 접근

객체의 프로퍼티는 객체이름 다음에 점을 찍어(Dot Notation) 접근하거나 각괄호를 이용해(Square Bracket Notation) 접근할 수 있다.

    var foo = {name: 'Kitten'}
    foo.name; // kitten
    foo['name']; // kitten

    var get = 'name';
    foo[get]; // kitten

    foo.1234; // SyntaxError
    foo['1234']; // works

두 방식 모두 거의 동일하게 동작한다. 다만 차이가 있다면 각괄호 방식은 프로퍼티 이름을 동적으로 할당해서 값에 접근 할수 있지만 점을 이용한 방식은 구문 오류를 발생시킨다.

### 프로퍼티 삭제

객체의 프로퍼티를 삭제하려면 `delete`를 사용해야만 한다. 프로퍼티에 `undefined`나 `null`을 할당하는 것은 프로퍼티를 삭제하는 것이 아니라 프로퍼티에 할당된 *value*만 지우고 *key*는 그대로 두는 것이다.

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


위 코드의 출력 결과는 `baz`만 제거했기 때문에 `bar undefined`와 `foo null`은 출력되고 `baz`와 관련된 것은 출력되지 않는다.

### Notation of Keys

    var test = {
        'case': 'I am a keyword, so I must be notated as a string',
        delete: 'I am a keyword, so me too' // SyntaxError가 난다.
    };

프로퍼티는 따옴표 없는 문자열(plain characters)과 따옴표로 감싼 문자열(strings)을 모두 Key 값으로 사용할 수 있다. 하지만 위와 같은 코드는 JavaScript 파서의 잘못된 설계 때문에 구버전(ECMAScript 5 이전 버전)에서는 `SystaxError`가 발생할 것이다.

위 코드에서 문제가 되는 `delete` 키워드를 따옴표로 감싸면 구버전의 JavaScript 엔진에서도 제대로 해석될 것이다.

[1]: http://en.wikipedia.org/wiki/Hashmap
