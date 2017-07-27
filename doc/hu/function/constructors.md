## Konstruktorok

Csak úgy, mint minden más, a konstruktorok működése szintén különbözik 
a megszokottól. Itt minden függvényhívás amelyet a `new` kulcsszó előz meg, 
konstruktor hívásnak számít.

A `this` értéke a konstruktoron - hívott függvényen - belül az újonnan létrehozott objektumra
mutat. Az **új** objektum [prototípusa](#object.prototype) a konstruktor függvény `prototípusával` fog megegyezni.

Ha a konstruktor függvényben nincs `return` utasítás, akkor automatikusan a `this` értékével tér vissza - a létrehozott objektummal.

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();
	
A fenti kódban a `Foo` függvényt, mint konstruktort hívjuk meg, ami a test változóban
egy új objektumot fog eredményezni. Ennek az objektumnak a `prototípusa` a Foo prototípusa lesz.

Trükkös ugyan, de ha mégis van `return` utasítás az éppen konstruált függvényben, akkor
a függvény hívása az annak megfelelő értékkel fog visszatérni, de **csak** akkor, ha a 
visszatérített érték `Objektum` típusú.

    function Bar() {
        return 2;
    }
    new Bar(); // ez egy új üres objektum lesz: {}, a 2 helyett

    function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // ez a { foo: 1 } objektumot fogja eredményezni
	
Hogyha kihagyjuk a `new` kulcsszó használatát, a függvény **nem** egy új objektummal fog visszatérni.

    function Foo() {
        this.bla = 1; // ez a globális objektumon állít
    }
    Foo(); // undefined

A [`this`](#function.this) JavaScript beli működésének köszönhetően, még ha le is
fut az előbbi kód, akkor a `this` helyére a *globális objektumot* képzeljük.

### Gyárak (Factory-k)

Ahhoz, hogy teljesen el tudjuk hagyni a `new` kulcsszó használatát, a konstruktor
függvény explicit értékkel kell visszatérjen.

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }
    Bar.prototype = {
        foo: function() {}
    };

    new Bar();
    Bar();

Mindkét `Bar`-ra történő hívásmód ugyanazt fogja eredményezni. Kapunk általuk 
egy újonnan létrehozott objektumot, amelynek lesz egy `method` nevű mezője,
ami egyébiránt egy [Closure](#function.closures).

Azt is érdekes itt megjegyezni, hogy a `new Bar()` hívás **nem** befolyásolja a
visszatérített objektum prototípusát. Mivel a prototípus csak az újonnan 
létrehozott objektumon létezik, amit a `Bar` nem térít vissza (mivel egy explicit
értéket ad vissza).

A fenti példában nincs funkcionális különbség aközött hogy kiírjuk-e a `new`
varázsszót avagy nem.

### Új objektumok létrehozása gyárakon keresztül

Gyakran bevett módszer egy projetkben, hogy a `new` varázsszó használatát 
teljesen elhagyjuk, mert a kiírásának elfelejtése bugokhoz vezetne.

Ennek érdekében egy új objektum létrehozásához inkább egy gyárat kell 
implementálni, és annak a belsejében létrehozni az új objektumot. 


    function Foo() {
        var obj = {};
        obj.value = 'blub';

        var private = 2;
        obj.someMethod = function(value) {
            this.value = value;
        }

        obj.getPrivate = function() {
            return private;
        }
        return obj;
    }

A fenti kód ugyan ellenálló a hiányzó `new` kulcsszó hibáját illetően és 
megfelelően használ [privát változókat](#function.closures), érdemes 
megemlíteni a dolgok kontra részét is.

 1. Több memóriát használ, mivel az így létrehozott objektumok **nem**
	osztják meg a prototípusukat egymás között.
 2. A származtatás macerás, mivel a gyár kénytelen ilyenkor lemásolni
	az összes származtatandó metódust egy másik objektumról, vagy ezt az objektumot
	be kell állítsa a létrehozott új objektum prototípusának.
 3. Az a megközelítés miszerint egy kifelejtett `new` kulcsszó miatt eldobjuk
	az objektum teljes prototípusát, ellenkezik a nyelv szellemiségével.

### Összefoglaló

A `new` varázsszó kihagyása ugyan bugokhoz vezethet, de ez **nem** megfelelő indok
arra hogy ezért eldobjuk a prototípusok használatát. Végeredményben mindig
az fog dönteni a különböző stílusok megválasztása között, hogy mire van
szüksége éppen az aktuális programunknak. Egy dolog azért elengedhetetlenül
fontos, ez pedig hogy megválasszuk melyik stílust fogjuk használni objektumok
létrehozásra, és ezt **konzisztensen** használjuk a teljes megoldáson keresztül.
