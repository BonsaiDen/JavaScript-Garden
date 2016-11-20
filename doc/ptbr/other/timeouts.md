### `setTimeout` e `setInterval`

Uma vez que JavaScript é assíncrono, é possível agendar a execução de uma função
usando as funções `setTimeout` e `setInterval`.

> **Nota:** Timeouts **não** fazem parte do Padrão ECMAScript. Eles são
> implementados como parte do [DOM][1].

    function foo() {}
    var id = setTimeout(foo, 1000); // retorna um Number > 0

Quando `setTimeout` é chamado, ele retorna o ID do timeout e agenda a execução de `foo`
para **aproximadamente** mil milissegundos no futuro.
`foo` será executado uma **única** vez.

Dependendo de como a engine JavaScript que está rodando o código resolve o timer, bem como
o fato de que o JavaScript é single threaded e outro código que é executado pode bloquear a 
thread, **não há como** garantir a precisão dos intervalos especificados nas chamadas `setTimeout`.

A função que foi passada como primeiro parâmetro será chamada pelo *objeto global*, o que 
significa que o [`this`](#function.this) dentro da função chamada se refere ao objeto global.

    function Foo() {
        this.value = 42;
        this.method = function() {
            // this faz referência ao objeto global
            console.log(this.value); // log undefined
        };
        setTimeout(this.method, 500);
    }
    new Foo();


> **Nota:** Como o `setTimeout` espera um **objeto de função** para primeiro parâmetro, um
> erro comum é usar `setTimeout(foo(), 1000)`, que irá usar o 
> **o valor retornado** por `foo` e **não** `foo`. Isto é, na maioria das vezes,  
> um erro silencioso, visto que neste caso a função retorna `undefined`, logo `setTimeout` **não**
> lançará erro algum.

### Acumulando chamadas com o `setInterval`

Enquanto que `setTimeout` somente executa a função uma vez, `setInterval` -  como
o nome sugere -  irá executar a função a **cada** `X` milisegundos, porém seu uso é
desencorajado.

Quando um código em execução bloqueia a chamada do timeout, `setInterval` continuará
emitindo chamadas para a função em questão. Isto pode, especialmente com intervalos curtos,
resultar em uma pilha de chamadas de função.

    function foo(){
        // algo que bloqueie por 1 segundo
    }
    setInterval(foo, 1000);

No código acima, `foo` será chamada uma vez e irá então bloquear a execução por um segundo.

Enquanto `foo` bloqueia a execução, `setInterval` irá programar mais chamadas para ela.
Em seguida, quando `foo` completar sua execução, existirão **dez** chamadas programadas
para ela aguardando por execução.

### Lidando com possíveis bloqueios de código

A solução mais fácil, bem como a mais controlável, é usar `setTimeout` dentro da 
própria função.

    function foo(){
        // Algo que bloqueia por um segundo
        setTimeout(foo, 1000);
    }
    foo();

Isto não somente encapsula a chamada para `setTimeout`, mas também previne
o acumulo de chamadas e dá controle adicional. `foo` por si só pode decidir
quando rodar novamente ou não.

### Limpando Timeouts manualmente

A limpeza de intervalos e timeouts funciona passando o respectivo ID 
para `clearTimeout` ou `clearInterval`, dependendo onde a função `set` foi usada primeiro.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### Limpando todos os Timeouts

Como não existe métodos próprios para limpar todos os timeouts e/ou intervalos,
é necessário usar a força bruta para chegar a esta funcionalidade.

    // limpe "todos" os timeouts
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

Mas ainda podem haver timeouts que não serão afetados por este número arbitrário.
Uma outra maneira de fazer isto é considerar que o ID dado a um timeout é
incrementado um a um cada vez que você chama `setTimeout`.

    // limpe "todos" os timeouts
    var biggestTimeoutId = window.setTimeout(function(){}, 1),
    i;
    for(i = 1; i <= biggestTimeoutId; i++) {
        clearTimeout(i);
    }

Apesar desta maneira funcionar nos principais navegadores hoje em dia, não está especificado
que os IDs respeitem uma ordem como este, logo esta ordem pode ser variada. Por este motivo, em vez disso
é recomendade manter o controle de todos os IDs de timeouts, de forma que possam ser apagados precisamente.

### O uso oculto do `eval`

`setTimeout` e `setInterval` aceitam uma string como primeiro argumento.
Esta funcionalidade **nunca** deve ser utilizada pois internamente faz uso de `eval`.

> **Nota:** Uma vez que funções timeout **não** são especificadas pelo padrão ECMAScript, a maneira como 
> eles interpretam uma string passada pode variar de acordo com a implementação do JavaScript. Por exemplo, JScript
> da Microsoft faz uso do construtor `Function` no lugar do `eval`.

    function foo() {
        // será chamada
    }

    function bar() {
        function foo() {
            // nunca será chamada
        }
        setTimeout('foo()', 1000);
    }
    bar();

Uma vez que `eval` não é chamado [diretamente](#core.eval) neste caso, a string
passada como argumento para `setTimeout` será executada no *escopo global*; assim, ela
não usará a variável local `foo` do escopo de `bar`.

Também é recomendado **não** usar uma string para passar argumentos
para a função que será chamada por qualquer uma das funções de timeout.

    function foo(a, b, c) {}
    
    // NUNCA use isto
    setTimeout('foo(1, 2, 3)', 1000)

    // Utilize uma função anônima do lugar
    setTimeout(function() {
        foo(a, b, c);
    }, 1000)

> **Nota:** Enquanto que é possivel utilizar a sintaxe 
> `setTimeout(foo, 1000, a, b, c)`, não é recomendada, pois sua utilização pode levar
> a erros sútis quando utilizadas com [métodos](#function.this). 

### Conclusão

Uma string **nunca** deve ser usada como parâmetro `setTimeout` ou 
`setInterval`. Esta prática é um sinal **claro** de código ruim, quando argumentos precisam ser fornecido para a função que é chamada.
Uma *função anônima* é que deve ser passada para que, em seguida, cuide da chamada.

Além disso, o uso de `setInterval` deve ser evitado pois seu scheduler não é
bloqueado pela execução do JavaScript.

[1]: http://en.wikipedia.org/wiki/Document_Object_Model "Document Object Model"

