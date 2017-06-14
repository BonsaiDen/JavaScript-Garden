## L'opérateur `typeof`

L'opérateur `typeof` (avec [`instanceof`](#types.instanceof)) est probablement le plus grand défaut de design de JavaScript, car il est presque **complètement cassé**.

Bien que `instanceof` (instance de) a quelques utilisations limitées, `typeof` (type de) n'a qu'un seul cas pratique d'utilisation, et ce cas n'est **pas** la vérification du type d'un objet.

> **Remarque:** Alors que `typeof` peut être appelé comme une fonction, i.e. `typeof(obj)`, ce n'est pas un appel de fonction.
> Les parenthèses se comportent comme d'habitude et la valeur de retour sera utilisé comme opérande de l'opérateur `typeof`. La *fonction* `typeof` n'existe pas.

### table de types JavaScript

    Valeur              Class      Type
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object (function pour Nitro/V8)
    new RegExp("meow")  RegExp     object (function pour Nitro/V8)
    {}                  Object     object
    new Object()        Object     object

Dans la table ci-dessus, *Type* se réfère à la valeur retournée pas l'opérateur `typeof`, et comme on peut le voir clairement, cette valeur est incohérente.

*Class* se réfère à la valeur de la propriété interne `[[Class]]` d'un objet.

> **D'après la spécification:** La valeur de `[[Class]]` peut être l'une des chaînes suivantes: `Arguments`, `Array`, `Boolean`, `Date`, `Error`, `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

Pour récupérer la valeur de `[[Class]]`, on peut utiliser la méthode `toString` de `Object.prototype`.

### La classe d'un objet

La spécification donne exactement un moyen d'accéder à la valeur `[[Class]]`: via `Object.prototype.toString`.

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }
    
    is('String', 'test'); // vrai
    is('String', new String('test')); // vrai

Dans l'exemple ci-dessus, `Object.prototype.toString` est appelé avec la valeur [this](#function.this) pointant sur l'objet dont on cherche a récupérer la valeur de `[[Class]]`.

> **Remarque ES5:** Pour plus de commodité la valeur de retour de `Object.prototype.toString` de `null` et `undefined` a été **changée** de `Object` à `Null` et `Undefined` avec ECMAScript 5.

### Test pour les variables indéfinies

    typeof foo !== 'undefined'

Ce qui précède vérifie si `foo` a été effectivement déclarée. Juste référencer la variable résulterait en une erreur de référence `ReferenceError`. C'est la seule chose pour laquelle  `typeof` est réellement utile.

### En conclusion

Pour vérifier le type d'un objet, il est fortement recommandé d'utiliser `Object.prototype.toString` parce que c'est le seul moyen fiable de le faire.
Comme représenté dans la table de type ci-dessus, certaines valeurs de retour de `typeof` ne sont pas définies dans la spécification; et donc, elles peuvent différer entre les implémentations.

If faut éviter d'utiliser `typeof`, sauf pour vérifier si une variable est définie.

