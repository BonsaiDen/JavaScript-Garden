## `instanceof`-operaattori

`instanceof`-operaattori vertaa kahden operandinsa konstruktoreita keskenään. Se on hyödyllinen ainoastaan, kun vertaillaan itsetehtyjä olioita. Natiivien tyyppien tapauksessa se on lähes yhtä hyödytön kuin [typeof-operaattori](#types.typeof).

### Itsetehtyjen olioiden vertailu

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // tosi
    new Bar() instanceof Foo; // tosi

    // Tämä asettaa vain Bar.prototype-ominaisuudeksi
    // funktio-olion Foo
    // Se ei kuitenkaan ole Foon todellinen instanssi
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // epätosi

### `instanceof` ja natiivit tyypit

    new String('foo') instanceof String; // tosi
    new String('foo') instanceof Object; // tosi

    'foo' instanceof String; // epätosi
    'foo' instanceof Object; // epätosi

On tärkeää huomata, että `instanceof` ei toimi olioilla, jotka tulevat muista JavaScript-konteksteista (esim. selaimen eri dokumenteista). Tässä tapauksessa niiden konstruktorit viittaavat eri olioon.

### Yhteenveto

`instanceof`-operaattoria tulee käyttää **ainoastaan**, mikäli käsitellään itsetehtyjä olioita saman JavaScript-kontekstin sisällä. Kuten [`typeof`](#types.typeof)-operaattorikin, myös muita sen käyttöjä tulee **välttää**.

