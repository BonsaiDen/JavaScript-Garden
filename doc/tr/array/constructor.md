## `Array` Oluşturucusu

`Array` oluşturucusunun parametrelerini nasıl değerlendirdiği belirsiz olduğu
için, yeni diziler oluşturulurken her zaman dizi sabitlerinin (`[]` 
notasyonu) kullanılması tavsiye olunur.

    [1, 2, 3]; // Sonuç: [1, 2, 3]
    new Array(1, 2, 3); // Sonuç: [1, 2, 3]

    [3]; // Sonuç: [3]
    new Array(3); // Sonuç: []
    new Array('3') // Sonuç: ['3']

`Array` oluşturucusuna tek bir argüman verildiğinde, ve bu argümanın türü
`Number` ise, oluşacak *boş* dizinin `length` özelliği argümanın
değerine eşit olacaktır. Bu şekilde oluşturulan bir dizinin **sadece**
`length` özelliği belirlenmiş olup dizi indisleri tanımsız olacaktır.

    var arr = new Array(3);
    arr[1]; // undefined
    1 in arr; // false, indisler atanmadı

Dizinin uzunluğunu bu şekilde önceden belirlemek sadece bir iki durumda 
kullanışlıdır. Bunlardan birisi bir döngüye gerek olmadan bir karakter
katarını tekrarlamaktır.

    new Array(count + 1).join(stringToRepeat);

### Sonuç

`Array` oluşturucusunun kullanılmasından mümkün olduğu kadar kaçınılmalıdır.
Bunun yerine her zaman dizi sabitleri tercih edilmelidir. Hem daha kısadırlar
hem de daha anlaşılır bir sentaksa sahiptirler; bu nedenle programın
okunabilirliğini de artırırlar.

