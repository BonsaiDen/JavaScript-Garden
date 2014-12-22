## Prototype

JavaScript  não dispõe de nenhum modelo clássico de herança; em vez disso, ele
faz uso do modelo *prototypal*.

Enquanto isto é considerado muitas vezes como sendo um dos pontos fracos do JavaScript, o modelo de herança prototypal é de fato muito mais poderoso do que o modelo clássico.
Por exemplo, isto torna relativamente trivial construir um modelo clássico
com base no modelo prototypal, enquanto que o contrário se verifica como uma tarefa mais difícil.

JavaScript é a única linguagem amplamente utilizada que apresenta um modelo de herança do tipo prototypal,
por isso pode levar algum tempo até que você se ajuste às diferenças entre os dois modelos.

A primeira grande diferença é que herança em JavaScript utiliza o conceito de *cadeias prototype*.

> **Nota:** Usando simplesmente `Bar.prototype = Foo.prototype` resultará em ambos os objetos
> compartilhando **o mesmo** prototype. Portanto, as alterações no prototype de um dos objetos
> também irá afetar o prototype do outro, o que na maioria dos casos não é o esperado.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Apontar Bar's prototype para uma nava instância de Foo
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // Tenha certeza de que Bar é o construtor atual
    Bar.prototype.constructor = Bar;

    var test = new Bar(); // criar uma nova instância de bar

    // A cadeia prototype resultante
    test [instance of Bar]
        Bar.prototype [instance of Foo]
            { foo: 'Hello World' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* etc. */ }

No código acima, o objeto `test` irá herdar de ambos `Bar.prototype` e
`Foo.prototype`; portanto, ele terá acesso à função `method` que foi definida em Foo.
Ele também terá acesso à propriedade `value` da **única** instância de Foo que é seu próprio prototype.
É importante perceber que `new Bar()` não cria uma nova instância de `Foo`, mas
reutiliza aquela associada ao prototype; assim, todas as intâncias `Bar` dividirão a
**mesma** propriedade `value`.

> **Nota:** **Não** utilize `Bar.prototype = Foo`, uma vez que isto não aponta para o prototype de `Foo`, mas sim para o objeto função `Foo`.
> Assim a cadeia prototype irá percorrer `Function.prototype` e não `Foo.prototype`;
> desse modo, `method` não estará na cadeia prototype.

### Buscando propriedades

Ao acessar as propriedades de um objeto, JavaScript irá percorre a cadeia prototype
**até o topo** para encontrar a propriedade solicitada.

Caso atinja o topo da cadeia - denominada `Object.prototype` - e não encontre
a propriedade especificada, o valor [undefined](#core.undefined) será retornado.

### A propriedade Prototype

Enquanto a propriedade prototype é utilizada pela linguagem na contrução de cadeia de prototype,
ainda é possível associar **qualquer** valor dado a ele. No entanto, tipos primitivos serão
ignorados quando associados como prototype.

    function Foo() {}
    Foo.prototype = 1; // sem efeito

Atribuindo objetos, como demonstrado no exemplo anterior, irá funcionar, e permite
a criação dinâmica de cadeias prototype.

### Performance

O tempo de pesquisa por propriedades que estão no topo da cadeia prototype
pode ter um impacto negativo na performance, principalmente em código
onde a performance é um fator crítico. Além disso, a busca por propriedades que não existem
também atravessa a cadeia prototype.

Além disso, ao [interagir](#object.forinloop) com propriedades de um objeto
**cada** propriedade na cadeia prototype será enumerada.

### Estendendo Prototypes nativos

Uma prática ruim que é normalmente utilizada é a de estender `Object.prototype` ou qualquer outro prototype construído.

Esta técnica é denominada [monkey patching][1] e quebra o *encapsulamento*.
Mesmo utilizada por frameworks populars como [Prototype][2], não existe mais razão
para poluir tipos built-in com funcionalidades adicionais *fora de padrão*.

A **única** boa razão existente para continuar estendendo um  built-in prototype
é a de assegurar as novas funcionalidade de engines JavaScript modernas; por exemplo, [`Array.forEach`][3].

### Conclusão

É **essencial** entender o modelo de herança prototypal antes de escrever código complexo
que faço uso do mesmo. Além disso, tome cuidado com o tamanho da cadeia prototype em seu código
e a refatore caso necessário a fim de evitar futuros problemas de performance. A respeito do prototypes nativos,
estes **nunca** devem ser estendidos ao menos que seja para manter a compatibilidade com novas
características do JavaScript.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

