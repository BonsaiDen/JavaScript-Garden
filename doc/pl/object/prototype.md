## Prototyp

JavaScript nie posiada klasycznego modelu dziedziczenia. Zamiast tego 
dziedziczenie jest realizowane poprzez *prototypy*.

Choć jest to często uważane za jedną ze słabości języka JavaScript,
prototypowy model dziedziczenia, jest w rzeczywistości potężniejszy od klasycznego
modelu. Na przykład stworzenia klasycznego modelu na podstawie modelu prototypowego 
jest dość proste, podczas gdy zrobienie odwrotnego przekształcenie to o wiele trudniejsze zadanie.

Ze względu na fakt, że w JavaScript jest w zasadzie jedynym powszechnie stosowanym 
językiem, który posiada prototypowy model dziedziczenia, dostosowanie się do różnic pomiędzy
tymi dwoma modelami wymaga trochę czasu. 

Pierwszą znaczącą różnicą jest to, że dziedziczenie w JavaScript odbywa się za pomocą
tak zwanych *łańcuchów prototypów*.

> **Uwaga:** Używanie po prostu `Bar.prototype = Foo.prototype` spowoduje, że oba obiekty 
> będą korzystały z **tego samego** prototypu. W związku z tym zmiany w prototypie jednego
> obiektu będą również zmieniały prototyp drugiego obiektu, co jest ,w większości przypadków, 
> niepożądanym efektem.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Ustawienie prototypu Bar na nową instancję Foo
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // Upewniamy się, że Bar jest ustawiony jako rzeczywisty konstruktor
    Bar.prototype.constructor = Bar;

    var test = new Bar() // tworzymy nową instancję Bar

    // The resulting prototype chain
    test [instance of Bar]
        Bar.prototype [instance of Foo] 
            { foo: 'Hello World' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* etc. */ }

W powyższym przykładzie obiekt `test` będzie dziedziczył z obydwu, tj. 
`Bar.prototype` i `Foo.prototype`, stąd będzie miał dostęp do funkcji `method`,
która była zdefiniowana w `Foo`. Ponadto obiekt będzie miał dostęp do 
właściwości `value`, która jest jedyną instancją `Foo` i stała się jego prototypem.
Należy pamiętać, że `new Bar` **nie** tworzy nowej instancji `Foo`, 
tylko wykorzystuje instancję, która jest przypisana do własności `prototype`. 
Zatem Wszystkie instancje `Bar` będą dzieliły tą samą własność `value`.

> **Uwaga:** **Nie** należy używać konstrukcji `Bar.prototype = Foo`, 
> ponieważ nie spowoduje ona przypisania prototypu `Foo` tylko obiektu 
> funckji `Foo`. Zatem łańcuch prototypów nie będzie zawierał `Foo.prototype`,
> tylko `Function.prototype`, więc metoda `method` nie będzie w łańcuchu prototypów. 

### Wyszukiwanie własności

Podczas dostępu do właściwości obiektu JavaScript przejdzie w górę łańcucha 
prototypów, dopóki nie znajdzie właściwości bez nazwy.

Gdy przeszukiwanie dotrze do końca (szczytu) łańcucha, mianowicie `Object.prototype` 
i nadal nie znajdzie określonej właściwości, to zwróci wartość 
[undefined](#core.undefined).    

### Właściwość prototype

Podczas gdy właściwość `prototype` jest używana przez język do budowania łańcucha 
prototypów, istnieje możliwość przypisania do niej **dowolnej** wartości. Jednakże
prymitywne typy będą po prostu ignorowanie, jeżeli zostaną ustawione jako `prototype`.

    function Foo() {}
    Foo.prototype = 1; // nie ma wpływu

Przypisywanie obiektów, jak pokazano w powyższym przykładzie, zadziała i pozwala 
na dynamiczne tworzenie łańcuchów prototypów.

### Wydajność

Czas wyszukiwania właściwości, które są na końcu łańcucha prototypów może mieć 
negatywny wpływ na wydajność krytycznych części kodu. Dodatkowo, próba dostępu 
do nieistniejącej właściwości zawsze spowoduje przeszukanie całego łańcucha prototypów.

Również podczas [iteracji](#object.forinloop) po właściwościach obiektu
**każda** właściwość, która znajduje się w łańcuchu prototypów (niezależnie 
na jakim znajduje się poziomie) zostanie wyliczona.

### Rozszerzanie natywnych prototypów

Rozszerzanie `Object.prototype` lub innego prototypu wbudowanych typów jest jednym z 
najczęściej nadużywanej częsci języka JavaScript.

Technika ta nazywana jest [monkey patching][1] i łamie zasady *enkapsulacji*.
Mimo to jest szeroko rozpowszechniona w frameworkach takich jak [Prototype][2].
Nie ma jednak dobrego powodu, aby zaśmiecać wbudowane typy poprzez wzbogacanie ich o 
*niestandardowe* funkcjonalności.

**Jedynym** dobrym powodem do rozszerzania wbudowanych prototypów jest portowanie  
funkcjonalności znajdujących się w nowszych silnikach JavaScript, np. [`Array.forEach`][3]

### Wnioski

Zanim przystąpi się do pisania skomplikowanego kodu korzystającego z dziedziczenia,  
należy **całkowicie** zrozumieć prototypowy model dziedziczenia. Ponadto trzeba uważać 
na długość łańcucha prototypów i w razie potrzeby zmniejszać ilość dziedziczeń, 
aby uniknąć problemów z wydajnością. Natywne prototypy **nigdy** nie powinny być 
rozszerzane, chyba że ze względu na wprowadzanie kompatybilności z nowszymi silnikami 
JavaScript.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
