## Az `undefined` és a `null`

A JavaScript két értéket is tartogat a semmi kifejezésére, ezek a `null` és az
`undefined` és ezek közül az utóbbi a hasznosabb.

### Az `undefined`

Ha az előbbi bevezetőtől nem zavarodtál volna össze; az 
`undefined` egy típus amelynek pontosan egy értéke van, az `undefined`.

A nyelvben szintén van egy `undefined` nevű globális változó amelynek az értékét
hogy-hogy nem `undefined`-nek hívják. Viszont ez a változó **nem** konstans vagy
kulcsszó a nyelvben. Ez azt jeletni hogy az *értéke* könnyedén felülírható.

> **ES5 Megjegyzés:** Az `undefined` ECMAScript 5-ben **többé** *nem felülírható* 
> strict módban, bár a neve továbbra is eltakarható, például egy saját függvénnyel
> aminek a neve éppen `undefined`.

Itt van pár példa, hogy mikor is találkozhatunk az `undefined` értékkel:
 
 - Az `undefined` globális változó elérésekor
 - Egy deklarált, de nem inicializált változó elérésekor.
 - Egy függvény hívásakor ez a visszatérési érték, `return` utasítás híján.
 - Egy olyan `return` utasítás lefutásakor, amely nem térít vissza értéket.
 - Nem létező mezők lekérésekor.
 - Olyan függvény paraméterek elérésekor amelyeknek a hívó oldalon nem kaptak értéket.
 - Bármikor amikor az `undefined` érték van valaminek beállítva.
 - Bármelyik `void(kifejezés)` utasítás futtatásakor.

### Handling Changes to the Value of `undefined`

Mivel az `undefined` nevű globális változó csak egy másolatot tárol az 
`undefined` elnevezésű értékből, az értékének megváltoztatása **nem** írja
felül az eredeti `undefined` *típus* értékét.

Ezért, ha valamilyen értékkel össze szeretnénk hasonlítani az `undefined` értéket,
nem árt hogyha először magát az `undefined`-et el tudjuk érni.

Egy gyakori technika annak érdekében hogy megvédjük a kódunkat az 
`undefined` lehetséges felüldefiniálásaitól, hogy egy [névtelen (wrapper)](#function.scopes) függvénybe
csomagoljuk az egész kódunkat, amelynek lesz egy direkt üres paramétere.

    var undefined = 123;
    (function(something, foo, undefined) {
        // az undefined ebben a hatókörben 
        // megint valóban az `undefined` értékre referáll.

    })('Hello World', 42);

Egy másik módja ennek, hogy használunk egy "üres" deklarációt a wrapper függvényen
belül.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

Az egyetlen különbség ebben a változatban, hogyha minifikáljuk ezt a kódot,
és nem definiálunk további változókat ezen a részen belül, akkor extra 4 byte
"veszteséget" szenvedünk el.

### Mikor használjunk `null`-t

Miközben az `undefined` a natív JavaScript megvalósításokban inkább a (más 
nyelvekben levő) tradícionális *null* helyett használandó, azalatt maga a `null` 
inkább csak egy különböző adattípusnak számít, mindenféle különös jelentés nélkül.

Egy pár belső JavaScriptes megoldásban ugyan használják (ahol pl. a prototípus lánc végét a `Foo.prototype = null` beállítással jelölik), de a legtöbb esetben ez
felcserélhető az `undefined`-el.

(A ford.: A `null` használata kimondottan abban az esetben használható, amikor
egy referencia típusú változót deklarálunk, de még nem adunk neki értéket. Pl. a 
`var ezObjektumLesz = null` kifejezés ezt jelöli. Tehát a null leginkább
kezdeti értékként állja meg a helyét, minden másra ott a MasterC.. az `undefined`)

