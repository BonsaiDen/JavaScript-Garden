## Le prototype

JavaScript n'utilise pas le modèle classique d'héritage, mais un modèle *prototypique*.

Souvent considéré comme l'une des faiblesses de JavaScript, le modèle d'héritage prototypique est en fait plus puissant que le modèle classique. Par exemple, il est assez facile de construire un modèle classique à partir du modèle prototypique, tandis que l'inverse est une tâche beaucoup plus difficile à entreprendre.

JavaScript étant le seul langage à héritage prototypique largement utilisé, s'adapter aux différences entre les deux modèles peut prendre du temps.

La première différence majeure est que l'héritage en JavaScript utilise des *chaînes de prototypes*.

> **Remarque:** Utiliser simplement `Bar.prototype = Foo.prototype` résultera aux deux objets
> partageant le **même** prototype. Par conséquent, le changement du prototype d'un objet aura une 
> incidence sur le prototype de l'autre ce qui, dans la plupart des cas, n'est pas l'effet désiré.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };
    
    function Bar() {}
    
    // Assigner le prototype de Bar à une nouvelle instance de Foo
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';
    
    // S'assurer que Bar est le constructeur
    Bar.prototype.constructor = Bar;
    
    var test = new Bar(); // crée une nouvelle instance de bar
    
    // La chaîne de prototypes qui en résulte
    test [instance of Bar]
        Bar.prototype [instance of Foo]
            { foo: 'Hello World' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* etc. */ }

Dans le code ci-dessus, l'objet `test` va hériter à la fois de `Bar.prototype` et de `Foo.prototype`; par conséquent, il aura accès à la fonction `method` qui était définie sur `Foo`. Il aura également accès à la propriété `value` de la **seule** instance de `Foo` qui est son prototype. Il est important de noter que le `new Bar()` ne crée **pas** une nouvelle instance de `Foo`, mais réutilise celui attribué à son prototype; ainsi, toutes les instances de `Bar` se partageront la **même** propriété `value`.

> **Remarque:** Ne **pas** utiliser `Bar.prototype = Foo`, car il ne pointera pas vers
> le prototype de `Foo` mais plutôt à l'objet-fonction `Foo`. donc, la
> chaîne de prototypes ira sur `Function.prototype` et non pas sur `Foo.prototype`;
> et donc, `method` ne sera pas disponible sur la chaîne de prototypes.

### Recherche des propriétés

Lors de l'accès aux propriétés d'un objet, JavaScript traversera la chaîne de prototypes **vers le haut** jusqu'à ce qu'il trouve une propriété avec le nom demandé.

S'il atteint le sommet de la chaîne - à savoir `Object.prototype` - sans avoir trouvé la propriété spécifiée, la valeur [undefined](#core.undefined) sera retournée.

### La propriété prototype

Bien que la propriété prototype est utilisé par le langage pour construire la chaîne de prototypes, il est toujours possible de lui attribuer une valeur quelconque, mais les types primitifs seront simplement ignorés.

    function Foo() {}
    Foo.prototype = 1; // aucun effet

Assigner des objets, comme le montre l'exemple ci-dessus, va marcher, et permet la création dynamique de chaînes de prototypes.

### Performance

Les temps de recherche pour des propriétés qui sont en haut de la chaîne de prototypes peuvent avoir un impact négatif qui être significatif pour du code où la performance est critique. Essayer d'accéder à des propriétés inexistantes causera toujours la traversée complète de la chaîne de prototypes.

De plus, [itérer](#object.forinloop) sur les propriétés d'un objet va causer l'énumération de **toutes** les propriétés qui se trouve sur la chaîne de prototype.

### Extension des prototypes natifs

Une mauvaise technique souvent utilisée est d'étendre `Object.prototype` ou un des prototypes intégrés.

Cette technique est appelée [monkey patching][1] et casse l'*encapsulation*. Bien qu'utilisée par des cadriciels "frameworks" populaires tels que [Prototype][2], il n'existe aucune bonne raison pour encombrer les types intégrés avec des fonctionnalités supplémentaires *non standards*.

La **seule** bonne raison d'étendre un prototype intégré est le rétroportage de caractéristiques des nouveaux moteurs JavaScript; par exemple, [`Array.forEach`][3].

### En conclusion

Il est **essentiel** de comprendre le modèle d'héritage prototypique avant d'écrire du code complexe qui l'utilise. Soyez conscient de la longueur des chaînes de prototypes dans votre code; découpez les si nécessaire pour éviter de possible problèmes de performance. En outre, les prototypes natifs ne devraient **jamais** être étendus, sauf pour des raisons de compatibilité avec de nouvelles caractéristiques du langage JavaScript.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

