## `this` Nasıl Çalışır

JavaScript'te `this` özel kelimesinin anlamı diğer programlama dillerinden
farklıdır. `this` kelimesinin birbirinden farklı anlamlar yüklendiği tam
**beş** durum vardır.

### Genel kapsam

    this;

`this` kelimesi genel kapsamda kullanıldığında *global* nesneye işaret eder.


### Bir fonksiyon çağırma

    foo();

Burada `this` yine *global* nesneye işaret eder.

> **ES5 Notu:** Mutlak modda bu davranış **kaldırılmıştır**. Bu durumda `this`
> kelimesinin değeri `undefined` olacaktır.
Here `this` will again refer to the *global* object.

### Bir metod çağırma

    test.foo(); 

Bu örnekte `this` kelimesi `test` 'e işaret edecektir.

### Bir nesne oluşturucu çağırma

    new foo(); 

Bir fonksiyon başında `new` anahtar kelimesi ile birlikte çağrılırsa bir
[nesne oluşturucu](#function.constructors) olarak davranır. Bu fonksiyonun
içinde `this` kelimesi *yeni oluşturulan* `Object` 'e işaret eder.

### `this` kelimesinin atanması

    function foo(a, b, c) {}
                          
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // dizi aşağıdaki gibi açılır
    foo.call(bar, 1, 2, 3); // sonuç: a = 1, b = 2, c = 3

`Function.prototype` 'ın `call` veya `apply` metodları kullanıldığında, çağrılan
fonksiyonun içinde `this` 'in değeri ilk argümanın değeri olarak **atanır**.

Sonuç olarak, yukarıdaki örnekte *metod çağırma* durumu geçerli **olmayacak**, 
bunun yerine `foo` fonksiyonu içinde `this` 'in değeri `bar` olacaktır.

> **Not:** `this` kelimesi bir `Object` değişmezi içinde nesnenin kendisine
> işaret etmek için **kullanılamaz**. Yani `var obj = {me: this}` gibi bir
> ifadede `me`, `obj` nesnesine işaret **etmeyecektir**, `this` sadece yukarıda
> açıklanan beş durumdan biri ile kullanılabilir.

### Sık düşülen yanılgılar

Yukarıdaki durumların çoğu mantıklı görünse bile, ilk durum dilin tasarım
hatalarından biri olarak değerlendirilmelidir çünkü **hiçbir** pratik
kullanılımı yoktur.


    Foo.method = function() {
        function test() {
            // this genel nesneye işaret eder
        }
        test();
    }

Bir başka yanılgı `test` fonksiyonunun içinde `this` 'in `Foo` 'ya işaret
edeceğinin sanılmasıdır, ama bu **doğru değildir**.

`test` fonksiyonu içinden `Foo` 'ya erişmenin yolu `method` içinde bir lokal
değişken oluşturmaktır.

    Foo.method = function() {
        var that = this;
        function test() {
            // Burada this yerine that kullanın
        }
        test();
    }

`that` kelimesinin dilde özel bir anlamı yoktur, ama sıklıkla dış kapsamdaki
`this` 'e işaret etmek için kullanılır. Bu yöntem [closure](#function.closures)
kavramı ile birlikte kullanıldığında `this` değerini program içinde taşımaya da
yarar.

### Metodları değişkenlere atamak

JavaScript'te mevcut **olmayan** bir başka özellik de fonksiyon isimlendirmedir,
başka bir deyişle bir metodu bir değişkene **atamak**.

    var test = someObject.methodTest;
    test();

İlk durum nedeniyle `test` artık sıradan bir fonksiyon olarak davranacaktır; bu
nedenle `test` fonksiyonu içinde `this` artık `someObject` 'e işaret
etmeyecektir.

`this` kelimesinin geç bağlanması ilk bakışta yanlış görünse de, aslında
[prototipsel kalıtımı](#object.prototype) mümkün kılan şey budur.

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

Yukarıda `Bar` sınıfına ait bir nesnenin `method` 'u çağrıldığında `this` bu
nesneye işaret edecektir.


