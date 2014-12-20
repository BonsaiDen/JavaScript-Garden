## Iteração com Arrays e propriedades

Embora arrays em JavaScript sejam objetos, não existem boas razões para utilizar
o [`for in`](#object.forinloop) loop. De fato, existem muitas boas razões para 
**evitar** o uso de `for in` com arrays.

> **Nota:** JavaScript arrays **não** são *arrays associativos*. JavaScript utiliza 
> [objects](#object.general) apenas para mapear chaves com valores. Enquanto arrays associativos 
> **preservam** a ordem, objetos **não preservam**.

Uma vez que o `for in` loop enumera todas as propriedades que estão na cadeia
prototype e visto que o único modo de excluir tais propriedades é por meio do uso
do [`hasOwnProperty`](#object.hasownproperty), ele chega a ser **vinte vezes**
mais custoso que o uso normal do `for` loop.

### Iteração

A fim de atingir a melhor performance ao interagir sobre arrays, 
a melhor opção é utilizar o clássico `for` loop.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

Existe um detalhe importante no exemplo acima , que é o caching
do comprimento do array via `l = list.length`.

Embora a propriedade `length` esteja definida no próprio array, ainda existe
um trabalho extra ao executar a busca em cada iteração do array.
Enquanto que recentes engines JavaScript **talvez** implementem um otimização
para este caso, não existe uma maneira de saber quando o código será executado em uma
dessas novas engines. 

De fato, deixando de lado o armazenamento em caching pode resultar em um loop **duas vezes mais rápido** 
do que com o armazenamento em caching.

### A propriedade `length`

Enquanto que o *getter* da propriedade `length` retorna o total de elementos
que estão contidos no array, o *setter* pode ser usado para **truncar** o array. 

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]

    foo.length = 6;
    foo.push(4);
    foo; // [1, 2, 3, undefined, undefined, undefined, 4]

Atribuir um valor de menor para length trunca o array. Por outro lado, incrementando
o valor de length cria um array esparso.

### Conclusão

Para melhor performance, é recomendado o uso do `for` loop e o cache da propriedade
`length`. O uso do `for in` loop na iteração com array é um sinal de código mal escrito 
e tendencioso a apresentar defeitos, além de ter performance ruim.

