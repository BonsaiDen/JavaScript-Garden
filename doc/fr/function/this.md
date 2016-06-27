## Comment marche `this`

Pour JavaScript, ce que le nom spécial `this` réfère à diffère de la plupart des autres langages de programmation. Il y a exactement **cinq** façons différente de lier la valeur de `this` dans le langage.

### Le contexte global "global scope"

    this;

Lorsque vous utilisez `this` dans le contexte global, il va simplement référer à l'objet *global*.

### Appel de fonction

    foo();

Ici, `this` va aussi référer à l'objet *global*.

> **Remarque ES5:** En mode strict, le cas global **n'existe plus**: `this` aura la valeur `undefined`.

### Appel de méthode

    test.foo(); 

Dans cet exemple, `this` va référer à `test`.

### Appel de constructeur

    new foo(); 

Un appel de fonction qui est précédé par le mot clé `new` agit comme un [constructeur](#function.constructors). Dans la fonction, `this` va référer à un `Object` *nouvellement créé*.

### Assignement direct de `this`

    function foo(a, b, c) {}
    
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // table va s'étendre comme ci-dessous
    foo.call(bar, 1, 2, 3); // mène à: a = 1, b = 2, c = 3

Lorsque vous utilisez les méthodes `call` (appeler) ou `apply` (appliquer) de `Function.prototype`, la valeur de `this` à l'intérieur de la fonction appelée est **directement définie** par le premier argument de l'appel correspondant.

En conséquence, dans l'exemple ci-dessus le cas d'*appel de méthode* ne s'applique **pas**, et `this` à l'intérieur de `foo` va bien référer à `bar`.

> **Remarque:** `this` ne peut **pas** être utilisé pour se référer à l'objet à l'intérieur d'un littéral `Object`.
> Donc dans `var obj = {moi: this}`, `moi` ne vas **pas** référer à `obj`, puisque `this` ne reçoit une valeur que dans l'un des cinq cas énumérés.

### Pièges communs

Bien que la plupart de ces cas ont du sens, le premier cas peut être considéré comme une autre faute de design du langage, car il n'est **jamais** d'aucune utilité pratique.

    Foo.method = function() {
        function test() {
            // this réfère à l'objet global
        }
        test();
    }

Une autre erreur souvent commise est que `this` l'intérieur de `test` se réfère à `foo`; ce qui n'est **pas** du tout le cas.

Pour accéder à `foo` de l'intérieur de `test`, vous pouvez créer une variable locale à intérieur de `method` qui fait référence à `foo`.

    Foo.method = function() {
        var self = this;
        function test() {
            // Utilisez self au lieu de this ici
        }
        test();
    }

`self` est juste une variable normale, couramment utilisée pour référencer un `this` extérieur. Combiné avec des [fermetures](# function.closures) "closures", on peut l'utiliser pour passer les valeurs de `this`.

À partir d'ECMAScript 5, l'utilisation de la méthode `bind` avec une fonction anonyme mène au même resultat:

    Foo.method = function() {
        var test = function() {
            // maintenant, this réfère à Foo
        }.bind(this);
        test();
    }

### Assignement de méthodes

Une autre chose qui ne marche **pas** en JavaScript est l'alias de fonction, ou l'**assignement** d'une méthode à une variable.

    var test = someObject.methodTest;
    test();

En raison du premier des cinq cas, `test` agit maintenant comme un appel de fonction normal; par conséquent, `this` à l'intérieur de la fonction ne va plus référer à `someObject`.

Bien que la liaison tardive "late binding" de `this` pouvait sembler comme une mauvaise idée au premier abord, c'est en fait grâce à cela que l'[héritage prototypique](#Object.prototype) fonctionne.

    function Foo() {}
    Foo.prototype.method = function() {};
    
    function Bar() {}
    Bar.prototype = Foo.prototype;
    
    new Bar().method();

Quand `method` est appelée d'une instance de `bar`, `this` va référer à cette même instance.

