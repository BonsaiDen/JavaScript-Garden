## Le constructeur `Array`

Le constructeur `Array` traite ses paramètres de façon ambigu.
Il est fortement recommandé d'utiliser le littéral de tableau  - notation `[]` - pour créer de nouveaux tableaux.

    [1, 2, 3]; // Résultat: [1, 2, 3]
    new Array(1, 2, 3); // Résultat: [1, 2, 3]
    
    [3]; // Résultat: [3]
    new Array(3); // Résultat: []
    new Array('3') // Résultat: ['3']

Dans les cas où il n'y a qu'un seul argument passé au constructeur `Array`, et quand cet argument est un nombre `Number`, le constructeur va retourner un nouveau tableau *clairsemé* avec la propriété `length` (longueur) fixée à la valeur de l'argument.
Il faut noter que de cette façon, **seulement** la propriété `length` du nouveau tableau sera mise en place, les indices réels du tableau ne seront pas initialisés.

    var arr = new Array(3);
    arr[1]; // undefined
    1 in arr; // faux, l'indice n'existe pas

Être en mesure de régler la longueur du tableau à l'avance n'est utile que dans quelques cas, comme la répétition d'une chaîne de caractères, dans lequel on évite l'utilisation d'une boucle.

    new Array(count + 1).join(chaineARepeter);

### En conclusion

Les littéraux sont préférés au constructeur `Array`. Ils sont plus courts, ont une syntaxe plus claire, et augmente la lisibilité du code.

