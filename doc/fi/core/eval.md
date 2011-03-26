## Miksi `eval`-funktiota tulee välttää

`eval` suorittaa JavaScript-koodia sisältävän merkkijonon paikallisessa näkyvyysalueessa.

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

`eval` suoritetaan paikallisessa näkyvyysalueessa ainoastaan kun sitä kutsutaan **suorasti** *ja* kutsutun funktion nimi on todellisuudessa `eval`.

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3

`eval`-funktion käyttöä tulee välttää **ehdottomasti**. 99.9% sen "käyttötapauksista" voidaan toteuttaa **ilman** sitä.
    
### Piilotettu `eval`

[Aikakatkaisufunktiot](#other.timeouts) `setTimeout` and `setInterval` voivat kumpikin ottaa merkkijonon ensimmäisenä argumenttinaan. Kyseinen merkkijono suoritetaan **aina** globaalissa näkyvyysalueessa, koska tuolloin `eval`-funktiota kutsutaan epäsuorasti.

### Turvallisuusongelmat

`eval` on myös turvallisuusongelma. Se suorittaa **minkä tahansa** sille annetun koodin. Tämän vuoksi sitä ei tule **ikinä** käyttää tuntemattomasta tai epäluotttavasta lähteestä tulevien merkkijonojen kanssa.

### Yhteenveto

`eval`-funktiota ei pitäisi käyttää koskaan. Mikä tahansa sitä käyttävä koodi on kyseenalaista sekä suorituskyvyn että turvallisuuden suhteen. Mikäli jokin tarvitsee `eval`-funktiota toimiakseen, tulee sen suunnittelutapa kyseenalaistaa. Tässä tapauksessa on parempi suunnitella toisin ja välttää `eval`-funktion käyttöä.

