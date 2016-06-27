## Closures e Referências

Uma das caracterísricas mais poderosas do JavaScript é a possibilidade de usar *closures*. Quando usamos closures, definimos que um escopo **sempre** poderá acessar o escopo externo no qual foi definido. Uma vez que a única concepção de escopo em JavaScripe é [function scope](#function.scopes), todas as funções, por default, agem como closures.

### Emulando variáveis privadas

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

Aqui, `Counter` retorna **duas** closures: a função 'increment' bem como a função 'get'. Ambas as funções mantêm uma **referência** ao escopo de 'Counter' e, portanto, sempre mantêm o acesso à variável 'count' definida naquele escopo.

### Por que variáveis privadas funcionam

Uma vez que não é possível referenciar ou atribuir escopos em JavaScript, **não** existe uma maneira de acessar a variável 'count' por fora. A única maneira de interagir com a variável é através das duas closures.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

O código acima **não** irá mudar a variável 'count' no escopo de 'Counter', uma vez que 'foo.hack' não foi definido **naquele** escopo. Neste caso, uma variável 'global' 'count' será criada ou substituida.

### Closures dentro de laços

Um erro comum é utilizar closures dentro de laços, como se elas copiassem o valor da variável de indexação do laço.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

O exemplo acima **não** retornará os números '0' até '9', mas os número '10' dez vezes.

A função *anônima* mantêm uma **referência** para 'i'. No momento em que 'console.log' é chamado, 'o laço for' já encerrou a execução, e o valor '10' está atrbuído em 'i'.

Com a finalidade de se obter o comportamento esperado, é necessário criar uma **cópia** do valor de 'i'.

### Evitando problemas de referência

Com a finalidade de copiar o valor da variável de indexação do laço, a melhor opção é utilizar um [wrapper anônimo](#function.scopes).

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

A função anônima será chamada imediatamente com 'i' como seu primeiro argumento e receberá uma cópia do **valor** de 'i' como parâmetro de 'e'. 

A função anônima que é passada para o 'setTimeout' agora possui uma referência a 'e', cujo os valores **não** são modificados pelo laço.

Não existe outra maneira de se obter este resultado, que não seja retornando uma função do wrapper anônimo que terá, então, o mesmo comportamento que o código acima. 

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }

Há ainda uma outra maneira, usando .bind, que pode ligar argumentos e um  contexto'this' a uma função. Isto se comporta como o código acima

    for(var i = 0; i < 10; i++) {
        setTimeout(console.log.bind(console, i), 1000);
    }
