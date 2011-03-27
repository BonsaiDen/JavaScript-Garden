## Prototyyppi

JavaScript ei sisällä klassista perintämallia. Sen sijaan se käyttää *prototyyppeihin* pohjautuvaa ratkaisua.

Usein tätä pidetään JavaScriptin eräänä suurimmista heikkouksista. Itse asiassa prototyyppipohjainen perintämalli on voimakkaampi kuin klassinen malli. Sen avulla voidaan mallintaa klassinen malli melko helposti. Toisin päin mallintaminen on huomattavasti vaikeampaa.

JavaScript on käytännössä ainut laajasti käytetty kieli, joka tarjoaa tuen prototyyppipohjaiselle perinnälle. Tästä johtuen mallien väliseen eroon tottuminen voi viedä jonkin akaa.

Ensimmäinen suuri ero liittyy siihen, kuinka perintä toimii. JavaScriptissä se pohjautuu erityisiin *prototyyppiketjuihin*.

> **Huomio:** Ainoastaan `Bar.prototype = Foo.prototype` johtaa siihen, että molemmat oliot jakavat **saman** prototyypin. Tällöin olioiden prototyyppeihin tehdyt muutokset heijastuvat siis molempiin. Usein tämä ei ole itse tarkoitus.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Aseta Barin prototyypin uuteen Foo-olioon
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Terve maailma';

    // Huolehdi siitä, että Bar on todellinen konstruktori
    Bar.prototype.constructor = Bar;

    var test = new Bar() // luo uusi bar

    // Prototyyppiketju
    test [Bar-olio]
        Bar.prototype [Foo-olio] 
            { foo: 'Terve maailma' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* etc. */ }

Yllä olio `test` perii sekä `Bar.prototype`- että `Foo.prototype`-olion. Tällöin se pääsee käsiksi `Foo`:ssa määriteltyy funktioon `method`. Se pääsee käsiksi myös ominaisuuteen `value`, jonka luotu `Foo`-olio sisältää prototyypissään. On tärkeää huomata, että `new Bar()` **ei** luo uutta `Foo`-oliota vaan käyttää uudelleen sen prototyyppiin asetettua. Tässä tapauksessa kaikki `Bar`-oliot jakavat siis **saman** `value`-ominaisuuden.

> **Huomio:** **Älä** käytä `Bar.prototype = Foo`-notaatiota. Tässä tapauksessa se ei osoita `Foo`n prototyyppiin vaan funktio-olioon `Foo`. Tällöin prototyyppiketju osoittaa itse asiassa `Function.prototype`-olioon eikä `Foo.prototype`-olioon, kuten oli tarkoitus. `method` ei siis tällöin olisi mukana prototyyppiketjussa.

### Ominaisuushaut

Kun olion ominaisuuksien arvoa haetaan, JavaScript käy prototyyppiketjua läpi **ylöspäin**, kunnes se löytää ominaisuuden nimeä vastaavan arvon.

Jos se saavuttaa ketjun huipun - `Object.prototype`-olion - eikä ole vieläkään löytänyt haettua ominaisuutta, se palauttaa [undefined](#core.undefined) arvon sen sijaan.

### Prototyyppi-ominaisuus

Vaikka Prototyyppi-ominaisuutta käytetään prototyyppiketjujen rakentamiseen, voidaan siihen asettaa **mikä tahansa** arvo. Mikäli arvo on primitiivi, se yksinkertaisesti jätetään huomiotta.

    function Foo() {}
    Foo.prototype = 1; // ei vaikutusta

Kuten esimerkissä yllä, prototyyppiin on mahdollista asettaa olioita. Tällä tavoin prototyyppiketjuja voidaan koostaa dynaamisesti.

### Suorituskyky

Prototyyppiketjussa korkealla olevien ominaisuuksien hakeminen voi hidastaa koodin kriittisiä osia. Tämän lisäksi olemattomien ominaisuuksien hakeminen käy koko ketjun läpi.

Ominaisuuksia [iteroidessa](#object.forinloop) prototyyppiketjun **jokainen** ominaisuus käydään läpi.

### Natiivien prototyyppien laajentaminen

JavaScript mahdollistaa `Object.prototype`-olion sekä muiden natiivityyppien laajentamisen.

Tätä tekniikkaa kutsutaan nimellä [apinapätsäämiseksi][1]. Se rikkoo *kapseloinnin. Vaikka yleisesti käytetyt alustat, kuten [Prototype][2], käyttävätkin sitä, ei ole olemassa yhtään hyvää syytä, minkä takia natiivityyppejä tulisi laajentaa *epästandardilla* toiminnallisuudella.

**Ainut** hyvä syy on uudempien JavaScript-tulkkien sisältämien ominaisuuksien siirtäminen vanhemmille alustoille. Eräs esimerkki tästä on [`Array.forEach`][3].

### Yhteenveto

Ennen kuin kirjoitat monimutkaista prototyyppiperintää hyödyntävää koodia, on **olennaista**, että ymmärrät täysin kuinka se toimii. Ota huomioon myös prototyyppiketjujen pituus ja riko niitä tarpeen mukaan välttääksesi suorituskykyongelmia. Huomioi myös, että natiiveja prototyyppejä ei tule laajentaa **milloinkaan** ellei kyse ole vain yhteensopivuudesta uudempien JavaScript-ominaisuuksien kanssa.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

