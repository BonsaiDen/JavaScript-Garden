## Az `arguments` objektum

Minden függvényhatókörben hozzáférhető az `arguments` nevű speciális változó,
amely azon argumentumok listáját tartalmazza, amelyekkel a függvényt meghívták.

> **Megjegyzés:** Abban a trükkös esetben, hogyha a függvényhatókörön belül valahogy
> definiáljuk az `arguments`-et mint nevet, akár változóként (`var`ral), vagy a függvény 
> paramétereként, akkor ez a speciális `arguments` objektum nem lesz létrehozva.

Lehet hogy úgy néz ki, de az `arguments` objektum **nem** egy `tömb`. Látszólag hasonlít rá,
mivel van például egy `length` nevű mezője, de igazából nem az `Array.prototype`-ból "származik",
hanem tisztán az `Object`-ből.

Itt jön a trükk lényege, hogy ennek köszönhetően **nem** használhatóak rajta a standard
tömb műveletek mint például a `push`, `pop` vagy a `slice`. Míg a sima `for` ciklusos iterálás
működik itt is, ahhoz hogy az előbb említett műveleteket is tudjuk rajta használni, át kell
konvertálni egy valódi `Array` objektummá.

### Tömbbé konvertálás

Ez a kódrészlet egy új `Array` objektummá varázsolja az emlegetett `arguments` szamarat.

    Array.prototype.slice.call(arguments);
	
De, ez a konverzió meglehetősen **lassú** így egyáltalán **nem ajánlott** teljesítmény kirtikus
alkalmazások írásakor.

### Argumentumok kezelése

A következő módszer ajánlott arra az esetre hogyha az egyik függvény paramétereit egy-az-egyben
át szeretnénk adni egy másik függvény számára.

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // sok okos kód ide
    }

Egy másik trükk arra hogy teljesen független wrapper függvényeket gyártsunk, a `call`
és `apply` együttes használata.

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // Elkészíti a "method" (this) független verzióját
    // Ezeket kapja paraméterül: this, arg1, arg2...argN
    Foo.method = function() {

        // Eredmény: Foo.prototype.method.call(this, arg1, ...argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };
	
### Paraméterek és argumentum indexek

A háttérben az `arguments` objektum minden egyes indexére (elemére) egy *getter* és egy *setter*
függvényt is kap, csak úgy ahogy a függvény paramétereit is felül tudjuk írni, illetve eltudjuk érni.

Ennek eredményeképp, az `arguments` objektumon véghezvitt változtatások szinkronban
változtatják a függvény névvel ellátott paramétereit is.

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);
	
### Teljesítmény mítoszok és trükkök

Ahogy már azt korábban körvonalaztuk, az `arguments` objektum csak akkor nem jön létre,
hogyha a függvényhatókörön belül definiálunk egy változót ezzel a névvel, vagy a függvényünk
egyik paraméterének ezt a nevet választjuk.

Azonban a *getterek* és *setterek* mindig létrejönnek, de ez ne zavarjon meg minket, mert
semmiféle befolyása nincs a teljesítményre, pláne olyan kódban ahol sokkal több mindennel
is foglalkozunk mint az `arguments` objetkumhoz való hozzáférés.

> **ES5 Megjegyzés:** Ezek a **getterek** és **setterek** nem jönnek létre strict módban.

Habár, egyetlen eset van, amelynek komoly hatása lehet a kód teljesítményére a modern
JavaScript motorokban. Ez pedig az `arguments.callee` használata.

    function foo() {
        // ..csinálunk valamit
        arguments.callee; // ezzel a függvény objektummal
        arguments.callee.caller; // és ennek a hívójával..
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // Így viszont nem lehet behelyettesíteni ide...
        }
    }

A fenti kódban a `foo` helyére nem lehet egyszerűen behelyettesíteni a [függvény törzsét][1],
mivel a függvény törzsének fogalma kell legyen mind magáról, mind az ő hívójáról. Ez nem csak
hogy azt akadályozza meg, hogy a behelyettesítéssel nyerjünk egy kis többlet performanciát,
de az egységbe zárás elvét is erősen keresztbevágja, hiszen a függvény így erősen támaszkodni
fog a hívó környezetére (kontextusára).

Emiatt is, az `arguments.callee`, vagy bármely mezőjének használata **erősen kerülendő**.

> **ES5 Okoskodás:** Strict módban, az `arguments.callee` kifejezés egy `TypeError` hibát fog dobni,
> mivel a használata elavult.

[1]: http://en.wikipedia.org/wiki/Inlining




