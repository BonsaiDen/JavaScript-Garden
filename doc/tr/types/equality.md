## Eşitlik ve Karşılaştırmalar

JavaScript'de nesnelerin değerlerinin eşitliğini kontrol etmenin iki farklı yolu
vardır. 

### Eşittir operatörü

Eşittir operatörü iki adet eşittir işaretinden oluşur: `==`

JavaScript *weakly typed* bir dildir, bu nedenle, eşittir operatörü ile
değişkenleri karşılaştırırken **tip dönüşümü** yapar.

    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

Yukarıdaki tablo tip dönüşümünün sonuçlarını verir, ve `==` kullanımının kötü
bir uygulama olarak değerlendirilmesinin başlıca sebebidir. Bu karmaşık dönüşüm
kuralları tespit edilmesi zor hatalara neden olur.

Ayrıca tip dönüşümü işin içine girdiğinde performans üzerinde de olumsuz etkisi
olur; mesela, bir katarın bir sayı ile karşılaştırılabilmesi için önce bir
sayıya dönüştürülmesi gerekir.

### Kesin eşitlik operatörü

Kesin eşitlik operatörü **üç adet** eşittir işaretinden oluşur: `===`

Eşitlik operatörünün aksine, keşin eşitlik operatörü karşılaştırdığı değerler
arasında tip dönüşümü **yapmaz**.

    ""           ===   "0"           // false
    0            ===   ""            // false
    0            ===   "0"           // false
    false        ===   "false"       // false
    false        ===   "0"           // false
    false        ===   undefined     // false
    false        ===   null          // false
    null         ===   undefined     // false
    " \t\r\n"    ===   0             // false

Yukarıdaki sonuçlar hem daha anlaşılırdır, hem de progamdaki hataların erkenden
ortaya çıkmasını sağlar. Bu programı bir miktar sağlamlaştırır ve ayrıca
karşılaştırılan değerlerin farklı tiplerden olması durumunda performansı da
artırır.

### Nesneleri karşılaştırmak

Hem `==` hem de `===` operatörlerinin **eşitlik** operatörü olarak
adlandırılmasına rağmen, değerlerden en azından birinin bir `Object` olması
durumunda farklı davranış gösterirler.

    {} === {};                   // false
    new String('foo') === 'foo'; // false
    new Number(10) === 10;       // false
    var foo = {};
    foo === foo;                 // true

Bu durumda her iki operatör de eşitlik **değil** **aynılık** karşılaştırması
yapar; yani, terimlerin aynı nesnenin **örnekleri** olup olmadığını kontrol
ederler, tıpkı Python dilindeki `is` ve C dilindeki gösterici karşılaştırması
gibi.

### Sonuç

Sadece **kesin eşitlik** operatörünün kullanılması şiddetle tavsiye edilir. 
Tip dönüşümü yapılmasının gerekli olduğu durumlarda, bu [açıkça](#types.casting)
yapılmalıdır ve dilin karmaşık dönüşüm kurallarına bırakılmamalıdır.

