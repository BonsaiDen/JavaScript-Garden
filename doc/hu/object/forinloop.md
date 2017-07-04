## A `for in` ciklus

Csak úgy, mint a jó öreg `in` operátor, a `for in` is bejárja az egész
prototípus láncot, amikor egy objektum mezőin próbálnánk iterálni.

> **Megjegyzés:** A `for in` ciklus **nem** fog iterálni azokon a mezőkön,
> amelyeknek az `enumerable` tulajdonsága `false`-ra van állítva. Például a 
> `length` mező nem kerül az iterációba amikor egy tömbön iterálnánk végig.
    
    // Mérgezzük Object.prototype-ot!
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // mind a moo és bar is kiírásra kerül
    }

Mivel -hála égnek- magának a `for in` ciklusnak a működését nem lehet befolyásolni,
így más módszert kell találnunk ahhoz hogy száműzzük a váratlan mezőket a ciklus magból.
(Értsd: Azokat amelyek a prototípus láncon csücsülnek csak). Ezt pedig az `Object.prototype`-ban
lakó [`hasOwnProperty`](#object.hasownproperty) függvény használatával érhetjük el.

> **Fontoljuk meg:** Mivel a `for in` mindig bejárja a teljes prototípus láncot,
> így minnél több elemet adunk a származtatási láncunkba, annál lassabban fog tekerni.

### Szűrés használata a `hasOwnProperty`-vel

    // még mindig a fenti foo-nál tartunk
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

Ez az egyetlen helyes útja annak, hogy az objektum saját mezőin iteráljunk csak végig.
Mivel a `hasOwnProperty`-t használjuk, így csak a várt `moo`-t fogja kiírni. Tehén jó
kódunk van! Hogyha a `hasOwnProperty`-t kihagynánk, a kódunk ki lenne téve nem várt
hibáknak, amik pl. abból fakadnak, hogy valaki ocsmányul kiterjesztette az
`Object.prototype`-t.

Például, ha a [Prototype][1] frameworköt használjuk, és nem ilyen stílusban írjuk a
ciklusainkat, a hibák szinte garantáltak, ugyanis ők saját szájízükre kiterjesztik az
`Object.prototype`-t.

### Konklúzió

A `hasOwnProperty` használata erősen javasolt. Soha ne éljünk pozitív
feltételezésekkel a futó kódot illetően, főleg olyan döntésekben nem érdemes
orosz rulettezni, mint hogy kiterjeszti-e valaki a natív prototípusokat vagy nem.
Mert általában igen.

[1]: http://www.prototypejs.org/

