## Closureök és referenciák

A JavaScript nyelv egyik legerőteljesebb tulajdonsága a *closureök* használatában rejlik.
Ezek használatával a hatókörök egymásba ágyazhatóak, és egy belső hatókör mindig hozzáfér
az őt körülvevő, külső hatókör változóihoz. Miután JavaScriptben egyetlen dologgal lehet
hatóköröket kifejezni, és ez a [funkció](#function.scopes) (bizony az if, try/catch és hasonló blokkok **nem** jelentenek új hatókört, mint pl. a Javaban), az összes funkció closureként szerepel.

### Privát változók "becsalása"

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5
	
Ebben a példában a `Counter` **két** closurerel tér vissza: az `increment` és
a `get` funkcióval. Mind a két funkció **referenciát** tárol a `Counter` hatókörre,
és így mindketten hozzáférnek a `count` változóhoz, ami ebben a hatókörben lett
definiálva.

### Miért működnek a privát változók?

Mivel a JavaScriptben egyszerűen **nem** lehet hatókörre referálni, vagy hatókört
értékül adni, így ezért szintén lehetetlen elérni az iménti `count` változót a külvilág számára.
Egyetlen mód van a megszólítására, ez pedig a fentebbi két closureön belül történik.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };
	
A fentebbi kód **nem** fogja megváltoztatni a `Counter` hatókör `count` változóját,
mivel a `foo.hack` mező **nem abban** a hatókörben lett létrehozva. Ehelyett, okosan,
létre fogja hozni, vagy felül fogja írni a *globális* `count` változót (window.count).

### Closureök használata ciklusokban

Az egyik leggyakoribb hiba amit el lehet követni, az a closureök ciklusokban való használata.
Annak is azon speciális esete amikor a ciklus indexváltozóját szeretnénk lemásolni a closureön belül.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

A fenti kódrészlet marhára **nem** a számokat fogja kiírni `0`-tól `9`-ig, de inkább
a `10`-et fogja tízszer kiírni.

Ugyanis a belső *névtelen* függvény egy **referenciát** fog tárolni a külső `i` változóra, és
akkor, amikor végül a `console.log` sor lefut, a `for loop` már végzett az egész ciklussal,
így az `i` értéke `10`-re lesz beállítva.

Ahhoz, hogy a várt működést kapjuk (tehát a számokat 0-tól 9-ig), szükségszerű az `i` változó
értékét **lemásolni**.

### A referencia probléma elkerülése

Az előző problémára megoldást úgy lehet jól adni, hogy az utasításoknak megfelelően 
lemásoljuk a ciklusváltozót, úgy hogy a jelenlegi ciklusmagöt körbevesszük egy [névtelen
függvénnyel](#function.scopes).

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

A külső ("csomagoló") névtelen függvény így azonnal meghívódik az `i` ciklusváltozóval, mint paraméterrel,
és így mindig egy másolatot fog kapni az `i` változó **értékéről**, amit ő `e` néven emészt tovább.

Így a `setTimeout`ban lévő névtelen fgv. mindig az `e` nevű referenciára fog mutatni, aminek az értéke így már **nem** változik meg a ciklus futása során.

Egy másik lehetséges út a megoldáshoz az, hogy egy "csomagoló" függvényt visszatérítünk a setTimeoutból, aminek ugyanaz lesz a hatása, mint a fentebbi példának.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }




