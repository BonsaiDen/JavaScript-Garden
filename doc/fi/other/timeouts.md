### `setTimeout` ja `setInterval`

Koska JavaScript on luonteeltaan asynkroninen, voidaan funktioiden suoritusta ajastaa käyttäen `setTimeout` sekä `setInterval`-funktioita.

> **Huomio:** Aikakatkaisufunktiot **eivät** ole osa ECMAScript-standardia. Ne on toteutettu osana [DOM][1]ia.

    function foo() {}
    var id = setTimeout(foo, 1000); // palauttaa Numeron > 0

Kun `setTimeout`-funktiota kutsutaan, se palauttaa aikakatkaisun tunnisteen ja ajastaa `foo`-funktion suoritettavaksi **suunnilleen** tuhannen millisekunnin päästä. `foo` suoritetaan tarkalleen **kerran**.

Käytössä olevan JavaScript-tulkin ajastimen tarkkuudesta, JavaScriptin yksisäikeisyydestä sekä muusta koodista riippuen ei ole **lainkaan** taattua, että viive on tarkalleen sama kuin määritelty.

Ensimmäisenä annettu funktio suoritetaan *globaalisti*. Tämä tarkoittaa sitä, että sen [`this`](#function.this) on asetettu osoittamaan globaaliin olioon.

    function Foo() {
        this.value = 42;
        this.method = function() {
            // this viittaa globaaliin olioon
            console.log(this.value); // tulostaa undefined
        };
        setTimeout(this.method, 500);
    }
    new Foo();

> **Huomio:** Koska `setTimeout` ottaa **funktio-olion** ensimmäisenä parametrinaan, usein sitä kutsutaan seuraavasti: `setTimeout(foo(), 1000)`. Tässä tapauksessa se käyttää `foo`:n **palauttamaa arvoa** `foo`:n sijaan. Tämä on hiljainen virhe, koska jos funktio palauttaa arvon `undefined`, `setTimeout` *ei* palauta virhettä. 

### Kutsujen pinoaminen `setInterval`-funktion avulla

`setTimeout` suoritetaan vain kerran. `setInterval` sen sijaan, kuten nimestä voi päätellä, suoritetaan **aina** `X` millisekunnin välein. Sen käyttöä ei kuitenkaan suositella.

Mikäli suoritettava koodi blokkaa katkaisufunktion kutsun, `setInterval` lisää kutsuja pinoon. Tämä voi olla ongelmallista erityisesti, mikäli käytetään pieniä intervalliarvoja.

    function foo(){
        // jotain joka blokkaa sekunnin ajaksi
    }
    setInterval(foo, 100);

Yllä olevassa koodissa `foo`-funktiota kutsutaan, jonka jälleen se blokkaa sekunnin ajan.

Tämän ajan aikana `setInterval` kasvattaa kutsupinon sisältöä. Kun `foo` on valmis, kutsupinoon on ilmestynyt jo **kymmenen** uutta kutsua suoritettavaksi.

### Mahdollisesti blokkaavan koodin kanssa pärjääminen

Helpoin ja joustavin tapa on käyttää `setTimeout`-funktiota funktiossa itsessään.

    function foo(){
        // jotain joka blokkaa sekunnin ajaksi
        setTimeout(foo, 100);
    }
    foo();

Sen lisäksi että tämä ratkaisu kapseloi `setTimeout`-kutsun, se myös estää kutsujen pinoutumisen ja tarjoaa joustavuutta. `foo` voi päättää halutaanko se suorittaa uudelleen vai ei.

### Katkaisujen poistaminen käsin

Katkaisuja ja intervalleja voidaan poistaa antamalla sopiva tunniste joko `clearTimeout`- tai `clearInterval`-funktiolle. Se kumpaa käytetään riippuu käytetystä `set`-funktiosta.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### Kaikkien katkaisujen poistaminen

JavaScript ei sisällä erityistä funktiota kaikkien katkaisujen ja/tai intervallien poistamiseen. Sen sijaan tämä voidaan toteuttaa raakaa voimaa käyttäen.

    // poista "kaikki" katkaisut
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

On mahdollista, että jopa tämän jälkeen on olemassa katkaisuja, jotka ovat käynnissä. Onkin siis suositeltavaa tallentaa katkaisujen tunnisteet jotenkin. Tällä tavoin ne voidaan poistaa käsin.

### Piilotettu `eval`

`setTimeout` ja `setInterval` voivat ottaa myös merkkijonon ensimmäisenä parametrinaan. Tätä ominaisuutta ei tule käyttää **ikinä**, koska se käyttää sisäisesti `eval`-funktiota.

> **Huomio:** Koska ECMAScript-standardi **ei** määrittele, kuinka katkaisujen tulee toimia, tapa jolla ne toimivat tässä tapauksessa voi vaihdella JavaScript-toteutuksesta riippuen. Esimerkiksi Microsoftin JScript käyttää `Function`-konstruktoria `eval`-funktion sijaan.

    function foo() {
        // kutsutaan
    }

    function bar() {
        function foo() {
            // ei kutsuta ikinä
        }
        setTimeout('foo()', 1000);
    }
    bar();

Koska `eval`-funktiota ei kutsuta [suoraan](#core.eval), `setTimeout`-funktiolle annettu merkkijono suoritetaan *globaalissa näkyvyysalueessa*. Tässä tapauksessa se ei siis käytä paikallista `bar`-funktion näkyvyysalueessa olevaa `foo`-funktiota.

Tämän lisäksi on suositeltavaa olla **käyttämättä** merkkijonoja parametrien antamiseen.

    function foo(a, b, c) {}
    
    // Älä käytä tätä IKINÄ
    setTimeout('foo(1,2, 3)', 1000)

    // Käytä nimetöntä funktiota sen sijaan
    setTimeout(function() {
        foo(a, b, c);
    }, 1000)

> **Huomio:** Vaikka syntaksi `setTimeout(foo, 1000, a, b, c)` onkin mahdollinen, ei sen käyttöä suositella. Tämä johtuu siitä, että sen käyttö voi johtaa virheisiin erityisesti [metodien](#function.this) kanssa.

### Yhteenveto

Merkkijonoa ei tule antaa `setTimeout`- tai `setInterval`-funktiolle **koskaan**. Tämä on selvä merkki **erittäin** huonosta koodista erityisesti mikäli sitä käytetään parametrien välittämiseen. Sen sijaan kannattaa käyttää *nimetöntä funktiota*, joka huolehtii varsinaisesta kutsusta.

Tämän lisäksi `setInterval`-funktion käyttöä tulee välttää. Tämä johtuu siitä, että sen JavaScript ei blokkaa sen vuorottajaa.

[1]: http://en.wikipedia.org/wiki/Document_Object_Model "Document Object Model"

