## Nesne Kullanımı ve Özellikleri

JavaScript'te iki istisna dışında her şey bir nesne olarak davranır;
bu istisnalar da [`null`](#core.undefined) ve [`undefined`](#core.undefined) 
'dır.

    false.toString() // 'false'
    [1, 2, 3].toString(); // '1,2,3'
    
    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

Sık düşülen bir yanılgı sayı sabitlerinin nesne olarak kullanılamayacağıdır. Bu
yanılgının sebebi de JavaScript çözümleyicisinin *nokta notasyonu* ile girilen
sayıları bir reel sayı olarak algılama hatasıdır.

    2.toString(); // SyntaxError hatası verir

Bu hatayı aşıp sayı sabitlerinin de nesne olarak davranmasını sağlamak için 
uygulanabilecek bazı çözümler vardır. 

    2..toString(); // ikinci nokta doğru şekilde algılanır
    2 .toString(); // noktanın solundki boşluğa dikkat edin
    (2).toString(); // ilk önce 2 değerlendirilir

### Bir veri türü olarak nesneler

JavaScript nesneleri aynı zamanda bir [*Hashmap*][1] olarak da kullanılabilir,
nesneler temelde isimli özellikler ve bunlara karşılık gelen değerlerden
ibarettir.

Nesne sabiti (`{}` notasyonu) ile düz bir nesne yaratmak mümkündür. Bu yeni
nesne [kalıtım](#object.prototype) ile `Object.prototype` 'dan türüyecektir ve
hiçbir [baz özelliğe](#object.hasownproperty) sahip olmayacaktır.

    var foo = {}; // yeni bir boş nesne

    // adı 'test' ve değeri 12 olan bir özelliği sahip yeni bir nesne
    var bar = {test: 12}; 

### Özelliklere erişmek

Bir nesnenin özelliklerine iki yolla erişilebilir, ya nokta notasyonu ile veya
köşeli parantez notasyonu ile.
    
    var foo = {name: 'Kitten'}
    foo.name; // kitten
    foo['name']; // kitten
    
    var get = 'name';
    foo[get]; // kitten
    
    foo.1234; // SyntaxError
    foo['1234']; // çalışır

Her iki notasyon da aynı şekilde çalışır, tek fark köşeli parantez notasyonunun
özelliklerin dinamik olarak oluşturulmasına ve normalde bir yazım hatasına yol
açabilecek özellik isimlerinin kullanılmasına izin vermesidir.

### Özellikleri silmek

Bir nesnenin özelliklerinden birini silmenin tek yolu `delete` operatörünü 
kullanmaktır; özelliğe `undefined` veya `null` değerlerini atamak sadece
özelliğin *değerini* kaldırır, *anahtarı* değil.

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

Yukarıdaki örnek sonuç olarak hem `bar undefined` hem de `foo null` yazacaktır.
Sadece `baz` özelliği kaldırılmış olacak ve çıktıda görünmeyecektir.

### Anahtar notasyonu

    var test = {
        'case': 'anahtar kelime olduğu için katar olarak girildi',
        delete: 'yine bir anahtar kelime' // SyntaxError hatası
    };

Nesne özellikleri düz karakterler olarak da katar notasyonu ile de
tanımlanabilir. Fakat JavaScript çözümleyicisinin bir başka tasarım hatası
yüzünden, yukarıdaki örnek ECMAScript 5 öncesinde bir `SyntaxError` hatası
verecektir.

Bu hata `delete` 'in bir *anahtar kelime* olmasından kaynaklanır, bu nedenle
eski JavaScript motorlarının bu örneği doğru algılaması için *karakter katarı*
notasyonu ile girilmelidir.

[1]: http://en.wikipedia.org/wiki/Hashmap

