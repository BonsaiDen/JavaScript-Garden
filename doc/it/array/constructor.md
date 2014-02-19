## Il costruttore `Array`

Dato che il costruttore `Array` è ambiguo riguardo a come esso gestisca i suoi
parametri, si consiglia calorosamente di usare l'array letterale (notazione `[]`)
quando si creano array.

    [1, 2, 3]; // Risultato: [1, 2, 3]
    new Array(1, 2, 3); // Risultato: [1, 2, 3]

    [3]; // Risultato: [3]
    new Array(3); // Risultato: []
    new Array('3') // Risultato: ['3']

Nei casi in cui c'è solo un argomento passato al costruttore `Array` e quando
l'argomento è un `Number`, il costruttore ritornerà un nuovo array *frammentato*
con la proprietà `length` impostata al valore dell'argomento. Si noti
che in questo modo **solo** la proprietà `length` del nuovo array verrà impostata,
mentre gli indici dell'array non verranno inizializzati.

    var arr = new Array(3);
    arr[1]; // undefined
    1 in arr; // false, l'indice non è stato impostato

Essere in grado di impostare la lunghezza dell'array in anticipo è utile soltanto
in poche situazioni, come ad esempio la ripetizione di una stringa, nel cui caso
si eviterebbe l'uso di un ciclo.

    new Array(count + 1).join(stringToRepeat);

### In conclusione

I letterali sono da preferirsi al costruttore Array. Sono più concisi, hanno una
sintassi più chiara ed incrementano la leggibilità del codice.

