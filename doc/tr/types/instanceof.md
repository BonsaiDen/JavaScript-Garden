## `instanceof` Operatörü

`instanceof` operatörü verilen iki terimin nesne oluşturucularını karşılaştırır.
Kullanışlı olduğu tek durum özel nesnelerin karşılaştırılmasıdır. Temel nesneler
üzerinde kullanıldığında neredeyse [typeof operatörü](#types.typeof) kadar
yararsızdır.

### Özel nesneleri karşılaştırmak

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // Bu satır sadece Bar.prototype'a Foo fonksiyon nesnesinin atar
    // Bir Foo sınıfı nesnesine değil
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### Temel nesnelerle `instanceof` kullanımı

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

Dikkat edilmesi gereken ilginç bir nokta, `instanceof` operatörünün farklı
JavaScript kaynaklarından gelen nesneler üzerinde çalışmamasıdır (mesela bir
internet tarayıcısının farklı dökümanları), çünkü bu durumda nesne
oluşturucuları aynı olmayacaktır.

### Sonuç

`instanceof` operatörü **sadece** aynı JavaScript kaynağından gelen özel 
nesneler ile kullanılmalıdır. Tıpkı [`typeof`](#types.typeof) operatöründe
olduğu gibi, bunun dışındaki tüm kullanımlarından **kaçınılmalıdır**.

