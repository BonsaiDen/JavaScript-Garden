## Egyenlőség vizsgálat

A JavaScriptben két különböző megoldás létezik az objektumok egyenlőségének 
vizsgálatára

### Az egyenlőség operátor

Az egyenlőség vizsgálatot végző (egyik) operátort így jelöljük: `==`

A JavaScript egy *gyengén típusos* nyelv. Ez azt jelenti, hogy az egyenlőség
operátor **típuskényszerítést** alkalmaz ahhoz, hogy össze tudjon hasonlítani
két értéket.
    
    ""           ==   "0"           // hamis
    0            ==   ""            // igaz
    0            ==   "0"           // igaz
    false        ==   "false"       // hamis
    false        ==   "0"           // igaz
    false        ==   undefined     // hamis
    false        ==   null          // hamis
    null         ==   undefined     // igaz
    " \t\r\n"    ==   0             // igaz

A fenti táblázat szépen mutatja, hogy mi a típuskényszerítés eredménye, és egyben
azt is, hogy miért rossz szokás a `==` használata. Szokás szerint, ez megint
olyan fícsör, ami nehezen követhető kódhoz vezethet a komplikált konverziós
szabályai miatt.

Pláne, hogy a kényszerítés teljesítmény problémákhoz is vezet; ugyanis, mielőtt
egy stringet egy számhoz hasonlítanánk azelőtt a karakterláncot át kell konvertálni
a megfelelő típusra.

### A szigorú(bb) egyenlőség operátor

Ez az operátor már **három** egyenlőségjelből áll: `===`.

Ugyanúgy működik, mint az előbbi, kivéve hogy ez a változat **nem** alkalmaz
típuskényszerítést az operandusai között.

    ""           ===   "0"           // hamis
    0            ===   ""            // hamis
    0            ===   "0"           // hamis
    false        ===   "false"       // hamis
    false        ===   "0"           // hamis
    false        ===   undefined     // hamis
    false        ===   null          // hamis
    null         ===   undefined     // hamis
    " \t\r\n"    ===   0             // hamis

A felső eredmények sokkal egyértelműbbek és ennek köszönhetően sokkal hamarabb
eltörik a kód egy-egy ellenőrzésen. Ettől sokkal hibatűrőbb lesz
a produktumunk, ráadásul teljesítménybeli gondjaink sem lesznek.

### Objektumok összehasonlítása

Habár mind a `==`-t és a `===`-t is egyenlőség operátornak hívjuk, eltérően
viselkednek, hogy ha legalább az egyik operandusuk egy objektum.
	
	{} === {};                   // hamis
    new String('foo') === 'foo'; // hamis
    new Number(10) === 10;       // hamis
    var foo = {};
    foo === foo;                 // igaz
	
Ebben az esetben mindkét operátor **identitást** és **nem** egyenlőséget 
ellenőriz; tehát azt fogják ellenőrizni hogy az operandus két oldalán
ugyanaz az objektum referencia áll-e, mint az `is` operátor Pythonban
vagy a pointerek összehasonlítása C-ben. (A ford.: Tehát nem azt, hogy a 
két oldalon álló objektumnak például ugyanazok-e a mezői, hanem azt hogy ugyanazon
a memóriacímen található-e a két operandus).

### Összegzésül

Azt érdemes tehát megjegyezni, hogy a **szigorú egyenlőség vizsgálatot** érdemes
mindig használni. Amikor szeretnék típuskényszerítést alkalmazni, akkor azt
inkább tegyük meg [direkt módon](#types.casting), és ne a nyelv komplikált
automatikus szabályaira bízzuk magunkat. 