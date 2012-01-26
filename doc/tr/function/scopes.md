## Kapsamlar ve İsim Uzayları

JavaScript'te birbiri ile eşleşen ayraçlar kullanılmasına karşın blok
kapsamı **bulunmaz**; bu nedenle, dilde sadece *fonksiyon kapsamı* mevcuttur.

    function test() { // fonksiyon kapsamı
        for(var i = 0; i < 10; i++) { // kapsam değil
            // sayaç
        }
        console.log(i); // 10
    }

> **Not:** Bir değer atama, `return` ifadesi veya fonksiyon argümanı olarak
> kullanıldığında `{...}` notasyonu bir nesne değişmezi olarak **değil**
> blok ifade olarak değerlendirilir. Bu özellik 
> [otomatik noktalı virgül ilavesi](#core.semicolon) ile birleştiğinde fark
> edilmesi zor hatalara neden olabilir.

JavaScript'te isim uzayları kavramı da bulunmaz, tanımlanan herşey
*genel olarak paylaşılmış* tek bir isim uzayının içindedir.

Bir değişkene erişildiğinde, JavaScript değişkenin tanımını bulana dek yukarıya
doğru tüm kapsamlara bakar. Genel kapsama ulaşıldığı halde hala değişkenin
tanımı bulanamamışsa bir `ReferenceError` hatası oluşur.

### Genel değişkenler felaketi

    // A programı
    foo = '42';

    // B programı
    var foo = '42'

Yukarıdaki iki program birbirinden **farklıdır**. A programında *genel* kapsamda
bir `foo` değişkeni tanımlanmıştır, B programındaki `foo` değişkeni ise *mevcut*
kapsamda tanımlanmıştır.

Bu iki tanımlamanın birbirinden **farklı** *etkileri* olacaktır, `var` anahtar
kelimesini kullanmamanın önemli sonuçları olabilir.

    // genel kapsam
    var foo = 42;
    function test() {
        // lokal kapsam
        foo = 21;
    }
    test();
    foo; // 21

`test` fonksiyonun içinde `var` anahtar kelimesinin atlanması genel kapsamdaki
`foo` değişkeninin değerini değiştirecektir. İlk bakışta bu önemsiz gibi görünse
de, binlerce satırlık bir programda `var` kullanılmaması korkunç ve takibi güç
hatalara neden olacaktır.
    
    // genel kapsam
    var items = [/* bir dizi */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }

    function subLoop() {
        // subLoop fonksiyonun kapsamı
        for(i = 0; i < 10; i++) { // var kullanılmamış
            // do amazing stuff!
        }
    }
    
Dışarıdaki döngüden `subLoop` fonksiyonu bir kez çağrıldıktan sonra çıkılacaktır,
çünkü `subLoop` `i` değişkeninin dış kapsamdaki değerini değiştirir. İkinci
`for` döngüsünde de `var` kullanılması bu hatayı kolayca engelleyecektir. 
*Bilinçli olarak* dış kapsama erişilmek istenmiyorsa `var` ifadesi **asla**
atlanmamalıdır.

### Lokal değişkenler

JavaScript'te lokal değişkenler sadece [fonksiyon](#function.general)
parametreleri ve `var` ifadesi ile tanımlanan değişkenlerdir.

    // genel kapsam
    var foo = 1;
    var bar = 2;
    var i = 2;

    function test(i) {
        // test fonksiyonunun lokal kapsamı
        i = 5;

        var foo = 3;
        bar = 4;
    }
    test(10);

`test` fonksiyonun içinde `foo` ve `i` lokal değişkenlerdir, `bar` değişkenine
değer atanması ise genel kapsamdaki aynı isimdeki değişkenin değerini
değiştirecektir.

### Yukarı taşıma

JavaScript'te tanımlamalar **yukarı taşınır**. Yani hem `var` ifadesi hem de
`function` bildirimleri içindeki bulundukları kapsamın en üstüne taşınırlar.

    bar();
    var bar = function() {};
    var someValue = 42;

    test();
    function test(data) {
        if (false) {
            goo = 1;

        } else {
            var goo = 2;
        }
        for(var i = 0; i < 100; i++) {
            var e = data[i];
        }
    }

Program çalışmadan önce yukarıdaki kod dönüştürülür. JavaScript, `var`
ifadelerini ve `function` bildirimlerini içinde bulundukları kapsamın en üstüne
taşır.

    // var ifadeleri buraya taşınır
    var bar, someValue; // varsayılan değerleri 'undefined' olur

    // function bildirimi de yukarı taşınır
    function test(data) {
        var goo, i, e; // blok kapsamı olmadığı için buraya taşınır
        if (false) {
            goo = 1;

        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // bir TypeError hatası oluşur çünkü bar hala 'undefined'
    someValue = 42; // değer atamaları etkilenmez
    bar = function() {};

    test();

Blok kapsamının bulunmaması nedeniyle hem `var` ifadeleri döngülerin dışına
taşınır hem de bazı `if` ifadeleri anlaşılmaz sonuçlar verebilir.

Orijinal programda `if` ifadesi `goo` isimli *genel değişkeni* değiştiriyor gibi
görünüyordu, fakat yukarı taşımadan sonra anlaşıldığı gini aslında 
*lokal değişkeni* değiştiriyor.

*Yukarı taşıma* dikkate alınmadığında aşağıdaki programın bir `ReferenceError`
oluşturacağı sanılabilir.

    // SomeImportantThing değişkenine değer atanmış mı, kontrol et
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

Fakat `var` değişkeni *genel kapsamın* en üstüne taşınacağı için bu program
çalışacaktır.

    var SomeImportantThing;

    // SomeImportantThing arada bir yerde atanmış olabilir

    // Değer atandığından emin ol
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### İsim çözümleme

JavaScript'te *genel kapsam* da dahil tüm kapsamlarda [`this`](#function.this)
adında bir özel değişken tanımlanmıştır, bu değişken *geçerli nesneyi* gösterir.

Fonksiyon kapsamlarında aynı zamanda [`arguments`](#function.arguments) adında
bir değişken tanımlanmıştır ve fonksiyonun argümanlarını içerir.

Örnek olarak bir fonksiyon kapsamında `foo` değişkenine eriğildiğinde JavaScript
isim çözümlemeyi aşağıdaki sıra ile yapacaktır:

 1. Geçerli kapsamda bir `var foo` ifadesi mevcutsa bu kullanılır.
 2. Fonksiyonun parametrelerinden birinin adı `foo` ise bu kullanılır.
 3. Fonksiyonun kendisinin adı `foo` ise bu kullanılır.
 4. Bir dıştaki kapsama geçilir ve yeniden **1** adımına dönülür.

> **Not:** `arguments` adında bir parametre bulunması durumunda varsayılan
> `arguments` nesnesi **oluşturulmayacaktır**.

### İsim uzayları

Tek bir genel isim uzayının bulunmasının yol açtığı yaygın sonuç isim
çakışmasıdır. JavaScript'te bu sorun *isimsiz fonksiyonlar* ile kolayca
önlenebilir.

    (function() {
        // bir "isim uzayı"
        
        window.foo = function() {
            // korunmasız bir closure
        };

    })(); // fonksiyonu hemen çalıştır

İsimsiz fonksiyonlar [ifade](#function.general) olarak değerlendirilir; 
bu nedenle çağrılabilmeleri için önce değerlendirilmeleri gerekir.

    ( // parantezin içindeki fonksiyonu değerlendir
    function() {}
    ) // ve fonksiyon nesnesini döndür
    () // değerlendirmenin sonucu fonksiyon nesnesini çağır

Bir fonksiyon ifadesini değerlendirip çağırmanın başka yolları da vardır ve
yukarıdaki ile aynı sonucu verirler.
   
    // İki farklı yöntem
    +function(){}();
    (function(){}());

### Sonuç

Programı kendi isim uzayı ile kapsamak için her zaman *isimsiz fonksiyonların*
kullanılması tavsiye edilir. Böylece hem isim çakışmalarından korunulmuş olunur,
hem de programlar daha modüler halde yazılmış olur.

Ayrıca, genel değişkenlerin kullanılması **kötü bir uygulamadır**. Genel
değişkenlerin *herhangi bir şekilde* kullanılmış olması programın kötü yazılmış
olduğuna, hatalara eğilimli olduğuna ve sürdürülmesinin zor olacağına işaret
eder.

