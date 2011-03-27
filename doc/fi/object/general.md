## Olioiden käyttö ja ominaisuudet

Kaikki muuttujat, kahta poikkeusta lukuunottamatta, käyttäytyvät JavaScriptissä oliomaisesti. Nämä poikkeukset ovat [`null`](#core.undefined) sekä [`undefined`](#core.undefined).

    false.toString() // epätosi
    [1, 2, 3].toString(); // '1,2,3'
    
    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

Yleisesti luullaan ettei numeroliteraaleja voida käyttää olioina. Tämä johtuu viasta JavaScriptin parserissa. Se yrittää parsia numeron *pistenotaatiota* liukulukuliteraalina.

    2.toString(); // palauttaa SyntaxError-virheen

Tämä voidaan välttää esimerkiksi seuraavasti.

    2..toString(); // toinen piste tunnistuu oikein
    2 .toString(); // huomaa pisteen vasemmalla puolen oleva väli
    (2).toString(); // 2 arvioidaan ensi

### Oliot tietotyyppinä

JavaScriptin olioita voidaan käyttää myös [*hajautustauluna*][1], koska ne muodostavat pääasiassa avaimien ja niihin liittyvien arvojen välisen mappauksen.

Olioliteraalinotaatiota - `{}` - käyttäen voidaan luoda tyhjä olio. Tämä olio [perii](#object.prototype) `Object.prototype`-olion eikä sille ole määritelty [omia ominaisuuksia](#object.hasownproperty).

    var foo = {}; // uusi, tyhjä olio

    // uusi, tyhjä olio, joka sisältää ominaisuuden 'test' arvolla 12
    var bar = {test: 12}; 

### Pääsy ominaisuuksiin

Olion ominaisuuksiin voidaan päästä käsiksi kahta eri tapaa käyttäen. Siihen voidaan käyttää joko piste- tai hakasulkunotaatiota.

    var foo = {name: 'Kitten'}
    foo.name; // kitten
    foo['name']; // kitten
    
    var get = 'name';
    foo[get]; // kitten
    
    foo.1234; // SyntaxError
    foo['1234']; // toimii

Kumpikin notaatio toimii samalla tavoin. Ainut ero liittyy siihen, että hakasulkunotaation avulla ominaisuuksien arvoja voidaan asettaa dynaamisesti. Se sallii myös muuten hankalien, virheeseen johtavien nimien käyttämisen.

### Ominaisuuksien poistaminen

Ainut tapa poistaa olion ominaisuus on käyttää `delete`-operaattoria. Ominaisuuden asettaminen joko arvoon `undefined` tai `null` poistaa vain siihen liittyneen arvon muttei itse *avainta*.

    var obj = {
        bar: 1,
        foo: 2,
        baz: 3
    };
    obj.bar = undefined;
    obj.foo = null;
    delete obj.baz;

    for(var i in obj) {
        if (obj.hasOwnProperty(i)) {
            console.log(i, '' + obj[i]);
        }
    }

Yllä oleva koodi tulostaa sekä `both undefined` että `foo null`. Ainoastaan `baz` on poistettu. Täten sitä ei myöskään näy tulosteessa.

### Avainnotaatio

    var test = {
        'case': 'Olen avainsana, joten minun tulee olla merkkijono',
        delete: 'Myös minä olen avainsana' // palauttaa SyntaxError-virheen
    };

Olioiden ominaisuuksia voidaan notatoida käyttäen joko pelkkiä merkkejä tai merkkijonoja. Toisesta JavaScriptin suunnitteluvirheestä johtuen yllä oleva koodi palauttaa `SyntaxError`-virheen ECMAScript 5:ttä edeltävissä versioissa.

Tämä virhe johtuu siitä, että `delete` on *avainsana*. Täten se tulee notatoida *merkkijonona*. Tällöin myös vanhemmat JavaScript-tulkit ymmärtävät sen oikein.

[1]: http://en.wikipedia.org/wiki/Hashmap

