## A `typeof` vizsgálat

A `typeof` operátor (az [`instanceof`](#types.instanceof)-al karöltve) 
lehetőség szerint a JavaScript nyelv egyik legnagyobb buktatója, mivel majdnem
teljesen **rosszul működik**.

Habár az `instanceof`-nak korlátozottan még lehet értelme, a `typeof` operátor
tényleg csak egyetlen praktikus use case-el rendelkezik és ez **nem** az, hogy egy
objektum típusvizsgálatát elvégezzük.

> **Megjegyzés:** Mivel a `typeof` vizsgálatot ravaszul úgy is le lehet írni,
> mintha egy függvény lenne; `typeof(obj)`, itt jegyezzük meg hogy ez nem
> egy függvényhívás. A zárójelek ebben a kifejezésben úgy működnek mint általában,
> kiértékelik az obj változót és visszaadják az értékét. Ez pedig bekerül a 
> `typeof` operandusaként. **Nincsen** `typeof` függvény.