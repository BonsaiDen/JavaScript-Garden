## `hasOwnProperty`

Bir özelliğin nesnenin [prototip zinciri](#object.prototype) üzerinde bir yerde
**değil**, *kendisi* üzerinde tanımlandığını belirlemek için, `Object.prototype`
kalıtımı ile tüm nesnelerin sahip olduğu `hasOwnProperty` metodunun kullanılması
gerekir.

> **Not:** Bir özelliğin `undefined` olduğunu kontrol etmek yeterli **değildir**.
> Bir özelliğin değeri `undefined` olarak atandığı halde özelliğin kendisi
> pekala mevcut olabilir.

`hasOwnProperty` JavaScript'te nesne özellikleri üzerinde çalışıp prototip
zincirinin tümünü **dolaşmayan** tek şeydir.

    // Object.prototype'a bar özelliğini ekle
    Object.prototype.bar = 1; 
    var foo = {goo: undefined};
    
    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

Sadece `hasOwnProperty` beklenen doğru sonucu verecektir, nesne özellikleri
üzerinde iterasyon yaparken bu çok önemlidir. Bir nesnenin *kendisi* üzerinde
değil de protip zinciri üzerinde bir yerde tanımlanmış olan özelliklerini
çıkarmanın başka hiçbir yolu **yoktur**.

### `hasOwnProperty` özelliği

JavaScript `hasOwnProperty` adının bir özellik olarak kullanılmasını engellemez;
bu nedenle bir nesnenin bu isimde bir özelliğe sahip olması ihtimali varsa,
doğru sonuç alabilmek için `hasOwnProperty `*haricen* kullanılmalıdır.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // her zaman false verir

    // hasOwnProperty başka bir nesne üzerinde
    // kullanıldığında 'this' foo olur
    ({}).hasOwnProperty.call(foo, 'bar'); // true

### Sonuç

Bir nesnenin bir özelliği sahip olup olmadığını kontrol etmek için
kullanılabilecek **tek** yöntem `hasOwnProperty` 'dir. Aynı zamanda, nesne
[prototiplerinin](#object.prototype) genişletilmesinden kaynaklanabilecek
hataların önüne geçmek için, **tüm** [`for in` döngüleri](#object.forinloop) ile
`hasOwnProperty` kullanılması tavsiye olunur.

