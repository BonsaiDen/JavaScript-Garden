## Insertion automatique du point-virgule

Bien que JavaScript a une syntaxe de style C, il n'impose **pas** les points-virgules dans le code source. Il est donc possible de les omettre.

JavaScript n'est pas un langage sans points-virgules. En fait, les points-virgules sont necessaires pour comprendre le code source. Par conséquent, l'analyseur JavaScript les insère **automatiquement** chaque fois qu'il rencontre une erreur d'analyse due à un point-virgule manquant.

    var foo = function() {
    } // erreur d'analyse, point-virgule attendu
    test()

L'analyseur insère un point-virgule, puis tente à nouveau.

    var foo = function() {
    }; // plus d'error, l'analyse continue
    test()

L'insertion automatique du point-virgule est considérée comme l'un des **plus gros** défauts de conception dans le langage parce que cela *peut* changer le comportement du code.

### Comment cela marche

Le code ci-dessous n'a pas de points-virgules, l'analyseur va donc décider où les insérer.

    (function(window, undefined) {
        function test(options) {
            log('testing!')
    
            (options.list || []).forEach(function(i) {
    
            })
    
            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            )
    
            return
            {
                foo: function() {}
            }
        }
        window.test = test
    
    })(window)
    
    (function(window) {
        window.someLibrary = {}
    
    })(window)

Voici le résultat du jeu de devinette de l'analyseur.

    (function(window, undefined) {
        function test(options) {
    
            // pas inséré, les lignes ont fusionné
            log('testing!')(options.list || []).forEach(function(i) {
    
            }); // <- inséré
    
            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- inséré
    
            return; // <- inséré, casse la déclaration return
            { // traité comme un bloc
    
                // un label et une déclaration d'expression
                foo: function() {} 
            }; // <- inséré
        }
        window.test = test; // <- inséré
    
    // les lignes ont fusionné ici encore
    })(window)(function(window) {
        window.someLibrary = {}; // <- inséré
    
    })(window); //<- inséré

> **Remarque:** L'analyseur JavaScript ne manipule pas "correctement" les déclarations return suivies par une nouvelle ligne.

L'analyseur a radicalement changé le comportement du code ci-dessus. Dans certains cas, il fait la **mauvaise chose**.

### Parenthèse en tête

En cas de parenthèse en tête, l'analyseur ne va **pas** insérer de point-virgule.

    log('testing!')
    (options.list || []).forEach(function(i) {})

Ce code fusionne en une ligne.

    log('testing!')(options.list || []).forEach(function(i) {})

Il y a de **très** fortes chances que `log` ne retourne **pas** de fonction; par conséquent, le programme ci-dessus va produire une erreur de type `TypeError` indiquant que undefined n'est pas un function `undefined is not a function`.

### En conclusion

Il est fortement recommandé de ne **jamais** omettre les points-virgules. Il est également recommandé de garder les accolades sur la même ligne que leurs déclarations correspondantes et de ne jamais les omettre pour les déclaration en une ligne `if` / `else`. Ces mesures vont non seulement améliorer la cohérence du code, mais elles empêcheront également l'analyseur JavaScript de changer le comportement du code.

