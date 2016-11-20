## Inserção automática do ponto e vírgula 

Apesar do JavaScript possuir uma sintaxe no estilo C, o uso do ponto e vírgula **não** é obrigatório. 

JavaScript não é uma linguagem 'semicolon-less'. De fato, o ponto e vírgula é necessário para o interpretação do código. Entretanto, o parser do JavaScript insere o **ponto e vírgula** automaticamente sempre que ocorrer um error de parser, decorrente da falta do ponto e vírgula. 

    var foo = function() {
    } // parse error, semicolon expected
    test()

A inserção acontece e o parser realiza uma nova tentativa. 

    var foo = function() {
    }; // no error, parser continues
    test()

A inseção automática de ponto e vírgula é considerada um dos **maiores** equívocos no design da linguagem pois pode influenciar no comportamento do código.

### Como funciona

O código abaixo não possui ponto e vírgula, então fica à cargo do parser inserir o ponto e vírgula onde julgar necessário.

    (function(window, undefined) {
        function test(options) {
            log('testing!')

            (options.list || []).forEach(function(i) {

            })

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            )

            return
            {
                foo: function() {}
            }
        }
        window.test = test

    })(window)

    (function(window) {
        window.someLibrary = {}

    })(window)

Abaixo está o resultado do processamento do parser.

    (function(window, undefined) {
        function test(options) {

            // Not inserted, lines got merged
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- inserted

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- inserted

            return; // <- inserted, breaks the return statement
            { // treated as a block

                // a label and a single expression statement
                foo: function() {} 
            }; // <- inserted
        }
        window.test = test; // <- inserted

    // The lines got merged again
    })(window)(function(window) {
        window.someLibrary = {}; // <- inserted

    })(window); //<- inserted

> **Nota:** O parser do JavaScript não manipula corretamente 'return statements' que são seguidos de uma nova linha. Apesar de não ser necessariamente uma > > > falha da inserção automática do ponto e vírgula, ainda pode gerar efeitos colaterais não-esperados. 

O parser mudou o comportamento do código acima drásticamente. Em determinados casos, o parser **não procede** como o esperado. 

### Parênteses 

No caso de parênteses, o parser **não** insere o ponto  e vírgula. 

    log('testing!')
    (options.list || []).forEach(function(i) {})

Este código é interpretado em uma só linha. 

    log('testing!')(options.list || []).forEach(function(i) {})

As chances de `log` não retornar uma função são **muito** altas; portanto, o código acima irá produzir um `TypeError` informando que `undefined is not a function`.

### Conclusão

É **fortemente** recomendado que nunca se omita o ponto e vírgula. Também é recomendado que chaves sejam mantidas na mesma linha que seus statements e que nunca sejam omitadas em declações de uma só linha como `if` / `else` statements. Tais medidas não somente melhorarão a consistência do código, como também irão previnir alteração no comportamento do código por má interpretação do parser do JavaScript.

