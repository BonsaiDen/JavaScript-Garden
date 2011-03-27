## Sulkeumat ja viitteet

*Sulkeumat* ovat eräs JavaScriptin voimakkaimmista ominaisuuksista. Näkyvyysalueilla on siis **aina** pääsy ulompaan näkyvyysalueeseensa. Koska JavaScriptissä ainut tapa määritellä näkyvyyttä pohjautuu [funktionäkyvyyteen](#function.scopes), kaikki funktiot käyttäytyvät oletuksena sulkeumina.

### Paikallisten muuttujien emulointi

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

Tässä tapauksessa `Counter` palauttaa **kaksi** sulkeumaa. Funktion `increment` lisäksi palautetaan myös funktio `get`. Kumpikin funktio **viittaa** `Counter`-näkyvyysalueeseen ja pääsee siten käsiksi `count`-muuttujan arvoon.

### Miksi paikalliset muuttujat toimivat

JavaScriptissä ei voida viitata näkyvyysalueisiin. Tästä seuraa **ettei** `count`-muuttujan arvoon voida päästä käsiksi funktion ulkopuolelta. Ainoastaan nämä kaksi sulkeumaa mahdollistavat sen.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

Yllä oleva koodi **ei** muuta muuttujan `count` arvoa `Counter`-näkyvyysalueessa. Tämä johtuu siitä, että `foo.hack`-ominaisuutta ei ole määritelty **kyseisessä** näkyvyysalueessa. Sen sijaan se luo - tai ylikirjoittaa - *globaalin* muuttujan `count`.

### Sulkeumat luupeissa

Usein sulkeumia käytetään väärin luuppien sisällä indeksimuuttujien arvon kopiointiin.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

Yllä oleva koodi **ei** tulosta numeroita `nollasta` `yhdeksään`. Sen sijaan se tulostaa numeron `10` kymmenen kertaa.

*Nimetön* funktio saa **viitteen** `i`-muuttujaan `console.log`-kutsuhetkellä. Tällöin luuppi on jo suoritettu ja `i`:n arvoksi on asetettu `10`.

Päästäksemme haluttuun lopputulokseen on tarpeen luoda **kopio** `i`:n arvosta.

### Viiteongelman välttäminen

Voimme välttää ongelman käyttämällä [nimetöntä käärettä](#function.scopes).

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

Nimetöntä ulkofunktiota kutsutaan heti käyttäen `i`:tä se ensimmäisenä argumenttina. Tällöin se saa kopion `i`:n **arvosta** parametrina `e`.

Nimetön funktio, jolle annetaan `setTimeout` sisältää nyt viitteen `e`:hen, jonka arvoa luuppi **ei** muuta.

Samaan lopputulokseen voidaan päästä myös palauttamalla funktio nimettömästä kääreestä. Tällöin se käyttäytyy samoin kuten yllä.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }

