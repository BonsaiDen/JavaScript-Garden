## A `delete` Operátor

Röviden, *lehetetlen* globális változókat, függvényeket és olyan dolgokat törölni
JavaScriptben amelyeknek a `DontDelete` attribútuma be van állítva.

### Globális kód és Funkció kód

Amikor egy változó vagy függvény, globális vagy 
[függvény hatókörben](#function.scopes) van definiálva, 
akkor az Activation (Aktivációs) vagy a Global (Globális) objektum egyik mezőjeként
értelmeződik.  Az ilyen mezőknek van egy halom attribútuma, amelyek közül az egyik 
a `DontDelete`. A változó és függvény deklarációk a globális vagy függvény kódon
belül mindig `DontDelete` tulajdonságú mezőket hoznak létre, így nem lehet őket
törölni.

    // globális változó
    var a = 1; // A DontDelete be lett állítva
    delete a; // hamis
    a; // 1

    // függvény:
    function f() {} // A DontDelete be lett állítva
    delete f; // hamis
    typeof f; // "function"

    // új értékadással sem megy
    f = 1;
    delete f; // hamis
    f; // 1

### Explicit mezők

Az expliciten beállított mezőket persze normálisan lehet törölni.

    // expliciten beállított mező
    var obj = {x: 1};
    obj.y = 2;
    delete obj.x; // igaz
    delete obj.y; // igaz
    obj.x; // undefined
    obj.y; // undefined
	

A fenti példábna az `obj.x` és `obj.y` törölhető, mivel nincs `DontDelete`
attribútuma egyik mezőnek sem. Ezért működik az alábbi példa is.

    // működik, kivéve IE-ben
    var GLOBAL_OBJECT = this;
    GLOBAL_OBJECT.a = 1;
    a === GLOBAL_OBJECT.a; // igaz - egy globális változó
    delete GLOBAL_OBJECT.a; // igaz
    GLOBAL_OBJECT.a; // undefined

Itt egy trükköt használunk az `a` törlésére. A [`this`](#function.this) itt 
a Globális objektumra mutat, és expliciten bezetjük rajta az `a` változót, mint
egy mezőjét, így törölni is tudjuk.

Mint az szokás, a fenti kód egy kicsit bugos IE-ben (legalábbis 6-8-ig).

### Függvény argumentumok és beépített dolgaik

A függvény argumentumok, az [`arguments` objektum](#function.arguments)
és a beépített mezők szintén `DontDelete` tulajdonságúak.

    // függvény argumentumok és mezők
    (function (x) {
    
      delete arguments; // hamis
      typeof arguments; // "object"
      
      delete x; // hamis
      x; // 1
      
      function f(){}
      delete f.length; // hamis
      typeof f.length; // "number"
      
    })(1);

### Vendég (host) objektumok

A `delete` operátor működése megjósolhatatlan a vendég objektumokra. A specifikáció
szerint ezek az objektumok szükség szerint bármilyen viselkedést implementálhatnak.

(A ford.: Vendég objektumok azok az objektumok, amelyek nincsenek konrkétan
meghatározva az ES aktuális verziójú specifikációjában, pl. a window)

### Összegzésképp

A `delete` működése helyenként megjósolhatatlan, így biztonsággal csak olyan
objektumok mezőin használhatjuk amelyeket expliciten mi állítottunk be.