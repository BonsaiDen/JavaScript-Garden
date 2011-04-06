## `Dizi` Oluşturucusu

`Dizi` oluşturucusunun parametrelerini nasıl değerlendirdiği belirsiz olduğu
için, yeni diziler oluşturulurken her zaman dizi değişmezlerinin - `[]` 
notasyonu - kullanılması tavsiye olunur.

    [1, 2, 3]; // Sonuç: [1, 2, 3]
    new Array(1, 2, 3); // Sonuç: [1, 2, 3]

    [3]; // Sonuç: [3]
    new Array(3); // Sonuç: []
    new Array('3') // Sonuç: ['3']

`Dizi` oluşturucusuna tek bir argüman verildiğinde, ve bu argümanın türü
`Number` ise, oluşacak *boş* dizinin `length` özelliği argümanın
değerine eşit olacaktır. Bu şekilde oluşturulan bir dizinin **sadece**
`length` özelliği belirlenmiş olacaktır, dizi indisleri ilklenmemiş
olacaktır.

    var arr = new Array(3);
    arr[1]; // undefined
    1 in arr; // false, indisler ilklenmedi

Dizinin uzunluğunu bu şekilde önceden belirlemek sadece bir iki durumda 
kullanışlıdır. Bunlardan birisi bir döngüye gerek olmadan bir karakter
katarını tekrarlamaktır.

    new Array(count + 1).join(stringToRepeat);

### Sonuç

`Dizi` oluşturucusunun kullanılmasından mümkün olduğu kadar kaçınılmalıdır.
Bunun yerine her zaman dizi değişmezleri tercih edilmelidir. Hem daha kısadırlar
hem de daha net bir sentaksa sahiptirler; bu nedenle programın okunabilirliğini
de artırırlar.

