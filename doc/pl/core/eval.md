## Dlaczego nie należy używać `eval`?

Funkcja `eval` uruchomi podany string jako kod JavaScript w lokalnym zasięgu (scopie).

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

Niestaty, `eval` zostanie wykonana w lokalnym zasięgu tylko wtedy, gdy zostanie wywołana 
**bezpośrednio** *i* nazwa wywoływanej funkcji równa się `eval`.  

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3

Należy unikać stosowania `eval` **o ile to tylko możliwe**. W 99.9% przypadków można 
osiągnąć ten sam efekt **nie** używając `eval`.
    
### `eval` w przebraniu

[Funkcje wykonywane po upływie czasu](#other.timeouts) `setTimeout` i `setInterval` 
mogą przyjąć string jako pierwszy argument. String ten **zawsze** będzie wykonywany 
w globalnym zasięgu, ponieważ funkcja `eval` jest w tym wypadku wywoływana pośrednio.

### Problemy z bezpieczeństwem

Funkcja `eval` jest również problematyczna od strony bezpieczeństwa, ponieważ 
wykonuje **każdy** kod, który zostanie do niej przekazany i **nigdy** nie należy
jej używać na stringach nieznanego lub niezaufanego pochodzenia.

### Wnioski

Funkcja `eval` nie powinna być w ogóle używana. Każdy kod, który jej używa
powinien zostać sprawdzony pod względem działania, wydajności i bezpieczeństwa. 
W przypadku gdy użycie `eval` jest niezbędne do działania, wówczas taki kod 
należy ponownie przemyśleć i *ulepszyć* aby nie wymagał użycia `eval`. 

