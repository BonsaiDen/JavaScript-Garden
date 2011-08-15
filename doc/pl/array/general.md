## Iterowanie po tablicach oraz właściwości tablic

Mimo, że tablice w JavaScript są obiektami, nie ma dobrych powodów do używania 
[`pętli for in`](#object.forinloop) do iteracji po nich. W rzeczywiści istnieje 
wiele dobrych powodów **przeciwko** wykorzystania `for in` na tablicach.

> **Uwaga:** Tablice JavaScriptowe **nie** są *tablicami asocjacyjnymi*. JavaScript
> posiada tylko [obiekty](#object.general) do mapowania kluczy do wartości. Jednakże 
> tablice asocjacyjne **zachowują** porządek, natomiast obiekty **nie zachowują**.

Ponieważ pętla `for in` wylicza wszystkie właściwości, które są wewnątrz 
łańcucha prototypów i jedynym sposobem aby wykluczyć te właściwości to użycie 
[`hasOwnProperty`](#object.hasownproperty), ale wówczas pętla staje się 
**dwadzieście razy** wolniejsza od normalnej pętli `for`.

### Iteracja

W celu osiągnięcia najlepszej wydajności podczas iteracji po tablicach należy 
użyć klasycznej pętli `for`.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

Jest tam jeszcze jeden dodatkowy haczyk w przykładzie powyżej. Jest to zbuforowanie 
długości tablicy poprzez `l = list.length`.

Mimo, że właściwość `length` jest zdefiniowana w wewnątrz tablicy, istnieje nadal 
dodatkowy koszt na wyszukiwanie tej właściwości przy każdej iteracji w pętli. 
Chociaż najnowsze silniki JavaScript **mogą** zastosować optymalizację w tym 
przypadku. Nie ma jednak możliwość ustalenia czy kod będzie wykonywany w jednym 
z tych nowych silników czy też nie.

W rzeczywistości pomijając buforowanie długości tablicy może spowodować, że pętla 
będzie tylko **w połowie tak szybka** jak ta z buforowaniem długości.

### Właściwość `length`

Mimo, że *getter* właściwości `length` po prostu zwraca liczbę elementów, które są 
zawarte w tablicy, to *setter* może być użyta do **skracania** tablicy.

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]

    foo.length = 6;
    foo; // [1, 2, 3]

Przypisanie mniejszej długości spowoduje skrócenie tablicy, ale zwiększenie wartości 
`length` nie ma żadnego wpływu na tablicę.

### Wnioski

Aby uzyskać najlepszą wydajność zaleca się, aby zawsze używać zwykłej pętli `for`
i zbuforowanie właściwości `length`. Korzystanie z pętli `for in` na tablicy jest 
znakiem źle napisanego kodu, który jest podatny na błędy i ma słabą wydajność.

