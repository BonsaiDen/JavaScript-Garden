## Declaração de funções e expressões

Funções em JavaScript são objetos de primeira classe. Isto significa que elas
podem ser tratadas como qualquer outro tipo. Um uso muito comum desta característica é
o de passar uma *função anônima* como uma callback para outra, talvez uma função assíncrona.

### A declaração `function`

    function foo() {}

A função acima sofrerá [hoisting](#function.scopes) antes que a execução do programa se inicie; assim,
ela estará disponível em *todo* o escopo em que foi *definida*, até mesmo se for chamada antes de ter
sido definida no código. 

    foo(); // Funciona pois foo foi elevada para o topo do escopo
    function foo() {}

### A expressão `function`

    var foo = function() {};

Este exemplo atribui uma função sem nome e *anônima* à variável `foo`. 

    foo; // 'undefined'
    foo(); // dispara TypeError
    var foo = function() {};

Devido ao fato de que `var` é uma declaração que eleva a definição da variável `foo` ao topo do escopo, esta sofrerá hoist e `foo` estará declarado logo que o script for executado.

Como atribuições só ocorrem em tempo de execução, o valor default de `foo` 
será [undefined](#core.undefined) antes que o código seja executado.

### Expressão de uma função nomeada

Outro caso especial é a atribuição de funções nomeadas.

    var foo = function bar() {
        bar(); // Funciona
    }
    bar(); // ReferenceError

Aqui, `bar` não está disponível fora do escopo, uma vez que a função se encontra atribuída 
em `foo`; no entanto, dentro de `bar`, ela esta disponível. Isto ocorre devido ao fato de 
como o [name resolution](#function.scopes) funciona em JavaScript, o nome da função está *sempre*
disponível no escopo local da própria função.

