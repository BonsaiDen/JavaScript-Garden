## `arguments` Nesnesi

JavaScript'te her fonksiyon kapsamında `arguments` adlı özel bir nesne
tanımlıdır. Bu nesne fonksiyon çağrılırken verilen argümanların listesini
içerir.

> **Not:** Eğer `arguments` adında bir değişken fonksiyon kapsamında bir `var`
> ifadesi ile veya tanımlı parametre olarak zaten mevcutsa, `arguments` nesnesi
> oluşturulmaz.

`arguments` nesnesi bir `Array` *değildir*. Bir dizinin özelliklerinin bir
kısmına sahip olsa da (`length` özelliği) `Array.prototype` sınıfından
türetilmemiştir, aslında bir `Object` bile değildir.

Bu nedenle, `arguments` nesnesi üzerinde `push`, `pop` ve `slice` gibi standart
dizi metotlarını kullanmak mümkün **değildir**. Klasik `for` döngüsü `arguments`
nesnesi ile kullanılabilir, ancak standart dizi metotlarını kullanmak için
gerçek bir diziye dönüştürmek gerekir.

### Diziye dönüştürmek

Aşağıdaki program parçası `arguments` nesnesinin tüm elemanlarına sahip yeni bir
dizi verecektir.

    Array.prototype.slice.call(arguments);

Bu dönüşüm **yavaştır**, ve performansın belirleyici olduğu durumlarda
kullanılması **tavsiye olunmaz**.

### Argümanların geçirilmesi

Aşağıdaki örnekte, argümanların bir fonksiyondan diğerine geçirilmesi
için önerilen yöntem gösterilmiştir.

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // do stuff here
    }

Bir başka püf noktası da `call` ve `apply` 'ı birlikte kullanarak hızlı, 
ilişkisiz fonksiyonlar yaratmaktır.

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // "method" 'un ilişkisiz bir versiyonunu yarat
    // Aldığı parametreler: this, arg1, arg2...argN
    Foo.method = function() {

        // Sonuç: Foo.prototype.method.call(this, arg1, arg2... argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };


### Tanımlı parametreler ve argüman indisleri

`arguments` nesnesi her iki özelliği ve fonksiyonun tanımlı parametreleri için
*getter* ve *setter* fonksiyonlar oluşturur.

Sonuç olarak, bir tanımlı parametrenin değerini değiştirmek `arguments`
nesnesindeki karşılık gelen özelliğin değerini de değiştirecektir.

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2                                                           

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);

### Performans mitleri ve gerçekler

`arguments` nesnesi fonksiyon kapsamında bir değişken veya tanımlı parametre
olarak kullanılmış olması durumları dışında her zaman oluşturulur. Kullanılıp
kullanılmaması fark etmez.

*getter* ve *setter* fonksiyonlar **her zaman** oluşturulur; dolayısıyla
`arguments` nesnesini kullanmanın performans üzerinde olumsuz bir etkisi yoktur,
özellikle de sadece `arguments` nesnesinin özelliklerine erişmekten ibaret
olmayan *gerçek* programlarda.

> **ES5 Notu:** Söz konusu *getter* ve *setter* fonksiyonlar mutlak modda
> oluşturulmaz.


Fakat, modern JavaScript motorlarının performansını ciddi bir şekilde etkileyen
bir durum vardır. Bu durum `arguments.callee` nesnesinin kullanılmasıdır.

    function foo() {
        arguments.callee; // içinde olduğumuz fonksiyon nesnesi
        arguments.callee.caller; // ve çağıran fonksiyon nesnesi
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // Normalde inline edilirdi...
        }
    }

Yukarıdaki program parçasında, `foo` fonksiyonuna [inlining][1] uygulanması
mümkün değildir çünkü fonksiyonun hem kendisini ve kendisini çağıran fonksiyonu
bilmesi gerekmektedir. Bu yüzden hem inlining yapılamadığı için bir performans
artışı sağlanamamış hem de kapsüllenme bozulmuş olmaktadır, çünkü fonksiyon
artık kendisini çağıran kapsama bağımlı hale gelmiş olabilir.

`arguments.callee` ve özelliklerinin **asla** kullanılmaması 
**şiddetle tavsiye olunur**.

> **ES5 Notu:** Mutlak modda `arguments.callee` kullanımı kaldırılmıştır ve
> kullanılması durumunda bir `TypeError` hatası oluşacaktır.

[1]: http://en.wikipedia.org/wiki/Inlining


