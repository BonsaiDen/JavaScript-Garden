## Utilisation des objets et propriétés


En JavaScript, tout agit comme un objet, à part deux exceptions: [`null`](#core.undefined) et [`undefined`](#core.undefined).

    false.toString(); // 'false'
    [1, 2, 3].toString(); // '1,2,3'
    
    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

Une méprise commune est que les littéraux numériques ne peuvent pas être utilisés comme objets, due à une imperfection de l'analyseur de JavaScript qui tente d'analyser la *notation à point* sur un nombre comme une virgule flottante.

    2.toString(); // erreur de syntaxe SyntaxError

Des solutions de contournement existent pour forcer les littéraux numériques à agir comme des objets.

    2..toString(); // le second point est correctement reconnu
    2 .toString(); // notez l'espace à gauche du point
    (2).toString(); // 2 est évalué en premier

### Objets comme type de données

Les objets en JavaScript peuvent également être utilisés comme [*HashMaps*][1]; essentiellement, des propriétés nommées pointant sur des valeurs.

En utilisant un littéral d'objet - notation `{}` - il est possible de créer un objet vide.
Ce nouvel objet [hérite](#object.prototype) de `Object.prototype` et ne possède pas de [propriétés propres](#object.hasownproperty) définies.

    var foo = {}; // un nouvel objet vide

    // un nouvel objet avec une propriété 'test' à valeur 12
    var bar = {test: 12};

### Accéder aux propriétés

Les propriétés d'un objet sont accessibles de deux façons, soit par la notation à point, soit par la notation à crochets.

    var foo = {name: 'kitten'}
    foo.name; // kitten
    foo['name']; // kitten
    
    var get = 'name';
    foo[get]; // kitten
    
    foo.1234; // SyntaxError
    foo['1234']; // cela marche

Les deux notations fonctionnent presque pareil, la seule différence étant que la notation à crochet permet l'écriture des propriétés et l'utilisation des noms de propriété qui autrement mèneraient à une erreur de syntaxe.

### Supprimer des propriétés

La seule façon de supprimer une propriété d'un objet est d'utiliser l'opérateur `delete`.
Mettre la propriété à `null` ou `undefined` ne supprime que la *valeur* associée à la propriété, et non pas la *propriété* elle-même.

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

Les résultats du programme ci-dessus sont `bar undefined` et `foo null` - seul `baz` a été correctement supprimé.

### Notation des clefs "keys"

    var test = {
        'case': 'Je suis un mot-clé, donc je dois etre écrit en tant que chaîne',
        delete: 'Je suis un mot-clé, donc moi aussi' // erreur de syntaxe SyntaxError
    };

Les propriétés d'objet peuvent être écrites simplement telles quelles ou comme des chaînes "string". Une autre imperfection de l'analyseur de JavaScript, avant ECMAScript 5, provoquera une erreur de syntaxe `SyntaxError` dans le programme qui précède.

Cette erreur vient du fait que `delete` est un *mot-clé*; et par conséquent, il doit être écrit comme une *chaîne* littérale pour s'assurer qu'il sera correctement interprété par les vieux moteurs JavaScript.

[1]: http://en.wikipedia.org/wiki/Hashmap

