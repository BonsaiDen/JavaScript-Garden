## `typeof`

`typeof`도 [`instanceof`](#types.instanceof)와 함께 JavaScript에서 치명적으로 잘못 설계된 부분이다. 이건 정말 아무짝에 쓸모없다.

`instanceof`는 그래도 쓸 데가 좀 있었는데 `typeof`는 딱 한 군데에만 써먹을 수 있다. 객체의 타입을 검사할 일이 없다.

> **Note:** `typeof`는 함수처럼 `typeof(obj)`로 사용할 수 있다. 하지만, 이것은 함수를 호출하는 것이 아니라 단순히 `()`안의 값이 반환되고 `typeof`가 적용되는 것이다. `typeof`라는 함수는 **없다**.

### JavaScript 타입 표

    Value               Class      Type
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object (function in Nitro/V8)
    new RegExp("meow")  RegExp     object (function in Nitro/V8)
    {}                  Object     object
    new Object()        Object     object

이 표에서 *Type*은 `typeof`가 반환하는 값이다. 표에서 본 것처럼 이 값은 계속 쓸모없다.

Class는 객체 내부에 있는 `[[Class]]` 프로퍼티의 값이다.

> **표준**에는 `[[Class]]`의 값은 `Arguments`, `Array`, `Boolean`, `Date`, `Error`, `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`중 하나라고 나와있다.

`[[Class]]`의 값을 가져다 쓰려면 `Object.prototype`의 `toString` 메소드를 사용해야 한다.

### 객체의 클래스

표준에 의하면 `[[Class]]` 값을 얻는 방법은 `Object.prototype.toString` 하나뿐이다.

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }
    
    is('String', 'test'); // true
    is('String', new String('test')); // true

`Object.prototype.toString`은 [this](#function.this)의 `[[Class]]` 값을 가져오는 것이니까 this를 obj로 바꾸어 사용한다.

> **ES5 Note:** ECMAScript 5에서 `Object.prototype.toString`의 컨텍스트가 `null`과 `undefined`일 때 `Object`가 아니라 각각 `Null`과 `Undefined`를 반환하도록 수정됐다.

### 변수가 Undefined인지 확인하기

    typeof foo !== 'undefined'

이것은 `foo`가 정의됐는지 아닌지를 확인해준다. 정의되지 않은 변수에 접근하면 `ReferenceError` 나는데 이것을 방지할 수 있다. `typeof`가 유용한 건 이때뿐이다.

### 결론

객체의 타입을 검사하려면 `Object.prototype.toString`를 사용해야 한다. 다른 방법은 신뢰할 수 없다. 위 표에서 보여준 것처럼 typeof가 반환하는 값은 표준에 나와 있지 않기 때문에 구현마다 다르다.

변수가 정의됐는지 확인할 때는 빼고 **목숨을 걸고** `typeof`를 사용하지 못하게 해야 한다.
