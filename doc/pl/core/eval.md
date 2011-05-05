## Dlaczego nie należy używać `eval`

Funkcja `eval` uruchomi podany string jako kod JavaScript w lokalnym zasięgu (scopie).

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

Niestaty `eval` zostanie wykonana w lokalnym zasięgu tylko jeżeli została wywołana 
**bezpośrednio** *i* nazwa wołanej funkcji równa sie `eval`.  

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
mogą przyjąć string jako pierwszy argument. String ten zostanie **zawsze** wykonany 
w globalnym zasięgu, ponieważ funkcja `eval` zostanie wywołana niebezpośrednio w tym 
przypadku.

### Problemy z bezpieczeństwem

Funkcja `eval` jest również problematyczna od strony bezpieczeństwa, ponieważ 
wykonuje **każdy** kod, który zostanie do niej przekazany i nie należy **nigdy** 
używać jej na stringach nieznanego lub niezaufanego pochodzenia.

### Wnioski

Funkcja `eval` nie powinna być w ogole używana, każdy kod, który ją wykorzystuje 
powinien zostać sprawdzony pod względem działania, wydajności i bezpieczeństwa. 
W przypadku gdy użycie `eval` jest niezbędne do działania, wówczas taki kod 
należy przemyśleć raz jeszcze i *ulepszyć* kod aby nie wymagał użycia `eval`. 

