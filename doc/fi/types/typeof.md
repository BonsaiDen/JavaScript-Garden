## `typeof`-operaattori

`typeof`-operaattori, kuten myös [`instanceof`](#types.instanceof), on kenties JavaScriptin suurin suunnitteluvirhe. Tämä johtuu siitä, että nämä ominaisuudet ovat liki kokonaan käyttökelvottomia.

Vaikka `instanceof`-operaattorilla onkin tiettyjä rajattuja käyttötarkoituksia, `typeof`-operaattorille on olemassa vain yksi käytännöllinen käyttötapaus, joka **ei** tapahdu olion tyyppiä tarkasteltaessa.

> **Huomio:** Vaikka `typeof`-operaattoria voidaankin kutsua funktiomaisesti (`typeof(obj)`), ei tämä ole todellinen funktiokutsu. Sulut käyttäytyvät normaalisti ja niiden palauttamaa arvoa käytetään `typeof`-operaattorin operandina. `typeof`-funktiota **ei** ole olemassa.

### JavaScriptin tyyppitaulukko

    Arvo                Luokka     Tyyppi
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object (Nitro/V8-funktio)
    new RegExp("meow")  RegExp     object (Nitro/V8-funktio)
    {}                  Object     object
    new Object()        Object     object

Yllä olevassa taulukossa *Tyyppi* viittaa arvoon, jonka `typeof`-operaattori palauttaa. Kuten voidaan havaita, tämä arvo voi olla varsin ristiriitainen.

*Luokka* viittaa olion sisäisen `[[Luokka]]`-ominaisuuden arvoon.

> **Määritelmää lainaten:** `[[Luokka]]`-arvon tulee olla jokin seuraavista merkkijonoista. `Arguments`, `Array`, `Boolean`, `Date`, `Error`, `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

Jotta kyseiseen arvoon päästään käsiksi, tulee soveltaa `Object.prototype`-ominaisuuden `toString`-metodia.

### Olion luokka

Määritelmä antaa tarkalleen yhden keinon, jonka avulla `[[Luokka]]` arvoon voidaan päästä käsiksi. Tämä on mahdollista `Object.prototype.toString`-metodia käyttäen. 

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }
    
    is('String', 'test'); // tosi
    is('String', new String('test')); // tosi

Yllä olevassa esimerkissä `Object.prototype.toString`-metodia kutsutaan arvolla [this](#function.this), jonka arvo on asetettu olion `[[Luokka]]` arvoon.

> **ES5 Huomio:** Käytännöllisyyden vuoksi `Object.prototype.toString` palautusarvo **muutettiin** `Object`-arvosta `Null`- ja `Undefined`-arvoiksi ECMAScript 5:ssä.

### Määrittelemättömien muuttujien testaaminen

    typeof foo !== 'undefined'

Yllä oleva testi kertoo onko `foo` määritelty. Pelkästään siihen viittaaminen palauttaisi `ReferenceError`-virheen. Tämä on ainut asia, johon `typeof`-operaattoria kannattaa käyttää.

### Yhteenveto

Ainut tapa, jonka avulla olion tyyppi voidaan tarkistaa luotettavasti, on `Object.prototype.toString`-metodin käyttö, kuten yllä. Kuten yllä oleva tyyppitaulu näyttää, osa `typeof`-operaattorin palautusarvoista on huonosti määritelty. Tästä johtuen ne voivat erota toteutuksesta riippuen.

Muuttujan määrittelemättömyyden testaaminen on ainut tapaus, jossa `typeof`-operaattoria kannattaa käyttää. Muutoin sen käyttöä kannattaa välttää **hinnalla milla hyvänsä**.

