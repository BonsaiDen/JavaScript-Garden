## Аператар `instanceof`

Аператар `instanceof` параўноўвае канструктары двух аперандаў. Гэта карысна толькі
для параўнання аб'ектаў не ўбудаваных тыпаў. Выкарыстоўванне на ўбудаваных тыпах не
мае сэнсу, як і [аператар typeof](#types.typeof).

### Параўнанне адвольных аб'ектаў

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // Калі толькі прысвоім Bar.prototype аб'ект функцыі Foo,
    // але не самаго экзэмпляра Foo
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### Выкарыстоўванне `instanceof` з убудаванымі тыпамі

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

Варта адзначыць, што `instanceof` не працуе на аб'ектах, якія паходзяць з розных
кантэкстаў JavaScript (напрыклад, розных дакументаў у web-браузеры), бо іх канструктары
насамрэч не будуць канструктарамі тых самых аб'ектаў.

### У заключэнне

Аператар `instanceof` мае быць выкарыстаны **толькі** для працы з аб'ектамі не
ўбудаваных тыпаў якія паходзяць з аднаго кантэкста JavaScript. Як і ў выпадку з
[аператарам `typeof`](#types.typeof), трэба **пазбягаць** любога іншага яго выкарыстання.
