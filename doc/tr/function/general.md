## Fonksiyon Tanımlası ve Fonksiyon İfadesi

Fonksiyonlar JavaScript'te birinci sınıf nesnelerdir, yani sıradan bir değer
gibi kullanılabilirler. Bu özellik sıklıkla bir *isimsiz fonksiyonu* başka bir
fonksiyona - ki bu muhtemelen asenkron bir fonksiyondur - `callback` olarak
geçirmekte kullanılır.

### `function` tanımlaması

    function foo() {}

Yukarıdaki fonksiyon tanımlaması program çalışmadan önce 
[yukarı alınır](#function.scopes) ve böylece *tanımlandığı* kapsam içinde 
*her yerde* - hatta tanımlanmadan önce bile - kullanılabilir.

    foo(); // foo bu satır çalışmadan önce oluşturuldu
    function foo() {}

### `function` ifadesi

    var foo = function() {};

Bu örnekte *isimsiz fonksiyon* `foo` değişkenine atanır.

    foo; // 'undefined'
    foo(); // Bu satır bir TypeError hatasına neden olur
    var foo = function() {};

Yukarıdaki `var` anahtar kelimesi bir bildirim olduğu için `foo` değişkeni
program çalışmadan önce yukarı alınır, program çalıştığında `foo` tanımlanmştır.

Fakat değer ataması program çalışırken gerçekleşeceği için, ilgili satır
çalıştığında, `foo` değişkeninin değeri varsayılan olarak
[undefined](#core.undefined) olacaktır.

### İsimli fonksiyon ifadesi

Bir başka özel durum isimli fonksiyon ifadesidir.

    var foo = function bar() {
        bar(); // Çalışır
    }
    bar(); // ReferenceError hatası verir

Burada `bar` fonksiyonuna dış kapsamdan ulaşılamaz, çünkü sadece `foo`
değişkenine atanmıştır; fakat iç kapsamda `bar` fonksiyonuna erişilebilir.
Bunun nedeni JavaScript'te [isim çözümlemenin](#function.scopes) çalışma
şeklidir, fonksiyonun adına fonksiyonun içinden *her zaman* erişilebilir.

