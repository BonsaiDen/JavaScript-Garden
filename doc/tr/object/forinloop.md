## `for in` Döngüsü

Tıpkı `in` operatörü gibi `for in` döngüsü de bir nesnenin özellikleri üzerinde
iterasyon yaparken prototip zincirini dolaşır.

> **Not:** `for in` döngüsü iterasyon yaparken `enumerable` niteliği `false`
> olan özelliklere uğramaz; mesela, bir dizinin `length` özelliğini atlar.
    
    // Object.prototype'a bar özelliğini ekle
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // hem bar hem de moo yazar
    }

`for in` döngüsünün davranışını değiştirmek mümkün olmadığı için, istenmeyen
özelliklerin döngünün içinde filtrelenmesi gerekir, bu da `Object.prototype`
nesnesinin [`hasOwnProperty`](#object.hasownproperty) metodu ile yapılır.

> **Not:** `for in` döngüsü tüm prototip zincirini dolaştığı için bir nesneye
> eklenen her yeni kalıtım katmanı döngüyü biraz daha yavaşlatacaktır.

### `hasOwnProperty` kullarak filtrelemek

    // yukarıdaki örnekteki foo nesnesi
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

Doğru kullanım bu yeni versiyonda gösterildiği gibidir. `hasOwnProperty` kontrol
edildiği için **sadece** `moo` yazacaktır. `hasOwnProperty` kullanılmaz ise ve
`Object.protype` 'ın baz özellikleri değiştirilmişse, program bazı hatalara
yatkın olabilir.

Bunu yapan ve yaygın olarak kullanılan bir JavaScript sistemi [Prototype][1]
'dır. Bu sistemde `hasOwnProperty` kullanmayan `for in` döngüleri kesinlikle
hatalı sonuç verecektir.

### Sonuç

`hasOwnProperty` **her zaman** kontrol edilmelidir. Programın içinde çalıştığı
ortam için, nesnelerin baz özelliklerinin değiştirilip değiştirilmediğine dair
hiçbir kabul yapılmamalıdır.

[1]: http://www.prototypejs.org/

