## Tip Dönüşümleri

JavaScript *weakly typed* bir dildir, bu yüzden **mümkün olan yerlerde**
*tip dönüşümü* uygular.

    // Bunlar true verir
    new Number(10) == 10; // Number.toString() tekrar sayıya
                          // dönüştürülür

    10 == '10';           // Katarlar sayıya dönüştürülür
    10 == '+10 ';         // Bir başka katar çılgınlığı
    10 == '010';          // Ve bir tane daha 
    isNaN(null) == false; // null 0'a dönüştürülür
                          // tabii 0 NaN değildir
    
    // Bunlar false verir
    10 == 010;
    10 == '-10';

> **ES5 Notu:** `0` ile başlayan sayı sabitleri oktal (sekizlik) sayı sisteminde
> değerlendirilir. Oktal sayı desteği ECMAScript 5 mutlak modda
> **kaldırılmıştır**.

Yukarıdakilerden kaçınmak için, [kesin eşitlik operatörünün](#types.equality)
kullanılması **şiddetle** tavsiye edilir. Böylece yaygın hataların çoğundan
kaçınılabilir, yine de JavaScript'in *weak typing* sisteminden kaynaklanan başka
sorunlar da vadır.

### Temel tiplerin nesne oluşturucuları

`Number` ve `String` gibi temel tiplerin nesne oluşturucuları `new` anahtar
kelimesi ile kullanılıp kullanılmamalarına göre farklı davranış gösterir.

    new Number(10) === 10;     // False, Object ve Number
    Number(10) === 10;         // True, Number ve Number
    new Number(10) + 0 === 10; // True, tip dönüşümü nedeniyle

`Number` gibi bir temel tipin nesne oluşturucusunu kullanmak yeni bir `Number`
nesnesi yaratacaktır, fakat `new` kelimesi kullanılmazsa `Number` fonksiyonu
bir dönüştürücü olarak davranacaktır.

Ayrıca, sabitler ve nesne olmayan değerler kullanılması durumunda başka tür
dönüşümler de söz konusu olacaktır.

En iyi seçenek üç olası tipten birine **açıkça** dönüşüm yapılmasıdır.

### Karakter katarına dönüştürmek

    '' + 10 === '10'; // true

Bir değerin başına boş bir katar eklenerek kolayca katara dönüştürülebilir.

### Sayıya dönüştürmek

    +'10' === 10; // true

**Tek terimli** toplama operatörü kullanılarak bir değer sayıya dönüştürülebilir.

### Mantıksal değişken tipine dönüştürmek

**Değil** operatörü iki kez üst üste kullanılarak bir değer mantıksal değişken
tipine dönüştürülebilir.

    !!'foo';   // true
    !!'';      // false
    !!'0';     // true
    !!'1';     // true
    !!'-1'     // true
    !!{};      // true
    !!true;    // true


