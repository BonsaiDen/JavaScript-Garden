## `delete` Operatörü

Kısacası, genel kapsamda tanımlanmış değişkenleri, fonksiyonları ve `DontDelete`
niteliğine sahip bazı başka şeyleri silmek *imkansızdır*.

### Genel kapsam ve fonksiyon kapsamı

Bir değişken veya fonksiyon genel kapsamda veya
[fonksiyon kapsamında](#function.scopes) tanımlandığında aktivasyon nesnesinin
veya global nesnenin bir özelliği olacaktır. Bu tür özelliklerin bir takım
nitelikleri vardır ve bunlardan biri `DontDelete` niteliğidir. Genel kapsamda ve
fonksiyon kapsamında tanımlanan değişkenler ve fonksiyonlar yaratıldıklarında
her zaman `DontDelete` niteliğine sahip olacaktır, ve bu nedenle silinemezler.
 
    // genel kapsam değişkeni:
    var a = 1; // DontDelete niteliğine sahip
    delete a; // false
    a; // 1

    // normal bir fonksiyon:
    function f() {} // DontDelete niteliğine sahip
    delete f; // false
    typeof f; // "function"

    // başka bir değişkene atamak işe yaramaz:
    f = 1;
    delete f; // false
    f; // 1

### Açıkça tanımlanan özellikler

Açıkça tanımlanan özellikleri silmek mümkündür.

    // tanımlanan özellik:
    var obj = {x: 1};
    obj.y = 2;
    delete obj.x; // true
    delete obj.y; // true
    obj.x; // undefined
    obj.y; // undefined

Yukarıdaki örnekte `obj.x` ve `obj.y` silinebilir çünkü `DontDelete` niteliğine
sahip değillerdir. Aynı nedenle aşağıdakini yapmak da mümkündür:

    // IE hariç çalışır:
    var GLOBAL_OBJECT = this;
    GLOBAL_OBJECT.a = 1;
    a === GLOBAL_OBJECT.a; // true - genel değişken
    delete GLOBAL_OBJECT.a; // true
    GLOBAL_OBJECT.a; // undefined

Burada `a`'yı silmek için bir hile kullanıyoruz. [`this`](#function.this)
burada genel nesneye işaret ediyor ve `a` değişkenini onun özelliği olarak
atıyoruz, ve böylece onu silebiliyoruz.

IE (en azından 6-8) bazı hatalar içerdiğinden yukarıdaki örnek çalışmayacaktır.

### Fonksiyon argümanları ve önceden tanımlı özellikler

Fonksiyonlara verilen argümanlar, [`arguments` nesnesi](#function.arguments)
ve önceden tanımlı özellikler de `DontDelete` niteliğine sahiptir.

    // fonksiyon argümanları ve özellikler:
    (function (x) {
      delete arguments; // false
      typeof arguments; // "object"
      
      delete x; // false
      x; // 1
      
      function f(){}
      delete f.length; // false
      typeof f.length; // "number"
    })(1);

### *Host* nesneler

`Host` nesneler üzerinde kullanıldığında `delete` operatörünün davranışı belirsiz
olabilir. Standarda göre `host` nesneler istedikleri davranışı uygulayabilirler.

### Sonuç

`delete` operatörünün davranışı genellikle belirsizdir ve güvenle kullanılabileceği
tek yer sıradanan nesneler üzerinde açıkça tanımlanan özelliklerdir.
