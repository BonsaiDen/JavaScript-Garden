## Tyyppimuunnokset

JavaScript on tyypitetty *heikosti*. Tämä tarkoittaa sitä, että se pyrkii *pakottamaan tyyppejä* *aina* kun se on mahdollista.

    // Nämä ovat totta
    new Number(10) == 10; // Number.toString() muutetaan
                          // takaisin numeroksi

    10 == '10';           // Merkkijonot muutetaan Number-tyyppiin
    10 == '+10 ';         // Lisää merkkijonohauskuutta
    10 == '010';          // Ja lisää
    isNaN(null) == false; // null muuttuu nollaksi,
                          // joka ei ole NaN
    
    // Nämä ovat epätosia
    10 == 010;
    10 == '-10';

> **ES5 Huomio:** Nollalla alkavat numeroliteraalit tulkitaan oktaaleina (kantaluku 8). Tuki oktaaleille on **poistettu** ECMAScript 5:den tiukassa moodissa.

Yllä havaittu käytös voidaan välttää käyttämällä [tiukkaa vertailuoperaattoria](#types.equality). Sen käyttöä suositellaan **lämpimästi**. Vaikka se välttääkin useita yleisiä ongelma, sisältää se omat ongelmansa, jotka johtavat juurensa JavaScriptin heikkoon tyypitykseen.

### Natiivien tyyppien konstruktorit

Natiivien tyyppien, kuten `Number` tai `String`, konstruktorit käyttäytyvät eri tavoin `new`-avainsanan kanssa ja ilman.

    new Number(10) === 10;     // Epätosi, Object ja Number
    Number(10) === 10;         // Tosi, Number ja Number
    new Number(10) + 0 === 10; // Tosi, johtuu tyyppimuunnoksesta

`Number`-tyypin kaltaisen natiivityypin käyttäminen luo uuden `Number`-olion. `new`-avainsanan pois jättäminen tekee `Number`-funktiosta pikemminkin muuntimen.

Tämän lisäksi literaalit tai ei-oliomaiset arvot johtavat edelleen uusiin tyyppimuunnoksiin.

Paras tapa suorittaa tyyppimuunnoksia on tehdä niitä **selvästi**.

### Muunnos merkkijonoksi

    '' + 10 === '10'; // tosi

Arvo voidaan muuttaa merkkijonoksi helposti lisäämällä sen eteen tyhjä merkkijono.

### Muunnos numeroksi

    +'10' === 10; // tosi

**Unaarinen** plus-operaattori mahdollistaa numeroksi muuttamisen.

### Muunnos totuusarvoksi

Arvo voidaan muuttaa totuusarvoksi käyttämällä **not**-operaattoria kahdesti.

    !!'foo';   // tosi
    !!'';      // epätosi
    !!'0';     // tosi
    !!'1';     // tosi
    !!'-1'     // tosi
    !!{};      // tosi
    !!true;    // tosi


