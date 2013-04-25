## Domknięcia i referencje

Jedną z najpotężniejszych funkcjonalności języka JavaScript są *domknięcia*. 
Oznacza to że zasięg **zawsze** posiada dostęp do zewnętrznego zasięgu, w którym 
został zdefiniowany. Ponieważ zasięg w JavaScript można definiować tylko poprzez 
[funkcję](#function.scopes), wszystkie funkcje domyślnie zachowują się jak domknięcia.

### Emulowanie prywatnych zmiennych

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

Tutaj `Counter` zwraca **dwa** domknięcia: funkcję `increment` oraz funkcję `get`. 
Obie te funkcje trzymają **referencję** do zasięgu `Counter`, a co za tym idzie 
zawsze posiadają dostęp do zmiennej `count` tak, jakby ta zmienna była zdefiniowana 
w zasięgu tych funkcji.

### Dlaczego zmienne prywatne działają?

Ponieważ nie ma możliwości wskazania lub przypisania zasięgu w JavaScript, 
**nie** istnieje sposób, aby uzyskać dostęp do zmiennej `count` z zewnątrz. 
Wykorzystanie tych dwóch domknięć jest jedynym sposobem na interakcję z tą zmienną.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };


Powyższy kod **nie** zmieni wartości zmiennej `count` wewnątrz zasięgu `Counter`, 
ponieważ `foo.hack` nie została zadeklarowana wewnątrz **tego konkretnego** zasięgu. 
Zamiast tego funkcja utworzy lub nadpisze *globalną* zmienną `count`.

### Domknięcia wewnątrz pętli

Jednym z częstrzych błędów jest wykorzystywanie domknięć wewnątrz pętli, 
aby wartość zmiennej po której odbywa się iteracja była kopiowana do 
wewnętrznej funkcji.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

Powyższy kod **nie** wypisze numerów od `0` do `9`, ale wypisze 
dziesięć razy liczbę `10`.

*Anonimowa* funkcja trzyma **wskaźnik** do zmiennej `i` i podczas uruchomienia 
`console.log`, pętla `for` już zakończyła działanie i wartość zmiennej `i` 
została ustawiona na `10`.

Aby otrzymać zamierzony efekt, niezbędne jest **skopiowanie** wartości 
zmiennej `i`.

### Unikanie problemu z referencją

Aby skopiować wartość zmiennej, po której iterujemy w pętli, należy skorzystać 
z [anonimowego wrappera](#function.scopes).

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

Zewnętrzna anonimowa funkcja zostanie wywołana od razu z parametrem `i` 
jako pierwszym argumentem oraz otrzyma kopię **wartości** zmiennej `i` jako 
zmienną `e`.

Anonimowa funkcja która zostaje przekazana do `setTimeout` teraz posiada 
referencję do zmiennej `e`, która nie zostanie zmieniona przez pętle `for`.

Istnieje jeszcze jeden sposób na osiągnięcie tego samego efektu. Należy zwrócic 
fukcję z anonimowego wrappera, wówczas kod będzie zachowywał się jak ten 
wcześniejszy.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }

