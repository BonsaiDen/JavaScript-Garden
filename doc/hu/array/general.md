## Tömb iteráció és tulajdonságok

Habár a tömbök a JavaScriptben objektumok, nincsen jó ok arra, hogy a [`for in`](#object.forinloop) ciklussal járjuk be őket. 
Valójában sokkal több jó ok van arra, hogy **miért ne** így tegyünk.

> **Megjegyzés:** A JS tömbök **nem** *asszociatív tömbök*. A JavaScriptben egyedül
> az [objektumokkal](#object.general) lehet kulcsokat értékekhez rendelni. Ráadásul
> amíg az asszociatív tömbök **megőrzik** a sorrendjüket, az objektumok **nem**.

Mivel a `for in` ciklus a prototípus láncon levő összes tulajdonságon végigmegy,
és mivel az egyetlen út ennek megkerülésére a [`hasOwnProperty`](#object.hasownproperty) használata, így majdnem **hússzor** 
lassabb mint egy sima `for` ciklus.

### Iteráció

Annak érdekében, hogy a legjobb teljesítményt érjük el a tömbökön való iteráció során,
a legjobb hogyha a klasszikus `for` ciklust használjuk.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

Még egy érdekesség van a fenti példában, ami a tömb hosszának cachelését végzi
a `l = list.length` kifejezés használatával.

Habár a `length` tulajdonság mindig magán a tömbön van definiálva, még mindig
lehet egy kis teljesítmény kiesés amiatt hogy minden iterációban újra meg kell
keresni ezt a tulajdonságot. Persze a legújabb JavaScript motorok **talán**
használnak erre optimalizációt, de nem lehet biztosan megmondani, hogy ahol a kódunk
futni fog, az egy ilyen motor-e vagy sem.

Valójában, a cachelés kihagyása azt eredményezheti, hogy a ciklusunk csak 
**fele olyan gyors** lesz mintha a cachelős megoldást választottuk volna.

### A `length` mező

Míg a `length` mező *getter* függvénye egyszerűen csak visszaadja a tömbben
levő elemek számát, addig a *setter* függvény használható arra (is), hogy
**megcsonkítsuk** a tömbünket.

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]

    foo.length = 6;
    foo.push(4);
    foo; // [1, 2, 3, undefined, undefined, undefined, 4]

Egy rövidebb hossz alkalmazása csonkítja a tömböt. A nagyobb hossz megadása
értelemszerűen növeli.

### Összegzésül

A megfelelő teljesítmény érdekében, a `for` ciklus használata és a length cachelése
ajánlott. A `for in` ciklus használata a tömbökön a rosszul megírt kód jele, amely
tele lehet hibákkal, és teljesítményben sem jeleskedik.

