## `hasOwnProperty`

어떤 객체의 프로퍼티가 자기 자신의 프로퍼티인지 아니면 [프로토타입 체인](#object.prototype)에 있는 것인지 확인하려면 `hasOwnProperty` 메소드를 사용한다. 그리고 이 메소드는 `Object.prototype`으로 부터 상속받아 모든 객체가 가지고 있다.

> **Note:** hasOwnProperty 메소드로는 어떤 프로퍼티가 존재하는지 확인하는 용도로는 사용할수 있지만, 그 값이 `undefined`일 수 있기 때문에 어떤 프로퍼티의 값이 `undefined`인지 확인하는 용도로 사용하긴 어렵다.

`hasOwnProperty`메소드는 프로토타입 체인을 탐색하지 않고, 프로퍼티를 다룰수있는 유일한 방법이다.

    // Object.prototype을 오염시킨다.
    Object.prototype.bar = 1; 
    var foo = {goo: undefined};
    
    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

`hasOwnProperty` 메소드는 어떤 프로퍼티가 자기 자신의 프로퍼티인지 아닌지 정확하게 알려주기 때문에 객체의 프로퍼티를 순회할때 꼭 필요하다. 그리고 프로토타입 체인 어딘가에 정의된 프로퍼티만을 제외하는 방법은 없다.  

### `hasOwnProperty` 메소드도 프로퍼티다

JavaScript는 `hasOwnProperty`라는 이름으로 프로퍼티를 덮어 쓸수도 있다. 그래서 객체 안에 같은 이름으로 정의된 `hasOwnProperty`가 있을 경우, 본래 `hasOwnProperty`의 값을 정확하게 얻고 싶다면 다른 객체의 `hasOwnProperty` 메소드를 빌려써야 한다.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // 항상 false를 반환한다.

    // 다른 객체의 hasOwnProperty를 사용하여 foo 객체의 프로퍼티 유무를 확인한다.
    ({}).hasOwnProperty.call(foo, 'bar'); // true

    // Object에 있는 hasOwnProperty를 사용해도 된다.
    Object.prototype.hasOwnProperty.call(obj, 'bar'); // true


### 결론

어떤 객체에 원하는 프로퍼티가 있는지 확인하는 가장 확실한 방법은 `hasOwnProperty`를 사용하는 것이다. [`for in` loop](#object.forinloop)에서 네이티브 객체에서 확장된 프로퍼티를 제외하고 순회하려면 `hasOwnProperty`와 함께 사용하길 권한다. 
