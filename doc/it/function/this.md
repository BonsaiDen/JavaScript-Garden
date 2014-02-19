## Come funziona `this`

JavaScript ha una concezione differente di ciò a cui il nome speciale `this`
fa normalmente riferimento nella maggior parte degli altri linguaggi di
programmazione. Ci sono esattamente **cinque** differenti modi nei quali
il valore di `this` può essere associato nel linguaggio.

### Lo scope globale

    this;

Usando `this` nello scope globale, esso farà semplicemente riferimento
all'oggetto *globale*.

### Richiamando una funzione

    foo();

Qui, `this` farà ancora riferimento all'oggetto *globale*.

> **ES5 Nota:** in strict mode, il caso globale **non** esiste più.
> In quel caso `this` avrà invece il valore di `undefined`.

### Richiamando un metodo

    test.foo();

In questo esempio, `this` farà riferimento a `test`.

### Richiamando un costruttore

    new foo();

Una chiamata di funzione che viene preceduta dalla parola chiave `new`
agisce come un [costruttore](#function.constructors). Dentro la funzione,
`this` farà riferimento all'`Object` **appena creato**.

### Impostazione esplicita di `this`

    function foo(a, b, c) {}

    var bar = {};
    foo.apply(bar, [1, 2, 3]); // l'array verrà espanso come mostrato sotto
    foo.call(bar, 1, 2, 3); // risulterà in a = 1, b = 2, c = 3

Quando si usano i metodi `call` o `apply` di `Function.prototype`, il valore di
`this` all'interno della funzione chiamata viene **esplicitamente impostato**
al primo argomento della corrispondente chiamata di funzione.

Come risultato, nell'esempio sopra, il *caso del metodo* **non** viene applicato,
e `this` all'interno di `foo` sarà impostato a `bar`.

> **Nota:** `this` **non può** essere usato per far riferimento all'oggetto
> all'interno di un `Object` letterale. Perciò `var obj = {me: this}` **non**
> avrà come risultato `me` che fa riferimento ad `obj`, dato che `this`
> viene assegnato solo da uno dei cinque casi elencati.

### Insidie comuni

Mentre molti di questi casi hanno senso, il primo può essere considerato
un altro errore di progettazione del linguaggio perché non ha **mai** un
uso pratico.

    Foo.method = function() {
        function test() {
            // this viene impostato all'oggetto globale
        }
        test();
    }

Una comune credenza è che `this` all'interno di `test` faccia riferimento a
`Foo` mentre, invece, **non** è così.

Per poter ottenere l'accesso a `Foo` dall'interno di `test`, è necessario creare
una variabile locale all'interno di `method` che faccia riferimento a `Foo`.

    Foo.method = function() {
        var that = this;
        function test() {
            // Qui viene usato that invece di this
        }
        test();
    }

`that` è solo un normale nome di variabile, ma viene comunemente usato come
riferimento ad un `this` più esterno. Abbinato alle [closures](#function.closures)
può anche essere usato per passare il valore di `this`.

### Metodi di asseganzione

Un'altra cosa che **non** funziona in JavaScript è la creazione di un alias ad
una funzione, cioè l'**assegnazione** di un metodo ad una variabile.

    var test = someObject.methodTest;
    test();

A causa della prima dichiarazione, `test` ora agisce da semplice chiamata a
funzione e quindi, `this` all'interno di essa non farà più riferimento a
`someObject`.

Mentre l'assegnazione tardiva di `this` potrebbe sembrare una cattiva idea
in un primo momento, alla prova dei fatti è ciò che fa funzionare
l'[ereditarietà prototipale](#object.prototype).

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

Quando `method` viene chiamato da un'istanza di `Bar`, `this` farà riferimento
a quell'istanza.

