## Objektumok és mezők használata

A JavaScriptben minden objektumként működik, a [`null`](#core.undefined) és az [`undefined`](#core.undefined) kivételével.

    false.toString(); // 'false'
    [1, 2, 3].toString(); // '1,2,3'
    
    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

Gyakori tévhitként terjed, hogy a JavaScriptben a számok nem használhatóak objektumként. 
Ez csak látszólag igaz, mivel a JavaScript a pont utáni részt úgy próbálja értelmezni,
mintha lebegőpontos számot látna. Így hibát kaphatunk.  

    2.toString(); // SyntaxErrort vált ki

Azonban számos kifejezés létezik megoldásként, amelyekkel megkerülhető ez a probléma.

    2..toString(); // így a második pont már az objektumra utal
    2 .toString(); // fontos a space-t észrevenni itt a pont előtt
    (2).toString(); // a 2 értékelődik ki hamarabb

### Objektumok mint adattípusok

Az objektumok JavaScriptben [*Hash táblaként*][1] is használhatóak, mivel természetszerűleg kulcs-érték párokat tartalmaznak.

Az objektum literál leírásával - `{}` jelöléssel - lehet létrehozni egy új objektumot. Ez az új objektum az `Object.prototype`-ból [származik](#object.prototype) és nincsenek [saját mezői](#object.hasownproperty) definiálva.

    var foo = {}; // egy új, üres objektum

    // egy új objektum egy 'test' nevű mezővel, aminek 12 az értéke
    var bar = {test: 12}; 

### Mezők elérése

Egy objektum mezői kétféle módon érhetőek el, vagy az 'objektum.mezőnév' jelöléssel,
(Ford.: amit "dot notationként" emlegetünk) vagy a szögletes zárójelek kirakásával.
    
    var foo = {name: 'macska'}
    foo.name; // macska
    foo['name']; // macska
    
    var get = 'name';
    foo[get]; // macska
    
    foo.1234; // SyntaxError
    foo['1234']; // működik

A két jelölés majdnem egyenértékűen használható, kivéve, hogy a szögletes zárójelekkel dinamikusan állíthatunk be mezőket és olyan neveket is választhatunk, amik amúgy szintaxis hibához vezetnének (Fordító: mivel a neveket stringbe kell rakni, megadhatunk a JS által "lefoglalt" kulcsszavakat is mezőnévként, habár ennek használata erősen kerülendő).

### Mezők törlése

Egyetlen módon lehet mezőt törölni egy objektumból, ez pedig a `delete` operátor
használata; a mező értékének `undefined`-ra vagy `null`-ra való állítása csak
magára az értékre van kihatással, de a kulcs ugyanúgy megmarad az objektumban.

    var obj = {
        bar: 1,
        foo: 2,
        baz: 3
    };
    obj.bar = undefined;
    obj.foo = null;
    delete obj.baz;

    for(var i in obj) {
        if (obj.hasOwnProperty(i)) {
            console.log(i, '' + obj[i]);
        }
    }

A fenti ciklus a `bar undefined` és a `foo null` eredményeket fogja kiírni - 
egyedül a `baz` mező került törlésre, és emiatt hiányzik is az outputról.

### Kulcsok jelölése

    var test = {
        'case': 'Kulcsszó vagyok, ezért stringként kell leírnod',
        delete: 'Én is az vagyok' // SyntaxError
    };

Az objektumok mezőnevei mind stringként, mind egyszerű szövegként (Ford.: aposztrófok nélkül)
leírhatóak. A JavaScript értelmező hibája miatt, a fenti kód azonban `SyntaxErrort` eredményez ECMAScript 5 előtti verzió esetén.

Ez a hiba onnan ered, hogy a `delete` egy *kulcsszó*, viszont érdemes *string literálként*
leírni, hogy helyesen megértsék a régebbi JavaScript motorok is.

[1]: http://en.wikipedia.org/wiki/Hashmap

