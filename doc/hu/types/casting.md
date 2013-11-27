## Típus kasztolás

Előre kössük le, hogy a JavaScript egy *gyengén típusos* nyelv, így **ahol
csak tud**, ott *típus kényszerítést* használ.

    // Ezek igazak
    new Number(10) == 10; // A Number.toString() számmá lesz
                          // visszaalakítva

    10 == '10';           // A Stringek visszaalakulnak számmá
    10 == '+10 ';         // Mégtöbb string varázslat
    10 == '010';          // és mégtöbb
    isNaN(null) == false; // a null varázslatosan 0-vá alakul
                          // ami persze nem NaN
    
    // Ezek hamisak
    10 == 010;
    10 == '-10';

> **ES5 Megjegyzés:** A `0`-val kezdődő számliterálok oktálok (8-as számrendszer).
> Az oktál támogatást az ECMAScript 5 strict módból **eltávolították**

Hogy elkerüljük a fenti varázslatokat, a [szigorú egyenlőség ellenőrzés](#types.equality) **melegen** ajánlott. Habár ezzel elkerüljük
a problémák farkasrészét, még mindig tartogat a JS gyengén típsuso rendszere
meglepetéseket.

### Natív típusok konstruktorai

A jó hír az, hogy a natív típusok mint a `Number` és a `String` különféle
módon viselkednek hogyha a `new` kulcsszóval avagy anélkül vannak inicializálva.

    new Number(10) === 10;     // Hamis, Objektum vs. Szám
    Number(10) === 10;         // Igaz, Szám vs. szám
    new Number(10) + 0 === 10; // Igaz, az implicit konverziónak hála

Using a built-in type like `Number` as a constructor will create a new `Number` 
object, but leaving out the `new` keyword will make the `Number` function behave
like a converter.

Ha egy natív típusát mint a `Number` konstruktorként kezeljük, akkor egy új
`Number` objektumot kapunk. De ha kihagyjuk a `new` kulcsszót akkor a `Number`
egy egyszerű konverter függvényként fog viselkedni.

Ráadásul a literálok passzolgatásakor még több típuskonverzió üti fel a fejét.

A legjobb megoldás hogyha a három típus valamelyikére **expliciten** kasztolunk.

### Stringre kasztolás

    '' + 10 === '10'; // igaz

Egy üres string hozzáfűzésével könnyen tudunk egy értéket stringgé kasztolni.

### Számra kaszt

    +'10' === 10; // igaz
	
Az **unáris** plusz operátor használatával lehetséges egy értéket számra alakítani.

### Booleanre kasztolás

A **nem** operátor kétszeri alkalmazásával tudunk booleanné kasztolni.

    !!'foo';   // igaz
    !!'';      // hamis
    !!'0';     // igaz
    !!'1';     // igaz
    !!'-1'     // igaz
    !!{};      // igaz
    !!true;    // igaz


