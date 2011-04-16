## Dizi İterasyonu ve Özellikleri

Diziler JavaScript nesneleri olmalarına rağmen, iterasyon yapmak için
[`for in`](#object.forinloop) döngüsü kullanmak için bir neden yoktur.
Aslında dizilerde  `for in` kullanılmasına **karşı** bazı iyi nedenler
vardır.

> **Not:** JavaScript dizileri *associative* **değildir**. JavaScript ile sadece
> [nesneler](#object.general) ile anahtar-değer ilişkilendirmesi mümkündür.
> Ve *associative* diziler eleman sıralamasını **korurlar** ama, nesneler
> **korumazlar**.

`for in` döngüsü prototip zincirindeki tüm özellikleri dolaştığı için ve bunu
engellemenin tek yolu [`hasOwnProperty`](#object.hasownproperty) kullanmak
olduğu için `for in` döngüsü sıradan bir `for` döngüsünden **yirmi kata kadar**
daha yavaştır.

### İterasyon

Dizilerde iterasyon yaparken en iyi performansı elde etmenin en iyi yolu klasik
`for` döngüsünü kullanmaktır.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

Yukarıdaki örnekte bir optimizasyon var, o da dizinin uzunluğun iterasyonun
başında `l = list.length` ile saklanmış olması.

`length` özelliği dizinin kendisinde tariflenmiş olmasına rağmen, her adımda
bu özelliği okumanın yine de bir maliyeti vardır. Modern JavaScript motorları
bu tür durumlar için **muhtemelen** optimizasyon yapıyor olsa bile, programın 
her zaman modern bir motorda çalışacağından emin olmak mümkün değildir.

Aslında, yukarıdaki örnekteki optimizasyonu uygulamamak döngünün 
**iki kat daha** yavaş çalışmasına neden olabilir.

### `length` özelliği

`length` özelliğine değer atanarak diziyi **kısaltmak** için kullanılabilir.

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]

    foo.length = 6;
    foo; // [1, 2, 3]

Daha küçük bir uzunluk atanması diziyi kısaltır, fakat daha büyük bir uzunluk
atanmasının dizi üzerinde bir etkisi yoktur.

### Sonuç

En iyi performans için her zaman sıradan `for` döngüsü kullanılmalı ve 
`length` özelliği saklanmalıdır. Dizilerde `for in` döngüsünün kullanılmış
olması hatalara meyilli kötü yazılmış bir programa işaret eder.

