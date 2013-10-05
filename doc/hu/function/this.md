## A `this` mágikus működése

A `this` kicsit másképp működik a JavaScriptben mint ahogy azt megszokhattuk más nyelvekben.
Mondjuk úgy hogy egy átlagos Java programozó rosszul hiszi hogy ismeri a thist amikor ránéz
erre a nyelvre. Ugyanis pontosan **ötféle** módja lehet annak hogy a `this` éppen mire
utal a nyelvben.

### A Global Scope

	this;
	
Amikor globális hatókörben van használva a this, akkor pontosan a *globális* objektumra utal.

### Függvény híváskor

	foo();
	
Itt, a `this` megint a *globális* objektumra fog utalni.

> **ES5 Megjegyzés:** Strict módban a globális eset **nem létezik** többé.
> Ezekben az esetekben a `this` értéke undefined lesz.

### Eljárás hívásakor

    test.foo(); 

Ebben a példában a `this` a `test` objektumra fog hivatkozni.

### Konstuktor hívásakor

    new foo(); 

Ha a függvény hívását a `new` kulcsszóval előzzük meg, akkor a függvény  [konstruktorként](#function.constructors) fog viselkedni. A függvényen belül, a `this`
az *újonnan létrehozott* `Ojjektumra` fog hivatkozni.

### A `this` explicit beállítása

    function foo(a, b, c) {}
                          
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // array will expand to the below
    foo.call(bar, 1, 2, 3); // results in a = 1, b = 2, c = 3

A `Function.prototype`-ban levő `call` vagy `apply` használatakor aztán elszabadul a pokol :).
Ezekben az esetekben ugyanis a this a foo hívásakor **egzaktan** be lesz állítva az apply/call
első argumentumára. 

Eredményképp a foo meghívásakor a `this` értéke a `bar` objektumra lesz beállítva.

> **Megj.:** A `this` kulcsszót **nem lehet** `Object` literál létrehozásakor arra használni,
> hogy magára az objektumra hivatkozzon.
> Így a `var obj = {me: this}` kódban a `me` **nem fog** a `this`-re hivatkozni, ugyanis
> ez az eset nem tartozik egyikhez sem a fent megtalálható öt közül.

### Gyakori buktatók

A fent megtalálható eseteknek többé-kevésbé van értelme, kivéve az elsőt, és
ez is a nyelv rossz designjára utal. Ugyanis az első esetnek **soha** nem lesz
semmilyen praktikus felhasználási módja.

    Foo.method = function() {
        function test() {
            // A this itt a globális ojjektum.
        }
        test();
    }

Gyakori hiba, hogy úgy gondolják a fenti példában az emberek, hogy a `this` a `test` függvényen
belül a `Foo`-ra fog mutatni, pedig **nem**.

Megoldásképp, hogy a `Foo`-hoz hozzáférhessük a `test`-en belül, szükségszerű egy változót
lokálisan elhelyezni a `method`-on belül, ami már valóban a kívánt `this`-re (`Foo`-ra) mutat.

    Foo.method = function() {
        var that = this;
        function test() {
            // Use that instead of this here
        }
        test();
    }
	
A `that` tuladjonképpen egy mezei változónév (nem kulcsszó), de sokszor használják arra,
hogy egy másik `this`-re hivatkozzanak vele. A [colsureökkel](#function.closures) kombinálva
ez a módszer arra is használható hogy `this`eket passzolgassunk a vakvilágban és mégtovább.

### Eljárások értékül adása

Egy másik koncepció ami **nem** fog a JavaScriptben működni, az az aljas függvények létrehozása (függvény aliasok :)), ami tulajdonképpen egy függvény másik névhez
való **kötését** jelentené.

    var test = someObject.methodTest;
    test();


Az első eset miatt a `test` egy sima függvényhívásként működik, azonban a `this` értéke
a függvényen belül a továbbiakban **nem** a `someObject` lesz.	

Elsőre a this ilyen módon való utánkötése (late binding) nem tűnik jó ötletnek.
Azonban ez az, amitől a [prototípusos öröklődés](#object.prototype) is működni tud, ami
a nyelv egyik fő erőssége.

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

Amikor a `method` meghívódik a `Bar` példányaként, a `this` pontosan a `Bar`
megfelelő példányára fog mutatni.