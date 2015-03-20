## Portées "scopes" et espaces de noms "namespaces"

Bien que JavaScript utilise une syntaxe avec accolades pour les blocs, il ne crée **pas** de portée "scope" de bloc; par conséquent, la seule portée du langage est la portée de fonction.

    function test() { // une portée "scope"
        for(var i = 0; i < 10; i++) { // pas une portée 
            // count
        }
        console.log(i); // 10
    }

> **Remarque:** Lorsqu'elle n'est pas utilisé dans un assignement, une déclaration de retour,
> ou un argument de fonction, la notation `{...}` sera interprétée comme une déclaration
> de bloc et non **pas** comme un littéral d'objet. Ceci, quand combiné avec
> l'[insertion automatique des points-virgules](#de core.semicolon), peut conduire à des erreurs subtiles.

Il n'existe pas d'espaces de noms "namespaces" en JavaScript, ce qui signifie que tout est défini dans un espace de noms commun partagé par tous.

Chaque fois qu'une variable est référencée, JavaScript va traverser vers le haut toutes les portées jusqu'à ce qu'il la trouve.
S'il atteint la portée globale sans avoir trouvé le nom demandé, il va générer une erreur de référence `ReferenceError`.

### Le fléau des variables globales

    // script A
    foo = '42';

    // script B
    var foo = '42'

Les deux scripts ci-dessus n'ont **pas** le même effet. Le script A définit une variable appelée `foo` dans la portée *globale*, le script B définit `foo` dans la portée actuelle.

Ne pas utiliser `var` peut avoir des répercussions majeures.

    // portée globale
    var foo = 42;
    function test() {
        // portée locale
        foo = 21;
    }
    test();
    foo; // 21

En laissant de côté la déclaration `var` à l'intérieur de la fonction `test`, on remplace la valeur de `foo`.
Même si au premier abord cela ne semble pas être une grosse affaire, des milliers de lignes de JavaScript qui n'utilisent pas `var` créeront des bogues horribles qui seront très difficiles à dépister.

    // portée globale
    var items = [/* some list */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }
    
    function subLoop() {
        // portée de subLoop
        for(i = 0; i < 10; i++) { // var manquant
            // ici, des choses incroyables!
        }
    }

La boucle externe se terminera après le premier appel à `subLoop`, car `subLoop` écrase la valeur globale de `i`.
L'utilisation d'un `var` pour la deuxième boucle `for` aurait facilement évité cette erreur.
La déclaration de `var` devrait **jamais** être laissé de côté, sauf si l'*effet désiré* est d'affecter la portée externe.

### Variables locales

Seuls les paramètres de [fonction](#function.general) et les variables déclarées avec un `var` peuvent créer des variables locales en JavaScript.


    // portée globale
    var foo = 1;
    var bar = 2;
    var i = 2;
    
    function test(i) {
        // portée locale de la fonction test
        i = 5;
    
        var foo = 3;
        bar = 4;
    }
    test(10);

`foo` et `i` sont bien des variables locales à l'intérieur de la portée de la fonction `test`, mais l'assignment `bar` remplacera la variable globale portant le même nom.

### Remontée "hoisting"

JavaScript **hisse** les déclarations. Cela signifie que les déclarations de `var` et `function` seront déplacés vers le haut de leur portée englobante.

    bar();
    var bar = function() {};
    var someValue = 42;
    
    test();
    function test(data) {
        if (false) {
            goo = 1;
    
        } else {
            var goo = 2;
        }
        for(var i = 0; i < 100; i++) {
            var e = data[i];
        }
    }

Le code ci-dessus est transformé avant que l'exécution ne commence. JavaScript déplace les déclarations `var`, ainsi que les déclarations `function`, vers le haut de la portée la plus proche.

    // les déclarations var sont maintenant ici
    var bar, someValue; // mis à 'undefined' par défaut
    
    // les déclarations de fonction aussi
    function test(data) {
        var goo, i, e; // pas de portée de bloc,
                       // donc déclarations var viennent ici
        if (false) {
            goo = 1;
    
        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }
    
    bar(); // échoue avec TypeError puisque bar est toujours 'undefined'
    someValue = 42; // les assignements ne sont pas concernés par la remontée
    bar = function() {};
    
    test();

L'inexistence des portées de bloc va non seulement déplacer les déclarations `var` en dehors du corps des boucles, mais va aussi rendre les résultats de certaines constructions de `if` non-intuitifs.

Dans le code original, la déclaration `if` semblait modifier la *variable globale* `goo`, alors qu'en fait elle modifiait la *variable locale* - après la remontée appliquée.

Sans la connaissance du concept de *remontée*, on pourrait soupçonner que le code ci-dessous produirait une erreur de référence `ReferenceError`.

    // verifie si SomeImportantThing a bien été initializé
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

Le code fonctionne pourtant bien, car la déclaration de `var` est déplacé vers le haut de la *portée globale*.

    var SomeImportantThing;
    
    // du code peut, ou pas, initializer SomeImportantThing ici
    
    // soyons en sûr
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### Ordre de la résolution de noms

Toutes les portées en JavaScript, y compris la *portée globale*, ont le nom spécial [`this`](#function.this) défini qui se réfère à l'*objet courant*.

Les portées de fonction ont aussi le nom [`arguments`](#Function.arguments) défini qui contient les arguments qui ont été transmis à la fonction.

Par exemple, lorsque vous essayez d'accéder à une variable nommé `foo` l'intérieur de la portée d'une fonction, JavaScript va chercher le nom dans l'ordre suivant:

 1. Si il y a une déclaration `var foo` var dans la portée courante, l'utiliser.
 2. Si l'un des paramètres de la fonction est nommé `foo`, l'utiliser.
 3. Si la fonction elle-même est appelée `foo`, l'utiliser.
 4. Sinon, accéder à la portée externe suivante, et recommencer à **#1** pour cette portée.

**Remarque:** Avoir un paramètre appelé `arguments` va **empêcher** la création d'objet par défaut `arguments`.

### Espaces de noms

Le fait de n'avoir qu'un seul espace de noms global engendre un risque de conflit de noms de variables, un problème commun en JavaScript.
En JavaScript, ce problème peut facilement être évité grâces aux *enveloppes anonymes*.

    (function() {
        // un "espace de nom" autonome
        
        window.foo = function() {
            // une fermeture exposée
        };

    })(); // exécute la fonction immédiatement

Les fonctions anonymes sont considérées comme des [expressions](#function.general); ainsi elles doivent d'abord être évaluées avant d'être appelées.

    ( // évaluer la fonction à l'intérieur des parenthèses
    function() {}
    ) // et retourner la fonction object
    () // appeler le résultat de l'évaluation

Il y a d'autres façons d'évaluer et d'appeler directement l'expression de fonction qui, bien que différentes dans la syntaxe, se comportent de la même manière.

	// Autres styles d'invocation directe
    !function(){}()
    +function(){}()
    (function(){}());
    // etc.

### En conclusion

Il est recommandé de toujours utiliser une *enveloppe anonyme* pour encapsuler du code dans son propre espace de noms.
Non seulement cela protège des conflits de noms de code, cela permet également une meilleure modularisation des programmes.

En outre, l'utilisation de variables globales est considéré comme une **mauvaise pratique**.
Leur utilisation indique un code mal écrit, sujet à des erreurs, et difficile à maintenir.

