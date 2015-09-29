## Метад `hasOwnProperty`

Каб праверыць, ці ёсць у аб'екта ўласцівасць, вызначаная ў *ім самім*, а не дзе-небудзь
у яго [ланцужку прататыпаў](#object.prototype), неабходна выкарыстаць метад
`hasOwnProperty`, які ўсе аб'екты ўспадкоўваюць ад `Object.prototype`.

> **Заўвага:** **недастаткова** праверыць, ці значэнне уласцівасці — `undefined`.
> Уласцівасць можа існаваць, але яе значэнне было пазначана як `undefined`.

`hasOwnProperty` — адзіная функцыя ў JavaScript, якая дазваляе атрымаць уласцівасці
аб'екта **без** зварота да ланцужка прататыпаў.

    // Сапсуем Object.prototype
    Object.prototype.bar = 1;
    var foo = {goo: undefined};

    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

Толькі `hasOwnProperty` дасць правільны чаканы вынік. Паглядзіце секцыю аб
[цыкле `for in`](#object.forinloop) для падрабязнейшых звестак аб тым, як
выкарыстоўваць `hasOwnProperty` падчас ітэрацыі па ўласцівасцях аб'екта.

### `hasOwnProperty` як уласцівасць

JavaScript не абараняе ўласцівасць `hasOwnProperty`; такім чынам, ёсць верагоднасць
што ў аб'екта можа быць уласцівасць з такім імем, неабходна выкарыстаць
*знешні* `hasOwnProperty` для карэктнага выніку.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Тут жывуць драконы'
    };

    foo.hasOwnProperty('bar'); // заўсёды верне false

    // выкарыстайце hasOwnProperty іншага аб'екта
    // і перадайце foo у якасці this
    ({}).hasOwnProperty.call(foo, 'bar'); // true

    // Такасама магчыма выкарыстаць hasOwnProperty з Object.prototype
    Object.prototype.hasOwnProperty.call(foo, 'bar'); // true


### Заключэнне

Выкарыстоўванне `hasOwnProperty` ёсць **адзіным** надзейным спосабам, каб
праверыць існаванне ўласцівасці ў аб'екце. Рэкамендуецца выкарыстоўваць
`hasOwnProperty` пры ітэрацыі па ўласцівасцях аб'екта, як апісана ў секцыі
[цыкла `for in` ](#object.forinloop).
