## Uguaglianza e comparazioni

JavaScript usa due differenti metodi per comparare l'uguaglianza dei
valori degli oggetti.

### L'operatore di uguaglianza

L'operatore di uguaglianza consiste di due segni di uguaglianza: `==`.

JavaScript supporta la **tipizzazione debole**. Questo significa che
l'operatore di uguaglianza **converte** i tipi in modo da poterli
confrontare.

    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

Questa tabella mostra i risultati della conversione di tipo, ed è il
principale motivo per cui l'uso di `==` è ampiamente considerato una
cattiva pratica. Esso introduce bug difficili da rilevare a causa delle
complesse regole di conversione.

Inoltre, c'è anche un impatto sulla performance quando entra in gioco la
conversione di tipo. Ad esempio, una stringa deve essere convertita in un
numero prima di poter essere confrontata con un altro numero.

### L'operatore di uguaglianza stretta

L'operatore di uguaglianza stretta consiste di **tre** segni di uguaglianza: `===`.

Funziona come il normale operatore di uguaglianza, con l'eccezione di
**non** eseguire la conversione di tipo tra gli operandi.

    ""           ===   "0"           // false
    0            ===   ""            // false
    0            ===   "0"           // false
    false        ===   "false"       // false
    false        ===   "0"           // false
    false        ===   undefined     // false
    false        ===   null          // false
    null         ===   undefined     // false
    " \t\r\n"    ===   0             // false

I risultati qui sono più chiari e permettono di identificare subito un problema
con il codice. Questo rende il codice più solido di un certo grado e fornisce anche
migliorie alla performance nel caso di operandi di tipo differente.

### Comparazione di oggetti

Nonostante `==` e `===` vengano definiti operatori di **uguaglianza**, essi
funzionano differentemente quando almeno uno degli operandi è un `Object`.

    {} === {};                   // false
    new String('foo') === 'foo'; // false
    new Number(10) === 10;       // false
    var foo = {};
    foo === foo;                 // true

Qui, entrambe gli operatori confrontano per **identità** e **non** per
uguaglianza. Essi confrontano, cioè, che sia la stessa **istanza** dell'oggetto,
in modo molto simile a `is` in Python e la comparazione di puntatori in C.

### In conclusione

Si raccomanda calorosamente di usare solo l'operatore di **uguaglianza stretta**.
Nei casi dove è necessario che i tipi vengano convertiti, questa operazione
dovrebbe essere fatta [esplicitamente](#types.casting) piuttosto che essere
lasciata alle complesse regole di conversione del linguaggio.

