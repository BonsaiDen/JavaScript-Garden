## La boucle `for in`

Tout comme l'opérateur `in`, la boucle `for in` traverse la chaîne de prototypes lors de l'itération sur les propriétés d'un objet.

> **Remarque:** La boucle `for in` n'itérera **pas** sur les propriétés qui
> ont leur attribut `enumerable` à `false`; par exemple, la propriété `length` d'un tableau "array".

    // Empoisonnement d'Object.prototype
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // imprime bar et moo
    }

Puisqu'il n'est pas possible de changer le comportement de la boucle `for in`, il est nécessaire de filtrer les propriétés indésirables à l'intérieur du corps de la boucle. Sous ECMAScript 3 et plus, cela se fait en utilisant la méthode [`hasOwnProperty`](#object.hasownproperty) de `Object.prototype`.

Depuis ECMAScript 5, `Object.defineProperty` peut être utilisé avec `enumerable` mis à faux pour ajouter des propriétés à des objets (y compris `Object`) sans que ces propriétés soient énumérées. Il est raisonnable dans ce cas d'assumer que les propriétés énumérables ont été ajouté pour une raison, ce qui permet d'omettre les appels à `hasOwnProperty` qui réduisent la lisibilité du code. Dans du code de librairie, `hasOwnProperty` devrait toujours être utilisé car des propriétés énumérables pourraient résider sur la chaîne de prototypes sans qu'on le sache.

> **Remarque:** Puisque la boucle `for in` traverse toujours la chaîne de prototypes complet, elle
> deviendra plus lente avec chaque couche supplémentaire d'héritage ajoutée à un objet.

### Filtrer avec `hasOwnProperty`

    // le même foo qu'au dessus
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

Cette version est la seule version correcte à utiliser avec les anciennes versions d'ECMAScript.
L'utilisation de `hasOwnProperty` nous garantie que seulement `moo` sera imprimé.
Quand `hasOwnProperty` n'est pas utilisé, les prototypes natifs - par exemple `Object.prototype` - qui ont peut-être été étendus, causeront probablement des erreurs.

Avec les versions plus récentes d'ECMAScript, des propriétés non-dénombrables peuvent être définies avec `Object.defineProperty`, réduisant le risque d'itération sur les propriétés quand `hasOwnProperty` n'est pas utilisé. Néanmoins, il faut faire attention avec l'utilisation de vieilles librairies comme [Prototype][1] qui ne bénéficient pas des nouvelles fonctions d'ECMAScript. Dans ce cadre, écrire des boucles `for in` sans `hasOwnProperty` est garanti de causer des erreurs.

### En conclusion

Il est recommandé de **toujours** utiliser `hasOwnProperty` avec ECMAScript 3 ou moins, ou dans du code de librairie. Dans ces environnements, il ne faut jamais assumer que les prototypes natifs n'ont pas été étendus. Depuis ECMAScript 5, `Object.defineProperty` permet de définir les propriétés non-dénombrables et donc permet d'omettre les appels à `hasOwnProperty` dans le code de l'application.


[1]: http://www.prototypejs.org/

