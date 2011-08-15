## Funktiomääreet ja lausekkeet

JavaScriptissä funktiot ovat ensimmäisen luokan olioita. Tämä tarkoittaa sitä, että niitä voidaan välittää kuten muitakin arvoja. Usein tätä käytetään takaisinkutsuissa käyttämällä *nimettömiä, mahdollisesti asynkronisia funktioita*. 

### `function`-määre

    function foo() {}

Yllä oleva funktio [hilataan](#function.scopes) ennen ohjelman suorituksen alkua. Se näkyy *kaikkialle* näkyvyysalueessaan, jossa se on *määritelty*. Tämä on totta jopa silloin, jos sitä kutsutaan ennen määrittelyään.

    foo(); // Toimii, koska foo on luotu ennen kuin koodi suoritetaan
    function foo() {}

### `function`-lauseke

    var foo = function() {};

Tämä esimerkki asettaa nimeämättömän ja *nimettömän* funktion muuttujan `foo` arvoksi.

    foo; // 'undefined'
    foo(); // tämä palauttaa TypeError-virheen
    var foo = function() {};

`var` on määre. Tästä johtuen se hilaa muuttujanimen `foo` ennen kuin itse koodia ryhdytään suorittamaan.

Sijoituslauseet suoritetaan *vasta* kun niihin saavutaan. Tästä johtuen `foo` saa arvokseen [undefined](#core.undefined) ennen kuin varsinaista sijoitusta päästään suorittamaan.

### Nimetty funktiolauseke

Nimettyjen funktioiden sijoitus tarjoaa toisen erikoistapauksen.

    var foo = function bar() {
        bar(); // Toimii
    }
    bar(); // ReferenceError

Tässä tapauksessa `bar` ei ole saatavilla ulommalla näkyvyysalueessa. Tämä johtuu siitä, että se on sidottu `foo`:n sisälle. Tämä johtuu siitä, kuinka näkyvyysalueet ja niihin kuuluvat jäsenet [tulkitaan](#function.scopes). Funktion nimi on *aina* saatavilla sen paikallisessa näkyvyysalueessa itsessään.

