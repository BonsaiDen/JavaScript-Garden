## Konstruktor `Array`

Zaleca się zawsze korzystać z literału tablicy - notacja `[]` - podczas tworzenia 
nowych tablic, ponieważ konstruktor `Array` niejednoznacznie interpretuje 
przekazane do niego parametry.

    [1, 2, 3]; // Rezultat: [1, 2, 3]
    new Array(1, 2, 3); // Rezultat: [1, 2, 3]

    [3]; // Rezultat: [3]
    new Array(3); // Rezultat: []
    new Array('3') // Rezultat: ['3']

W przypadku, gdy tylko jeden argument zostanie przekazany do kostruktora `Array` i 
ten argument jest typu `Number`, konstruktor zwróci nową *dziwną* tablicę 
z właściwością `length` ustawioną na wartość przekazaną jako argument. Należy 
zauważyć, że **tylko** właściwość `length` zostanie ustawiona w ten sposób.
Rzeczywiste indeksy w tej tablicy nie zostaną zainicjalizowane.

    var arr = new Array(3);
    arr[1]; // undefined
    1 in arr; // zwraca false, indeks nie został ustawiony

Możliwość ustalenia z góry długości tablicy jest użyteczna tylko w kilku 
przypadkach, jak np. powtarzanie ciągu znaków, w którym unika się stosowania 
pętli `for`.

    // count - ilosc powtorzen
    // stringToRepeat - ciąg znaków do powtórzenia 
    new Array(count + 1).join(stringToRepeat); 

### Wnioski

W miarę możliwości należy unikać używania konstruktora `Array`. Literały są 
zdecydowanie lepszym rozwiązaniem. Są krótsze i mają bardziej precyzyjną składnię.
Zwiększają również czytelność kodu.

