## `undefined` ja `null`

JavaScript sisältää kaksi erillistä arvoa `ei millekään`. Näistä hyödyllisempti on `undefined`.

### `undefined` ja sen arvo

`undefined` on tyyppi, jolla on vain yksi arvo: `undefined`.

Kieli määrittelee myös globaalin muuttujan, jonka arvo on `undefined`. Myös tätä arvoa kutsutaan nimellä `undefined`. Tämä muuttuja **ei** kuitenkaan ole vakio eikä kielen avainsana. Tämä tarkoittaa siis sitä, että sen *arvo* voidaan ylikirjoittaa.

> **ES5 Huomio:** ECMAScript 5:ssä `undefined`-tyyppiä ei voida *kirjoittaa* **enää** tiukassa moodissa. Sen nimi voidaan kuitenkin jättää katveeseen määrittelemällä esimerkiksi funktio, jonka nimi on `undefined`.

Seuraavat tapaukset palauttavat `undefined`-arvon:

 - Globaalin (muokkaamattoman) muuttujan `undefined` arvon haku.
 - Puuttuvista `return`-lauseista seuraavat epäsuorat palautusarvot.
 - `return`-lauseet, jotka eivät palauta selvästi mitään.
 - Olemattomien ominaisuuksien haut.
 - Funktioparametrit, joiden arvoa ei ole asetettu.
 - Mikä tahansa, joka on asetettu arvoon `undefined`.

### Arvon `undefined` muutosten hallinta

Koska globaali muuttuja `undefined` sisältää ainoastaan todellisen `undefined`-tyypin arvon kopion, **ei** sen asettamienn uudelleen muuta *tyypin* `undefined` arvoa.

Kuitenkin, jotta `undefined`-tyypin arvoa voidaan verrata, tulee sen arvo voida hakea jotenkin ensin.

Tätä varten käytetään yleisesti seuraavaa tekniikkaa. Ajatuksena on antaa itse arvo käyttäen [nimetöntä käärettä](#function.scopes).

    var undefined = 123;
    (function(something, foo, undefined) {
        // paikallisen näkyvyysalueen undefined 
        // voi viitata jälleen todelliseen arvoon

    })('Hello World', 42);

Samaan lopputuloksen voidaan päästä myös käyttämällä esittelyä kääreen sisällä.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

Tässä tapauksessa ainut ero on se, että pakattu versio vie 4 tavua enemmän tilaa 'var'-lauseen vuoksi.

### `null` ja sen käyttötapaukset

Vaikka `undefined`-arvoa käytetäänkin usein perinteisen *null*-arvon sijasta, todellinen `null` (sekä literaali että tyyppi) on enemmän tai vähemmän vain tietotyyppi.

Sitä käytetään joissain JavaScriptin sisäisissä toiminnoissa, kuten prototyyppiketjun pään toteamisessa (`Foo.prototype = null`). Useimmissa tapauksissa se voidaan korvata `undefined`-arvoa käyttäen.


