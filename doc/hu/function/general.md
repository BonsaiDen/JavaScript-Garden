## Függvény deklarációk és kifejezések

A függvények JavaScriptben csak úgy értékek mint bármelyik más primitív érték. 
Ez azt jelenti hogy a függvények is átadhatóak például másik függvények paramétereként,
vagy megadható egy *névtelen függvény* egy másik aszinkron callbackjeként.

### A `függvény` deklaráció

    function foo() {}
	
Ez a függvény felkerül a scope tetejére ([hoisting](#function.scopes)), mielőtt a kód végrehajtása megtörténne. Így abban a scopeban ahol *definiálták*, *mindenhol* elérhető, 
még abban a trükkös esetben is, hogyha a kód azon pontján hívjuk ezt a függvényt, mielőtt
definiáltuk volna (látszólag).

    foo(); // Így is működik, mivel a foo fgv. létrejön mielőtt meghívnánk.
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
addig is a foo változó értéke [undefined](#core.undefined) marad. Az undefinedet pedig hiába hívjuk függvényként, TypeError-t kapunk végeredményül.

### Névvel ellátott függvény kifejezés

Egy másik érdekes eset, amikor névvel ellátott függvényeket adunk értékül változóknak.

    var foo = function bar() {
        bar(); // Működik
    }
    bar(); // ReferenceError

Ebben a példában a `bar`-t önmagában nem lehet elérni egy külső scopeból (utolsó sor), 
mivel egyből értékül adtuk a `foo` változónak. Habár magán a `bar`-on belül elérhető
a `bar` név, mivel a JavaScriptben található [névfeloldás](#function.scopes) miatt, a függvény önmagát mindig eléri a saját scopeján belül.


