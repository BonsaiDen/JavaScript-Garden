## Miért Ne Használjuk az `eval`-t

Az `eval` (evil) funkció egy stringbe ágyazott JavaScript kódot futtat a 
lokális scopeon belül.

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1
	
Viszont az `eval` csak akkor viselkedik így, hogyha expliciten hívjuk meg
*és* a meghívott funkció neve valóban `eval`.

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3

Az `eval` használata kerülendő. A "felhasználása" az esetek 99.9%-ban 
**mellőzhető**.
    
### Az `eval` ezer arca

A `setTimeout` és `setInterval` nevű [timeout függvények](#other.timeouts) is
tudnak úgy működni, hogy első paraméterükként egy stringbe ágyazott kódot várnak.
Ez a string **mindig** a globális hatókörben lesz végrehajtva, mivel az `eval`t
így nem direktben hívjuk meg.

### Biztonsági problémák

Az `eval` azért is veszélyes, mert **bármilyen** JS kódot végrehajt, amit odaadunk
neki. Éppen ezért **sose** használjuk olyan kódok végrehajtására amiknek az eredete
nem megbízható/ismeretlen.

### Összegzésül

Soha ne használjunk `eval`t. Bármilyen kód működése, teljesítménye, ill. biztonsága
megkérdőjelezhető, amely használja ezt a nyelvi elemet. Semmilyen megoldás
használata **nem ajánlott** amely első sorban `eval`ra épül. Ekkor egy *jobb
megoldás* szükségeltetik, amely nem függ az `eval`tól.