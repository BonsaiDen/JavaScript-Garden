## `hasOwnProperty`

Jotta voimme tarkistaa onko olion ominaisuus määritelty siinä *itsessään*, tulee käyttää erityistä `Object.prototype`-oliosta periytyvää `hasOwnProperty`-metodia. Tällä tavoin vältämme [prototyyppiketjun](#object.prototype) sisältämät ominaisuudet.

> **Huomio:** **Ei** riitä tarkistaa vain että ominaisuuden arvo on `undefined`. Ominaisuus voi hyvinkin olla olemassa. Sen arvoksi on vain satuttu asettamaan `undefined`.

`hasOwnProperty` on ainut JavaScriptin sisältämä metodi, joka käsittelee ominaisuuksia **eikä** käy prototyyppiketjun sisältöä läpi.

    // Object.prototypen myrkyttäminen
    Object.prototype.bar = 1; 
    var foo = {goo: undefined};
    
    foo.bar; // 1
    'bar' in foo; // tosi

    foo.hasOwnProperty('bar'); // epätosi
    foo.hasOwnProperty('goo'); // tosi

Ainoastaan `hasOwnProperty` palauttaa oikean ja odotetun tuloksen. Sen tietäminen on olennaista minkä tahansa olion ominaisuuksia iteroidessa. Tämä on **ainut** tapa löytää olion itsensä ominaisuudet prototyyppiketjusta riippumatta.

### `hasOwnProperty` ominaisuutena

JavaScript **ei** suojele `hasOwnProperty`-metodin nimeä. Täten on mahdollista, että olio voi sisältää samannimisen ominaisuuden. Jotta voimme saada oikeita tuloksia, tulee sen sijaan käyttää *ulkoista* `hasOwnProperty`-metodia.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Olkoon vaikka lohikäärmeitä'
    };

    foo.hasOwnProperty('bar'); // palauttaa aina epätoden

    // Käytä toisen olion hasOwnProperty-metodia ja kutsu sitä asettamalla
    // 'this' foohon
    ({}).hasOwnProperty.call(foo, 'bar'); // tosi

### Yhteenveto

Mikäli pitää selvittää kuuluuko ominaisuus olioon vai ei, **ainoastaan** `hasOwnProperty` voi kertoa sen. Tämän lisäksi on suositeltavaa käyttää `hasOwnProperty`-metodia osana **jokaista** [`for in`-luuppia](#object.forinloop). Tällä tavoin voidaan välttää natiivien [prototyyppien](#object.prototype) laajentamiseen liittyviä ongelmia.

