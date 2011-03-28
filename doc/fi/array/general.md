## Taulukon iterointi ja attribuutit

Vaikka taulukot ovatkin JavaScript-olioita, niiden tapauksessa ei välttämättä kannata käyttää [`for in loop`](#object.forinloop)-luuppia. Pikemminkin tätä tapaa tulee **välttää**.

> **Huomio:** JavaScript-taulukot **eivät ole** *assosiatiivisia*. JavaScriptissa ainoastaan [oliot](#object.general) ovat avain-arvo-mappauksia. On huomattavaa, että toisin kuin assosiatiiviset taulukot, oliot **eivät** säilytä järjestystään.

`for in`-luuppi iteroi kaikki prototyyppiketjun sisältämät ominaisuudet. Tämän vuoksi tulee käyttää erityistä  [`hasOwnProperty`](#object.hasownproperty)-metodia, jonka avulla voidaan taata, että käsitellään oikeita ominaisuuksia. Tästä johtuen iteroint on jo lähtökohtaisesti jopa **kaksikymmentä** kertaa hitaampaa kuin normaalin `for`-luupin tapauksessa.

### Iterointi

Taulukkojen tapauksessa paras suorituskyky voidaan saavuttaa käyttämällä klassista `for`-luuppia.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

Edelliseen esimerkkiin liittyy yksi mutta. Listan pituus on tallennettu välimuistiin erikseen käyttämällä `l = list.length`-lauseketta.

Vaikka `length`-ominaisuus määritelläänkin taulukossa itsessään, arvon hakeminen sisältää ylimääräisen operaation. Uudehkot JavaScript-ympäristöt **saattavat** optimoida tämän tapauksen. Tästä ei kuitenkaan ole mitään takeita.

Todellisuudessa välimuistin käytön pois jättäminen voi hidastaa luuppia jopa puolella.

### `length`-ominaisuus

`length`-ominaisuuden *getteri* palauttaa yksinkertaisesti taulukon sisältämien alkioiden määrän. Sen *setteriä* voidaan käyttää taulukon **typistämiseen**.

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]

    foo.length = 6;
    foo; // [1, 2, 3]

Pituuden pienemmäksi asettaminen typistää taulukkoa. Sen kasvattaminen ei kuitenkaan vaikuta mitenkään.

### Yhteenveto

Parhaan suorituskyvyn kannalta on parhainta käyttää tavallista `for`-luuppia ja tallentaa `length`-ominaisuus välimuistiin. `for in`-luupin käyttö taulukon tapauksessa on merkki huonosti kirjoitetusta koodista, joka on altis bugeille ja heikolle suorituskyvylle.

