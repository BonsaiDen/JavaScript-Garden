## `hasOwnProperty`

Per verificare se un oggetto ha (possiede) una proprietà definita dentro
**se stesso** piuttosto che in qualche parte della sua
[catena di prototipi](#object.prototype), è necessario usare il metodo
`hasOwnProperty` che tutti gli oggetti ereditano da `Object.prototype`.

> **Nota:** **non** è sufficiente verificare se una proprietà è `undefined`.
> La proprietà potrebbe benissimo esistere, ed il suo valore potrebbe essere
> impostato a `undefined`.

`hasOwnProperty` è la sola cosa in JavaScript che si occupa delle proprietà
**senza** attraversare la catena di prototipi.

    // Modifichiamo Object.prototype
    Object.prototype.bar = 1;
    var foo = {goo: undefined};

    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

Solo `hasOwnProperty` darà il risultato atteso e corretto. Questo è essenziale
quando si itera tra le proprietà di un qualsiasi oggetto. **Non** c'è altro
modo per escludere proprietà che non sono definite all'interno dell'oggetto
stesso, ma da qualche altra parte nella sua catena di prototipi.

### `hasOwnProperty` come proprietà

JavaScript non protegge il nome di proprietà `hasOwnProperty`. Quindi, se
esiste la possibilità che un oggetto possa avere una proprietà con questo
nome, è necessario usare un `hasOwnProperty` *esterno* per ottenere il
risultato corretto.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // ritorna sempre false

    // Usa un altro hasOwnProperty di Object e lo richiama con 'this' impostato a foo
    ({}).hasOwnProperty.call(foo, 'bar'); // true

    // E' anche possibile usare hasOwnProperty dal prototipo di
    // Object per questo scopo
    Object.prototype.hasOwnProperty.call(foo, 'bar'); // true


### In conclusione

Usare `hasOwnProperty` è l'**unico** metodo affidabile per verificare
l'esistenza di una proprietà in un oggetto. &Egrave; raccomandabile usare
`hasOwnProperty` in **ogni** [ciclo `for in`](#object.forinloop) per
evitare errori con i [prototipi](#object.prototype) nativi estesi.

