## Déclaration des fonctions et expressions

Les fonctions en JavaScript sont des objets de première classe. Cela signifie qu'elles peuvent être passées comme toute autre valeur. Une utilisation courante de cette caractéristique est de passer une *fonction anonyme* comme une fonction de rappel "callback" qui peut être asynchrone.

### La déclaration `function`

    function foo() {}

La fonction ci-dessus est [hissée](#function.scopes) "hoisted" avant le démarrage du programme; ainsi, elle est donc disponible partout dans la portée "scope" d'application où la fonction a été définie, même si appelé avant sa définition dans le code source.

    foo(); // Fonctionne car foo a été crée avant l'exécution de ce code
    function foo() {}

### L'expresssion `function`

    var foo = function() {};

Cet exemple attribue une fonction *anonyme* et sans nom à la variable `foo`.

    foo; // 'undefined'
    foo(); // provoque un erreur de type TypeError
    var foo = function() {};

En raison du fait que `var` est une déclaration qui hisse le nom de la variable `foo` avant que l'exécution réelle du code ne commence, `foo` est déjà déclarée lorsque le script est exécuté.

Mais comme les assignements ne se produisent qu'au moment de l'exécution, la valeur de `foo` sera par défaut mise à [undefined](#core.undefined) avant l'exécution du code.

### L'expression de fonction nommée

Un autre cas est l'attribution de fonctions nommées.

    var foo = function bar() {
        bar(); // Works
    }
    bar(); // erreur de reference ReferenceError

Ici, `bar` n'est pas disponible dans la portée externe "outer scope", puisque la fonction est seulement assignée à `foo`, mais elle est disponible à l'intérieur de `bar`. Cela est dû à la méthode de [résolution de noms](#function.scopes) de JavaScript: le nom de la fonction est *toujours* disponible dans la portée locale "local scope" de la fonction elle-même.

