# 📌 JavaScript’te Hata Yönetimi ve Yerleşik Hata Sınıfları
> _Profesyonel bir geliştirici olarak, kodumuzun sadece "mutlu yolda" (happy path) çalışmasını değil, aynı zamanda kaçınılmaz olan hatalar karşısında nasıl davrandığını da tasarlamak zorundayız. Sağlam bir hata yönetimi stratejisi, uygulamanın güvenilirliğini, sürdürülebilirliğini ve kullanıcı deneyimini doğrudan belirler._

---

## 🧠 İçindekiler
- [📌 JavaScript’te Hata Yönetimi ve Yerleşik Hata Sınıfları](#-javascriptte-hata-yönetimi-ve-yerleşik-hata-sınıfları)
  - [🧠 İçindekiler](#-i̇çindekiler)
  - [🏛️ Felsefe: Neden Hata Yönetimi?](#️-felsefe-neden-hata-yönetimi)
  - [🚀 Gerçek Dünya Senaryosu](#-gerçek-dünya-senaryosu)
  - [⚙️ Temel Mekanizmalar: `try...catch...finally` ve `throw`](#️-temel-mekanizmalar-trycatchfinally-ve-throw)
    - [Anatomi: `try`, `catch`, `finally`](#anatomi-try-catch-finally)
    - [`throw` ile Kontrolü Ele Almak](#throw-ile-kontrolü-ele-almak)
  - [📋 JavaScript'in Yerleşik Hata Sınıfları (Built-in Error Types)](#-javascriptin-yerleşik-hata-sınıfları-built-in-error-types)
    - [`Error`: Temel Hata Sınıfı](#error-temel-hata-sınıfı)
    - [`SyntaxError`: Derleme Zamanı Hatası](#syntaxerror-derleme-zamanı-hatası)
    - [`ReferenceError`: Kapsam (Scope) Hatası](#referenceerror-kapsam-scope-hatası)
    - [`TypeError`: Tür Uyuşmazlığı Hatası](#typeerror-tür-uyuşmazlığı-hatası)
    - [`RangeError`: Aralık Hatası](#rangeerror-aralık-hatası)
    - [`URIError`: URI İşleme Hatası](#urierror-uri-i̇şleme-hatası)
  - [🚀 İleri Seviye Stratejiler](#-i̇leri-seviye-stratejiler)
    - [Asenkron Hata Yönetimi: `Promise.catch()` ve `async/await`](#asenkron-hata-yönetimi-promisecatch-ve-asyncawait)
    - [Özel Hata Sınıfları Oluşturmak (Custom Errors)](#özel-hata-sınıfları-oluşturmak-custom-errors)
    - [Global Hata Yakalama (Global Error Handling)](#global-hata-yakalama-global-error-handling)
  - [✅ En İyi Uygulamalar ve Kaçınılması Gerekenler](#-en-i̇yi-uygulamalar-ve-kaçınılması-gerekenler)
  - [🔗 İlgili Kaynaklar](#-i̇lgili-kaynaklar)

---

## 🏛️ Felsefe: Neden Hata Yönetimi?

Hata yönetimi, kodun çökmesini engellemekten çok daha fazlasıdır. Profesyonel bir yazılımda hata yönetimi şu amaçlara hizmet eder:

*   **Güvenilirlik (Reliability):** Uygulamanın beklenmedik girdiler veya dış sistem hataları karşısında bile ayakta kalmasını sağlar.
*   **Hata Ayıklama (Debugging):** Anlamlı hata mesajları ve `stack trace`'ler, sorunun kaynağını bulmayı haftalardan dakikalara indirebilir.
*   **Kullanıcı Deneyimi (UX):** Kullanıcıya boş bir sayfa veya anlamsız bir "error" mesajı göstermek yerine, "Sunucuya ulaşılamadı, lütfen daha sonra tekrar deneyin." gibi yönlendirici ve anlaşılır bildirimler sunar.
*   **Güvenlik:** Hata detaylarının (örn: dosya yolları, veritabanı şemaları) son kullanıcıya sızmasını engelleyerek güvenlik zafiyetlerinin önüne geçer.

---

## 🚀 Gerçek Dünya Senaryosu

> **Senaryo:** Bir e-ticaret sitesinde kullanıcı, ürün detay sayfasına girdiğinde, sunucudan ürün bilgilerini çeken bir API isteği yapılır. Eğer API isteği başarısız olursa (sunucu kapalı, internet yok, ürün bulunamadı vb.), ne olmalı?
>
> *   **Kötü Yönetim:** Sayfa tamamen boş kalır veya JavaScript konsolunda kırmızı bir hata belirir. Kullanıcı ne olduğunu anlamaz ve siteyi terk eder.
> *   **İyi Yönetim:** API isteği bir `try...catch` bloğu içine alınır. Hata yakalandığında, ekranda "Ürün bilgileri yüklenemedi. Lütfen internet bağlantınızı kontrol edip sayfayı yenileyin." gibi bir mesaj gösterilir. Bu sırada uygulamanın diğer kısımları (menü, footer vb.) çalışmaya devam eder.

---

## ⚙️ Temel Mekanizmalar: `try...catch...finally` ve `throw`

### Anatomi: `try`, `catch`, `finally`

Bu üçlü, senkron koddaki hataları yönetmenin temelidir.

*   `try`: Hata fırlatma potansiyeli olan "riskli" kodların sarmalandığı bloktur.
*   `catch (error)`: `try` bloğu içinde bir hata fırlatıldığında çalışacak olan bloktur. `error` nesnesi, hata hakkında detaylı bilgi içerir (`name`, `message`, `stack`).
*   `finally`: `try` bloğu başarılı da olsa, `catch` bloğu çalışsa da her durumda çalışması garanti edilen bloktur. Kaynak temizleme (dosya kapatma, veritabanı bağlantısını sonlandırma) için idealdir.

```js
function processData(data) {
  // Bu fonksiyonun hata fırlatabileceğini varsayalım.
  if (!data || !data.id) {
    throw new TypeError("Geçersiz veri: 'id' alanı zorunludur.");
  }
  return `Veri işlendi: ${data.id}`;
}

try {
  // Riskli işlem
  console.log("Veri işleniyor...");
  const result = processData({ name: "product-1" }); // 'id' eksik olduğu için hata fırlatacak
  console.log(result); // Bu satır hiç çalışmayacak
} catch (error) {
  // Hata yakalandığında çalışır
  console.error(`Hata Adı: ${error.name}`);
  console.error(`Hata Mesajı: ${error.message}`);
  // Stack trace, hatanın kodun hangi satırından kaynaklandığını gösterir. Debugging için kritiktir.
  // console.error(`Stack Trace: ${error.stack}`);
} finally {
  // İsteğe bağlı: her durumda çalışır
  console.log("İşlem tamamlandı (başarılı veya başarısız).");
}
```

### `throw` ile Kontrolü Ele Almak

`throw` ifadesi, bir istisna (exception) durumu yaratarak programın normal akışını kesintiye uğratır. **Her zaman `new Error()` veya türevlerini `throw` edin.** String (`throw "Hata!"`) veya number (`throw 404`) fırlatmak, `stack trace` gibi değerli bilgileri kaybetmenize neden olur.

```javascript
// 🧪 Kod Örneği - Mantıksal Hata Fırlatma
function getUserById(id) {
  if (typeof id !== 'number' || id <= 0) {
    // Beklenmedik bir durum oluştu, bunu bir hata olarak işaretle.
    throw new Error("Geçersiz kullanıcı ID'si sağlandı.");
  }
  // ... veritabanından kullanıcıyı bul ...
  const user = db.findUser(id);
  if (!user) {
    // Bu bir programlama hatası değil, beklenen bir durum olabilir.
    // Ancak bunu da bir hata olarak yönetmek isteyebiliriz.
    throw new ReferenceError(`ID'si ${id} olan kullanıcı bulunamadı.`);
  }
  return user;
}

try {
  const user = getUserById(-5);
  console.log(user);
} catch (e) {
  console.error(`[${e.name}] Beklenmedik bir sorun oluştu: ${e.message}`);
  // Kullanıcıya daha nazik bir mesaj gösterebiliriz:
  // showNotification("Kullanıcı bulunurken bir sorun oluştu.");
}
```

---

## 📋 JavaScript'in Yerleşik Hata Sınıfları (Built-in Error Types)

JavaScript motoru, farklı hata senaryoları için özelleşmiş hata sınıfları sunar. Hangi tür hatayla karşılaştığınızı bilmek, sorunu çözmede ilk adımdır.

### `Error`: Temel Hata Sınıfı
Tüm diğer yerleşik hata türlerinin prototipidir. Genellikle genel veya özel hatalar fırlatmak için kullanılır.
*   **Özellikleri:** `message` (hata açıklaması), `name` (hata sınıfının adı), `stack` (hatanın oluştuğu çağrı yığını).

### `SyntaxError`: Derleme Zamanı Hatası
Kod, JavaScript'in sözdizimi kurallarına uymadığında, yorumlayıcı tarafından daha kod çalıştırılmadan fırlatılır. `try...catch` ile **yakalanamaz** çünkü kodun derlenmesini engeller.
*   **Örnek:** `let x =;` veya `function( { ... }`
*   **Çözüm:** Kodu dikkatlice gözden geçirin. Linter (ESLint gibi) araçları bu hataları anında tespit eder.

### `ReferenceError`: Kapsam (Scope) Hatası
Tanımlanmamış veya mevcut kapsamda (scope) erişilemeyen bir değişkene erişmeye çalışıldığında oluşur.
*   **Örnek:** `console.log(nonExistentVariable);`
*   **Çözüm:** Değişkenin doğru şekilde (`let`, `const`, `var` ile) tanımlandığından ve erişilmeye çalışıldığı kapsamda mevcut olduğundan emin olun.

### `TypeError`: Tür Uyuşmazlığı Hatası
Bir değer üzerinde, o tür için geçerli olmayan bir işlem yapılmaya çalışıldığında ortaya çıkar. En sık karşılaşılan hatalardan biridir.
*   **Örnek 1:** `const user = null; console.log(user.name);` (`null` üzerinde özellik okunamaz)
*   **Örnek 2:** `(123).toUpperCase();` (Sayıların `toUpperCase` metodu yoktur)
*   **Çözüm:** İşlem yapmadan önce değişkenin türünü kontrol edin (`typeof`, `instanceof`) veya varlığını sorgulayın (`if (user)`). TypeScript gibi statik tip denetleyicileri bu tür hataları büyük ölçüde engeller.

### `RangeError`: Aralık Hatası
Bir değer, kabul edilebilir aralığın dışında olduğunda fırlatılır.
*   **Örnek 1:** `new Array(-1);` (Dizi uzunluğu negatif olamaz)
*   **Örnek 2:** `(12.345).toFixed(101);` (`toFixed` argümanı 0-100 arası olmalıdır)
*   **Çözüm:** Fonksiyonlara veya yapıcılara geçilen sayısal değerlerin belgelerde belirtilen sınırlar içinde olduğundan emin olun.

### `URIError`: URI İşleme Hatası
`encodeURI()`, `decodeURIComponent()` gibi global URI işleme fonksiyonlarına geçersiz parametreler verildiğinde oluşur.
*   **Örnek:** `decodeURIComponent('%');` (`%` tek başına geçerli bir kodlama değildir)
*   **Çözüm:** URI fonksiyonlarına gönderdiğiniz string'lerin formatının doğru olduğundan emin olun.

---

## 🚀 İleri Seviye Stratejiler

### Asenkron Hata Yönetimi: `Promise.catch()` ve `async/await`

`try...catch` bloğu, yalnızca senkron kodu ve `await` ile beklenen asenkron işlemleri yakalayabilir.

**1. Promise Zinciri ile (`.catch`):**
Promise tabanlı bir fonksiyonda hata, zincirin sonundaki `.catch()` bloğu tarafından yakalanır.

```js
// 🧪 Kod Örneği - Promise.catch
fetch('https://api.example.com/invalid-endpoint')
  .then(response => {
    if (!response.ok) {
      // HTTP hatalarını manuel olarak fırlatmalıyız, fetch bunları otomatik hata saymaz.
      throw new Error(`HTTP Hatası! Statü: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => {
    // Ağ hatası veya yukarıda fırlattığımız hata buraya düşer.
    console.error("API isteği başarısız:", error.message);
  });
```

**2. `async/await` ile (`try...catch`):**
`async/await` sözdizimi, asenkron kodu senkron gibi göstermemizi sağlar ve bu sayede standart `try...catch` bloğunu kullanabiliriz. Bu, genellikle daha okunabilir bir koddur.

```js
// 🧪 Kod Örneği - async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/invalid-endpoint');
    if (!response.ok) {
      throw new Error(`HTTP Hatası! Statü: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Promise reddedildiğinde (rejected) veya bir hata fırlatıldığında burası çalışır.
    console.error("Veri alınırken bir hata oluştu:", error.message);
  }
}

fetchData();
```

### Özel Hata Sınıfları Oluşturmak (Custom Errors)

Büyük uygulamalarda, farklı hata türlerini ayırt etmek için kendi hata sınıflarınızı oluşturmak çok değerlidir. Bu, daha spesifik `catch` blokları yazmanızı sağlar.

```js
// 🧪 Kod Örneği - Özel Hata Sınıfı
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

function saveUser(user) {
  if (!user.name) {
    throw new ValidationError("Kullanıcı adı boş olamaz.");
  }
  // ... API'ye kaydetme işlemi ...
  // throw new ApiError("Sunucuya ulaşılamadı", 503);
}

try {
  saveUser({});
} catch (error) {
  if (error instanceof ValidationError) {
    // Bu, bir doğrulama hatası. Kullanıcıya gösterilebilir.
    console.warn("Giriş hatası:", error.message);
  } else if (error instanceof ApiError) {
    // Bu, bir sistem/API hatası. Loglanmalı ve genel bir mesaj gösterilmeli.
    console.error(`API Hatası (${error.statusCode}): ${error.message}`);
  } else {
    // Beklenmedik, genel bir hata.
    console.error("Bilinmeyen bir hata oluştu:", error);
  }
}
```

### Global Hata Yakalama (Global Error Handling)

Uygulamanın herhangi bir yerinde yakalanmamış (`uncaught`) hatalar için son bir güvenlik ağı oluşturabilirsiniz.

*   **Tarayıcıda:** `window.onerror` veya `window.addEventListener('error', ...)`
*   **Node.js'te:** `process.on('uncaughtException', ...)`

Bu mekanizmalar, hataları merkezi bir loglama servisine (Sentry, LogRocket vb.) göndermek için kullanılır. **Dikkat:** Bu, uygulamanın çalışmaya devam etmesini sağlamaz, sadece çökmeden önce son bir işlem yapma şansı verir.

```js
// Tarayıcı ortamı için örnek
window.onerror = function (message, source, lineno, colno, error) {
  console.log("Yakalanmamış bir hata oluştu, loglama servisine gönderiliyor...");
  // LoglamaServisi.gonder({ message, source, lineno, error });
  return true; // Tarayıcının varsayılan hata işlemini (konsola yazdırma) engeller.
};
```

---

## ✅ En İyi Uygulamalar ve Kaçınılması Gerekenler

-   **✔️ YAP:** Hataları spesifik olarak ele alın (`if (error instanceof ...)`).
-   **✔️ YAP:** Asenkron kod için `async/await` ile `try/catch` veya Promise'ler için `.catch()` kullanın.
-   **✔️ YAP:** Kaynakları temizlemek için `finally` bloğunu kullanın.
-   **✔️ YAP:** Hata mesajlarını loglayın, ancak kullanıcıya hassas bilgi sızdırmayın.

-   **❌ YAPMA:** `catch` bloğunu boş bırakmayın. Bu, "hatayı yutmak" anlamına gelir ve hata ayıklamayı imkansız hale getirir.
    ```js
    // KESİNLİKLE YAPMAYIN!
    try {
      // ...
    } catch (e) {
      // Hiçbir şey yapma. Sorun yokmuş gibi davran.
    }
    ```
-   **❌ YAPMA:** Mantıksal akış kontrolü için `try...catch` kullanmayın. `if/else` bunun içindir. Hatalar, istisnai ve beklenmedik durumlar için olmalıdır.

---

## 🔗 İlgili Kaynaklar
-   [MDN Web Docs – Error Handling & try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
-   [JavaScript.info – Error Handling](https://javascript.info/error-handling)
-   [Node.js Error Handling Best Practices](https://nodejs.org/en/docs/guides/error-handling/)