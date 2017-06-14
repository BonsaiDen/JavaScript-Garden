## Constructeurs 

Les constructeurs en JavaScript diffèrent de beaucoup d'autres langages.
Tout appel de fonction précédé par le mot clé `new` agit comme un constructeur.

Dans le constructeur - la fonction appelée - la valeur de `this` se réfère à un objet nouvellement créé.
Le [prototype](#Object.prototype) de ce **nouvel** objet pointe sur le `prototype` de l'objet de fonction qui a été invoqué comme constructeur.

Si la fonction qui a été appelée n'a pas de déclaration `return` explicite, elle renvoira implicitement la valeur de `this` - le nouvel objet.

    function Person(name) {
        this.name = name;
    }
    
    Person.prototype.logName = function() {
        console.log(this.name);
    };
    
    var sean = new Person();

Le code ci-dessus appelle `Person` en tant que constructeur et définit le `prototype` du nouvel objet créé à `Person.prototype`.

En cas d'une déclaration `return` explicite, la fonction renvoie la valeur spécifiée par cette déclaration, mais **seulement** si cette valeur est un objet `Object`.

    function Car() {
        return 'ford';
    }
    new Car(); // un nouvel objet, pas 'ford'
    
    function Person() {
        this.someValue = 2;
    
        return {
            name: 'Charles'
        };
    }
    new Test(); // l'objet retourné ({name:'Charles'}) n'inclue pas someValue

Lorsque le mot clé `new` est omis, la fonction ne retournera **pas** un nouvel objet.

    function Pirate() {
        this.hasEyePatch = true; // this est l'object global!
    }
    var somePirate = Pirate(); // somePirate est undefined

Bien que l'exemple ci-dessus a l'air de marcher, il utilisera l'*objet global* pour la valeur de `this`, en raison du fonctionnement particulier de [`this`](#function.this) en JavaScript.

### Fabriques

Pour pouvoir omettre le mot clé `new`, la fonction constructeur doit retourner explicitement une valeur.

    function Robot() {
        var color = 'gray';
        return {
            getColor: function() {
                return color;
            }
        }
    }
    Robot.prototype = {
        someFunction: function() {}
    };
    
    new Robot();
    Robot();

Les deux appels à `Robot` retournent la même chose, un objet nouvellement créé qui possède une propriété appelée `getColor`, qui est une [fermeture](#function.closures) "closure".

Il convient également de noter que l'appel `new Robot()` n'affecte **pas** le prototype de l'objet retourné.
Bien que le prototype sera mis sur le nouvel objet créé, `Robot` ne retourne jamais cet objet.

Dans l'exemple ci-dessus, il n'y a pas de différence fonctionnelle entre l'utilisation et la non-utilisation du mot clé `new`.

### Creation de nouvels objects via fabriques

Il est souvent recommandé de ne **pas** utiliser `new` car l'oublier peut conduire à des bugs.

Pour créer un nouvel objet, il faut plutôt utiliser une fabrique qui va construire un nouvel objet.

    function CarFactory() {
        var car = {};
        car.owner = 'nobody';
    
        var milesPerGallon = 2;
    
        car.setOwner = function(newOwner) {
            this.owner = newOwner;
        }
    
        car.getMPG = function() {
            return milesPerGallon;
        }
    
        return car;
    }

Bien que le code qui précède est robuste contre un mot clé `new` manquant et rend certainement
l'utilisation de [variables privées](#function.closures) plus facile, il y a des inconvénients.

 1. Il utilise plus de mémoire car les objets créés ne partagent **pas** leurs méthodes avec un prototype.
 2. Pour hériter, la fabrique a besoin de copier toutes les méthodes de l'autre objet ou mettre l'autre objet sur le prototype du nouvel objet.
 3. Abandonner la chaîne de prototype à cause d'un mot clé `new` laissé de côté est contraire à l'esprit du langage.

### En Conclusion

Omettre le mot clé `new` peut conduire à des bugs, mais ce n'est certainement **pas** une raison d'abandonner l'utilisation des prototypes.
En fin de compte il s'agit de savoir quelle solution est la mieux adaptée pour les besoins de l'application.
Il est particulièrement important de choisir un style spécifique de création d'objet et toujours l'utiliser afin de rester *cohérent*.

