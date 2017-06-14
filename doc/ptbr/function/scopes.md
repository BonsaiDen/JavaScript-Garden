## Escopos e Namespaces

Embora o JavaScript lide bem com a sintaxe de duas chaves para definir blocos, ele **não** oferece suporte a escopos em blocos; por isso,
todo o restante da linguagem é definido em *escopo de função*.

    function test() { // define escopo
        for(var i = 0; i < 10; i++) { // não define escopo
            // count
        }
        console.log(i); // 10
    }

> **Nota:** Quando não usado em um assignment, em um statement return ou como um argumento de função,
>  a notação `{...}` será interpretada como um block statement e **não** como um objeto literal. 
> Isto, em conjunto com a [inserção automática de ponto-e-vírgula](#core.semicolon), pode levar à erros sutis.

Também não existem namespaces distintos em JavaScript, o que significa que tudo é
automaticamente definido em um namespace *globalmente compartilhado*.

Cada vez que uma variável é referenciada, o JavaScript vai percorrer toda a hierarquia 
de escopos até encontrá-la. Caso ele alcance o escopo global e ainda não tenha encontrado
a variável, ele lançará um `ReferenceError`.

### A queda das variáveis globais

    // script A
    foo = '42';

    // script B
    var foo = '42'

O dois scripts acima **não** têm o mesmo efeito. O Script A define uma
variável chamada `foo` no escopo *global*, e o Script B define `foo` no
escopo *atual*.

Novamente, isto **não** é *mesma coisa*:  emitir o uso de `var` tem várias implicações.

    // escopo global
    var foo = 42;
    function test() {
        // escopo local
        foo = 21;
    }
    test();
    foo; // 21

Deixando o statement `var` de fora da função `test` faz com que o valor de `test` seja sobrescrito.
Enquanto que à primeira vista isto não pareça um problema, um script com milhares de linhas de código
que não utiliza `var` apresenta erros horríveis e bugs difíceis de serem detectados.
    
    // escopo global
    var items = [/* uma lista qualquer */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }

    function subLoop() {
        // escopo de subLoop
        for(i = 0; i < 10; i++) { // esquecendo do var statement
            // faça algo incrível!
        }
    }
    
O loop externo terminará depois da primeira chamada para `subLoop`, uma vez que `subLoop`
sobrescreve o valor global  `i`. Utilizar `var` no segundo `for` loop evitaria facilmente este problema.
O `var` statement **nunca** pode ser esquecido a não ser que o *efeito desejado* seja afetar o escopo externo.

### Variáveis locais

A única fonte de variáveis locais em JavaScript são parâmetros de [função](#function.general)
e variáveis declaradas via `var` statement.

    // escopo global
    var foo = 1;
    var bar = 2;
    var i = 2;

    function test(i) {
        // escopo local da função test
        i = 5;

        var foo = 3;
        bar = 4;
    }
    test(10);

Enquanto que  `foo` e `i` são variáveis locais dentro do escopo da função `test`,
a atribuição de `bar` irá substituir a variável global com o mesmo nome.

### Hoisting

Javascript **eleva** declarações. Isto quer dizer que ambas declarações `var`
e `function`  serão movidas para o topo do escopo ao qual pertencem.

    bar();
    var bar = function() {};
    var someValue = 42;

    test();
    function test(data) {
        if (false) {
            goo = 1;

        } else {
            var goo = 2;
        }
        for(var i = 0; i < 100; i++) {
            var e = data[i];
        }
    }

O código acima é modificado antes mesmo que seja executado. O JavaScript move
 todos as declarações `var` assim como as de `function`, para o topo
do escopo mais próximo.

    // declarações var são movidas aqui
    var bar, someValue; // default para 'undefined'

    // as declarações de função também são movidas
    function test(data) {
        var goo, i, e; // escopo de bloco ausente move essas variáveis p/ cá
        if (false) {
            goo = 1;

        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // falha com um TypeError uma vez que bar continua 'undefined'
    someValue = 42; // atribuições não são afetadas pelo hoisting
    bar = function() {};

    test();

A falta de delimitação de um escopo não somente moverá `var` statements para fora de loops
 e seus blocos, isto também fará com que os testes de determinados `if` se tornem não-intuitivos.

 No código original, embora o `if` statement pareça modificar a *variável global*
 `goo`, ele modifica a *variável local* - depois que hoisting foi aplicado.

Por desconhecer o *hoisting*, pode-se suspeitar que o código abaixo lançaria um 
`ReferenceError`.

    // verifique se SomeImportantThing já foi inicializado
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

Mas é claro, isto funciona devido ao fato de que `var` statement é movido para o topo
do *escopo global*.

    var SomeImportantThing;

    // outro código pode inicializar SomeImportantThing aqui, ou não

    // tenha certeza de que isto foi inicializado
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### Ordem da Resolução de Nomes

Todos os escopos em JavaScript, incluindo o *escopo global*, possuem o [`this`](#function.this)
 o qual faz referência ao *objeto atual*. 

Escopos de funções também possuem o [`arguments`](#function.arguments), o qual contêm
os argumentos que foram passados para a função.

Por exemplo, ao tentar acessar a variável denominada `foo` dentro do escopo de uma função, JavaScript irá
procurar pela variável na seguinte ordem:

 1. No caso de haver `var foo` statement no escopo atual, use-a.
 2. Se um dos parâmetros é denominado `foo`, use-o.
 3. Se a própria função é denominada `foo`, use-a.
 4. Vá para o escopo externo mais próximo e inicie do **#1**.

> **Nota:** Dispor de um parâmetro denominado `arguments` irá **previnir** a criação 
> do objeto default `arguments`.

### Namespaces

Um problema comum relacionado ao fato de dispor de apenas um namespace global é 
a probabilidade de esbarrar com problemas onde nomes de variáveis coincidem. Em JavaScript,
este problema pode ser facilmente evitado com a ajuda de *wrappers anônimos*.

    (function() {
        // um "namespace" autocontido
        
        window.foo = function() {
            // closure exposta
        };

    })(); // execute a função imediatamente


Funções sem nome são consideradas [expressões](#function.general); a fim de ser referênciável,
elas devem ser avaliadas.

    ( // avalie a função dentro dos parênteses
    function() {}
    ) // e retorne o objeto de função
    () // chama o resultado da avaliação

Existem outras maneiras para avaliar e chamar diretamente a expressão da função a qual,
enquanto que diferentes em sintaxe, comportam-se da mesma maneira.

	// Alguns outros estilos para invocar diretamente ...
    !function(){}()
    +function(){}()
    (function(){}());
    // e assim por diante...

### Conclusão

É recomendado sempre utilizar um *wrapper anônimo* para encapsular código em seu
próprio namespace. Isto não é somente uma maneira de se proteger contra conflitos de nomes,
como também contribui para melhor modularização de programas.

Adicionalmente, o uso de variáveis globais é considerado **uma prática ruim**. **Qualquer**
uso delas indica código mal escrito que tende à apresentar erros e apresenta manutenção complexa.

