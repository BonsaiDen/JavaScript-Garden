## Pętla `for in`

Podobnie jak operator `in`, pętla `for in` przeszukuje łańcuch prototypów 
podczas iteracji po właściwościach obiektu.

> **Uwaga:** pętla `for in` **nie** będzie iterować po właściwościach, które
> mają ustawiony atrybut `enumerable` na `false` (na przykład właściwość 
> `length` tablicy).
    
    // Zatrucie Object.prototype
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // wyświetla obie właściwości: bar i moo
    }

Ponieważ zmiana zachowania pętli `for in` nie jest możliwa, niezbędne 
jest odfiltrowanie niechcianych właściwości wewnątrz ciała pętli, korzystając 
z metody [`hasOwnProperty`](#object.hasownproperty) z `Object.prototype`.

> **Uwaga:** Ponieważ pętla `for in` zawsze przeszukuje cały łańcuch prototypów, 
> będzie się ona stawała coraz wolniejsza przy dodaniu każdej kolejnej warstwy 
> dziedziczenia do obiektu. 

### Filtrowania przy użyciu `hasOwnProperty`

    // foo z przykładu powyżej
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

To jest jedyna poprawna wersja, której należy używać. Ze względu na użycie 
`hasOwnProperty` zostanie wypisane **jedynie** `moo`. Gdy opuścimy `hasOwnProperty`, 
kod będzie podatny na błędy, gdy natywne prototypy (np. `Object.prototype`) 
zostaną rozszerzone.

[Prototype][1] jest jednym z popularniejszych frameworków, które dokonują 
takiego rozszerzenia. Używanie tego frameworku oraz nie stosowanie w pętli `for in` 
metody `hasOwnProperty` gwarantuje błędy w wykonaniu.

### Wnioski

Zaleca się, aby zawsze używać metody `hasOwnProperty`. Nigdy nie powinno się dokonywać
żadnych założeń na temat środowiska, w którym kod będzie wykonywany ani tego, czy 
natywne prototypy zostały rozszerzone, czy nie.

[1]: http://www.prototypejs.org/
