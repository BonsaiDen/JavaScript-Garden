## `Array`-konstruktori

`Array`-oletuskonstruktorin käytös ei ole lainkaan yksiselitteistä. Tämän vuoksi suositellaankin, että konstruktorin sijasta käytetään literaalinotaatiota `[]`.

    [1, 2, 3]; // Tulos: [1, 2, 3]
    new Array(1, 2, 3); // Tulos: [1, 2, 3]

    [3]; // Tulos: [3]
    new Array(3); // Tulos: []
    new Array('3') // Tulos: ['3']

Mikäli `Array`-konstruktorille annetaan vain yksi argumentti ja se on tyypiltään `Number`, konstruktori palauttaa uuden *harvan* taulukon, jonka `length`-attribuutti on asetettu annetun numeron mukaisesti. On tärkeää huomata, että **ainoastaan** `length` asetetaan tällä tavoin, todellisia taulukon indeksejä ei alusteta.

    var arr = new Array(3);
    arr[1]; // undefined
    1 in arr; // false, indeksiä ei ole alustettu

Tämä on käytännöllistä vain harvoin, kuten merkkijonon toiston tapauksessa. Tällöin voidaan välttää `for-luupin` käyttämistä.

    new Array(count + 1).join(stringToRepeat);

### Yhteenveto

`Array`-konstruktorin käyttöä tulee käyttää niin paljon kuin suinkin mahdollista. Sen sijaan on suositeltavaa käyttää literaalinotaatiota. Literaalit ovat lyhyempiä ja niiden syntaksi on selkeämpi. Tämän lisäksi ne tekevät koodista luettavampaa.

