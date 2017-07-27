## Névterek és hatókörök

Habár látszólag a kapcsos zárójelek jelentik a blokkok határait JavaScriptben, 
fontos megjegyezni hogy **nincsen** blokk szintű hatókör, csakis *függvény hatókörök*
léteznek.

    function test() { // ez egy hatókör
        for(var i = 0; i < 10; i++) { // ez meg nem
            // utasítások...
        }
        console.log(i); // 10
    }

> **Megjegyzés**: Amikor a `{...}` jelölés nem értékadásban, return utasításban vagy
> függvény argumentumként szerepel, akkor blokk utasításként lesz értelmezve és
> nem objektum literálként. Ez a szép tulajdonság az [automatikus pontosvessző
> generálással](#core.semicolon) karöltve nehezen észrevehető hibákhoz vezethet.

A nyelvben nincsenek beépített névterek, ami azt jelenti hogy minden, egyetlen
*globálisan megosztott* névtérben kerül deklarálásra.

Akárhányszor egy változóra hivatkozunk, a JavaScript elkezdi felfele utazva
megkeresni hatókörökön, amíg csak meg nem találja. Hogyha elérjük
a globális hatókört és még mindig nem találjuk a keresett változót, akkor egy
`ReferenceError` hibával gazdagodik a futásidőnk.

### A globális változók csapása

    // A script
    foo = '42';

    // B script
    var foo = '42'

Érdemes észrevenni, hogy a fenti két scriptnek **nem** ugyanaz a hatása. Az A script
egy `foo` nevű változót vezet be a *globális* hatókörben, a B script pedig egy `foo`
nevű változót deklarál az *ő hatókörében*.

Mégegyszer tehát, ez a kettő **nem** *ugyanazt jelenti*: a `var` elhagyásának jópár
beláthatatlan következménye is lehet.

    // globális hatókör
    var foo = 42;
    function test() {
        // lokális hatókör
        foo = 21;
    }
    test();
    foo; // 21
	
Itt, a `var` elhagyása azt eredményezi, hogy a `test` függvény mindig felülírja
a globális hatókörben definiált `foo` változó értékét. Habár ez elsőre nem tűnik
nagy dolognak, ha a `var`okat több száz sornyi JavaScript kódból hagyjuk el, az 
olyan hibákhoz vezethet, amit még az anyósunknak se kívánnánk.
    
    // globális hatókör
    var items = [/* random lista */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }

    function subLoop() {
        // a subLoop hatóköre
        for(i = 0; i < 10; i++) { // hiányzik a var
            // elképesztő dolgokat művelünk itt
        }
    }
	
Ennél a kódnál a külső ciklus az első `subLoop` hívás után megáll, mivel a `subLoop`
felülírja az `i` változó globális értékét. Hogyha a második `for` ciklusban használtuk
volna `var`-t azzal könnyen elkerülhettük volna ezt a hibát. **Sose** hagyjuk el a `var` utasítást, ha csak nem direkt az a *kívánt hatás*, hogy befolyásoljuk a 
külső hatókört.


### Lokális változók

Kétféleképp (és nem több módon) lehet lokális változókat JavaScriptben leírni; ez vagy a [függvény](#function.general) paraméter vagy a `var` utasítás.

    // globális hatókör
    var foo = 1;
    var bar = 2;
    var i = 2;

    function test(i) {
        // a test függvény lokális hatóköre
        i = 5;

        var foo = 3;
        bar = 4;
    }
    test(10);
	
Itt a `foo` és `i` lokális változók a `test` hatókörén belül, viszont a `bar`os
értékadás felül fogja írni a hasonló nevű globális változót.

### Hoisting

A JS **hoistolja** (megemeli) a deklarációkat. Ez azt jelenti hogy minden `var`
utasítás és `függvény` deklaráció az őt körülvevő hatókör tetejére kerül.

    bar();
    var bar = function() {};
    var someValue = 42;

    test();
    function test(data) {
        if (false) {
            goo = 1;

        } else {
            var goo = 2;
        }
        for(var i = 0; i < 100; i++) {
            var e = data[i];
        }
    }

A fenti kód átalakul egy másik formára mielőtt lefutna. A JavaScript felmozgatja
a `var` utasításokat és a `függvény` deklarációkat, az őket körülvevő legközelebbi
hatókör tetejébe.

    // a var utasítások felkerülnek ide
    var bar, someValue; // alapból mindegyik 'undefined' értékű lesz

    // a függvény deklaráció is felkerül ide
    function test(data) {
        var goo, i, e; // ezek is felkerülnek
        if (false) {
            goo = 1;

        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // Ez TypeErrorral elszáll, mivel a bar még 'undefined'
    someValue = 42; // az értékadásokat nem piszkálja a hoisting
    bar = function() {};

    test();

A hiányzó blokk hatókör ténye nem csak azt eredményezi, hogy a `var` utasítások
kikerülnek a ciklusmagokból, hanem az `if` utasítások kimenetele is megjósolhatatlan
lesz.

Habár úgy látszik az eredeti kódban, hogy az `if` utasítás a `goo` *globális 
változót* módosítja, a hoisting után látjuk hogy valójában a *lokális változóra*
lesz befolyással. Trükkös.

A *hoisting* tudása nélkül valaki azt hihetné, hogy az alábbi kód egy `ReferenceError`
-t fog eredményezni.

    // nézzük meg hogy a SomeImportantThing inicializálva lett-e
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

Persze ez működik, annak köszönhetően hogy a `var` utasítás a *globális hatókör*
tetejére lett mozgatva.

    var SomeImportantThing;

    // más kódok még inicializálhatják az előbbi változót itt...

    // ellenőrizzük hogy létezik-e
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### Névfeloldási sorrend

JavaScriptben az összes hatókörnek -beleértve a *globálisat* is- megvan a maga
[`this`](#function.this) változója, amelyik mindig az *aktuális objektumra* utal.

A függvény hatókörökben van még egy speciális [`arguments`](#function.arguments)
változó is mindig definiálva, amely a függvénynek átadott argumentumokat
tartalmazza.

Hogy hozzunk egy példát, amikor valaki a `foo` nevű változót próbálja elérni egy
függvény hatókörön belül, a JavaScript az alábbi sorrendben fogja keresni az adott
változó nevet.
 
 1. Abban az esetben ha találunk `var foo` utasítást, használjuk azt.
 2. Hogyha bármelyik függvény paraméter neve `foo`, használjuk azt.
 3. Hogyha magának a függvénynek a neve `foo, használjuk azt.
 4. Menjünk a külső hatókörre, és kezdjük újra **#1**-től.
 
> **Megjegyzés**: Egy `arguments` nevű függvény paraméter **megakadályozza**
> a bépített `arguments` objektum létrehozását.

### Névterek

Hogyha egyetlen globális névterünk van, akkor egy gyakori probléma lehet az,
hogy névütközésekbe futunk. A JavaScriptben szerencsére ez a gond könnyen
elkerülhető a *névtelen wrapper függvények* használatával.

    (function() {
        // egy 'öntartalmazó' névtér
        
        window.foo = function() {
            // egy exportált closure
        };

    })(); // a függvényt azonnal végre is hajtjuk

A névtelen függvények [kifejezésekként](#function.general) vannak értelmezve; így
ahhoz hogy meghívhatóak legyenek, először ki kell értékelni őket.

    ( // a függvény kiértékelése a zárójeleken belül
    function() {}
    ) // a függvény objektum visszatérítése
    () // az eredmény meghívása

Persze más kifejezések is használhatóak arra, hogy kiértékeljük és meghívjuk
a függvény kifejezést, amelyek habár szintaxisukban eltérnek, ugyan azt eredményezik.

    // Még több stílus anonymus függvények azonnali hívásához...
    !function(){}()
    +function(){}()
    (function(){}());
    // és a lista folytatódik...

### Összegzésül

Az *anonym wrapper függvények* használata erősen ajánlott a kód egységbezárása 
érdekében, saját névtér alkotásához. Ez nem csak hogy megvédi a kódunkat a 
névütközésektől, de jobb modularizációhoz is vezet.

Emelett a globális változók használata **nem ajánlott**. **Bármilyen** fajta 
használata rosszul megírt kódról árulkodik, amelyik könnyen eltörik és nehezen
karbantartható.
