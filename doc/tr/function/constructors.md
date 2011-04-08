## Nesne Oluşturucular

JavaScript'te oluşturucular diğer dillerden farklıdır. Başında `new` bulunan
her fonksiyon çağrısı bir oluşturucudur.

Oluşturucunun (çağırılan fonksiyonun) içinde `this` 'in değeri yeni yaratılan
`Object` 'dir. Bu **yeni** nesnenin [`prototipi`](#object.prototype) oluşturucu
olarak çağrılan fonksiyon nesnesinin prototipidir.

Çağrılan fonksiyonda bir `return` ifadesi yoksa, `this` (yani yeni nesneyi)
döndürür.

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

Yukarıdaki program `Foo` oluşturucusunu çağırır ve yeni yaratılan nesnenin
`prototipini` `Foo.prototype` olarak belirler.

Oluşturucunun içinde bir `return` ifadesi bulunması durumunda,  **ve sadece**
bu değer bir `Object` ise oluşturucu fonksiyon verilen değeri döndürür.

    function Bar() {
        return 2;
    }
    new Bar(); // yeni bir Bar nesnesi

    function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // döndürülen nesne

`new` anahtar kelimesi ihmal edilirse, fonksiyon yeni bir nesne **döndürmez**.

    function Foo() {
        this.bla = 1; // global nesnenin özelliğini değiştirir
    }
    Foo(); // undefined

Yukarıdaki örnek bazı durumlarda doğru çalışıyor gibi görünebilir, ama
JavaeScript'te  [`this`](#function.this) 'in çalışma şeklinden dolayı `this`
'in değeri *global nesne* olacaktır.

### Nesne fabrikaları

`new` anahtar kelimesini ihmal edebilmek için oluşturucu fonksiyonun bir değer
döndürmesi gerekir.

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }
    Bar.prototype = {
        foo: function() {}
    };

    new Bar();
    Bar();

Yukarıda `Bar` fonksiyonunu çağıran her iki ifade de aynı şeyi döndürecektir:
`method` adında bir [Closure](#function.closures) özelliği olan yeni yaratılmış
bir nesne.

Başka bir nokta da `new Bar()` fonksiyonunun döndürülen nesnenin prototipini
**etkilememesidir**. Yeni nesnenin prototipi oluşturulacaktır ancak `Bar` bu
nesneyi döndürmez.

Yukarıdaki örnekte `new` anahtar kelimesini kullanmakla kullanamamak arasında
hiçbir bir fark yoktur.

### Fabrikalar ile yeni nesneler oluşturmak

`new` anahtar kelimesinin **kullanılmaması** tavsiye olunur, çünkü unutulması
durumu hatalara sebep olabilir.

Bunun yerine yeni bir nesne oluşturmak için bir fabrika kullanılmalıdır.

    function Foo() {
        var obj = {};
        obj.value = 'blub';

        var private = 2;
        obj.someMethod = function(value) {
            this.value = value;
        }

        obj.getPrivate = function() {
            return private;
        }
        return obj;
    }

Yukarıdaki örnek hem `new` anahtar kelimesinin unutulmasından etkilenmez hem de
[private değikenlerin](#function.closures) kullanılmasını kolaylaştırır, ama
bazı dezavantajları da vardır.

 1. Oluşturulan nesneler bir prototip üzerinde metotlarını **paylaşmadıkları**
    için daha fazla hafıza kullanılır.
 2. Başka bir sınıf türetmek için fabrikanın tüm metotları başka bir nesneden
    kopyalaması veya bu nesneyi yeni nesnenin prototipine yerleştirmesi gerekir.
 3. Sadece `new` anahtar kelimesinin ihmal edilmesinden kaynaklanacak sorunları
    gidermek için prototip zincirinden vazgeçmek dilin ruhuna aykırıdır.
    
### Sonuç

`new` anahtar kelimesini ihmal etmek hatalara neden olabilir, fakat bu
kesinlikle prototip zincirinden vazgeçmek için bir neden **olamaz**. Hangi
çözümün belirli bir programa uygun olduğu kararını verirken, en önemli nokta
nesne oluşturmak için belirli bir yöntemi seçip bu çözüme **bağlı kalmaktır**.

