## Automaattiset puolipisteet

Vaikka JavaScript käyttääkin C:n tapaista syntaksia, se **ei** pakota käyttämään puolipisteitä. Niiden käyttöä voidaan halutessa välttää.

Tästä huolimatta JavaScript ei kuitenkaan ole puolipisteetön kieli. Se tarvitsee niitä ymmärtääkseen lähdekoodia. Tämän vuoksi JavaScript-parseri lisää niitä tarpeen mukaan **automaattisesti**.

    var foo = function() {
    } // parsimisvirhe, lisätään puolipiste
    test()

Lisäys tapahtuu ja parseri yrittää uudelleen.

    var foo = function() {
    }; // ei virhettä, parsiminen jatkuu
    test()

Automaattista puolipisteiden lisäämistä pidetään eräänä JavaScriptin **suurimmista** suunnitteluvirheistä. Tämä johtuu siitä, että se voi muuttaa tapaa, jolla koodi käyttäytyy.

### Kuinka se toimii

Alla oleva koodi ei sisällä puolipisteitä. Täten niiden lisääminen jää parserin tehtäväksi.

    (function(window, undefined) {
        function test(options) {
            log('testing!')

            (options.list || []).forEach(function(i) {

            })

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            )

            return
            {
                foo: function() {}
            }
        }
        window.test = test

    })(window)

    (function(window) {
        window.someLibrary = {}

    })(window)

Alla parserin arvaus.

    (function(window, undefined) {
        function test(options) {

            // Not inserted, lines got merged
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- lisätty

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- lisätty

            return; // <- lisätty, rikkoo return-lauseen
            { // kohdellaan lohkona

                // nimike ja yhden lausekkeen lause
                foo: function() {} 
            }; // <- lisätty
        }
        window.test = test; // <- lisätty

    // Rivit yhdistettiin jälleen
    })(window)(function(window) {
        window.someLibrary = {}; // <- lisätty

    })(window); //<- lisätty

> **Huomio:** JavaScript-parseri ei käsittele return-lauseita ja rivivaihtoja "kunnolla". Vaikka tämä ei välttämättä olekaan parserin vika, voi siitä seurata epämiellyttäviä sivuvaikutuksia.

Yllä olevassa tapauksessa parseri muutti huomattavasti koodin käytöstä. Joissain tapauksissa se tekee kokonaan **väärän asian**.

### Johtavat sulkeet

Parseri **ei** lisää puolipistettä johtavien sulkeiden tapauksessa.

    log('testing!')
    (options.list || []).forEach(function(i) {})

Koodi muuttuu seuraavaksi.

    log('testing!')(options.list || []).forEach(function(i) {})

On **hyvin** mahdollista, että `log` **ei** palauta funktiota. Tästä johtuen yllä oleva palauttanee `TypeError`-virheen, joka toteaa että `undefined ei ole funktio`.

### Yhteenveto

On suositeltavaa ettei puolipisteitä jätetä pois **milloinkaan**. Tämän lisäksi sulut kannattaa pitää niitä vastaavien lausekkeiden kanssa samalla rivillään. `if` ja `else`-lauseiden tapauksessa sulkuja kannattaa käyttää aina. Sen lisäksi että edellä mainitut suositukset tekevät koodista johdonmukaisempaa, estävät ne myös JavaScript-parseria muuttamasta sen käytöstapaa.

