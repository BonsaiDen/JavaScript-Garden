## Igualdades e comparações

JavaScript tem duas maneiras diferentes de comparar a igualdades entre valores de objetos.

### O operador de igualdade

O operador de igualdade consiste de dois sinais de igual : `==`

JavaScript é *fracamente tipado*. Isto que dizer que o operador de igualdade
**induz** tipos ao invés de compará-los.
    
    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

A tabela acima mostra o resultado da coerção de tipos, e isto é principal razão
para que o uso `==` seja amplamente considerado uma má prática. Seu uso introduz defeitos
difíceis de serem rastreados devido às suas complicadas regras de conversão.

Adicionalmente, também existe um impacto em performance quando a coerção acontece;
por exemplo, é necessário que uma string seja convertida em um número antes que seja comparada
com outro número.

### O operador de igualdade estrito

O operador de igualdade estrito consiste de **três** sinais de igual : `===`.

Ele funciona como o operador de igualdade normal, salvo que o operador de igualdade estrito
**não** realiza coerção de tipos entre seus operandos.

    ""           ===   "0"           // false
    0            ===   ""            // false
    0            ===   "0"           // false
    false        ===   "false"       // false
    false        ===   "0"           // false
    false        ===   undefined     // false
    false        ===   null          // false
    null         ===   undefined     // false
    " \t\r\n"    ===   0             // false

Os resultados acima são bastante claros e permitem uma análise objetiva do código. Pode parecer complicar o código até um certo ponto
 mas também traz ganhos de performance em casos em que os operandos são de tipos diferentes.

### Comparando Objetos

Enquanto que ambos `==` e `===` são denominados operadores de **igualdade**, eles se comportam de 
formas diferentes quando pelo menos um de seus operandos é um `Object`.

    {} === {};                   // false
    new String('foo') === 'foo'; // false
    new Number(10) === 10;       // false
    var foo = {};
    foo === foo;                 // true

Aqui, ambos os operadores comparam em função da **identidade** e **não** da igualdade; isto é,
eles vão comparar em função da mesma **instância** do objeto, muito parecido com o `is` do Python
e a comparação de ponteiros em C.

### Conclusão

E fortemente recomendado que só se use o operador de ** igualdade estrito**.
Em casos onde a coerção de tipos seja necessária, isto deve ser feito [explicitamente](#types.casting) 
e não deve ser deixado para as complicadas regras de coerção da linguagem.

