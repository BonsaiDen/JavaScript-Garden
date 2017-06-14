## Fermetures et réferences

Les *fermetures* "closures" sont une des fonctionnalités les plus puissantes de JavaScript.
Avec les fermetures, les portées gardent **toujours** l'accès à la portée externe, dans laquelle elles ont été définies.
Puisque la seule portée que JavaScript a est la [portée de fonction](#function.scopes), toutes les fonctions, par défaut, agissent comme des fermetures.

### Simuler les variables privées

    function Counter(start) { // compteur
        var count = start; // compte
        return {
            increment: function() {
                count++;
            },
            
            get: function() {
                return count;
            }
        }
    }
    
    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

Ici, `Counter` retourne **deux** fermetures: la fonction` increment` ainsi que la fonction `get`. Ces deux fonctions conservent une **référence** à la portée de `Counter` et, par conséquent, gardent toujours l'accès à la variable `count` qui a été définie dans cette portée.

### Comment marchent les variables privées

Comme il ne est pas possible de référencer ou assigner des portées en JavaScript, il n'y a **aucun** moyen d'accéder à la variable `count` de l'extérieur.
La seule façon d'interagir avec elle est par l'intermédiaire des deux fermetures.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

Le code ci-dessus ne va **pas** changer la variable `count` dans la portée de `Counter`, car `foo.hack` n'a pas été défini dans cette portée. En fait, une nouvelle variable va etre crée - ou va remplacer - la variable *globale* `count`.

### Fermetures dans les boucles

Une erreur souvent commise est d'utiliser les fermetures à l'intérieur de boucles comme si elles copiaient la valeur de la variable d'indice de la boucle.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

La programme ci-dessus ne vas **pas** produire les numéros `0` à `9`, il imprimera `10` dix fois.

La fonction *anonyme* garde une **référence** à `i`. Au moment où `console.log` est appelée, la `boucle for` est déjà achevée, et donc la valeur de `i` est à `10`.

Afin d'obtenir le comportement souhaité, il est nécessaire de créer une **copie** de la valeur de `i`.

### Eviter le problème de référence

Pour copier la valeur de la variable d'index de la boucle, il est préférable d'utiliser une [enveloppe anonyme](#function.scopes) "wrapper".

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

La fonction externe anonyme est appelée immédiatement avec `i` en tant que premier argument, et donc le paramètre `e` recevra une copie de la **valeur** de `i`.

La fonction anonyme qui est passé à `setTimeout` a maintenant une référence à `e`, dont la valeur ne peut **pas** être changée par la boucle.

Une autre façon de faire est de retourner une fonction de l'enveloppe anonyme qui aura alors le même comportement que le code ci-dessus.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }

Une autre façon populaire d'achever le même comportement est d'ajouter un argument supplémentaire à la fonction `setTimeout`. La fonction passera ces arguments à la fonction de rappel "callback".

    for(var i = 0; i < 10; i++) {
        setTimeout(function(e) {
            console.log(e);  
        }, 1000, i);
    }

Sachez que certains environnements JS (Internet Explorer 9 et avant) ne supportent pas cette dernière approche.

Enfin, une dernière façon de faire et d'utiliser `bind`, qui peut lier le contexte `this` et les arguments pour la fonction.

    for(var i = 0; i < 10; i++) {
        setTimeout(console.log.bind(console, i), 1000);
    }

