## Автоматическая вставка точек с запятой

Хоть JavaScript и имеет синтаксис, подобный языкам семейства C, он при этом **не** принуждает вас ставить точки с запятой в исходных кодах — вы всегда можете их опустить.

При этом JavaScript — не язык без точек с запятой, они на самом деле нужны ему, чтобы он мог разобраться в исходном коде. Поэтому парсер JavaScript **автоматически** вставляет их в тех местах, где обнаруживает ошибку парсинга из-за отсутствия точки с запятой.

    var foo = function() {
    } // ошибка разбора, ожидается точка с запятой
    test()

Происходит вставка и парсер пытается снова.

    var foo = function() {
    }; // ошибки нет, парсер продолжает
    test()

Автоматическая вставка точек с запятой считается одним из **наибольших** упущений в проекте языка, поскольку она *может* изменять поведение кода.

### Как это работает

Приведённый код не содержит точек с запятой, так что места для их вставки остаются на совести парсера:

    (function(window, undefined) {
        function test(options) {
            log('тестируем!')

            (options.list || []).forEach(function(i) {

            })

            options.value.test(
                'здесь передадим длинную строчку',
                'и ещё одну на всякий случай'
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

Ниже представлен результат игры парсера в "угадалки".

    (function(window, undefined) {
        function test(options) {

            // не вставлена точка с запятой, строки были объединены
            log('тестируем!')(options.list || []).forEach(function(i) {

            }); // <- вставлена

            options.value.test(
                'здесь передадим длинную строчку',
                'и ещё одну на всякий случай'
            ); // <- вставлена

            return; // <- вставлена, в результате оператор return разбит на два блока
            { // теперь парсер считает этот блок отдельным

                // метка и одинокое выражение
                foo: function() {}
            }; // <- вставлена
        }
        window.test = test; // <- вставлена

    // снова объединились строки
    })(window)(function(window) {
        window.someLibrary = {}; // <- вставлена

    })(window); //<- вставлена

> **Замечание:** Парсер JavaScript "некорректно" обрабатывает оператор return, за которым следует новая строка; кстати, причина может быть и не в автоматической вставке точек с запятой, но это нежелательный сайд-эффект в любом случае

Парсер радикально подменил поведение изначального кода, а в определённых случаях он сделал **абсолютно неправильные выводы**.

### "Висящие" скобки

Если парсер встречает "висящую" скобку, то он **не** вставляет точку с запятой.

    log('тестируем!')
    (options.list || []).forEach(function(i) {})

Такой код трасформируется в строку

    log('тестируем!')(options.list || []).forEach(function(i) {})

**Чрезвычайно** высоки шансы, что `log` возращает **не** функцию; таким образом, эта строка вызовет `TypeError` с сообщением о том, что `undefined не является функцией`.

### Заключение

Настоятельно рекомендуем **никогда** не забывать ставить или опускать точку с запятой; так же рекомендуется оставлять скобки на одной строке с соответствующим оператором и никогда не опускать их для выражений с использованием `if` / `else`. Оба этих совета не только повысят читабельность вашего кода, но и предотвратят от изменения его поведения произведённого парсером втихую.
