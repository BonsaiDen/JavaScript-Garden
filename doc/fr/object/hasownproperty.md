## `hasOwnProperty`

Pour savoir si un objet possède une propriété définie, et non pas quelque part ailleurs sur sa [chaîne de prototype](#object.prototype), il est nécessaire d'utiliser la méthode `hasOwnProperty`, une méthode que tous les objets héritent d'`Object.prototype`.

> **Remarque:** Il n'est **pas** suffisant de vérifier si une propriété est `undefined`,
> car la propriété peut très bien exister, mais avec une valeur `undefined`.

`hasOwnProperty` est la seule chose en JavaScript qui traite des propriétés **sans** traverser la chaîne de prototypes.

    // Empoisonnement d'Object.prototype
    Object.prototype.bar = 1;
    var foo = {goo: undefined};
    
    foo.bar; // 1
    'bar' in foo; // vrai
    
    foo.hasOwnProperty('bar'); // faux
    foo.hasOwnProperty('goo'); // vrai

Seulement `hasOwnProperty` donnera le résultat attendu et correct. Voir la section sur [les boucles `for in`](#object.forinloop) pour plus de détails sur l'utilisation de `hasOwnProperty` pour traverser les propriétés d'un objet.

### `hasOwnProperty` en tant que propriété

JavaScript ne protège pas le nom de la propriété `hasOwnProperty`; ainsi, la possibilité existe qu'un objet peut avoir une propriété avec ce nom, et il est donc nécessaire d'utiliser une méthode `hasOwnProperty` *externe* pour obtenir des résultats corrects.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };
    
    foo.hasOwnProperty('bar'); // toujours faux
    
    // Utiliser hasOwnProperty d'un autre object,
    // et l'appeler avec foo assigné à 'this'
    ({}).hasOwnProperty.call(foo, 'bar'); // vrai
    
	// Il est aussi possible d'utiliser hasOwnProperty
    //du prototype d'Object
    Object.prototype.hasOwnProperty.call(foo, 'bar'); // vrai

### En conclusion

Utiliser `hasOwnProperty` est la **seule** méthode fiable pour vérifier l'existence d'une propriété sur un objet. Il est recommandé d'utiliser `hasOwnProperty` pour itérer sur les propriétés des objets comme décrit dans la section sur [les boucles `for in`](#object.forinloop).

