### `setTimeout` et `setInterval`

Puisque JavaScript est asynchrone, il est possible de programmer l'exécution future d'une fonction en utilisant les fonctions `setTimeout` et `setInterval`.

> **Remarque:** Les temps d'attente "timeouts" ne font **pas** partie de la norme ECMAScript. Ils sont implémentés dans les [BOM ou DOM Niveau 0][1], qui ne ne sont ni définies ni documentés formellement.
> Aucune spécification recommandée n'a été publiée jusqu'à présent, cependant, ils sont en voie de normalisation par [HTML5][2].
> En raison de cela, l'implémentation peut varier entre navigateurs et moteurs.

    function foo() {}
    var id = setTimeout(foo, 1000); // retourne un nombre > 0

Quand `setTimeout` est appelé, il renvoie l'identifiant de la temporisation et fixe la date de d'exécution de `foo` **approximativement** mille millisecondes dans le future. `foo` sera exécuté **une seule** fois.

La résolution de l'horloge du moteur JavaScript exécutant le code, le fait que JavaScript est mono-thread, et la possibilité qu'autre code en cours d'exécution peut bloquer le fil "thread", font qu'il n'est **pas** possible de déterminer le temps exact d'attente spécifié dans l'appel `setTimeout`.

La fonction passée en tant que premier paramètre sera appelé par l'*objet global*, ce qui signifie que [`this`](#function.this) à l'intérieur de la fonction appelée fait référence à l'objet global.

    function Foo() {
        this.value = 42;
        this.method = function() {
            // this réfère a l'boject global
            console.log(this.value); // enregistre undefined
        };
        setTimeout(this.method, 500);
    }
    new Foo();

> **Remarque:** Comme `setTimeout` prend un **objet fonction** comme premier paramètre, une erreur commune est d'écrire `setTimeout(foo(), 1000)`, qui utilisera la **valeur de retour** de l'appel `foo` et non **pas** `foo`. Cette erreur est, la plupart du temps, silencieuse, car lorsque la fonction retourne `undefined`, `setTimeout` ne produira **pas** d'erreur.

### Empilement des appels avec `setInterval`

`setTimeout` exécute la fonction une seule fois. `setInterval` - comme son nom le suggère - exécutera la fonction toutes les 'X' millisecondes, mais son utilisation est découragée.

Lorsque que du code en cours d'exécution bloque la temporisation, `setInterval` continuera a émettre plusieurs appels à la fonction spécifiée. Cela peut, en particulier avec un petit intervalle, résulter à un empilement d'appels de fonction.

    function foo(){
        // qq chose qui bloque pendant 1 seconde
    }
    setInterval(foo, 100);

Dans le code ci-dessus, `foo` sera appelé une fois et bloquera pendant une seconde.

Pendant ce temps, `setInterval` va continuer à planifier les appels à la fonction. Quand `foo` se termine, il y aura déjà **dix** autres appels qui attendent pour s'exécuter.

### Traiter le code bloquant éventuel

La solution la plus simple et qui offre le plus de contrôle est d'utiliser `setTimeout` dans la fonction elle-même.

    function foo(){
        // qq chose qui bloque pendant 1 seconde
        setTimeout(foo, 100);
    }
    foo();

Non seulement cela encapsule l'appel `setTimeout`, mais il empêche également l'empilement des appels et donne un contrôle supplémentaire. La fonction `foo` elle-même peut maintenant décider si elle veut s'exécuter à nouveau ou non.

### Effacer un délais d'attente

L'effacement des délais d'attente et des intervalles fonctionne en transmettant l'identifiant retourné par la fonction `setTimeout` ou `setInterval` à `clearTimeout` ou `clearInterval`, respectivement.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### Effacer tous les délais d'attente

Comme il n'existe pas de méthode intégrée pour effacer tous les délais d'attente et/ou intervalles, il est nécessaire d'utiliser la force brute pour obtenir cette fonctionnalité.

    // Effacement de "tous" les délais d'attente
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

Mais il pourrait encore y avoir des délais d'attente qui ne sont pas effacés par ce nombre arbitraire.
Une autre façon de faire découle du fait que l'identifiant donné à un délai d'attente est incrémenté à chaque fois que vous appelez `setTimeout`.

    // Effacement de "tous" les délais d'attente
    var identifiantLePlusGrand = window.setTimeout(function(){}, 1),
    i;
    for(i = 1; i <= identifiantLePlusGrand; i++) {
        clearTimeout(i);
    }

Même si cela fonctionne sur tous les principaux navigateurs d'aujourd'hui, il ne est pas précisé que les identifiants doivent être ordonnés de cette façon et cela peut changer. Par conséquent, il est plutôt recommandé de garder une trace de tous les identifiant crées, pour qu'ils puissent être effacées spécifiquement.

### Utilisation cachée de `eval`

`setTimeout` et `setInterval` peuvent également prendre une chaîne de caractères comme premier paramètre.
Cette fonctionnalité ne devrait **jamais** être utilisée car elle utilise `eval` en interne.

> **Remarque:** Les mécanismes précis pour quand une chaîne est passée peuvent différer entre les diverses implémentations de JavaScript.
> Par exemple, JScript de Microsoft utilise le constructeur `Function` à la place de `eval`.

    function foo() {
        // sera appelé
    }
    
    function bar() {
        function foo() {
            // ne sera jamais appelé
        }
        setTimeout('foo()', 1000);
    }
    bar();

Puisque `eval` n'est pas appelé [directement](#core.eval), la chaîne passé à `setTimeout` sera exécutée dans la *portée globale*; ainsi, la variable `foo` locale à `bar` ne sera pas utilisée.

Il est aussi recommandé de ne **pas** utiliser une chaîne pour passer des arguments à la fonction qui sera appelée par l'une des fonctions de temporisation.

    function foo(a, b, c) {}
    
    // ne JAMAIS faire cela
    setTimeout('foo(1, 2, 3)', 1000)
    
    // utiliser plutôt une fonction anonyme
    setTimeout(function() {
        foo(1, 2, 3);
    }, 1000)

>**Remarque:** Bien qu'il soit également possible d'utiliser la syntaxe `setTimeout(foo, 1000, 1, 2, 3)`, elle n'est pas recommandée, car son utilisation peut entraîner des erreurs subtiles lorsqu'elle est utilisée avec des [méthodes](#function.this).
>En outre, la syntaxe peut ne pas fonctionner dans certaines implémentations de JavaScript. Par exemple, Internet Explorer de Microsoft [ne passe **pas** les arguments directement à la fonction de rappel][3].

### En conclusion

Une chaîne ne devrait **jamais** être passée comme paramètre de `setTimeout` ou `setInterval` pour passer des arguments à la fonction appelée. C'est un clair signe de **mauvais** code. Il faut appeler une *fonction anonyme* qui se charge d'appeler la fonction réelle avec les arguments nécessaires.

En outre, l'utilisation de `setInterval` doit être évitée car son programmateur n'est pas bloqué par le code en train de s'exécuter.

[1]: http://www.nczonline.net/blog/2009/09/29/web-definitions-dom-ajax-and-more/ "Web definitions: DOM, Ajax, and more"
[2]: http://www.w3.org/TR/2014/WD-html5-20140617/webappapis.html#timers "6 Web application APIs - HTML5"
[3]: http://msdn.microsoft.com/en-us/library/ie/ms536753(v=vs.85).aspx "setTimeout method (Internet Explorer)"
