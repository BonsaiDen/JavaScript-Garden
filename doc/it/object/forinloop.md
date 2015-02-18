## Il ciclo `for in`

Come per l'operatore `in`, il ciclo `for in` attraversa la catena di
prototipi quando itera tra le proprietà di un oggetto.

> **Nota:** il ciclo `for in` **non** itererà alcuna proprietà che abbia
> il proprio attributo `enumerable` impostato su `false`. Ad esempio,
> la proprietà `lenght` di un array.

    // Modifichiamo Object.prototype
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // stampa sia bar che moo
    }

Dato che non è possibile modificare il comportamento del ciclo `for in`,
è necessario filtrare le proprietà indesiderate all'interno del ciclo stesso.
In ECMAScript 3 o precedente, questo può essere fatto usando il metodo
[`hasOwnProperty`](#object.hasownproperty) di `Object.prototype`.

A partire da ECMAScript 5, `Object.defineProperty` può essere utilizzato con
`enumerbale` impostato a `false` per aggiungere proprietà agli oggetti (incluso
`Object`) senza che queste proprietà vengano enumerate. In questo caso è
ragionevole assumere che, nel codice di un'applicazione, ogni proprietà
enumerabile sia stata aggiunta per un motivo, ed quindi omettere `hasOwnProperty`
in quanto rende il codice più prolisso e meno leggibile. Nel codice delle
librerie `hasOwnProperty` dovrebbe essere ancora utilizzato, dato che non è
possibile presumere quali proprietà enumerabili siano presenti nella catena dei
prototipi.


> **Nota:** dato che `for in` attraversa sempre tutta la catena di prototipi,
> esso rallenterà per ogni strato aggiuntivo di ereditarietà aggiunto ad un
> oggetto.

### Usare `hasOwnProperty` per il filtraggio

    // questo è il foo dell'esempio precedente
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

Questa è la sola versione corretta da usare con le vecchie versioni di ECMAScript.
Proprio a causa dell'utilizzo di `hasOwnProperty`, **soltanto** `moo` verrà
stampato; mentre omettendone l'uso, il codice sarà soggetto ad errori nei casi
dove i prototipi nativi (ad esempio `Object.prototype`) sono stati estesi.

Nelle nuove versioni di ECMAScript, le proprietà non enumerabili possono essere
definite con `Object.defineProperty`, riducendo il rischio di iterare sulle
proprietà non usando `hasOwnProperty`. &Egrave; altresì importante stare attenti
quando si usano librerie come [Prototype][1], che ancora non sfruttano le nuove
funzionalità di ECMAScript.
Quando questo framework viene incluso, è sicuro che i cicli `for in` che non
utilizzano `hasOwnProperty` non funzioneranno.

### In conclusione

Si raccomanda di usare **sempre** `hasOwnProperty` in ECMAScript 3 o precedenti,
e nel codice delle librerie. Non si dovrebbe mai dare per scontato nell'ambiente
in cui il codice sta girando, se i prototipi nativi sono stati estesi o meno. A
partire da ECMAScript 5 `Object.defineProperty` rende possibile definire proprietà
non enumerabili ed omettere `hasOwnProperty` nel codice dell'applicazione.

[1]: http://www.prototypejs.org/
