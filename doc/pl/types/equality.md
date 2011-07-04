## Równość i porównania

JavaScript posiada dwa różne sposoby równościowego porównywania obiektów. 

### Operator równości

Operator równości składa się z dwóch znaków "równa się": `==`

JavaScript jest słabo typowanym językiem. Oznacza to, że operator równości 
**konwertuje** typy (dokonuje **koercji**), aby wykonać porównanie.
    
    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

Powyższa tabela przedstawia wyniki koercji typów. Nieprzewidywalne wyniki 
porównania są głównym powodem, że stosowanie `==` jest powszechnie uważane za złą 
praktykę. Skomplikowane reguły konwersji są powodem trudnych do wyśledzenia błędów.

Ponadto koercja ma również wpływ na wydajność, Na przykład gdy typ String musi zostać 
przekształcony na typ Number przed porównaniem z drugą liczbą.

### Operator ścisłej równości

Operator ścisłej równości składa się z **trzech** znaków "równa się": `===`

Działa on dokładnie tak jak normalny operator równości, z jednym wyjątkiem - nie 
dokonuje koercji typów przed porównaniem.

    ""           ===   "0"           // false
    0            ===   ""            // false
    0            ===   "0"           // false
    false        ===   "false"       // false
    false        ===   "0"           // false
    false        ===   undefined     // false
    false        ===   null          // false
    null         ===   undefined     // false
    " \t\r\n"    ===   0             // false

Powyższe rezultaty są o wiele bardziej przejrzyste. Powoduje to "ustatycznienie"
języka do pewnego stopnia oraz pozwala na wprowadzenie optymalizacji porównań 
obiektów o różnych typach.

### Porównywanie obiektów

Mimo że oba operatory `==` i `===` nazywane są operatorami **równościowymi**, 
to zachowują się różnie, gdy jednym z operandów jest obiekt typu `Object`.

    {} === {};                   // false
    new String('foo') === 'foo'; // false
    new Number(10) === 10;       // false
    var foo = {};
    foo === foo;                 // true

Oba operatory porównują **toższmość** a **nie** równość, czyli będą porównywać czy 
jeden i drugi operand jest tą samą **instancją** obiektu (podobnie jak operator 
`is` w Pythonie i porównanie wskaźników w C).  

### Wnioski

Zaleca się, aby używać tylko operatora **ścisłej równości**. W sytuacjach gdy 
potrzebna jest koercja (porównanie obiektów różnych typów), konwersja powinna 
być dokonana [jawnie](#types.casting), a nie pozostawiona trudnym regułom koercji 
obowiązującym w języku.

