## Obiekt `arguments`

Każda zasięg funkcyjny w języku JavaScript ma dostęp do specjalnej zmiennej `arguments`. 
Ta zmienna trzyma listę wszystkich argumentów przekazanych do funkcji.

> **Uwaga:** W przypadku gdy `arguments` zostanie zadeklarowana wewnatrz funkcji
> poprzez `var` lub jako nazwa jednego z formalnych parametrów, obiekt `arguments` 
> nie zostanie utworzony.

Obiekt `arguments` **nie** jest typu `Array`. Mimo, że posiada pewne cechy 
semantyki tablic - właściwość `length` - to nie dziedziczy on z `Array.prototype`,
ale w rzeczywistości z `Object`.

Ze względu na to **nie** można używać standardowych dla tablic metod takich jak
`push`, `pop` czy `slice` na obiekcie `arguments`. Mimo, że iteracja przy pomocy 
pętli `for` działa dobrze, to aby skorzystać ze standardowych metod tablicowych 
należy skonwertować `arguments` do prawdziwego obiekt `Array`.

### Konwersja do tablicy

Poniższy kod zwróci nowy obiekt `Array` zawierający wszystkie elementy 
obiektu `arguments`.

    Array.prototype.slice.call(arguments);

Jednakże konwersja ta jest **wolna** i **nie jest zalecana** w sekcjach, 
które mają duży wpływ na wydajność.

### Przekazywanie argumentów

Zalecany sposób przekazywania argumentów z jednej funkcji do następnej 
wyglada następująco.

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // do stuff here
    }

Kolejną sztuczką jest użycie razem `call` i `apply` w celu stworzenia 
szybkich i nieograniczonych wrapperów.  

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // Stworzenie nieograniczoną wersję metody "method" 
    // która przyjmuje parametry: this, arg1, arg2...argN
    Foo.method = function() {

        // Rezultat: Foo.prototype.method.call(this, arg1, arg2... argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };


### Parametry formalne i indeksy argumentów

Obiekt `arguments` tworzy funckje *getter* i *setter* nie tylko dla swoich 
właściwości, ale również dla parametrów formalnych funkcji.

W rezultacie zmiana wartości parametru formalnego zmieni również wartość 
odpowiadającemu mu wpisowi w obiekcie `arguments`, zachodzi to również w drugą stronę.

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2                                                           

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);

### Mity i prawdy o wydajności

Obiekt `arguments` jest zawsze tworzony z wyjątkiem dwóch przypadków, gdy
zmienna o takiej nazwie jest zdefiniowana wewnątrz funkcji lub jeden z parametrów 
formalnych funkcji ma taką nazwę. Nie ma znaczenia czy obiekt `arguments` jest 
używany czy nie.

Zarówno *gettery* jak i *settery* są zawsze tworzone, zatem używanie ich nie ma 
praktycznie żadnego wpływu na wydajność. Zwłaszcza w rzeczywistym kodzie, który 
wykorzystuje coś więcej niż tylko prosty dostęp do właściwości obiektu `arguments`. 

> **Uwaga ES5:** *gettery* and *settery* nie są tworzone w trybie strict mode

Jednakże, istnieje jeden przypadek w którym wydajność drastycznie spada w 
nowoczesnych silnikach JavaScript. Ten przypadek to wykorzystanie 
`arguments.callee`.

    function foo() {
        arguments.callee; // operowanie na obiekcie funkcji
        arguments.callee.caller; // i obiekcie funkcji wywołującej
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // Normalnie zostałaby wykorzystana metoda inline
        }
    }

W powyższym przykładzie `foo` nie może zostać wykorzystana metoda [inline][1] 
ponieważ potrzebne są nie tylko informacje na własny temat ale również 
na temat funkcji wywołującej. Takie użycie nie tylko uniemożliwia 
inlining i korzyści z niej wynikające, ale również stanowi złamanie 
zasad enkapsulacji ponieważ ta funkcja jest zależna od kontekstu 
w jakim została wywołana.

**Mocno zalecane** jest aby **nigdy** nie korzystać z `arguments.callee` 
i żadnej jej własności.

> **Uwaga ES5:** W trybie strict mode, `arguments.callee` wyrzuci `TypeError` 
> ponieważ korzystanie z niej jest przestarzałe.

[1]: http://en.wikipedia.org/wiki/Inlining

