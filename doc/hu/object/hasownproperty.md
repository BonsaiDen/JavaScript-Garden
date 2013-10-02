## `hasOwnProperty`

Hogy megtudjuk nézni egy adott objektum saját mezőit - azokat a mezőket amelyek
az objektumon *közvetlenül* vannak definiálva, és nem valahol a 
[prototípus láncon](#object.prototype) -, a `hasOwnProperty` függvényt használata 
ajánlott, amelyet az összes objektum amúgy is örököl az `Object.prototype`-ból.

> **Megj.:** Vicces programozók miatt, **nem** biztos hogy elég lesz megnézni hogy 
> egy adott mező `undefined`-e. Mivel lehet hogy ekkor maga a mező létezik, csak valaki
> konkrétan az értékét `undefined`-ra állította.

A `hasOwnProperty` függvény az egyetlen olyan dolog amelyik anélkül tudja ellenőrizni
az objektum mezőit, hogy megpróbálná bejárni a prototípus láncot.

    // Az Object.prototype beszennyezése
    Object.prototype.bar = 1;
    var foo = {goo: undefined};

    foo.bar; // 1
    'bar' in foo; // igaz

    foo.hasOwnProperty('bar'); // hamis
    foo.hasOwnProperty('goo'); // igaz

Hogy megértsük a fontosságát, egyedül a `hasOwnProperty` tudja hozni a korrekt
és elvárt eredményeket mezőellenőrzés szempontjából. Egyszerűen **nincs más** 
módja annak, hogy kizárjuk a szűrésünkből azokat a mezőket amelyek nem az objektumon, 
hanem valahol feljebb, a prototípus láncon lettek definiálva.

### A `hasOwnProperty` mint mező

A JavaScript persze nem védi magát a `hasOwnProperty` nevet, így egy jókedvű
programozóban mindig megvan a lehetőség, hogy így nevezze el a saját függvényét.
Ennek kikerülése érdekében ajánlott mindig a `hasOwnProperty`-re *kívülről* hivatkozni
(Értsd: A hackelt -saját hasOwnPropertyvel ellátott- objektum kontextusán kívüli objektum hasOwnPropertyjét hívjuk meg).

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Mordor itt kezdődik'
    };

    foo.hasOwnProperty('bar'); // mindig hamissal tér vissza

    // Használhatjuk egy másik objektum hasOwnPropertyjét, 
	// hogy meghívjuk a foo-n.
    ({}).hasOwnProperty.call(foo, 'bar'); // ez már igaz

    // Szintén jó megoldás lehet közvetlenül az 
	// Object prototypejából hívni ezt a függvényt.
    Object.prototype.hasOwnProperty.call(foo, 'bar'); // ez is igaz


### Konklúzió

A `hasOwnProperty` használata az **egyetlen** megbízható módszer annak eldöntésére,
hogy egy mező közvetlenül az objektumon lett-e létrehozva. Melegen ajánlott a 
`hasOwnProperty`-t **minden** [`for in` ciklusban](#object.forinloop) használni.
Használatával ugyanis elkerülhetjük a kontár módon kiegészített natív prototípusokból
fakadó esetleges hibákat, amire példát az imént láttunk.