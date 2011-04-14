## Closure ve Referanslar

JavaScript'in en güçlü özelliklerinden biri de `closure` 'lara sahip olmasıdır.
Bunun anlamı her hangi bir kapsamın **her zaman** kendisini içeren kapsama
erişebilmesidir. JavaScript'te tek kapsam [fonksiyon kapsamı](#function.scopes)
olduğu için temelde tüm fonksiyonlar `closure` 'durlar.

### Private değişkenler

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

Burada, `Counter` **iki** `closure` verir: `increment` fonksiyonu ve `get`
fonksiyonu. Bu iki fonksiyon da `Counter` fonksiyonun kapsamına ait bir
**referans** 'a sahiptir, ve bu nedenle söz konusu kapsamda tanımlanmış olan
`count` değişkenine erişebilirler.

### Private değişkenler nasıl işler

JavaScript'te kapsam referanslarına erişmek yada atama yapmak mümkün olmadığı
için, dış kapsamdan `count` değişkenine ulaşmak **mümkün değildir**. Bu
değişkene ulaşmanın tek yolu yukarıdaki iki `closure` 'dur.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

Bu program parçası `Counter` fonksiyonun kapsamındaki `count` değişkeninin
değerini **değiştirmez**, çünkü `foo.hack` **bu kapsamda** tanımlanmamıştır.
Bunun yerine *global* kapsamda yeni bir değişen oluşturur (yada mevcut bir
değişkeni değiştirir).

### Döngü içinde closure

Sık yapılan bir hata, döngü içinde closure kullanıp döngünün indeks değişkeninin
değerinin kopyalanacağını varsaymaktır.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

Yukarıdaki örnek çıktı olarak `0` - `9` arası sayıları vermek yerine, `10`
sayısını on kez yazacaktır.

İçteki *isimsiz* fonksiyon `i` değişkeninin değerine değil referansına sahiptir
ve `console.log` çağrıldığında, `for` döngüsü çoktan tamamlanmış ve `i`
değişkeninin değeri `10` olmuştur.

İstenen davranışı elde etmek için `i` değişkeninin değerinin **kopyalanması**
gerekir.

### Referans probleminin çözümü

Döngünün indeks değişkeninin değerini kopyalamanın en iyi yolu bir 
[isimsiz fonksiyon](#function.scopes) kullanmaktır.

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

Dıştaki isimsiz fonksiyon her adımda çağrılacak ve `e` parametresi olarak
`i` 'nin **değerinin** bir kopyası verilecektir.

`setTimeOut` fonksiyonuna verilen isimsiz fonksiyon artık `e` 'ye ait bir
referansa sahip olacaktır, ve referansın değeri döngü tarafından
**değiştirilmeyecektir**.

Bu davranışı başka bir yolla da elde etmek mümkündür; isimsiz fonksiyondan başka
bir fonksiyon döndürmek. Bu durumda yukarıdaki ile aynı davranış elde
edilecektir.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }

