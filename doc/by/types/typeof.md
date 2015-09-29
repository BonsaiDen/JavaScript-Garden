## Аператар `typeof`

Аператар `typeof` (разам з [`instanceof`](#types.instanceof)) магчыма найбольшая
хіба мовы JavaScript, таму што ён амаль што **цалкам зламаны**.

Хаця `instanceof` усё яшчэ мае абмежаванае ўжыванне, `typeof` можа быць выкарыстаны
толькі з адной мэтай, і гэта дарэчы **не** праверка тыпа.

> **Заўвага:** Хаця для выкліка `typeof` можна выкарыстаць сінтаксіс функцыі, то бок
> `typeof(obj)`, гэта не выклік функцыі. Дужкі будуць апрацоўвацца нармальна
> і вернутае значэнне будзе выкарыстана як аперанд аператара `typeof`.
> **Не існуе** функцыі `typeof`.

### Табліца тыпаў JavaScript

    Значэнне            Клас       Тып
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object (function in Nitro/V8)
    new RegExp("meow")  RegExp     object (function in Nitro/V8)
    {}                  Object     object
    new Object()        Object     object

У вышэй прыведзенай табыліцы, *Тып* паказвае значэнне вернутае аператарам `typeof`.
Як можна пабачыць, гэта значэнне абсалютна не кансістэнтнае.

*Клас* паказвае значэнне ўнутраннай уласцівасці `[[Class]]` аб'екта.

> **З спецыфікацыі:** значэнне `[[Class]]` можа быць быць адным з наступных
> радкоў. `Arguments`, `Array`, `Boolean`, `Date`, `Error`,
> `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

### Клас аб'екта

Адзіны спосаб атрымаць значэнне `[[Class]]` аб'екта - выклікаць метад `Object.prototype.toString`.
Ён верне радок у наступным фармаце: `'[object ' + valueOfClass + ']'`, напрыклад
`[object String]` або `[object Array]`:

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }

    is('String', 'test'); // true
    is('String', new String('test')); // true

У вышэйпрыведзеным прыкладзе, `Object.prototype.toString` выклікаецца са значэннем
[this](#function.this) пазначаным як аб'ект чыё значэнне `[[Class]]` мае быць
атрыманым.

> **Заўвага для ES5:** у ECMAScript 5, для зручнасці, значэнне `Object.prototype.toString`
> для `null` і `undefined` было **зменена** з `Object` на `Null` і
> `Undefined` адпаведна.

### Праверка вызначанасці пераменных

    typeof foo !== 'undefined'

Вышэйпрыведзены код праверыць ці было вызначана `foo`; просты зварот да пераменнай
прывядзе да `ReferenceError`. Гэта адзінае для чаго карысны `typeof`.

### У заключэнне

Каб праверыць тып аб'екта, настойліва рэкамендуецца выкарыстоўваць
`Object.prototype.toString` - гэта адзіны надзейны спосаб.
Як паказана ў вышэйпрыведзенай табліцы, некаторыя значэнні вернутыя аператарам
`typeof` не вызначаныя ў спецыфікацыі; такім чынам, яны могуць быць рознымі ў
розных рэалізацыях.

Акрамя як для праверкі вызначанасці пераменнай, `typeof` мае быць пазбегнуты.
