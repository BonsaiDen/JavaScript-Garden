## Otomatik Noktalı Virgül İlavesi

JavaScript sentaksı C'ye benzese de, noktalı virgül kullanılması
zorunlu **değildir**.

Fakat JavaScript noktalı virgül kullanmayan bir dil değildir, hatta
programı anlayabilmek için noktalı virgüllere ihtiyaç duyar. Bu yüzden
JavaScript gramer çözümleyicisi eksik bir noktalı virgül yüzünden bir
hata ile karşılaştığında **otomatik olarak** eksik noktalı virgülleri
ekler.

    var foo = function() {
    } // hata, noktalı virgül gerekiyor
    test()

Eklemeden sonra çözümleme tekrarlanır.

    var foo = function() {
    }; // hata ortadan kalktı, çözümleme devam edebilir
    test()

Noktalı virgüllerin bu şekilde otomatik olarak eklenmesi JavaScript'in
**en büyük** tasarım hatalarından biri olarak kabul edilir, çünkü programın
davranışını değiştirmesi *mümkündür*.

### Ekleme nasıl olur

Aşağıdaki örnekte hiç noktalı virgül yok, bu yüzden nereye noktalı virgül
eklenmesi gerektiğini gramer çözümleyicinin karar vermesi gerekiyor.

    (function(window, undefined) {
        function test(options) {
            log('testing!')

            (options.list || []).forEach(function(i) {

            })

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            )

            return
            {
                foo: function() {}
            }
        }
        window.test = test

    })(window)

    (function(window) {
        window.someLibrary = {}

    })(window)

Çözümleyicinin "tahmin" oyununun sonucu aşağıdadır.

    (function(window, undefined) {
        function test(options) {

            // Eklenmedi, satırlar birleştirildi
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- eklendi

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- eklendi

            return; // <- eklendi, return ifadesi bozuldu
            { // bir blok olarak değerlendirildi

                // bir yer etiketi ve bir ifade
                foo: function() {} 
            }; // <- eklendi
        }
        window.test = test; // <- eklendi

    // Burada da satırlar birleştirildi
    })(window)(function(window) {
        window.someLibrary = {}; // <- eklendi

    })(window); //<- eklendi

> **Not:** JavaScript çözümleyicisi `return` ifadesinden hemen sonra satır sonu
> gelmesi durumunu "doğru" değerlendirmez. Bu durum otomatik noktalı virgül
> eklenmesinin istenmeyen bir yan etkisidir.

Çözümleyici yukarıdaki program parçasının davranışını büyük ölçüde değiştirdi,
belirli durumlarda da grameri değerlendirirken **yanlış** kararlar verdi.

### Satır başındaki parantezler

Bir satırın parantez ile başlaması durumunda, çözümleyici noktalı virgül
**eklemez**.

    log('testing!')
    (options.list || []).forEach(function(i) {})

Yukarıdaki program parçası aşağıdaki tek satıra dönüşür.

    log('testing!')(options.list || []).forEach(function(i) {})

**Büyük** ihtimalle yukarıdaki `log` bir fonksiyon **döndürmüyordur**;
bu nedenle, yukarıdaki satır `undefined is not a function` hata mesajı ile bir
`TypeError` oluştumasına neden olacaktır.

### Sonuç

Noktalı virgüllerin **hiç bir zaman** ihmal edilmemesi tavsiye edilir, ayrıca
ayraçların kendilerinden önceki ifade ile aynı satırda tutulması ve tek satırlık
`if` ve `else` ifadelerinde bile ayraçların ihmal edilmemesi önerilir. Her iki
önlem de hem programın tutarlılığını artıracak, hem de JavaScript
çözümleyicisinin programın davranışını değiştirmesini engelleyecektir.

