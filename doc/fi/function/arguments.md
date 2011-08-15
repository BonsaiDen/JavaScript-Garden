## `arguments`-olio

Jokainen JavaScriptin näkyvyysalue pääsee käsiksi erikoismuuttujaan nimeltään `arguments`. Tämä muuttuja sisältää listan kaikista funktiolle annetuista argumenteista.

> **Huomio:** Mikäli `arguments` on jo määritelty funktion sisällä joko näkyvyysalueen, `var`-lauseen tai parametrin kautta, `arguments`-oliota ei luoda.

`arguments`-olio **ei** ole `Array`. Sen semantiikka, erityisesti `length`-ominaisuus, muistuttaa taulukkoa. Tästä huolimatta se ei peri `Array.prototype`:stä ja on itse asiassa `Object`.

Tästä johtuen `arguments`-olioon **ei** voida soveltaa normaaleja taulukkometodeja, kuten `push`, `pop` tai `slice`. Vaikka iterointi onnistuukin `for`-luuppeja käyttäen, tulee se muuttaa aidoksi `Array`-olioksi ennen kuin siihen voidaan soveltaa näitä metodeja.

### Array-olioksi muuttaminen

Alla oleva koodi palauttaa uuden `Array`-olion, joka sisältää `arguments`-olion kaikki jäsenet.

    Array.prototype.slice.call(arguments);

Tämä muutos on luonteeltaan **hidas** eikä sitä suositella käytettävän suorituskykyä vaativissa osissa koodia.

### Argumenttien antaminen

Funktiosta toiselle voidaan antaa argumentteja seuraavasti.

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // tee jotain
    }

Toinen keino on käyttää sekä `call`- että `apply`-funktioita yhdessä ja luoda nopeita, sitomattomia kääreitä.

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // Luo "metodin" sitomaton versio 
    // Se ottaa seuraavat parametrit: this, arg1, arg2...argN
    Foo.method = function() {

        // Tulos: Foo.prototype.method.call(this, arg1, arg2... argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };


### Muodolliset parametrit ja argumenttien indeksit

`arguments`-olio luo sekä *getter*- että *setter*-funktiot sekä sen ominaisuuksille että myös funktion muodollisille parametreille.

Tästä seuraa, että muodollisen parametrin arvon muuttaminen muuttaa myös `arguments`-olion vastaavan ominaisuuden arvoa ja toisin päin.

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

### Suorituskykyyn liittyviä myyttejä ja totuuksia

`arguments`-olio luodaan aina paitsi jos se on jo julistettu nimenä funktiossa tai sen muodollisena parametrina. Tämä siitä huolimatta käytetäänkö sitä vai ei.

Sekä *getter*- ja *setter*-funktiot luodaan **aina**. Tästä seuraa, että niiden käytöllä ei ole juurikaan merkitystä suorituskyvyn kannalta.

> **ES5 Huomio:** Näitä *getter*- ja *setter*-funktioita ei luoda tiukassa moodissa.

On kuitenkin eräs tapaus, jossa suorituskyky kärsii. Tämä liittyy `arguments.callee`-ominaisuuden käyttöön.

    function foo() {
        arguments.callee; // tee jotain tällä funktio-oliolla
        arguments.callee.caller; // ja kutsuvalla funktio-oliolla
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // normaalisti tämä olisi inline-optimoitu
        }
    }

Yllä olevassa koodissa `foo`-kutsua ei voida [käsitellä avoimesti][1], koska sen tulee tietää sekä itsestään että kutsujasta. Sen lisäksi, että se haittaa suorituskykyä, rikkoo se myös kapseloinnin. Tässä tapauksessa funktio voi olla riippuvainen tietystä kutsuympäristöstä.

On **erittäin suositeltavaa** ettei `arguments.callee`-ominaisuutta tai sen ominaisuuksia käytetä **ikinä**.

> **ES5 Huomio:** Tiukassa moodissa `arguments.callee` palauttaa `TypeError`-virheen, koska se käyttö on vanhennettu.

[1]: http://en.wikipedia.org/wiki/Inlining

