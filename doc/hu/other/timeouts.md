### A varázslatos `setTimeout` és `setInterval`

Mivel a JavaScript aszinkron, a `setTimeout` és `setInterval` használatával
lehetséges késleltetni a kódok lefutási idejét.

> **Megjegyzés:** A timeout fv.-ek **nem** részei az ECMAScript Standardnek.
> Mivel a [DOM][1] részeként lettek implementálva.

    function foo() {}
    var id = setTimeout(foo, 1000); // Egy számmal (> 0) tér vissza

Amikor a `setTimeout` függvényt meghívjuk, válaszul egy timeout ID-t kapunk
valamint be lesz ütemezve a `foo` függvényhívás, hogy **körülbelül** 1000 miliszekundum múlva fusson le a jövőben. A `foo` **egyszer** lesz végrehajtva.

Az aktuális JavaScript motor időzítésétől függően, és annak figyelembe vételével
hogy a JavaScript mindig egyszálú, tehát a megelőző kódok blokkolhatják a szálat,
**soha** nem lehet biztonságosan meghatározni hogy valóban a kért időzítéssel 
fog lefutni a kód amit megadtunk a `setTimeout`ban. Erre semmilyen biztosíték nincs.

Az első helyen bepasszolt függvény a *globális objektum* által lesz meghívva, ami
azt jelenti hogy a [`this`](#function.this) a függvényen belül a globális objektumra
utal.

    function Foo() {
        this.value = 42;
        this.method = function() {
            // a this egy globális objektumra utal, nem a Foo-ra
            console.log(this.value); // undefined-ot logol ki
        };
        setTimeout(this.method, 500);
    }
    new Foo();


> **Note:** Mivel a `setTimeout` egy **függvény objektumot** vár első paramétereként
> egy gyakori hiba a `setTimeout(foo(), 1000)` módon való használata, amely a 
> `foo` **visszatérési értékét** fogja használni és **nem** a `foo`t mint függvényt. 
> Ez a legtöbb esetben egy észrevétlen hibát okoz, mivel a függvény `undefined`-t
> térít vissza amire a `setTimeout` **nem** fog hibát dobni.

### Híváshalmozás a `setInterval`al

Míg a `setTimeout` csak egyszer futtatja le a megadott függvényt, a `setInterval`
- ahogy a neve is mutatja - **minden** `X` miliszekundumban végrehajtja a 
neki átadott kódot, használata pedig erősen kerülendő.

Nagy hátulütője, hogy még akkor is ütemezi az újabb és újabb
hívásokat, hogyha az aktuálisan futattot kód a megadott időintervallumon
felül blokkolja a további kód futtatást. Ez, hogyha megfelelően rövid
intervallumokat állítunk be, felhalmozza a függvényhívásokat a call stacken.

    function foo(){
        // kód ami 1 másodpercig feltartja a futtatást
    }
    setInterval(foo, 100);

A fenti kódban amikor a `foo` meghívódik, 1 másodpercig feltartja a további futtatást.

A `setInterval` persze ütemezni fogja a jövőbeli `foo` hívásokat továbbra is, amíg
blokkolódik a futtatás. Így **tíz** további hívás fog várakozni, miután a `foo`
futtatása először végzett.

### Hogyan Bánjunk El a Blokkolással

A legkönnyebb és kontrollálhatóbb megoldásnak az bizonyul, hogyha a `setTimeout`
függvényt a rögtön a foo-n belül használjuk.

    function foo(){
        // 1 másodpercig blokkoló kód
        setTimeout(foo, 100);
    }
    foo();

Ez nem csak egységbe zárja a `setTimeout` hívást, de meggátolja a felesleges hívások
felhalmozását, és több irányítást ad a kezünkbe. A `foo` így magától eltudja
dönteni, hogy akarja-e újra futtatni önmagát vagy sem.

### Timeout Tisztogatás Kézzel

A `clearTimeout` vagy `clearInterval` hívással tudjuk a timeoutjainkat 
megszüntetni, természetesen attól függ hogy melyiket használjuk,
hogy melyik `set` függvénnyel indítottuk útjára a timeoutunkat.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### Az Összes Timeout Megszüntetése

Mivel nincsen beépített megoldás az összes timeout és/vagy interval
hívás törlésére, ezért bruteforce módszerekhez kell folyamodjunk.

    // az "összes" timeout kitörlése
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

Persze ez csak véletlenszerű lövöldözés, semmi sem garantálja hogy a fenti 
módszerrel nem marad timeout a rendszerben (A ford.: például az ezredik timeout vagy
afelett). Szóval egy másik módszer ennek megoldására, hogy feltételezzük hogy
minden `setTimeout` hívással az azonosítók száma egyel növekszik.

    // az "összes" timeout kiírtása
    var legnagyobbTimeoutId = window.setTimeout(function(){}, 1),
    i;
    for(i = 1; i <= legnagyobbTimeoutId; i++) {
        clearTimeout(i);
    }

Habár ez a megoldás minden böngészőben megy (egyenlőre), ez az azonosítókról született mondás nincs specifikációban rögzítve, és ennek megfelelően változhat. 
Az ajánlott módszer továbbra is az, hogy kövessük nyomon az összes timeout azonosítót amit generáltunk, és így ki is tudjuk őket rendesen törölni.

### `eval` A Színfalak Mögött

Habár a `setTimeout` és a `setInterval` (kód) stringet is tud első paramétereként
fogdani, ezt a fajta formáját használni kimondottan **tilos**, mivel a függöny
mögött ő is csak `eval`t használ.

> **Megjegyzés:** Mivel az ECMAScript Standard nem specifikálja a timeout
> függvények működését, az eltérő JavaScript implementációkban eltérő módon
> működhetnek. Például a Microsoft JScript-je a `Function` konstruktort használja
> az `eval` helyett.

    function foo() {
        // meg lesz hívva
    }

    function bar() {
        function foo() {
            // soha nem hívódik meg
        }
        setTimeout('foo()', 1000);
    }
    bar();

Mivel az `eval`t nem [direkt](#core.eval) módon hívjuk meg a fenti esetben,
a `setTimeout`nak passzolt string a *globális hatókörben* fog lefutni; így
a lokális `foo` függvényt sosem használjuk a `bar` hatóköréből.

Továbbá **nem** ajánlott argumentumokat átadni annak a függvénynek amelyik
a timeout függvények által meg lesz hívva a későbbiekben.

    function foo(a, b, c) {}
    
    // SOHA ne használd így!
    setTimeout('foo(1, 2, 3)', 1000)

    // Ehelyett csomagoljuk névtelen függvénybe
    setTimeout(function() {
        foo(1, 2, 3);
    }, 1000)

> **Megjegyzés:** Habár lehetséges a `setTimeout(foo, 1000, 1, 2, 3)` szintaxist
> használni, mégsem ajánlott, mivel [metódusok](#function.this)  használatakor
> észrevehetetlen hibákhoz vezethet.

### Összegzésképp

**Soha** ne használjunk stringeket a `setTimeout` vagy `setInterval` első
paramétereiként. Ha argumentumokat kell átadni a meghívandó függvénynek, az 
egyértelműen **rossz** kódra utal. Ebben az esetben a függvényhívás 
lebonyolításához egy *anoním* függvény használata ajánlott.

Továbbá, mivel az ütemező kódja nem blokkolódik a JavaScript futás által, a 
`setInterval` használata úgy általában kerülendő.

[1]: http://en.wikipedia.org/wiki/Document_Object_Model "Document Object Model"

