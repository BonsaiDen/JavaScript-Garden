## Konstruktorok

Csak úgy mint minden más, a konstruktorok működése szintén különbözik JavaScriptben
a megszokottól. Itt minden függvényhívás amelyet a `new` kulcsszó előz meg, konstruktor
hívásnak számít.

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
	
A fenti kódban a `Foo` függvényt mint konstruktort hívjuk meg, ami a test változóban
egy új objektumot fog eredményezni. Ennek az objektumnak a `prototípusa` a Foo prototípusa lesz.

Trükkös ugyan, de ha mégis van `return` utasítás az éppen konstruált függvényben, akkor
a függvény hívása az annak megfelelő értékkel fog visszatérni, de **csak** akkor, ha a 
visszatérített érték egy `Object` típusú.

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
    new Test(); // ez a returnben található objektumot fogja eredményezni
	
Hogyha kihagyjuk a `new` kulcsszó használatát, a függvény **nem** egy új objektummal fog visszatérni.

    function Foo() {
        this.bla = 1; // ez a globális objektumon állítja be a bla értékét 1-re
    }
    Foo(); // undefined

A [`this`](#function.this) JavaScript beli működésének köszönhetően, mégha le is
fut az előbbi kód, akkor a `this` helyére a *globális objektumot* képzeljük.

### Gyárak (Factoryk)
