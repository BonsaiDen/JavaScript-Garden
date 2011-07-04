## Konstruktory 

Konstruktory w JavaScript również wyglądają inaczej niż innych języka. Każde 
wywołanie funkcji, które jest poprzedone słowem kluczowym `new` zachowuje się 
jak konstruktor. 

Wewnątrz konstruktora - wywoływanej fukcji - wartość `this` wskazuje na 
nowo utworzony obiekt `Object`. Prototyp [`prototype`](#object.prototype) tego 
**nowego** obiektu będzie wskazywał na prototyp `prototype` obiektu fukcji, 
która została wywołana jako konstruktor.

Jeżeli wywołana funkcja nie posiada jawnej deklaracji `return`, wówczas 
fukcja domyślnie zwraca wartość `this` - nowy obiekt.

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

Powyżej wywołanya została funkcja `Foo` jako konstruktor oraz ustawia 
nowo utworzonemu obiektowi właściwość `prototype` na `Foo.prototype`.

W tym przypadku jawna deklaracja `return` w funkcji zwraca wartość 
ustawioną w deklaracji, **ale tylko** jeżeli zwracaną wartością jest 
obiekt `Object`.

    function Bar() {
        return 2;
    }
    new Bar(); // nowy obiekt

    function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // zwrócony obiekt

Jeżeli słowo kluczowe `new` zostanie pominięte funkcja **nie** zwróci nowego 
obiektu.

    function Foo() {
        this.bla = 1; // zostanie ustawiona w obiekcie global
    }
    Foo(); // undefined

Mimo, że powyższy kod może zadziałać w pewnych przypadkach, w związku 
z działaniem [`this`](#function.this) w języku JavaScript to jako 
wartość `this`zostanie wykorzystany **obiekt global**.

### Fabryki

Aby móc ominąć słowo kluczowe `new` konstruktor musi jawnie zwracać wartość.

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }
    Bar.prototype = {
        foo: function() {}
    };

    new Bar();
    Bar();

Oba wywołania `Bar` zwrócą tą samą rzecz, nowo utworzony obiekt, który posiada 
właściwość nazwaną `method` w sobie, dla którego `Bar` jest [Domknięciem](#function.closures).

Należy również pamiętać, że wywołanie `new Bar()` **nie** ma wpływu na 
prototyp zwróconego obiektu (prototypem będzie `object.prototype` a nie `Bar.prototype`). 
Podczas gdy prototyp zostanie przypisany do nowo utworzonego obiektu, to jednak `Bar` 
nidgy nie zwróci tego nowego obiektu `Bar`, ale literał obiektu, który jest po 
słowie kluczowym `return`.

W powyższym przykładzie nie ma żadnej różnicy w działaniu pomiędzy użyciem 
i nieużyciem słowa kluczowego `new`.

### Tworzenie nowych obiektów korzystając z fabryk

Często zaleca się **nie** korzystać z operatora `new` ponieważ zapominając 
go zastosować może prowadzić do błędów.

W celu stworzenia nowego obiektu, powinno się używać fabryki i konstruować 
nowy obiekt wewnątrz tej fabryki.

    function Foo() {
        var obj = {};
        obj.value = 'blub';

        var private = 2;
        obj.someMethod = function(value) {
            this.value = value;
        }

        obj.getPrivate = function() {
            return private;
        }
        return obj;
    }


Mimo, że powyższy kod jest odporny na brak słowa kluczowego `new` i ułatwia 
korzystanie ze [zmiennych prywatnych](#function.closures), to posiada 
pewne wady:

-1. Zużywa więcej pamięci, ponieważ tworzony obiekt **nie** współdzieli metod poprzez prototyp
-2. Aby móc dziedziczyć fabryka musi skopiować wszystkie metody z dziedziczonego obiektu lub 
  przypisać ten obiekt, z którego się dziedziczy, jako prototyp do nowo utworzonego obiektu.
-3. Porzucenie łańcucha prototypów tylko ze względu na opuszczone słowo kluczowe `new` jest sprzeczne z duchem języka.

### Wnioski

Pominięcie słowa kluczowego `new` może prowadzić do błędów, ale na pewno nie 
powinno to być powodem odrzucenia używania prototypów w ogóle. Sprowadza się to 
do wyboru rozwiązania, które bardziej pasuje do potrzeb aplikacji. Szczególnie 
ważne jest aby wybrać określony styl tworzenia obiektów i się go **trzymać**.

