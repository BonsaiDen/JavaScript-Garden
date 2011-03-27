## Kuinka `this` toimii

JavaScripting `this` toimii eri tavoin kuin useimmissa kielissä. Tarkalleen ottaen on olemassa **viisi** eri tapaa, joiden mukaan sen arvo voi määrittyä.

### Globaali näkyvyysalue

    this;

Kun `this`-muuttujaa käytetään globaalissa näkyvyysalueessa, viittaa se *globaaliin* olioon.

### Funktiokutsu

    foo();

Tässä tapauksessa `this` viittaa jälleen *globaaliin* olioon.

> **ES5 Huomio:** Globaalia tapausta ei ole **enää** olemassa, kun käytetään tiukkaa moodia. Sen sijaan `this` saa arvon `undefined`.

### Metodikutsu

    test.foo(); 

Tässä esimerkissä `this` viittaa `test`-olioon.

### Konstruktorikutsu

    new foo(); 

Funktiokutsu, jota edeltää `new`-avainsana toimii [konstruktorina](#function.constructors). Funktion sisällä `this` viittaa *juuri luotuun* `Object`-olioon.

### `this`-arvon asettaminen

    function foo(a, b, c) {}
                          
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // taulukko laajenee alla olevaksi
    foo.call(bar, 1, 2, 3); // tuloksena a = 1, b = 2, c = 3

`Function.prototype`-olion `call`- ja `apply`-metodeita käytettäessä `this`-ominaisuuden arvo määrittyy ensimmäisen annetun argumentin perusteella.

Seurauksena `foo`-funktion sisältämä `this` asettuu `bar`-olioon toisin kuin perustapauksessa.

> **Huomio:** `this` **ei voi** viitata `Object`-literaalin sisältämään olioon. Tästä seuraa, että `var obj = {me: this}` tapauksessa `me` **ei** viittaa `obj`-olioon. `this`-arvo määrittyy ainoastaan listatuissa viidessä tapauksessa.

### Yleisiä ongelmakohtia

Useimmat näistä tapauksista ovat järkeviä. Ensimmäistä niistä tosin voidaan pitää suunnitteluvirheenä, jolle ei ole mitään järkevää käyttöä **ikinä**.

    Foo.method = function() {
        function test() {
            // this asettuu globaaliin olioon
        }
        test();
    }

Yleisesti luullaan, että test-funktion sisältämä `this` viittaa tässä tapauksessa `Foo`-olioon. Todellisuudessa se **ei** kuitenkaan tee näin.

Jotta `Foo`-olioon voidaan päästä käsiksi `test`-funktion sisällä, tulee metodin sisälle luoda paikallinen muuttuja, joka viittaa `Foo`-olioon.

    Foo.method = function() {
        var that = this;
        function test() {
            // Käytä thatia thissin sijasta
        }
        test();
    }

`that` on normaali nimi, jota käytetään yleisesti viittaamaan ulompaan `this`-muuttujaan. [Sulkeumia](#function.closures) käytettäessä `this`-arvoa voidaan myös välittää edelleen.

### Metodien sijoittaminen

JavaScriptissä funktioita **ei** voida nimetä uudelleen eli siis sijoittaa **edelleen**.

    var test = someObject.methodTest;
    test();

Ensimmäisestä tapauksesta johtuen `test` toimii kuten normaali funktiokutsu; tällöin sen sisältämä `this` ei enää osoita `someObject`-olioon.

Vaikka `this`-arvon myöhäinen sidonta saattaa vaikuttaa huonolta idealta, se mahdollistaa [prototyyppeihin pohjautuvan perinnän](#object.prototype).

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

Kun `method`-metodia kutsutaan `Bar`-oliossa, sen `this` viittaa juurikin tuohon olioon.


