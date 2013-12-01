## Automatic Semicolon Insertion

Bár a JavaScriptnek látszólag C-s szintaxisa van, **mégsem** kötelező benne
kirakni a ponotsvesszőket, így (helyenként) kihagyhatóak a forrásból.
(A ford.: Hiszen interpretált nyelv lévén nincsenek fordítási hibák, így 
nyelvi elemek meglétét sem tudja erőltetni a nyelv)

Itt jön a csel, hogy ennek ellenére a JavaScript csak pontosvesszőkkel
értelmezi megfelelően a beírt kódot. Következésképp, a JS **automatikusan**
illeszti be a pontosvesszőket (megpróbálja kitalálni a gondolataink) 
azokra a helyekre, ahol amúgy emiatt értelmezési hibába futna.

    var foo = function() {
    } // értelmezési hiba, pontosvessző kéne
    test()

Az automatikus beillesztés megtörténik, ezután így értelmeződik a kód

    var foo = function() {
    }; // nincs hiba, mindenki örül
    test()

Az automatikus beillesztés (ASI) a JavaScript (egyik) **legnagyobb** design
hibája, mivel igen... *meg tudja* változtatni a kód értelmezését

### Hogyan Működik

Az alábi kódban nincsen pontosvessző, így a parser (értelmező) feladata kitalálni,
hogy hova is illessze be őket.

    (function(window, undefined) {
        function test(options) {
            log('testing!')

            (options.list || []).forEach(function(i) {

            })

            options.value.test(
                'hosszú string az argumentumban',
                'még még még még még hossszabbbbbbb'
            )

            return
            {
                foo: function() {}
            }
        }
        window.test = test

    })(window)

    (function(window) {
        window.someLibrary = {}

    })(window)

Alább mutatjuk a "kitalálós" játék eredményét.

    (function(window, undefined) {
        function test(options) {

            // Nincs beillesztés, a sorok össze lettek vonva
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- beillesztés

            options.value.test(
                'hosszú string az argumentumban',
                'még még még még még hossszabbbbbbb'
            ); // <- beillesztés

            return; // <- beillesztés, eltörik a return kifejezésünk
            { // blokként értelemződik

                // név: kifejezés formátumban értelmeződik
                foo: function() {} 
            }; // <- beillesztés
        }
        window.test = test; // <- beillesztés

    // The lines got merged again
    })(window)(function(window) {
        window.someLibrary = {}; // <- beillesztés

    })(window); //<- beillesztés

> **Megjegyzés:** A JavaScript értelmező nem tudja "korrektül" kezelni azokat
> a return kifejezéseket, amelyek után közvetlen új sor áll. Ez pedig egy
> nem túl kellemes mellékhatás, habár ez nem biztos hogy mindig
> az ASI hibájából történik.

Az értelmező drasztikusan megváltoztatta a fenti kódot. A legtöbb esetben a 
beillesztő **rosszul** tippel.

(A ford.: Semmilyen nyelvben sem jó, hogyha hagyjuk hogy a gép találja ki mit
szerettünk volna írni. Néma gyereknek az anyja sem érti a kódját ugye)

### Kezdő Zárójelek

Az értelmező **nem** rak be új pontosvesszőt, hogyha a sor eleje (nyitó) zárójellel kezdődik.

    log('testing!')
    (options.list || []).forEach(function(i) {})

Ez a kód egy sorként értelmeződik

    log('testing!')(options.list || []).forEach(function(i) {})

Az esélyek arra **elég** magasak, hogy a `log` **nem** egy függvényt fog visszatéríteni; így a fenti kód egy `TypeError` típusú hibát fog dobni 
`undefined is not a function` üzenettel.

### Összefoglalásképp

Szükségszerűen **soha** ne hagyjuk ki a pontoszvesszőket. Nem árt a kapcsos
zárójeleket is ugyanazon a soron tartani, mint amelyiken az utasítást elkezdtük,
így nem ajánlott az egysoros `if` / `else` kifejezések kedvéért elhagyni
őket. Ezek a szempontok nem csak a kódot (és annak olvashatóságát) tartják
konzisztensen, de megelőzik azt is hogy a JavaScript értelmező valamit rosszul
"találjon ki".