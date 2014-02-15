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
Questo può essere fatto usando il metodo [`hasOwnProperty`](#object.hasownproperty)
di `Object.prototype`.

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

Questa è la sola versione corretta da usare. Proprio a causa dell'utilizzo di
`hasOwnProperty`, **soltanto** `moo` verrà stampato; mentre omettendone l'uso,
il codice sarà soggetto ad errori nei casi dove i prototipi nativi (ad esempio
`Object.prototype`) sono stati estesi.

Un framework ampiamente usato che estende `Object.prototype` è [Prototype][1].
Quando questo framework viene incluso, è sicuro che i cicli `for in` che non
utilizzano `hasOwnProperty` non funzioneranno.

### In conclusione

Si raccomanda di usare **sempre** `hasOwnProperty`. Non si dovrebbe mai dare
per scontato l'ambiente in cui il codice sta girando, o se i prototipi
nativi sono stati estesi o meno.

[1]: http://www.prototypejs.org/

