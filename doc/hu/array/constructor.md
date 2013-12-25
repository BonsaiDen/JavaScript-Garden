## Az `Array` konstruktor

Mivel az `Array` konstruktora kétértelműen bánik a paraméterekkel, melegen
ajánlott mindig a tömb literált - `[]` jelölés - használni új tömbök létrehozásakor.

    [1, 2, 3]; // Eredmény: [1, 2, 3]
    new Array(1, 2, 3); // Eredmény: [1, 2, 3]

    [3]; // Eredmény: [3]
    new Array(3); // Eredmény: []
    new Array('3') // Eredmény: ['3']

Abban az esetben, hogyha ez a konstruktor csak egy `szám` paramétert kap, akkor
visszatérési értékül egy olyan tömböt fog létrehozni amelynek a `length` mezője
akkorára van beállítva, ahogy azt megadtuk az argumentumban. Megjegyzendő hogy
**csak** a `length` tulajdonság lesz ekkor beállítva; az egyes indexek külön-külön
nem lesznek inicializálva.

    var arr = new Array(3);
    arr[1]; // undefined
    1 in arr; // hamis, nincs ilyen index

A tömb hosszának közvetlen állítása amúgy is csak elég kevés esetben
használható értelmesen, mint például alább, hogyha el akarjuk kerülni a 
`for ciklus` használatát egy string ismétlésekor.

    new Array(count + 1).join(ismetlendoString);

### Összegzésül

Az `Array` konstruktor közvetlen használata erősen kerülendő. A literálok használata
elfogadott inkább, mivel rövidebbek, tisztább a szintaxisuk és olvashatóbb kódot
eredményeznek.

