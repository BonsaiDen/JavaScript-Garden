## Il ne faut pas utiliser `eval`

La fonction `eval` exécute une chaîne de caractères représentant du code JavaScript dans la portée locale.

    var number = 1;
    function test() {
        var number = 2;
        eval('number = 3');
        return number;
    }
    test(); // 3
    number; // 1

Cependant, `eval` n'exécute dans la portée locale que quand il est appelé directement *et* quand le nom de la fonction appelée est en fait `eval`.

    var number = 1;
    function test() {
        var number = 2;
        var copyOfEval = eval;
        copyOfEval('number = 3');
        return number;
    }
    test(); // 2
    number; // 1

L'utilisation de la fonction `eval` doit être évitée. 99,9% de ses "cas d'utilisation" peuvent être obtenues **sans** elle.
    
### `eval` déguisé

Les [fonctions timeout](#other.timeouts) `setTimeout` et `setInterval` acceptent une chaîne comme premier argument.
Cette chaîne sera **toujours** exécutée dans la portée globale car dans ce cas, `eval` n'est pas appelé directement.

### Problèmes de sécurité

`eval` est aussi un problème de sécurité, car il exécute **n'importe quel** code qu'on lui donne.
Il devrait **jamais** être utilisé avec des chaînes d'origines inconnues ou douteuses.

### En conclusion

`eval` ne devrait jamais être utilisé. Sa presence met en doute le fonctionnement, la performance, et la sécurité du code qui l'utilise.
Si quelque chose a besoin d'`eval` pour pouvoir fonctionner, il ne doit **pas** être utilisé en premier lieu. Un *meilleur design* qui n'utilise pas `eval` doit être trouvé et implementé.

