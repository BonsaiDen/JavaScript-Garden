### `setTimeout` ve `setInterval`

JavaScript asenkron olduğu için `setTimeout` ve `setInterval` kullanarak bir
fonksiyonun ileri bir zamanda çalışmasını sağlamak mümkündür.

> **Not:** Zamanlama fonksiyonları ECMAScript Standartına dahil **değildir**,
> [DOM][1] ile birlikte tanımlanırlar.

    function foo() {}
    var id = setTimeout(foo, 1000); // 0'dan büyük bir sayı verir

Yukarıdaki örnekte `setTimeout` fonksiyonu çağrıldığında, oluşturulan
zamanlayıcı tanımlayan bir ID sayısı verir ve `foo` fonksiyonu **yaklaşık**
bin milisaniye sonra çalıştırılmak üzere programlanır. `foo` fonksiyonu
tam olarak **bir** kez çağrılacaktır.

Kullanılan JavaScript motorunun zamanlayıcı hassasiyetine bağlı olarak, ve
ayrıca JavaScript tek `thread` ile çalıştığı ve çalışan başka program
parçaları bu tek `thread` 'i bloke edeceği için, `setTimeout` ile belirlenen
erteleme süresinin tam olarak gerçekleşeceği **hiçbir şekilde** garanti
edilemez.

İlk argüman olarak verilen fonksiyon *global nesne* tarafından çağrılacaktır,
yani çağrılan fonksiyonun içinde [`this`](#function.this) bu nesneye işaret
edecektir.

    function Foo() {
        this.value = 42;
        this.method = function() {
            // this global nesneye işaret eder
            console.log(this.value); // undefined yazar
        };
        setTimeout(this.method, 500);
    }
    new Foo();


> **Not:** `setTimeout` fonksiyonunun ilk parametresi bir **fonksiyon nesnesi**
> olduğu için, sık yapılan bir hata `setTimeout(foo(), 1000)` şeklindeki
> kullanımdır, fakat bu şekilde, `foo` fonksiyonu **değil** `foo` fonksiyonunun
> **sonuç değeri** parametre olarak kullanacaktır. Bu kullanım genellikle bir
> hata mesajı üretmez, çünkü fonksiyon `undefined` değerini verdiğinde 
> `setTimeout` bir hata **oluşturmayacaktır**.

### `setInterval` ile fonksiyon çağrılarının yığılması

`setTimeout` verilen fonksiyonu bir kez çağırırken, `setInterval` (adından da
anlaşılacağı gibi) verilen fonksiyonu **her** `X` milisaniyede bir çağırır.
Fakat kullanılması önerilmez.

Mevcut program parçası çalışırken zamanlama bloke olduğu halde, `setInterval`
verilen fonksiyonu çağırmaya devam edecektir. Bu da, özellikle küçük aralıklarla
kullanıldığında, fonksiyon çağrılarının istiflenmesine neden olur.

    function foo(){
        // 1 saniye süren bir işlem
    }
    setInterval(foo, 100);

Yukarıdaki örnekte `foo` fonksiyonu bir kez çağrılıp bir saniye boyunca bloke
edecektir.

`foo` programı bloke etmişken, `setInterval` fonksiyon çağrılarını zamanlamaya
devam edecektir. `foo` tamamlandığında, çalıştırılmayı bekleyen **on** çağrı
daha olacaktır.

### Bloke eden programlarla başa çıkmak

En kolay ve kontrol edilebilir çözüm, `setTimeout` 'u fonksiyonun içinde
kullanmaktır.

    function foo(){
        // 1 saniye süren bir işlem
        setTimeout(foo, 100);
    }
    foo();

Bu örnekte hem `setTimeout` çağrısı fonksiyonun kendisi içinde kapsanmış olmakta,
hem de fonksiyon çağrılarının istiflenmesinin önüne geçilerek daha fazla kontrol
sağlanmaktadır. Artık  `foo` fonksiyonunun kendisi tekrar çalışmak isteyip
istemediğine karar verebilir.

### Zamanlayıcıları iptal etmek

Zamanlayıcıları iptal etmek için ilgili ID sayıları ile kullanılan zamanlayıcı
fonksiyonuna karşılık gelen `clearTimeout` ve `clearInterval` fonksiyonlarından
biri kullanılır.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### Tüm zamanlayıcıları iptal etmek

Tüm zamanlayıcıları iptal etmenin dahili bir yolu olmadığı için, bu amaca
ancak kaba kuvvetle ulaşılabilir.

    // "tüm" zamanlayıcıları iptal et
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

Bu rastgele seçilmiş sayıdan etkilenmeyen zamanlayıcılar kalabilir; bu yüzden
tüm zamanlayıcı ID'lerinin saklanarak, teker teker iptal edilmeleri tavsiye
edilir.

### `eval` fonksiyonun gizli kullanımı

`setTimeout` ve `setInterval` fonksiyonları ilk parametreleri olarak bir katar
da kabul eder. Bu özellik **asla** kullanılmamalıdır, çünkü bu durumda dahili
olarak `eval` kullanılır.

> **Not:** Zamanlama fonksiyonları ECMAScript Standartında bulunmadığı için,
> bir katar argümanı almaları durumundaki çalışma şekilleri JavaScript motorları
> arasında farklılık gösterebilir. Gerçekten de, Microsoft'un JScript motoru
> `eval` yerine `Function` oluşturucusunu kullanır.

    function foo() {
        // setTimeOut ile bu fonksiyon çağrılacaktır
    }

    function bar() {
        function foo() {
            // bu fonksiyon çağrılmayacaktır
        }
        setTimeout('foo()', 1000);
    }
    bar();

Bu durumda `eval` [direkt olarak](#core.eval) çağrılmadığı için, `setTimeout`
fonksiyonuna verilen katar *genel kapsamda* çalıştırılacaktır; bu nedenle,
`bar` fonksiyonu kapsamındaki lokal `foo` değişkenini kullanmayacaktır.

Zamanlama fonksiyonlarına verilen fonksiyona argüman sağlamak için de bir katar
kullanılması tavsiye **edilmez**.

    function foo(a, b, c) {}
    
    // ASLA bu şekilde kullanılmamalı
    setTimeout('foo(1, 2, 3)', 1000)

    // Bunu yerine isimsiz bir fonksiyon kullanın
    setTimeout(function() {
        foo(a, b, c);
    }, 1000)

> **Not:** `setTimeout(foo, 1000, a, b, c)` sentaksının kullanılması da mümkün
> olmasına karşın tavsiye edilmez, çünkü bu kullanım [metodlarla](#function.this)
> birlikte fark edilmesi zor hatalara neden olabilir.

### Sonuç

`setTimeout` veya `setInterval` fonksiyonlarına **asla** bir katar parametre
verilmemelidir. Bu kullanım **çok** kötü bir programa işaret eder. Çağrılan
fonksiyona argümanlar verilmesinin gerektiği durumlarda gerçek çağrıyı içinde
bulunduran bir *isimsiz fonksiyon* kullanılmalıdır.

Ayrıca, `setInterval` fonksiyonu çalışan JavaScript programı tarafından bloke
olmadığı için tercih edilmemelidir.

[1]: http://en.wikipedia.org/wiki/Document_Object_Model 

