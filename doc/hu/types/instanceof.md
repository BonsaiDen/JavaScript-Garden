## Az `instanceof` operátor

Az `instanceof` operátor a két operandusának konstruktorait hasonlítja össze. 
Csak akkor bizonyul hasznosnak, amikor saját készítésű objektumokon alkalmazzuk.
Beépített típusokon ugyanolyan hasztalan alkalmazni mint a [typeof operátort](#types.typeof).

### Saját objektumok összehasonlítása

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // igaz
    new Bar() instanceof Foo; // igaz

    // Ez csak a Bar.prototypeot beállítja a Foo fv. objektumra,
    // de nem egy kimondott Foo példányra
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // hamis

### Az `instanceof` reakciója natív típusokra

    new String('foo') instanceof String; // igaz
    new String('foo') instanceof Object; // igaz

    'foo' instanceof String; // hamis
    'foo' instanceof Object; // hamis

Érdemes itt megjegyezni hogy az `instanceof` nem működik olyan objektumokon,
amelyek különböző JavaScript kontextusokból származnak (pl. különböző dokumentumok
a böngészőn belül), mivel a konstruktoruk nem pontosan ugyanaz az objektum lesz.

### Összegzésül

Az `instanceof`-ot tehát **csak** megegyező JS kontextusból származó, saját készítésű objektumoknál használjuk. Minden más felhasználása kerülendő, csak úgy mint a [`typeof`](#types.typeof) operátor esetén.