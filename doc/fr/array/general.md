## Tableaux: iteration et propriétés

Bien que les tableaux soient des objets en JavaScript, il n'y a pas de bonnes raisons d'utiliser la boucle [`for in`](#object.forinloop).
En fait, il y a un certain nombre de bonnes raisons **contre** l'utilisation de `for in` sur les tableaux.

**Remarque:** Les tableaux JavaScript ne sont **pas** *associatifs*. JavaScript n'offre que les [objets](#object.general) pour associer des clés à des valeurs. Contrairement aux tableaux associatifs, les objets ne préservent **pas** l'ordre.

La boucle `for in` énumère toutes les propriétés qui sont sur la chaîne de prototypes, et le seul moyen d'exclure ces propriétés consiste à utiliser
[`hasOwnProperty`](#object.hasownproperty), par conséquent la boucle `for in ` est **vingt fois** plus lente qu'une boucle `for` classique.

### Itération

Pour itérer sur les tableaux de façon performante, il est préférable d'utiliser la boucle `for` classique.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

Notez l'optimization supplémentaire dans l'exemple ci-dessus: la longueur du tableau est mise en mémoire "cached" via `l = list.length`.

La propriété `length` est définie sur le tableau lui-même, mais la rechercher à chaque itération de la boucle à un coût.
Bien que les moteurs JavaScript récents **peuvent** appliquer l'optimisation, il n'y a aucun moyen de savoir si le code s'exécutera sur un de ces nouveaux moteurs.

En effet, mettre la longueur du tableau en mémoire cache peut **doubler** la vitesse d'execution de la boucle.

### La propriété `length`

Le *getter* de la propriété `length` (longueur) renvoie simplement le nombre d'éléments contenus dans le tableau, mais le *setter* peut être utilisé pour
tronquer le tableau.

    var arr = [1, 2, 3, 4, 5, 6];
    arr.length = 3;
    arr; // [1, 2, 3]
    
    arr.length = 6;
    arr.push(4);
    arr; // [1, 2, 3, undefined, undefined, undefined, 4]

Attribuer une longueur inférieure tronque le tableau. Accroître la longueur crée un tableau clairsemé.

### En conclusion

Pour de meilleures performances, il est recommandé de toujours utiliser la boucle `for` classique et de mettre en mémoire la propriété `length`.
L'utilisation de la boucle `for in` sur un tableau est un signe de code mal écrit, de mauvaise performance, et sujet à des bogues.

