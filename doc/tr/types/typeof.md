## `typeof` operatörü

The `typeof` operatörü ([`instanceof`](#types.instanceof) ile birlikte)
herhalde JavaScript'in en büyük tasarım hatalarından biridir, çünkü neredeyse
**tamamen arızalıdır**.

`instanceof` operatörünün sınırlı kullanımı olsa da, `typeof` operatörünün
gerçekte tek bir pratik kullanımı vardır, ve bunun da bir nesnenin tipini
kontrol etmekle ilgili **yoktur**.

> **Not:** `typeof` fonksiyon sentaksı (mesela ``typeof(obj)`), ile de 
> çağrılabilse de bu gerçek bir fonksiyon çağrısı değildir. İki parantezin
> içindeki ifadenin döndürdüğü değer typeof operatöre verilir. `typeof` diye
> bir fonksiyon yoktur.

### JavaScript tip tablosu

    Değer               Sınıf      Tip
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

Yukarıdaki tabloda *Tip* sütunu `typeof` operatörünün verdiği sonucu gösterir.
Açıkça görülebileceği gibi, bu sonuç tutarlı olmaktan çok uzaktır.

*Sınıf* sütunu bir nesnenin dahili `[[Class]]` özelliğini gösterir.

> **Spesifikasyondan:** `[[Class]]` özelliğinin değeri şu katarlardan biri
> olabilir: `Arguments`, `Array`, `Boolean`, `Date`, `Error`, 
> `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

`[[Class]]` özelliğinin değerini almak için `Object.prototype` 'ın `toString`
metodu kullanılmalıdır.

### Bir nesnenin sınıfı

Spesifikasyona göre `[[Class]]` değerine erişmenin tek yolu
`Object.prototype.toString` kullanmaktır.

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }
    
    is('String', 'test'); // true
    is('String', new String('test')); // true

Yukarıdaki örnekte, `Object.prototype.toString` çağrıldığında
[this](#function.this) 'in değeri `[[Class]]` değeri aranan nesne olarak
atanmış olmaktadır.

> **ES5 Notu:** Kolaylık sağlamak için `Object.prototype.toString` 'in `null` 
> ve `undefined` için verdiği değerler `Object` 'ten `Null` ve `Undefined` 'a
> **değiştirildi**.

### Bir değişkenin tanımlandığını kontrol etmek

    typeof foo !== 'undefined'

Yukarıdaki satır `foo` değişkeninin tanımlanıp tanımlanmadığını belirler;
tanımlanmamış bir değişkene erişmek bir `ReferenceError` hatası oluştur.
`typeof` operatörünün tek kullanışlı olduğu şey işte budur.

### Sonuç

Bir nesnenin tipini kontrol etmek için `Object.prototype.toString` 'in
kullanılması şiddetle tavsiye edilir; çünkü bunu yapmanın tek güvenilir yoludur.
Yukarıdaki tip tablosunda gösterildiği gibi, `typeof` operatörünün bazı
sonuçları spesifikasdyonda tanımlanmamıştır; bu nedenle, çeşitli platformlarda
farklılık gösterebilirler.

Bir değişkenin tanımlandığını kontrol etmek dışında, `typeof` operatörün 
kullanımından **her ne pahasına olursa olsun** kaçınılmalıdır.

