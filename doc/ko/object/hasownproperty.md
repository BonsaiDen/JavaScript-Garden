## `hasOwnProperty`

어떤 프로퍼티가 해당 객체 자신의 것인지 아니면 [프로토타입 체인](#object.prototype)에 있는 것인지 확인하려면 `Object.prototype`을 상속받은 `hasOwnProperty` 메소드를 사용해야 한다. 

> **Note:** 이 메소드로는 프로퍼티의 값이 `undefined`인지 확인할 수 없다. 프로퍼티가 존재해도 그 값은 `undefined`일 수 있다. 

프로토타입 체인을 Traverse 하지 않으려면 `hasOwnProperty`를 사용하는 방법밖에 없다.

    // Object.prototype을 더럽힌다.
    Object.prototype.bar = 1; 
    var foo = {goo: undefined};
    
    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

프로퍼티의 존재 여부를 확인하는 방법은 `hasOwnProperty` 메소드 뿐이다. 이 메소드는 프로토타입 체인의 프로퍼티말고 해당 객체의 프로퍼티만 Iterate할 때 유용하다. 객체 자체의 프로퍼티와 프로토타입 체인 어딘가에 있는 프로퍼티를 골라 주는 다른 방법은 없다.

### `hasOwnProperty`도 프로퍼티

JavaScript는 `hasOwnProperty` 프로퍼티도 보호해주지 않는다. 그래서 객체에 `hasOwnProperty` 프로퍼티가 있으면 다른 객체의 `hasOwnProperty` 메소드를 빌려 사용해야 한다.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // 항상 false를 반환한다.

    // 다른 객체의 hasOwnProperty를 사용하여 foo 객체의 프로퍼티 유무를 확인한다.
    ({}).hasOwnProperty.call(foo, 'bar'); // true

    // Object에 원래 있는 hasOwnProperty를 사용해도 된다.
    Object.prototype.hasOwnProperty.call(obj, 'bar'); // true


### 결론

객체에 프로퍼티가 있는지 `hasOwnProperty`로만 확인할 수 있다. [`for in` loop](#object.forinloop)은 항상 `hasOwnProperty`와 함께 사용해야 한다. 네이티브 객체의 [프로토타입](#object.prototype)을 확장하는 사태가 일어나도 안전하게 지켜줄 것이다.
