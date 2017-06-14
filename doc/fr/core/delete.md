## L'opérateur `delete`

Il est *impossible* de supprimer les variables globales, fonctions et autres choses qui ont l'attribut `DontDelete` en JavaScript.

### Le code global et le code de fonction

Quand une variable ou une fonction est définie dans la portée globale ou une [portée de fonction](#function.scopes), c'est une propriété soit de l'objet d'activation, soit de l'objet global.
Ces propriétés ont un ensemble d'attributs, dont l'un est `DontDelete`. Les déclarations de variables et de fonctions dans le code global et le code de fonction vont toujours créer des propriétés avec `DontDelete`, elle ne peuvent donc pas être supprimées.

    // global variable:
    var a = 1; // DontDelete est mis
    delete a; // faux
    a; // 1
    
    // normal function:
    function f() {} // DontDelete is mis
    delete f; // faux
    typeof f; // "function"
    
    // reassigner n'aide pas:
    f = 1;
    delete f; // faux
    f; // 1

### Propriétés explicites

Les propriétés crées explicitement peuvent être supprimées normalement.

    // propriété crée explicitement:
    var obj = {x: 1};
    obj.y = 2;
    delete obj.x; // vrai
    delete obj.y; // vrai
    obj.x; // undefined
    obj.y; // undefined

Dans l'exemple ci-dessus, les propriétés `obj.x` et `obj.y` peuvent être supprimées parce qu'elles n'ont pas l'attribut `DontDelete`. C'est aussi pourquoi l'exemple ci-dessous fonctionne également.

    // ceci fonctionne, sauf sur IE:
    var GLOBAL_OBJECT = this;
    GLOBAL_OBJECT.a = 1;
    a === GLOBAL_OBJECT.a; // vrai - juste une var globale
    delete GLOBAL_OBJECT.a; // vrai
    GLOBAL_OBJECT.a; // undefined

Ici, nous utilisons une astuce pour supprimer `a`. [`this`](#function.this) se réfère ici à l'objet global et nous déclarons explicitement la variable `a` comme sa propriété, ce qui nous permet de la supprimer.

IE (au moins 6-8) a quelques bogues, le code ci-dessus n'y fonctionne pas.

### Les arguments de fonction et built-ins

Les arguments normaux de fonctions, [objets `arguments`](#Function.arguments) et les propriétés intégrées "built-in" ont aussi l'attribut `DontDelete`.

    // les arguments de fonction et les propriétés:
    (function (x) {
    
      delete arguments; // faux
      typeof arguments; // "object"
      
      delete x; // faux
      x; // 1
      
      function f(){}
      delete f.length; // faux
      typeof f.length; // "number"
      
    })(1);

### Objets hôtes

Le comportement de l'opérateur `delete` peut être imprévisible pour les objets hébergés "hosted". Dû à la spécification, les objets hôte sont autorisés à mettre en œuvre tout type de comportement.
    
### En conclusion

L'opérateur `delete` a souvent un comportement inattendu et ne peut être utilisé que pour supprimer les propriétés explicitement définies sur des objets normaux.

