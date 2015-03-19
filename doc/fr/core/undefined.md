## `undefined` et `null`

JavaScript a deux valeurs distinctes pour "rien": `null` et `undefined`, `undefined` étant la plus utile.

### La valeur `undefined`

`undefined` est un type avec exactement une valeur:` undefined`.

Le langage définit également une variable globale qui a la valeur `undefined`. Cette variable est aussi appelée `undefined`. Cependant, cette variable n'est ni une constante, ni un mot clé du langage, ce que signifie que sa *valeur* peut être facilement écrasée.

> **Remarque ES5:** `undefined` dans ECMAScript 5 n'est **plus** inscriptible dans le mode stricte, mais son nom peut toujours être outrepassé, par example par une fonction avec le nom `undefined`.

Voici quelques exemples de cas où la valeur `undefined` est retournée:

 - Accès à la variable globale (non modifié) `undefined`.
 - Accès à une variable déclarée, mais *pas encore* initialisée.
 - Retours implicites de fonctions sans déclaration `return`.
 - Déclarations `return` vides, qui ne renvoient rien.
 - Recherches de propriétés inexistantes.
 - Paramètres de fonction qui ne ont pas de valeur explicite passée.
 - Tout ce qui a été mis à la valeur de `undefined`.
 - Toute expression sous forme de `void(expression)`.

### Changements à la valeur de `undefined`

Puisque la variable globale `undefined` contient uniquement une copie de la *valeur* réelle `undefined`, l'attribution d'une nouvelle valeur à la variable ne modifie **pas** la valeur du *type* `undefined`.

Pourtant, pour pouvoir comparer quelque chose contre la valeur de `undefined`, il est d'abord nécessaire pour récupérer la valeur de `undefined`.

Afin de protéger le code contre une éventuelle variable `undefined` écrasée, une technique commune utilisée consiste à ajouter un paramètre supplémentaire à une [enveloppe anonyme](#function.scopes) et de lui passer aucun argument.

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined dans la portée locale 
        // réfère bien à la valeur `undefined`

    })('Hello World', 42);

Une autre façon d'obtenir le même effet est d'utiliser une déclaration à l'intérieur de l'enveloppe.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

La seule différence étant quelques caractères de plus pour écrire "var".

### Utilisation de `null`

Alors que `undefined` dans le contexte du langage JavaScript est utilisé dans la plupart des cas dans le d'un *null* traditionnel, le `null` réel (un littéral et un type) est juste un autre type de données.

`null` est utilisé par JavaScript (comme signaler la fin de la chaîne de prototypes avec `Foo.prototype = null`), mais dans presque tous les cas, il peut être remplacé par `undefined`.

