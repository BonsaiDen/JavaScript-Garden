## Conversione di tipo (Type Casting)

JavaScript è un linguaggio **debolmente tipizzato**, perciò esso applicherà
una *conversione di tipo* **ovunque** sia possibile.

    // Queste sono vere
    new Number(10) == 10; // Number.toString() viene convertito
                          // nuovamente in un numero

    10 == '10';           // String viene convertita in Number
    10 == '+10 ';         // Stringa più assurda
    10 == '010';          // a ancora di più
    isNaN(null) == false; // null viene convertito in 0
                          // che ovviamente non è NaN

    // Queste sono false
    10 == 010;
    10 == '-10';

> **ES5 Nota:** i numeri letterali che iniziano per `0` vengono interpretati
> come ottali (base 8). Il supporto per gli ottali è stato **rimosso** nello
> strict mode di ECMAScript 5.

Per evitare i problemi appena visti, l'uso
dell'[operatore di uguaglianza stretta](#types.equality) è **altamente**
raccomandato. Sebbene questo eviti molti dei comuni problemi, ci sono ancora
molti ulteriori problemi che possono essere generati dal sistema debolemente
tipizzato di JavaScript.

### Costruttori di tipi interni

I costruttori dei tipi interni del linguaggio, come `Number` e `String`,
funzionano in modo differente a seconda che venga usata o meno la
parola chiave `new`.

    new Number(10) === 10;     // False, Object e Number
    Number(10) === 10;         // True, Number e Number
    new Number(10) + 0 === 10; // True, a causa della conversione implicita

L'uso di un tipo di dato interno come `Number` come costruttore, creerà un
nuovo oggetto `Number`, ma l'omissione della parola chiave `new` farà sì
che la funzione `Number` agisca da convertitore.

Inoltre, il passaggio di valori letterali o non oggetto risulterà in un'ancora
maggiore conversione di tipo.

La miglior opzione è quella di fare **esplicitamente** la conversione ad uno
dei tre possibili tipi.

### Convertire in una stringa

    '' + 10 === '10'; // true

Anteponendo una stringa vuota, un valore può facilmente essere convertito in
una stringa.

### Convertire in un numero

    +'10' === 10; // true

Usando l'operatore **unario** di addizione, è possibile convertire in un numero.

### Convertire in un booleano

Usando due volte l'operatore **not**, un valore può essere convertito in un
booleano.

    !!'foo';   // true
    !!'';      // false
    !!'0';     // true
    !!'1';     // true
    !!'-1'     // true
    !!{};      // true
    !!true;    // true


