## Konstruktorit 

JavaScriptin konstruktorit eroavat monista muista kielistä selvästi. Jokainen funktiokutsu, joka sisältää avainsanan `new` toimii konstruktorina.

Konstruktorin - kutsutun funktion - `this`-muuttujan arvo viittaa luotuun `Object`-olioon. Tämän **uuden** olion [`prototyyppi`](#object.prototype) asetetaan osoittamaan konstruktorin kutsuman funktio-olion prototyyppiin.

Mikäli kutsuttu funktio ei sisällä selvää `return`-lausetta, tällöin se palauttaa `this`-muuttujan arvon eli uuden olion.

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

Yllä `Foo`:ta kutsutaan konstruktorina. Juuri luodun olion `prototyyppi` asetetaan osoittamaan ominaisuuteen `Foo.prototype`.

Selvän `return`-lausekkeen tapauksessa funktio palauttaa ainoastaan määritellyn lausekkeen arvon. Tämä pätee tosin **vain jos** palautettava arvo on tyypiltään `Object`.

    function Bar() {
        return 2;
    }
    new Bar(); // uusi olio

    function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // palautettu olio

Mikäli `new`-avainsanaa ei käytetä, funktio **ei** palauta uutta oliota.

    function Foo() {
        this.bla = 1; // asetetaan globaalisti
    }
    Foo(); // undefined

Vaikka yllä oleva esimerkki saattaa näyttää toimivan joissain tapauksissa, viittaa [`this`](#function.this) globaalin olion `this`-ominaisuuteen.

### Tehtaat

Mikäli `new`-avainsanan käyttöä halutaan välttää, voidaan konstruktori pakottaa palauttamaan arvo.

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }
    Bar.prototype = {
        foo: function() {}
    };

    new Bar();
    Bar();

Tässä tapauksessa molemmat `Bar`-funktion kutsut käyttäytyvät samoin. Kumpikin kutsu palauttaa olion, joka sisältää `method`-ominaisuuden. Kyseinen ominaisuus on [sulkeuma](#function.closures).

On myös tärkeää huomata, että kutsu `new Bar()` **ei** vaikuta palautetun olion prototyyppiin. Vaikka luodun olion prototyyppi onkin asetettu, `Bar` ei palauta ikinä kyseistä prototyyppioliota.

Yllä olevassa esimerkissä `new`-avainsanan käytöllä tai käyttämällä jättämisellä ei ole toiminnan kannalta mitään merkitystä.

### Tehtaiden käyttö uusien olioiden luomiseen

Usein suositellaan `new`-avainsanan käytön **välttämistä**. Tämä johtuu siitä, että sen käyttämättä jättäminen voi johtaa bugeihin.

Sen sijaan suositellaan käytettävän tehdasta, jonka sisällä varsinainen olio konstruoidaan.

    function Foo() {
        var obj = {};
        obj.value = 'blub';

        var private = 2;
        obj.someMethod = function(value) {
            this.value = value;
        }

        obj.getPrivate = function() {
            return private;
        }
        return obj;
    }

Vaikka yllä oleva esimerkki välttää `new`-avainsanan käyttöä ja tekee [paikallisten muuttujien](#function.closures) käytön helpommaksi, sisältää se joitain huonoja puolia. 

 1. Se käyttää enemmän muistia. Tämä johtuu siitä, että luodut oliot **eivät** jaa prototyypin metodeja.
 2. Perinnän tapauksessa tehtaan tulee kopioida toisen olion kaikki metodit tai vaihtoehtoisesti asettaa kyseinen olio toisen prototyypiksi.
 3. Prototyyppiketjun käsitteen unohtaminen on vain välttääksemme `new`-avainsanan käyttöä on vastoin kielen filosofista perustaa.

### Yhteenveto

Vaikka `new`-avainsanan käyttö voi johtaa bugeihin, prototyyppien käyttöä **ei** kannata unohtaa kokonaan. Loppujen lopuksi kyse on siitä, kumpi tapa sopii sovelluksen tarpeisiin paremmin. On erityisen tärkeää valita jokin tietty tapa ja **pitäytyä** sen käytössä.

