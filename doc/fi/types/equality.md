## Yhtäsuuruus ja vertailut

JavaScript sisältää kaksi erilaista tapaa, joiden avulla olioiden arvoa voidaan verrata toisiinsa.

### Yhtäsuuruusoperaattori

Yhtäsuuruusoperaattori koostuu kahdesta yhtäsuuruusmerkistä: `==`

JavaScript tyypittyy *heikosti*. Tämä tarkoittaa sitä, että yhtäsuuruusoperaattori **muuttaa** tyyppejä verratakseen niitä keskenään.

    ""           ==   "0"           // epätosi
    0            ==   ""            // tosi
    0            ==   "0"           // tosi
    false        ==   "false"       // epätosi
    false        ==   "0"           // tosi
    false        ==   undefined     // epätosi
    false        ==   null          // epätosi
    null         ==   undefined     // tosi
    " \t\r\n"    ==   0             // tosi

Yllä oleva taulukko näyttää tyyppimuunnoksen tulokset. Tämä onkin eräs pääsyistä, minkä vuoksi `==`-operaattorin käyttöä pidetään huonona asiana. Sen käyttö johtaa hankalasti löydettäviin bugeihin monimutkaisista muunnossäännöistä johtuen.

Tämän lisäksi tyyppimuunnos vaikuttaa suorituskykyyn. Esimerkiksi merkkijono tulee muuttaa numeroksi ennen kuin sitä voidaan verrata toiseen numeroon.

### Tiukka yhtäsuuruusoperaattori

Tiukka yhtäsuuruusoperaattori koostuu **kolmesta** yhtäsuuruusmerkistä: `===`

Se toimii aivan kuten normaali yhtäsuuruusoperaattori. Se **ei** tosin tee minkäänlaista tyyppimuunnosta ennen vertailua.

    ""           ===   "0"           // epätosi
    0            ===   ""            // epätosi
    0            ===   "0"           // epätosi
    false        ===   "false"       // epätosi
    false        ===   "0"           // epätosi
    false        ===   undefined     // epätosi
    false        ===   null          // epätosi
    null         ===   undefined     // epätosi
    " \t\r\n"    ===   0             // epätosi

Yllä olevat tulokset ovat huomattavasti selkeämpiä ja mahdollistavat koodin menemisen rikki ajoissa. Tämä kovettaa koodia ja tarjoaa myös parempaa suorituskykyä siinä tapauksessa, että operandit ovat erityyppisiä.

### Olioiden vertailu

Vaikka sekä `==` ja `===` ovat **yhtäsuuruusoperaattoreita**, ne toimivat eri tavoin, kun ainakin yksi operandeista sattuu olemaan `Object`.

    {} === {};                   // epätosi
    new String('foo') === 'foo'; // epätosi
    new Number(10) === 10;       // epätosi
    var foo = {};
    foo === foo;                 // tosi

Tässä tapauksessa molemmat operaattorit vertaavat olion **identiteettiä** **eikä** sen arvoa. Tämä tarkoittaa sitä, että vertailu tehdään olion **instanssin** tasolla aivan, kuten Pythonin `is`-operaattorin tai C:n osoitinvertailun tapauksessa.

### Yhteenveto

On erittäin suositeltavaa, että ainoastaan **tiukkaa yhtäsuuruusoperaattoria** käytetään. Mikäli tyyppejä tulee muuttaa, tämä kannattaa tehdä [selvästi](#types.casting) sen sijaan että luottaisi kielen monimutkaisiin muunnossääntöihin.

