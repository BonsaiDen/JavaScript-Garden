## L'operatore `delete`

In breve, è *impossibile* eliminare variabili globali, funzioni e qualche
altra cosa in JavaScript che ha l'attributo `DontDelete` impostato.

### Codice globale e codice funzione

Quando una variabile o una funzione viene definita in un scope globale o
[funzione](#function.scopes), essa è una proprietà dell'oggetto Activation
o dell'oggetto Global. Queste proprietà hanno un set di attributi, tra i quali
`DontDelete`. Dichiarazioni di variabile o funzione nel codice globale o
funzione, creano sempre proprietà con `DontDelete`, e quindi non possono essere
eliminate.

    // variabile globale:
    var a = 1; // DontDelete è impostato
    delete a; // false
    a; // 1

    // funzione normale:
    function f() {} // DontDelete è impostato
    delete f; // false
    typeof f; // "function"

    // la riassegnazione non aiuta:
    f = 1;
    delete f; // false
    f; // 1

### Proprietà esplicite

Proprietà esplicitamente impostate possono essere eliminate normalmente.

    // proprietà impostata esplicitamente:
    var obj = {x: 1};
    obj.y = 2;
    delete obj.x; // true
    delete obj.y; // true
    obj.x; // undefined
    obj.y; // undefined

Nel codice qui sopra, `obj.x` e `obj.y` possono essere eliminate perché
non hanno l'attributo `DontDelete`. Ecco perché anche l'esempio seguente
funziona.

    // questo funziona, tranne che per IE:
    var GLOBAL_OBJECT = this;
    GLOBAL_OBJECT.a = 1;
    a === GLOBAL_OBJECT.a; // true - solo una variabile globale
    delete GLOBAL_OBJECT.a; // true
    GLOBAL_OBJECT.a; // undefined

Qui usiamo un trucco per eliminare `a`. [`this`](#function.this) qui fa
riferimento all'oggetto Global e noi dichiariamo esplicitamente la
variabile `a` come sua proprietà, il che ci permette di eliminarla.

IE (almeno 6-8) ha alcuni bug, quindi il codice precedente non funziona.

### Argomenti funzione e proprietà interne

Anche i normali argomenti delle funzioni, gli
[oggetti `arguments`](#function.arguments) e le proprietà interne hanno
`DontDelete` impostato.

    // argomenti funzione e proprietà:
    (function (x) {

      delete arguments; // false
      typeof arguments; // "object"

      delete x; // false
      x; // 1

      function f(){}
      delete f.length; // false
      typeof f.length; // "number"

    })(1);

### Oggetti non nativi (host)

Il comportamento dell'operatore `delete` può essere inaspettato con gli oggetti
non nativi. A causa delle specifiche, agli oggetti non nativi è permesso di
implementare qualsiasi tipo di funzionalità.

### In conclusione

L'operatore `delete` spesso ha un comportamento inaspettato e può solo essere
usato con sicurezza per eliminare proprietà esplicitamente impostate in oggetti
normali.
