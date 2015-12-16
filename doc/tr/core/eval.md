## Neden `eval` Kullanılmamalı

`eval` fonksiyonu bir JavaScript kodunu lokal kapsamda yürütür.

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

Fakat `eval` sadece **direkt olarak** çağrıldığında *ve* çağrılan fonksiyonun
adı `eval` ise lokal kapsamda çalışır.

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 1

`eval` fonksiyonu **asla** kullanılmamalıdır. Kullanıldığı durumların %99.9'unda
`eval` **kullanılmadan** da istenen sonuç elde edilebilir.
    
### Gizli `eval`

[Zamanlama fonksiyonları](#other.timeouts) `setTimeout` ve `setInterval`'ın her
ikisinin de ilk argümanları bir karakter katarıdır. Bu durumda `eval` dolaylı
olarak çağrıldığı için bu argüman **her zaman** genel kapsamda yürütülecektir.

### Güvenlik sorunları

`eval` kendisine verilen **her** kodu işlettiği için aynı zamanda bir güvenlik
sorunudur ve **asla** kaynağı bilinmeyen yada güvenilir olmayan karakter
katarları ile kullanılmamalıdır.

### Sonuç

`eval` asla kullanılmamalıdır, kullanan programlar ise doğruluk, performans ve
güvenlik açılarından sorgulanmalıdır. `eval` kullanımı gerekli görülmüşse, 
programın tasarımı sorgulanmalı ve **kullanılmamalı**, bunun yerine `eval`
gerektirmeyen *daha iyi bir tasarım* kullanılmalıdır.

