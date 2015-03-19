## Égalité et comparaisons

JavaScript a deux façons de comparer les valeurs des objets pour égalité.

### L'opérateur d'égalité

L'opérateur d'égalité se compose de deux signes égal: `==`.

JavaScript est un langage au *typage faible* "weak typing". Cela signifie que l'opérateur d'égalité va convertir les deux opérandes en un même type afin de les comparer.
    
    ""           ==   "0"           // faux
    0            ==   ""            // vrai
    0            ==   "0"           // vrai
    false        ==   "false"       // faux
    false        ==   "0"           // vrai
    false        ==   undefined     // faux
    false        ==   null          // faux
    null         ==   undefined     // vrai
    " \t\r\n"    ==   0             // vrai

Le tableau ci-dessus montre les résultats de la coercition de type, et c'est la raison principale pourquoi l'utilisation de `==` est largement considéré comme une mauvaise pratique. Les règles de conversion de types compliquées introduisent des bogues difficiles à dépister.

### L'opérateur d'égalité stricte

L'opérateur d'égalité stricte se compose de **trois** signes égal: `===`. 

Il fonctionne comme l'opérateur d'égalité normale, sauf que l'égalité stricte ne converti **pas** le types de ses opérandes.

    ""           ===   "0"           // faux
    0            ===   ""            // faux
    0            ===   "0"           // faux
    false        ===   "false"       // faux
    false        ===   "0"           // faux
    false        ===   undefined     // faux
    false        ===   null          // faux
    null         ===   undefined     // faux
    " \t\r\n"    ===   0             // faux

Les résultats ci-dessus sont beaucoup plus clairs et permettent la rupture précoce de code.
Cela durcit le code jusqu'à un certain degré, et améliore la performance dans le cas où les opérandes sont de types différents.

### Comparaison d'objets

Bien que `==` et `===` sont appelés **opérateurs d'égalité**, ils se comportent différement quand au moins un des opérandes est un objet `Object`.

    {} === {};                   // faux
    new String('foo') === 'foo'; // faux
    new Number(10) === 10;       // faux
    var foo = {};
    foo === foo;                 // vrai

En effet, les deux opérateurs comparent l'**identité** et non pas l'**égalité**. Autrement dit, ils comparent pour la même **instance** de l'objet, tout comme `is` en Python, ou la comparaison de pointeur en C.

### En conclusion

Il est fortement recommandé de n'utiliser que l'opérateur d'**égalité stricte**. Dans les cas où les types ont à être convertis, cela devraient être fait [explicitement](#types.casting) et non pas laissé aux règles complexes de coercition de type du langage.


