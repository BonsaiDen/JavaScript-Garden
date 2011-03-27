## Näkyvyysalueet ja nimiavaruudet

Vaikka JavaScript-käyttääkin aaltosulkeita blokkien ilmaisuun, se **ei** tue blokkinäkyvyyttä. Tämä tarkoittaa sitä, että kieli tukee ainoastaan *funktionäkyvyyttä.

    function test() { // näkyvyysalue
        for(var i = 0; i < 10; i++) { // tämä ei ole näkyvyysalue
            // count
        }
        console.log(i); // 10
    }

> **Huomio:** Mikäli `return`-lausetta ei käytetä sijoitukseen, `{...}`-notaatio tulkitaan blokkina **eikä** olioliteraalina. Tästä ja [puolipisteiden automaattisesta lisäämisestä](#core.semicolon] seuraa yllättäviä virheitä.

JavaScript ei myöskään sisällä erityistä tukea nimiavaruuksille. Tämä tarkoittaa sitä, että kaikki määritellään oletuksena *globaalissa* nimiavaruudessa.

Joka kerta kun muuttujaan viitataan, JavaScript käy kaikki näkyvyysalueet läpi alhaalta lähtien. Mikäli se saavuttaa globaalin näkyvyystalueen, eikä löydä haettua nimeä, se palauttaa `ReferenceError`-virheen.

### Riesa nimeltä globaalit muuttujat

    // skripti A
    foo = '42';

    // skripti B
    var foo = '42'

Yllä olevat skriptit käyttäytyvät **eri** tavoin. Skripti A määrittelee muuttujan nimeltä `foo` *globaalissa* näkyvyysalueessa. Skripti B määrittelee `foo`-muuttujan *vallitsevassa* näkyvyysalueessa.

Tämä **ei** ole **sama asia**. `var`-avainsanan käyttämättä jättäminen voi johtaa vakaviin seurauksiin.

    // globaali näkyvyysalue
    var foo = 42;
    function test() {
        // paikallinen näkyvyysalue
        foo = 21;
    }
    test();
    foo; // 21

`var`-avainsanan pois jättäminen johtaa siihen, että funktio `test` ylikirjoittaa `foo`:n arvon. Vaikka tämä ei välttämättä vaikutakaan suurelta asialta, tuhansien rivien tapauksessa `var`-avainsanan käyttämättömyys voi johtaa vaikeasti löydettäviin bugeihin.

    // globaali näkyvyysalue
    var items = [/* joku lista */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }

    function subLoop() {
        // aliluupin näkyvyysalue
        for(i = 0; i < 10; i++) { // hups, var jäi pois
            // jotain makeaa ja hienoa
        }
    }

Tässä tapauksessa ulomman luupin suoritus lopetetaan ensimmäisen `subLoop`-kutsun jälkeen. Tämä johtuu siitä, että se ylikirjoittaa `i`:n globaalin arvon. Mikäli jälkimmäisessä luupissa olisi käytetty `var`-avainsanaa, olisi ikävyyksiltä vältytty. `var`-avainsanaa ei siis tule **ikinä** jättää pois ellei siihen ole *hyvää syytä*.

### Paikalliset muuttujat

Ainoastaan [funktion](#function.general) parametrit ja muuttujat, jotka sisältävät `var`-määreen ovat paikallisia.

    // globaali näkyvyysalue
    var foo = 1;
    var bar = 2;
    var i = 2;

    function test(i) {
        // paikallinen näkyvyysalue
        i = 5;

        var foo = 3;
        bar = 4;
    }
    test(10);

`foo` ja `i` ovatkin `test`-funktiolle paikallisia. `bar` sijoitus muuttaa globaalin muuttujan arvoa.

### Hilaaminen

JavaScript **hilaa** määreitä. Tämä tarkoittaa sitä, että sekä `var`-lausekkeet että `function`-määreet siirretään ne sisältävän näkyvyysalueen huipulle.

    bar();
    var bar = function() {};
    var someValue = 42;

    test();
    function test(data) {
        if (false) {
            goo = 1;

        } else {
            var goo = 2;
        }
        for(var i = 0; i < 100; i++) {
            var e = data[i];
        }
    }

Yllä olevaa koodia muutetaan ennen suoritusta. JavaScript siirtää `var`-lausekkeet ja `function`-määreet lähimmän näkyvyysalueen huipulle.

    // var-lausekkeet siirrettiin tänne
    var bar, someValue; // oletuksena 'undefined'

    // myös funktio-määre siirtyi tänne
    function test(data) {
        var goo, i, e; // ei blokkinäkyvyyttä, siirretään siis tänne
        if (false) {
            goo = 1;

        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // TypeError-virhe, baria ei ole vielä määritelty
    someValue = 42; // hilaus ei koske sijoituksia
    bar = function() {};

    test();

Sen lisäksi, että puuttuva blokkinäkyvyys siirtää `var`-lausekkeet luuppien ulkopuolelle, tekee se myös eräistä `if`-rakenteista vaikeita käsittää.

Alkuperäisessä koodissa `if`-lause näytti muokkaavan *globaalia muuttujaa* `goo`. Todellisuudessa se muokkaa *paikallista muuttujaa* varsinaisen hilauksen jälkeen.

Seuraava koodi saattaisi ensi näkemältä aiheuttaa `ReferenceError`-virheen. Näin ei kuitenkaan tapahdu *hilauksen* ansiosta.

    // onko SomeImportantThing alustettu
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

Tämä toimii, koska `var`-lauseke on hilattu *globaalin näkyvyysalueen* huipulle.

    var SomeImportantThing;

    // mahdollista alustuskoodia

    // onhan se alustettu
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### Nimienerottelujärjestys

Kaikki JavaScriptin näkyvyysalueet, *globaalin näkyvyysalue* mukaanlukien, sisältävät erikoismuuttujan [`this`](#function.this). `this` viittaa *tämänhetkiseen olioon*.

Funktioiden näkyvyysalueet sisältävät myös [`arguments`](#function.arguments)-olion. Se sisältää funktiolle annetut argumentit.

Mikäli näkyvyysalueen sisällä pyritään pääsemään käsiksi esimerkiksi `foo`:n arvoon JavaScript käyttäytyy seuraavasti:

 1. Mikäli `var foo`-lauseke löytyy tämänhetkisestä näkyvyysalueesta, käytä sen arvoa.
 2. Mikäli eräs funktion parametreista on `foo`, käytä sitä.
 3. Mikäli funktion nimi itsessään on `foo`, käytä sitä.
 4. Siirry ulompaan näkyvyysalueeseen ja suorita **#1** uudelleen.

> **Huomio:** Mikäli funktio sisältää `arguments`-nimisen parametrin, estää se `arguments`-olion luonnin kokonaan.

### Nimiavaruudet

Globaalin nimiavaruuden ongelmana voidaan pitää nimitörmäyksiä. JavaScriptissä tätä ongelmaa voidaan kiertää käyttämällä *nimettömiä kääreitä*.

    (function() {
        // "nimiavaruus" itsessään
        
        window.foo = function() {
            // paljastettu sulkeuma
        };

    })(); // suorita funktio heti

Nimettömiä funktioita pidetään [lauseina](#function.general). Jotta niitä voidaan kutsua, tulee ne suorittaa ensin.

    ( // suorita sulkeiden sisältämä funktio
    function() {}
    ) // ja palauta funktio-olio
    () // kutsu suorituksen tulosta

Samaan lopputulokseen voidaan päästä myös hieman eri syntaksia käyttäen.

    // Kaksi muuta tapaa
    +function(){}();
    (function(){}());

### Yhteenveto

On suositeltavaa käyttää *nimettömiä kääreitä* nimiavaruuksina. Sen lisäksi, että se suojelee koodia nimitörmäyksiltä, se tarjoaa keinon jaotella ohjelma paremmin.

Globaalien muuttujien käyttöä pidetään yleisesti **huonona tapana**. **Mikä tahansa** niiden käyttö viittaa huonosti kirjoitettuun, virheille alttiiseen ja hankalasti ylläpidettävään koodiin.

