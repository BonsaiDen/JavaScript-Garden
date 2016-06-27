## L'objet `arguments`

Chaque portée "scope" de fonction en JavaScript peut accéder à la variable spéciale `arguments`.
Cette variable contient une liste de tous les arguments qui ont été passés à la fonction.

> **Remarque:** Si `arguments` a déjà été définie soit par une déclaration `var`
> à l'intérieur de la fonction ou par un paramètre de fonction, l'objet `arguments` ne sera pas créé.

L'objet `arguments` n'est **pas** un tableau `Array`. Même s'il a la sémantique d'un tableau - à savoir la propriété `length` (longueur) - il n'hérite pas de
`Array.prototype` mais est en fait un `Object`.

Pour cette raison, il n'est **pas** possible d'utiliser les méthodes de tableau standards comme `push`, `pop` ou `slice` sur `arguments`.
Bien qu'itérer avec une boucle `for` fonctionne, il est nécessaire de convertir la variable `arguments` en un véritable `Array` pour pouvoir lui appliquer les fonctions de tableau `Array` standards.

### Conversion à Array

Le code ci-dessous va retourner un nouveau tableau `Array` contenant tous les éléments de l'objet `arguments`.

    Array.prototype.slice.call(arguments);

Cette conversion est **lente**, il n'est donc **pas** recommandé de l'utiliser dans des sections de code où la performance est critique.

### Passage d'arguments

Voici la méthode recommandée pour passer des arguments d'une fonction à une autre.

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // faire qqch ici
    }

Une autre astuce consiste à utiliser à la fois `call` et `apply` pour transformer des méthodes - fonctions qui utilisent la
valeur de `this` ainsi que leurs arguments - en des fonctions normales qui n'utilisent que leurs arguments.

    function Person(first, last) {
      this.first = first;
      this.last = last;
    }
    
    Person.prototype.fullname = function(joiner, options) {
      options = options || { order: "western" };
      var first = options.order === "western" ? this.first : this.last;
      var last =  options.order === "western" ? this.last  : this.first;
      return first + (joiner || " ") + last;
    };
    
	// Créer une version non liée de "fullname", utilisable sur n'importe quel
    // objet avec les propriétés 'first' et 'last' passées comme premier
    // argument. Cette enveloppe n'aura pas besoin de changer si fullname
    // change le nombre ou l'ordre des ses arguments.
    Person.fullname = function() {
      // résultat: Person.prototype.fullname.call(this, joiner, ..., argN);
      return Function.call.apply(Person.prototype.fullname, arguments);
    };
    
    var grace = new Person("Grace", "Hopper");
    
    // 'Grace Hopper'
    grace.fullname();
    
    // 'Turing, Alan'
    Person.fullname({ first: "Alan", last: "Turing" }, ", ", { order: "eastern" });


### Paramètres formels et arguments indexés

L'objet `arguments` crée des fonctions *getter* et *setter* à la fois pour ses propriétés et les paramètres formels de la fonction.

Par conséquent, changer la valeur d'un paramètre formel va également modifier la valeur de la propriété correspondante sur l'objet `arguments`, et vice-versa.

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

### Mythes et faits sur la performance

Le seul moment où l'objet `arguments` n'est pas créé est quand il est déclaré comme un nom à l'intérieur d'une fonction ou l'un de ses paramètres formels. Le fait qu'il soit utilisé ou non n'est pas important.

Les deux *getter* et *setter* sont toujours créé; et donc l'utilisation d'`arguments` n'a aucune incidence sur la performance.

> **Remarque ES5:** Ces *getters* et *setters* ne sont pas créés en mode strict.

Cependant, un cas va considérablement réduire la performance des moteurs JavaScript modernes.
C'est le cas de l'utilisation de `arguments.callee`.

    function foo() {
        arguments.callee; // faire quelque chose avec cet objet de fonction
        arguments.callee.caller; // et la fonction appelante
    }
    
    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // Seraient normalement inline...
        }
    }

Dans le code ci-dessus, `foo` ne peut plus être [inline][1] car il a besoin de se connaitre lui-même et connaitre son appelant.
Cela défait les gains possibles de performance qui découleraient d'inline, mais cela casse également l'encapsulation
car la fonction peut maintenant être dépendante d'un contexte d'appel spécifique.

Utiliser `arguments.callee` ou l'une de ses propriétés est **fortement déconseillé**.

> **Remarque ES5:** En mode strict, `arguments.callee` jettera une erreur de type `TypeError`
> car son utilisation est marquée comme obsolète "deprecated".

[1]: http://en.wikipedia.org/wiki/Inlining

