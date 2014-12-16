## O construtor `Array`

Uma vez que o construtor `Array` é ambíguo na forma como ele lida com seus parâmetros,
o uso da notação `[]` é fortemente recomendado ao criar novo arrays.

    [1, 2, 3]; // Resultado: [1, 2, 3]
    new Array(1, 2, 3); // Resultado: [1, 2, 3]

    [3]; // Resultado: [3]
    new Array(3); // Resultado: []
    new Array('3') // Resultado: ['3']

Nos casos onde somente um argumento é passado para o construtor `Array` e quando o argumento é
um `Number`, o construtor retornará um novo array *sem elementos* com a propriedade `length` configurada de acordo com o valor do argumento.
É importante perceber que **somente** a propriedade `length` do novo array será configurada desta maneira; os índices do array não serão inicializados.

    var arr = new Array(3);
    arr[1]; // undefined
    1 in arr; // false, o índice não foi definida

Ser capaz de definir o comprimento de um array antecipadamente é útil em poucos casos,
como ao replicar uma string, em que se evita o uso de um loop.

    new Array(count + 1).join(stringToRepeat);

### Conclusão

O uso de literais é preferencial na inicialição de Arrays. São curtos, possuem uma sintaxe limpa, e contribuem para a legibilidade do código.

