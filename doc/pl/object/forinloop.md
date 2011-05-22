## The `for in` Loop

Podobnie jak operator `in`, pętla `for in` przeszukuje łańcuch prototypów 
podczas iteracji po właściwościach obiektu.

> **Uwaga:** pętla `for in` **nie** będzie iterować po właściwościach, które
> mają ustawiony atrybut `enumerable` na `false` na przykład właściwość 
> `length` tablicy.
    
    // Zatrucie Object.prototype
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // wyświetla obie właściwości: bar i moo
    }

Ponieważ nie jest możliwe, aby zmienić zachowanie pętli `for in` to niezbędne 
jest odfiltrowanie niechcianych właściwości wewnątrz ciała pętli, korzystając 
z metody [`hasOwnProperty`](#object.hasownproperty) z `Object.prototype`.

> **Uwaga:** Ponieważ pętla `for in` zawsze przeszukuje cały łańcuch prototypów 
> będzie się ona stawała coraz wolniejsza przy dodaniu każdej kolejnej warstwy 
> dziedziczenia do obiektu. 

### Korzystanie z `hasOwnProperty` do odfiltrowania

    // foo z przykładu powyżej
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

To jest jedyna poprawna wersja, którą należy używać. Ze względu na użycie 
`hasOwnProperty` zostanie wypisane **jedynie** `moo`. Gdy opuścimy `hasOwnProperty` 
kod będzie podatny na błędy, gdy natywne prototypy np. `Object.prototype` 
zostanie rozszerzony.

[Prototype][1] jest jednym z szeroko rozpowszechniony frameworków, który dokonuje 
takiego rozszerzenia. Używanie tego frameworku oraz nie używanie w pętle `for in` 
metody `hasOwnProperty` gwarantuje błędy w wykonaniu.

### Wnioski

Zaleca się aby zawsze używać metody `hasOwnProperty`. Nigdy nie powinno się dokonywać
żadnych założeń na temat środowiska, w którym kod będzie wykonywany i czy natywne 
prototypy zostały rozszerzone czy nie.

[1]: http://www.prototypejs.org/
