## Függvény deklarációk és kifejezések

A függvények JavaScriptben egyben objektumok is. Ez azt jelenti, hogy
ugyanúgy lehet őket passzolgatni mint bármelyik más értékeket. Ezt a featuret
gyakran használják arra, hogy egy *névtelen (callback) függvényt* átadjunk 
egy másik -aszinkron- függvény paramétereként.

### A `függvény` deklaráció

    function foo() {}
	
Ez a függvény felkerül a scope tetejére ([hoisting](#function.scopes)), mielőtt a kód végrehajtása megtörténne. Így abban a scopeban ahol *definiálták*, *mindenhol* elérhető, 
még abban a trükkös esetben is, hogyha a kód azon pontján hívjuk ezt a függvényt, mielőtt
definiáltuk volna (látszólag).

    foo(); // Így is működik
    function foo() {}

### A `függvény` kifejezés (expression)

    var foo = function() {};

A fentebbi példában egy *névtelen* függvényt adunk értékül a foo változónak. 

    foo; // 'undefined'
    foo(); // TypeError hiba
    var foo = function() {};

Habár ebben a példában a `var` deklaráció futás előtt a kód tetejére kúszik,
ettől függetlenül a foo mint függvény meghívásakor hibát fogunk kapni.

Ugyanis a deklaráció felkúszott, azonban az értékadás csak futásidőben fog megtörténni,
addig is a foo változó értéke [undefined](#core.undefined) marad. Az undefinedet pedig hiába hívjuk függvényként, TypeErrort kapunk végeredményül.

### Névvel ellátott függvény kifejezés

Egy másik érdekes eset, amikor névvel ellátott függvényeket adunk értékül változóknak.

    var foo = function bar() {
        bar(); // Működik
    }
    bar(); // ReferenceError

Ebben a példában a `bar`t önmagában nem lehet elérni egy külső scopeból (utolsó sor), 
mivel egyből értékül adtuk a `foo` változónak. Ennek ellenére a `bar`on belül elérhető
a `bar` név. A tanulság az, hogy a függvény önmagát *mindig* eléri a saját scopeján belül, és ez a JavaScriptben található [névfeloldásnak](#function.scopes) köszönhető.


