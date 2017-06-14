## Changements de types

JavaScript est un langage *faiblement typé*, il appliquera la *coercition de type* partout où c'est possible.

    // Ceux-ci sont vrais
    new Number(10) == 10; // Objet Number est converti
                          // en un nombre primitif via un appel implicite
                          // à la méthode Number.prototype.valueOf
    
    10 == '10';           // Strings est converti en Number
    10 == '+10 ';         // Encore aussi fou
    10 == '010';          // Et encore
    isNaN(null) == false; // null est converti en 0
                          // ce qui, bien sûr, n'est pas NaN
    
    // Ceux-ci sont faux
    10 == 010;
    10 == '-10';

> **Remarque ES5:** Les nombres littéraux qui commencent avec un '0' sont interprétés comme octal (Base 8). L'octal a été **retiré** dans ECMAScript 5 en mode stricte.

Pour éviter les problèmes ci-dessus, l'utilisation de l'[opérateur d'égalité stricte](# types.equality) est **fortement** recommandé.
Bien que cela évite beaucoup de pièges communs, il y en reste encore beaucoup. Tous ces pièges découlent de la faiblesse du système de typage de JavaScript.

### Constructeurs de types internes

Les constructeurs de types internes comme `Number` et `String` se comportent différemment suivant s'ils sont utilisés avec ou sans le mot clé `new`.

    new Number(10) === 10;     // Faux, Object et Number
    Number(10) === 10;         // Vrai, Number et Number
    new Number(10) + 0 === 10; // Vrai, due à la reconversion implicite

L'utilisation d'un type intégré comme `Number` en tant que constructeur va créer une nouvel objet `Number`. Mais sans le mot clé `new`, `Number` se comportera comme un convertisseur.

De plus, passer des valeurs littérales ou des non-objets se traduira par encore plus de coercition de type.

La meilleure option est de forcer **explicitement** le type à l'un des trois types possibles .

### Forcer à String

    '' + 10 === '10'; // vrai

En faisant précéder une **chaîne vide**, une valeur peut facilement être converti en une chaîne.

### Forcer à Number

    +'10' === 10; // vrai

L'utilisation de l'opérateur **plus unaire** converti une valeur en nombre.

### Forcer à Boolean

L'utilisation double de l'opérateur **non** converti une valeur en booléen.

    !!'foo';   // vrai
    !!'';      // faux
    !!'0';     // vrai
    !!'1';     // vrai
    !!'-1'     // vrai
    !!{};      // vrai
    !!true;    // vrai

