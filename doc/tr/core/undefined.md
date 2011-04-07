## `undefined` ve `null`

JavaScript'te `tanımsız` anlamına gelen iki değer vardır, ve bunlardan
`undefined` daha kullanışlıdır.

### `undefined` değeri

`undefined` bir değişken türüdür ve tek bir değere sahip olabilir: `undefined`.

JavaScript'te ayrıca değeri `undefined` olan bir de genel kapsam değişkeni
tanımlanmıştır ve bu değişkenin adı da `undefined`'dır. Fakat bu değişken
bir sabit yada dilin anahtar kelimelerinden biri **değildir**. Yani bu
değişkenin *değeri* kolayca değiştirilebilir.

> **ES5 Notu:** ECMAScript 5'e göre mutlak modda `undefined`'ın değeri
> *değiştirilemez*, fakat mesela adı `undefined` olan bir fonksiyon ile 
> `undefined` değişkeni gizlenebilir.

`undefined` değerinin verildiği durumlara bazı örnekler:

 - Genel kapsamlı `undefined` değişkeninin (değiştirilmedi ise) değeri
 - `return` ifadesi içermeyen fonksiyonların verdiği değer
 - Bir değer döndürmeyen `return` ifadeleri
 - Mevcut olmayan nesne özellikleri
 - Değer atanmamış fonksiyon parametreleri
 - Değeri `undefined` olarak atanmış değişkenler

### `undefined` değerinin değiştirilmesi durumu

Genel kapsamdaki `undefined` değişkeni asıl `undefined` *değerinin* kopyasını
tuttuğu için, bu değeri değiştirmek `undefined` *değişken türünün* değerini
**değiştirmez**.

Fakat, bir şeyi `undefined` ile karşılaştırmak için önce `undefined`'ın değerini
geri almak gerekir.

Programı `undefined` değişkeninin değiştirilmesi olasılığına karşı korumak için
uygulanan yaygın bir yöntem [isimsiz bir fonksiyona](#function.scopes) 
kullanılmayan bir parametre eklemektir.

    var undefined = 123;
    (function(something, foo, undefined) {
        // lokal kapsamda undefined değişkeni
        // yine undefined değerine sahip

    })('Hello World', 42);

Benzer bir yöntem yine isimsiz fonksiyonun içinde değer atanmamış bir değişken
deklare etmektir.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

Buradaki tek fark program sıkıştırılırsa ortaya çıkacaktır, eğer fonksiyonun 
başka bir yerinde `var` ifadesi kullanılmıyorsa fazladan 4 bayt kullanılmış
olacaktır.

### `null` kullanımı

JavaScript dilinde `undefined` geleneksel *null* yerine kullanılmaktadır, asıl
`null` (hem `null` değişmezi hem de değişken türü) ise kabaca başka bir
veri türüdür.

`null` JavaScript içindeki kapalı olarak kullanılır (mesela prototip zincirinin
sonuna gelindiği `Foo.prototype = null` ile belirtilir), fakat hemen her durumda
bunun yerine `undefined` kullanılabilir.

