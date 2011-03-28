## `for in`-luuppi

Aivan kuten `in`-operaattori, myös `for in`-luuppi käy olion prototyyppiketjun läpi iteroidessaan sen ominaisuuksia.

> **Huomio:** `for in`-luuppi **ei** iteroi ominaisuuksia, joiden `enumerable`-attribuutti on asetettu arvoon `false`. Eräs esimerkki tästä on taulukon `length`-ominaisuus.

    // Object.prototypen myrkyttäminen
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // tulostaa sekä bar että moo
    }

Koska `for in`-luupin käytöstapaa ei voida muokata suoraan, tulee ei-halutut ominaisuudet karsia itse luupin sisällä. Tämä on mahdollista käyttäen `Object.prototype`-olion [`hasOwnProperty`](#object.hasownproperty)-metodia.

> **Huomio:** `for in`-luupin suorittaminen hidastuu sitä enemmän, mitä pidempi olion prototyyppiketju on. Tämä johtuu siitä, että se joutuu käymään koko ketjun sisällön läpi.

### `hasOwnProperty`-metodin käyttäminen karsimiseen

    // foo kuten yllä
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

Tämä versio on ainut oikea. Se tulostaa **ainoastaan** `moo`, koska se käyttää `hasOwnProperty`-metodia oikein. Kun se jätetään pois, on koodi altis virheille tapauksissa, joissa prototyyppejä, kuten `Object.prototype`, on laajennettu.

[Prototype][1] on eräs yleisesti käytetty ohjelmointialusta, joka tekee näin. Kun kyseistä alustaa käytetään, `for in`-luupit, jotka eivät käytä `hasOwnProperty`-metodia, menevät varmasti rikki.

### Yhteenveto

On suositeltavaa käyttää **aina** `hasOwnProperty`-metodia. Ei ole kannattavaa tehdä ajoympäristöön tai prototyyppeihin liittyviä oletuksia.

[1]: http://www.prototypejs.org/

