## Prototip

JavaScript klasik bir kalıtım modeli değil *prototip* modeli kullanır.

Çoğu zaman bu modelin JavaScript'in zayıf yönlerinden biri olduğu söylense de,
aslında prototip model klasik modelden daha güçlüdür. Mesela prototip model
temel alınarak klasik kalıtım modeli oluşturulabilir, fakat bunun tersini yapmak
çok daha zordur.

Prototip kalıtım modeli kullanan tek popüler dil JavaScript olduğu için iki
model arasındaki farklılıklara alışmak biraz zaman alır.

İlk büyük farklılık JavaScript'te kalıtımın *prototip zincirleri* ile
yapılmasıdır.

> **Not:** `Bar.prototype = Foo.prototype` gibi basit bir atama yapmak her iki
> nesnenin de **aynı** prototipe sahip olmasına neden olacaktır. Bu yüzden bir
> nesnenin prototipinde yapılacak değişiklikler diğer nesnenin prototipini de
> etkileyecektir, ki çoğu zaman istenen etki bu değildir.
                
    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Bar nesnesinin prototipi olarak yeni bir Foo nesnesini ata
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // Nesne oluşturucusunun Bar olmasını sağla
    Bar.prototype.constructor = Bar;

    var test = new Bar() // yeni bir Bar oluştur

    // Sonuçta ortaya çıkan prototip zinciri
    test [bir Bar sınıfı nesnesi]
        Bar.prototype [bir Foo sınıfı nesnesi] 
            { foo: 'Hello World' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* vs. */ }

Yukarıda, `test` nesnesi hem `Bar.prototype` hem de `Foo.prototype` 'dan
türeyecektir; bu nedenle `Foo` 'da tanımlanmış olan `method` fonksiyonuna
da erişebilir. Ayrıca, prototipi olan **tek** `Foo` nesnesinin `value`
özelliğine de erişebilir. Dikkat edilmesi gereken bir nokta, `new Bar()`
ifadesinin yeni bir `Foo` nesnesi **yaratmayıp**, prototipine atanmış olan
nesneyi kullanmasıdır; bu nedenle, tüm `Bar` nesneleri **aynı** `value`
özelliğine sahip olacaktır.

> **Not:** `Bar.prototype = Foo` gibi bir ifade **kullanmayın**, çünkü `Foo`
> 'nun prototipine değil fonksiyon nesnesine işaret edecektir. Yani
> prototip zinciri `Foo.prototype` değil `Function.prototype` üzerinden
> gidecektir; ve bu yüzden, `method` prototip zincirinde bulunmayacaktır.

### Özelliklere bulmak

Bir nesnenin özelliklerine erişildiğinde, JavaScript, istenen isimdeki özelliği
bulana kadar prototip zincirinde **yukarı** doğru dolaşır.

Zincirin en üstüne ulaştığında (yani `Object.protype`) ve hala istenen özelliği
bulamamışsa sonuç olarak [`undefined`](#core.undefined) verecektir.

### prototype özelliği

`prototype` özelliği dil tarafından prototip zincirleri oluşturmak için
kullanılsa da, bu özelliğe **herhangi** bir değer atamak mümkündür. Fakat
prototip olarak atanan ilkel nesne türleri göz ardı edilecektir.

    function Foo() {}
    Foo.prototype = 1; // hiç bir etkisi olmaz

Bir önceki örnekte gösterildiği gibi, prototip olarak nesneler atanabilir, bu da
prototip zincirlerinin dinamik olarak oluşturulabilmesini sağlar.

### Performans

Prototip zincirinin yukarısındaki özellikleri aramanın performansı kritik olan 
programlarda olumsuz etkileri olabilir. Ek olarak, mevcut olmayan özelliklere
erişmeye çalışmak da tüm prototip zincirinin baştan sona taranmasına neden
olacaktır.

Ayrıca, bir nesnenin özellikleri üzerinde [iterasyon](#object.forinloop)
yapıldığında da prototip zinciri üzerindeki **tüm** özelliklere bakılacaktır.

### Temel prototiplerin genişletilmesi

Sıklıkla yapılan bir hata `Object.protype` 'ı veya diğer baz prototipleri 
genişletmektir.

Bu tekniğe [*monkey patching*][1] denir ve *kapsüllemeyi* bozar. Bu teknik
[Prototype][2] gibi bazı popüler sistemlerde kullanılsa bile, temel nesne
türlerine *standart olmayan* özellikler eklenmesinin geçerli iyi bir nedeni
yoktur.

Temel prototipleri genişletmenin **tek bir** geçerli nedeni vardır, o da daha
yeni JavaScript motorlarında bulunan özelliklerin eski motorlara getirilmesidir;
mesela [`Array.forEach`][3].

### Sonuç

Prototip kalıtım modeli kullanan karmaşık programlar yazmadan önce bu modelin
tamamen anlaşılması **şarttır**. Ayrıca, prototip zincirinin uzunluğuna dikkat
edilmeli ve çok uzaması durumunda performans sorunları yaşamamak için parçalara
bölünmelidir. Bundan başka, temel prototipler yeni JavaScript motorları ile
uyumluluk sağlamak dışında bir nedenle **asla** genişletilmemelidir.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

