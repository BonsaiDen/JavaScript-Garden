## A Prototípus

A JavaScript nem a klasszikus öröklődést használja, hanem egy ún. *prototípus*
származtatást használ.

Míg ezt gyakran a JavaScript legnagyobb hibái között tartják számon, valójában
ez a származtatási modell jóval erősebb mint klasszikus barátja.
Ezt jelzi, hogy például sokkal könnyebb megépíteni a klasszikus modellt, alapul véve
a prototípusos modellt, míg a fordított irány kivitelezése igencsak nehézkes lenne.

A JavaScript az egyetlen széles körben elterjedt nyelv, amely ezt a származtatást
használja, így mindenképp időt kell szánni a két modell közti különbség megértésére.

Az első legszembetűnőbb különbség, hogy ez a fajta származtatás *prototípus láncokat* 
használ.

> **Megj.:** Egyszerűen a `Bar.prototype = Foo.prototype` utasítás használva, mind a 
> két objektum **ugyanazon** a prototípuson fog osztozni. Így aztán ha bárki közülük
> megváltoztatja ezt a prototípust, az a változás a másik objektumot is befolyásolja,
> ami általában nem egyezik meg a kívánt működéssel.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Beállítjuk a Bar prototípusát a Foo egy új példányára
    Bar.prototype = new Foo(); // !
    Bar.prototype.foo = 'Hello World';

    // Beállítjuk a Bar konstruktorát
    Bar.prototype.constructor = Bar;

    var test = new Bar(); // új Bar példány létrehozása

    // A kapott prototípus lánc
    test [instance of Bar]
        Bar.prototype [instance of Foo]
            { foo: 'Hello World' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* stb. */ }

A fenti kódban a `test` objektum mind a `Bar.prototype` és `Foo.prototype`
prototípusokból származik, így lesz hozzáférése a `method` nevű függvényhez amely
a `Foo` prototípusában lett definiálva. A `value` mezőhöz szintén lesz hozzáférése,
amely akkor jött létre, amikor (szám szerint) **egy** új `Foo` példányt hoztunk létre.
Érdemes észrevenni hogy a `new Bar()` kifejezés **nem** hoz létre egy új `Foo` példányt
minden alkalommal, azonban újrahasználja azt az egyetlen újonnan inicilalizált `Foo` pédlányunkat. Így az összes `Bar` példány *egy és ugyanazt* a `value` mezőt (és
értéket) fogja használni.

> **Megj.:** **Ne** használd a `Bar.prototype = Foo` kifejezést, mivel ez nem
> a `Foo` prototípusára fog mutatni, hanem magára a `Foo` függvényre, mint objektumra.
> Így a prototípus lánc a `Function.prototype`-ra fog futni a `Foo.prototype` helyett.
> Ekkor, a `method` függvény nem lesz benne a prototípus láncban.

### Mezők keresése

Amikor olyan utasítást adunk ki, amellyel egy objektum mezőjét keressük, a
JavaScript **felfele** bejárja az egész prototípus láncot, amíg meg nem találja
a kért mezőt.

Hogyha eléri a lánc legtetejét - nevezetesen az `Object.prototype`-t és még
ekkor sem találja a kért mezőt, akkor az [undefined](#core.undefined)-del fog
visszatérni.

### A Prototype mező

Alapjáraton, a JavaScript a prototype nevű mezőt használja a prototípus láncok
kialakításához, de ettől függetlenül ez is ugyanolyan mező mint a többi, és 
**bármilyen** értéket belehet neki állítani. Viszont a primitív típusokat egyszerűen
figyelmen kívül fogja hagyni a feldolgozó.

    function Foo() {}
    Foo.prototype = 1; // nincs hatása

Az objektumok megadása, mint azt a fentebbi példában láthattuk, hatással van a prototype
mezőkre és ezeknek az átállításával bele lehet szólni a prototípus láncok kialakításába.

### Teljesítmény

Értelemszerűen, minnél nagyobb a prototípus lánc, annál tovább tart egy-egy mező
felkeresése, és ez rossz hatással lehet a kód teljesítményére. Emellett, ha egy
olyan mezőt próbálunk elérni amely nincs az adott objektum példányban, az mindig
a teljes lánc bejárását fogja eredményezni.

Vigyázat! Akkor is bejárjuk a teljes láncot, amikor egy objektum mezőin próbálunk [iterálni](#object.forinloop).

### Natív prototípusok bővítése

Egy gyakran elkövetett hiba, hogy az `Object.prototype` prototípust vagy egy másik előre
definiált prototípust próbálunk kiegészíteni új kóddal.

Ezt [monkey patching][1]-nek is hívják, és aktívan kerülendő, mivel megtöri az *egységbe zárás* elvét. 
Megtévesztő miszkoncepció, mivel olyan népszerű frameworkök is használják ezt a technikát mint a [Prototype][2], de ettől függetlenül ne hagyjuk magunkat csőbe húzni; nincs ésszerű indok arra, hogy összezavarjuk a beépített típusokat, további *nem standard* saját funkcionalitással.

Az **egyetlen** ésszerű indok erre csak az lehet, hogy szimuláljuk az újabb
JavaScript motorok működését régebbi társaikon, például
az [`Array.forEach`][3] implementálásával.

### Zárásként

**Nagyon fontos** megérteni a prototípusos származtatási modellt, mielőtt olyan
kódot próbálnánk írni, amely megpróbálja kihasználni a sajátosságait. Nagyon
oda kell figyelni a prototípuslánc hosszára - osszuk fel több kis láncra ha
szükséges - hogy elkerüljük a performancia problémákat. Továbbá, a natív
prototípusokat **soha** ne egészítsük ki, egészen addig amíg nem akarunk
JavaScript motorok közötti kompatibilitási problémákat áthidalni.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

