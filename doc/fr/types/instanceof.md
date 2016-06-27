## L'opérateur `instanceof`

L'opérateur `instanceof` (instance de) compare les constructeurs de ses deux opérandes. Il est seulement utile pour comparer des objets faits sur mesure. Utilisé sur les types intégrés, il est
aussi inutile que l'[opérateur typeof](# types.typeof).

### Comparer des objets personnalisés

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();
    
    new Bar() instanceof Bar; // vrai
    new Bar() instanceof Foo; // vrai
    
    // Ceci définit simplement Bar.prototype à l'objet de fonction Foo,
    // mais pas à une instance réelle de Foo
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // faux

### Utiliser `instanceof` avec des types natifs

    new String('foo') instanceof String; // vrai
    new String('foo') instanceof Object; // vrai

    'foo' instanceof String; // faux
    'foo' instanceof Object; // faux

Une chose importante à noter ici est que `instanceof` ne fonctionne pas sur les objets qui proviennent de différents contextes JavaScript (par exemple, différents documents
dans un navigateur web), car leurs constructeurs ne seront pas exactement le même objet.

### En conclusion

L'opérateur `instanceof` devrait **seulement** être utilisé sur des objets crées sur mesure provenant du même contexte JavaScript.
Tout comme l'opérateur [`typeof`](#types.typeof), chaque autre utilisation de celui-ci devrait être **évitée**.

