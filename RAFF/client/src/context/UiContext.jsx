import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UiContext = createContext(null);

const THEME_KEY = "raff_theme";
const LANG_KEY = "raff_lang";

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

const dictionary = {
  en: {
    "navbar.topLeft": "Curated streetwear store",
    "navbar.signedInAs": "Signed in as {name}",
    "navbar.secureAccess": "Secure account access",
    "navbar.home": "Home",
    "navbar.shop": "Shop",
    "navbar.wishlist": "Wishlist",
    "navbar.cart": "Cart",
    "navbar.account": "Account",
    "navbar.logout": "Logout",
    "navbar.signIn": "Sign in",
    "navbar.createAccount": "Create account",
    "navbar.guest": "Guest",

    "footer.intro":
      "A cleaner storefront for curated streetwear, account access, and a more premium shopping feel.",
    "footer.shop": "Shop",
    "footer.company": "Company",
    "footer.support": "Support",
    "footer.newArrivals": "New arrivals",
    "footer.bestSellers": "Best sellers",
    "footer.about": "About",
    "footer.journal": "Journal",
    "footer.contact": "Contact",
    "footer.delivery": "Delivery",
    "footer.returns": "Returns",
    "footer.account": "Account",

    "home.eyebrow": "Refined streetwear storefront",
    "home.h1": "Make the brand feel premium at first glance.",
    "home.p":
      "A more polished homepage, stronger hierarchy, and cleaner shopping flow inspired by professional ecommerce websites.",
    "home.shopCollection": "Shop collection",
    "home.createAccount": "Create account",
    "home.stats.24h.strong": "24h",
    "home.stats.24h.span": "average order dispatch",
    "home.stats.new.strong": "New",
    "home.stats.new.span": "authentication experience",
    "home.stats.clean.strong": "Clean",
    "home.stats.clean.span": "premium visual system",
    "home.showcase.capsule.span": "Capsule",
    "home.showcase.capsule.strong": "Minimal layers",
    "home.showcase.texture.span": "Texture",
    "home.showcase.texture.strong": "Soft neutrals",
    "home.showcase.identity.span": "Identity",
    "home.showcase.identity.strong": "RAF signature drop",
    "home.floating.drop": "Drop 04",
    "home.floating.strong": "Structured layers, neutral palette, premium feel.",

    "home.brandDirection.label": "Brand direction",
    "home.brandDirection.h2": "Cleaner layout. Better product focus.",
    "home.brandDirection.p":
      "Large visuals, softer colors, and more breathing room make the site feel closer to a professional fashion store.",

    "home.story.editorial.title": "Editorial styling",
    "home.story.editorial.subtitle":
      "Premium visuals for a cleaner brand identity.",
    "home.story.fit.title": "On-body fit",
    "home.story.fit.subtitle":
      "Pieces presented like a professional fashion store.",
    "home.story.mood.title": "Street mood",
    "home.story.mood.subtitle":
      "Campaign energy with a calmer, more premium layout.",

    "home.why.label": "Why it feels better",
    "home.why.h3": "Professional polish across the key pages",
    "home.why.p":
      "The main screen, account flow, navbar, and footer now look more intentional and easier to trust.",

    "home.upgrades.label": "Store upgrades",
    "home.upgrades.h4": "Registration now behaves like a real website.",
    "home.upgrades.tagLine":
      "Users can sign up, sign in, stay authenticated, and see account state in the navigation.",
    "home.upgrades.included.strong": "Included in this refresh",
    "home.upgrades.included.li1": "Backend API for register and login",
    "home.upgrades.included.li2": "Password hashing and JWT token creation",
    "home.upgrades.included.li3": "Polished auth forms with feedback states",
    "home.upgrades.included.li4":
      "Cleaner premium visual identity for the site",

    "home.ready.label": "Ready for growth",
    "home.ready.h5": "Next-level storefront foundations are in place.",
    "home.ready.p":
      "You can now continue with product API integration, user profiles, and real checkout processing on top of this cleaner base.",
    "home.exploreProducts": "Explore products",

    "home.mini.alt1": "Portrait",
    "home.mini.alt2": "Accessories",
    "home.mini.alt3": "Product shot",

    "shop.h1": "Shop",

    "cart.h1": "Your Cart",
    "cart.empty": "Your selected products will appear here.",
    "cart.total": "Total: {total}",
    "cart.remove": "Remove",
    "cart.goCheckout": "Go To Checkout",

    "product.addToCart": "Add To Cart",
    "product.wishlist.toggle": "Toggle wishlist",
    "product.wishlist.in": "♥ In Wishlist",
    "product.wishlist.out": "♡ Wishlist",

    "product.size.label": "Size",
    "product.size.selected": "Selected: {size}",
    "product.size.closest": "Size {requested} not available. Selected closest: {closest}.",

    "wishlist.h1": "Wishlist",
    "wishlist.empty": "Your favorite saved products.",
    "wishlist.open": "Open",
    "wishlist.addToCart": "Add To Cart",
    "wishlist.remove": "Remove",

    "checkout.h1": "Checkout",
    "checkout.total": "Итого: {total}",
    "checkout.fullName": "Full Name",
    "checkout.address": "Address",
    "checkout.phone": "Phone Number",
    "checkout.payNow": "Pay Now",
    "checkout.error.fillAll": "Please fill all fields.",
    "checkout.error.cartEmpty": "Your cart is empty.",
    "checkout.success":
      "Payment successful. Thank you for your order!",

    "login.memberAccess": "Member access",
    "login.h1": "Sign in to your RAF account.",
    "login.p":
      "Track orders, keep your wishlist synced, and move through checkout like a premium store experience.",
    "login.benefit.fast.strong": "Fast checkout",
    "login.benefit.fast.text": "Your profile details stay ready for the next order.",
    "login.benefit.saved.strong": "Saved favorites",
    "login.benefit.saved.text": "Keep the pieces you want in one place.",
    "login.benefit.secure.strong": "Secure access",
    "login.benefit.secure.text":
      "Login now works through the backend API with validation.",
    "login.card.welcome": "Welcome back",
    "login.card.p":
      "Enter your details to continue shopping with a cleaner, more professional account flow.",
    "login.email": "Email",
    "login.password": "Password",
    "login.placeholder.email": "name@email.com",
    "login.placeholder.password": "Enter your password",
    "login.error.noAccount": "No account yet? Create one here",
    "login.error.missingFields": "Please enter your email and password.",
    "login.success.signedIn": "You are signed in. Redirecting to the home page...",
    "login.meta.noAccountPrefix": "No account yet?",
    "login.meta.linkText": "Create one here",
    "login.button.signIn": "Sign in",
    "login.button.signingIn": "Signing in...",

    "register.newMember": "New member",
    "register.h1": "Create an account that feels premium.",
    "register.p":
      "Register like on a modern ecommerce site: clear validation, secure auth, and a cleaner visual experience.",
    "register.benefit.personal.strong": "Personal account",
    "register.benefit.personal.text": "Keep your login active and your shopping flow smooth.",
    "register.benefit.wishlist.strong": "Wishlist ready",
    "register.benefit.wishlist.text": "Save pieces you want to buy later.",
    "register.benefit.better.strong": "Better experience",
    "register.benefit.better.text":
      "The forms now work with a real backend instead of only local state.",
    "register.card.title": "Create your account",
    "register.card.p":
      "Join the store with a simple but polished sign-up form and secure session storage.",
    "register.fullName": "Full name",
    "register.email": "Email",
    "register.password": "Password",
    "register.placeholder.fullName": "Your full name",
    "register.placeholder.email": "name@email.com",
    "register.placeholder.password": "At least 6 characters",
    "register.error.fillAll": "Please fill in all fields.",
    "register.error.passwordTooShort":
      "Password must be at least 6 characters.",
    "register.success":
      "Account created successfully. Redirecting...",
    "register.button.create": "Create account",
    "register.button.creating": "Creating account...",
    "register.meta.already": "Already registered? Sign in here",
    "register.meta.linkText": "Sign in here",

    "side.theme": "Theme",
    "side.theme.dark": "Dark",
    "side.theme.light": "Light",
    "side.lang": "Language",
    "side.lang.en": "EN",
    "side.lang.ru": "RU",
    "side.lang.az": "AZ",
  },
  ru: {
    "navbar.topLeft": "Подобранный магазин стритвира",
    "navbar.signedInAs": "Вы вошли как {name}",
    "navbar.secureAccess": "Безопасный доступ к аккаунту",
    "navbar.home": "Главная",
    "navbar.shop": "Магазин",
    "navbar.wishlist": "Избранное",
    "navbar.cart": "Корзина",
    "navbar.account": "Аккаунт",
    "navbar.logout": "Выйти",
    "navbar.signIn": "Войти",
    "navbar.createAccount": "Создать аккаунт",
    "navbar.guest": "Гость",

    "footer.intro":
      "Более аккуратная витрина для подобранного стритвира, доступа к аккаунту и более премиального ощущения от покупок.",
    "footer.shop": "Магазин",
    "footer.company": "Компания",
    "footer.support": "Поддержка",
    "footer.newArrivals": "Новинки",
    "footer.bestSellers": "Хиты",
    "footer.about": "О нас",
    "footer.journal": "Журнал",
    "footer.contact": "Контакты",
    "footer.delivery": "Доставка",
    "footer.returns": "Возврат",
    "footer.account": "Аккаунт",

    "home.eyebrow": "Отполированная витрина стритвира",
    "home.h1": "Премиальное впечатление с первого взгляда.",
    "home.p":
      "Более аккуратная главная, сильнее иерархия и понятный путь покупок — вдохновлено профессиональными ecommerce-сайтами.",
    "home.shopCollection": "Смотреть коллекцию",
    "home.createAccount": "Создать аккаунт",
    "home.stats.24h.strong": "24ч",
    "home.stats.24h.span": "средняя отправка заказов",
    "home.stats.new.strong": "Новая",
    "home.stats.new.span": "возможность авторизации",
    "home.stats.clean.strong": "Чисто",
    "home.stats.clean.span": "премиальная визуальная система",
    "home.showcase.capsule.span": "Капсула",
    "home.showcase.capsule.strong": "Минималистичные слои",
    "home.showcase.texture.span": "Текстура",
    "home.showcase.texture.strong": "Мягкие нейтрали",
    "home.showcase.identity.span": "Айдентика",
    "home.showcase.identity.strong": "Дроп RAF в фирменном стиле",
    "home.floating.drop": "Дроп 04",
    "home.floating.strong":
      "Структурированные слои, спокойная палитра, премиальное ощущение.",

    "home.brandDirection.label": "Направление бренда",
    "home.brandDirection.h2": "Более чистая верстка. Фокус на продукте.",
    "home.brandDirection.p":
      "Большие визуалы, более мягкие цвета и больше воздуха делают сайт ближе к профессиональному fashion-магазину.",

    "home.story.editorial.title": "Редакционная стилизация",
    "home.story.editorial.subtitle":
      "Премиальные визуалы для более чистой айдентики.",
    "home.story.fit.title": "Посадка на теле",
    "home.story.fit.subtitle":
      "Композиции как в профессиональном fashion-магазине.",
    "home.story.mood.title": "Уличное настроение",
    "home.story.mood.subtitle":
      "Энергия кампании с более спокойной и премиальной версткой.",

    "home.why.label": "Почему так ощущается лучше",
    "home.why.h3": "Профессиональная полировка ключевых страниц",
    "home.why.p":
      "Главный экран, логика аккаунта, навигация и футер теперь выглядят более осознанно и им проще доверять.",

    "home.upgrades.label": "Обновления магазина",
    "home.upgrades.h4": "Регистрация теперь как на настоящем сайте.",
    "home.upgrades.tagLine":
      "Пользователи могут регистрироваться, входить, оставаться авторизованными и видеть состояние аккаунта в навигации.",
    "home.upgrades.included.strong": "Что входит в это обновление",
    "home.upgrades.included.li1": "Backend API для регистрации и входа",
    "home.upgrades.included.li2": "Хэширование пароля и создание JWT токена",
    "home.upgrades.included.li3": "Отполированные формы авторизации с фидбеком",
    "home.upgrades.included.li4":
      "Более чистая премиальная визуальная айдентика",

    "home.ready.label": "Готово для роста",
    "home.ready.h5": "Фундамент витрины уже на месте.",
    "home.ready.p":
      "Дальше можно продолжить: интеграция product API, профили пользователей и настоящая оплата — поверх этого более чистого основания.",
    "home.exploreProducts": "Перейти к товарам",

    "home.mini.alt1": "Портрет",
    "home.mini.alt2": "Аксессуары",
    "home.mini.alt3": "Фото товара",

    "shop.h1": "Магазин",

    "cart.h1": "Ваша корзина",
    "cart.empty": "Выбранные товары появятся здесь.",
    "cart.total": "Итого: {total}",
    "cart.remove": "Удалить",
    "cart.goCheckout": "Перейти к оформлению",

    "product.addToCart": "Добавить в корзину",
    "product.wishlist.toggle": "Переключить избранное",
    "product.wishlist.in": "♥ В избранном",
    "product.wishlist.out": "♡ В избранное",

    "product.size.label": "Размер",
    "product.size.selected": "Выбран: {size}",
    "product.size.closest":
      "Размер {requested} недоступен. Выбран ближайший: {closest}.",

    "wishlist.h1": "Избранное",
    "wishlist.empty": "Ваши любимые сохранённые товары.",
    "wishlist.open": "Открыть",
    "wishlist.addToCart": "Добавить в корзину",
    "wishlist.remove": "Удалить",

    "checkout.h1": "Оформление",
    "checkout.total": "Итого: {total}",
    "checkout.fullName": "Имя и фамилия",
    "checkout.address": "Адрес",
    "checkout.phone": "Номер телефона",
    "checkout.payNow": "Оплатить сейчас",
    "checkout.error.fillAll": "Пожалуйста, заполните все поля.",
    "checkout.error.cartEmpty": "Ваша корзина пуста.",
    "checkout.success": "Оплата прошла успешно. Спасибо за ваш заказ!",

    "login.memberAccess": "Доступ для участников",
    "login.h1": "Войдите в ваш аккаунт RAF.",
    "login.p":
      "Отслеживайте заказы, синхронизируйте избранное и оформляйте покупку как на премиальном магазине.",
    "login.benefit.fast.strong": "Быстрое оформление",
    "login.benefit.fast.text": "Данные профиля всегда готовы к следующему заказу.",
    "login.benefit.saved.strong": "Сохранённые избранные",
    "login.benefit.saved.text": "Соберите нужные вещи в одном месте.",
    "login.benefit.secure.strong": "Безопасный доступ",
    "login.benefit.secure.text":
      "Вход теперь работает через backend API с валидацией.",
    "login.card.welcome": "С возвращением",
    "login.card.p":
      "Введите данные, чтобы продолжить покупки с более чистым и профессиональным флоу аккаунта.",
    "login.email": "Email",
    "login.password": "Пароль",
    "login.placeholder.email": "name@email.com",
    "login.placeholder.password": "Введите пароль",
    "login.error.noAccount": "У вас ещё нет аккаунта? Создайте здесь",
    "login.error.missingFields": "Пожалуйста, введите email и пароль.",
    "login.success.signedIn": "Вы вошли. Перенаправляем на главную страницу...",
    "login.meta.noAccountPrefix": "У вас ещё нет аккаунта?",
    "login.meta.linkText": "Создайте здесь",
    "login.button.signIn": "Войти",
    "login.button.signingIn": "Вход...",

    "register.newMember": "Новый участник",
    "register.h1": "Создайте аккаунт, который ощущается премиально.",
    "register.p":
      "Регистрируйтесь как на современном ecommerce-сайте: понятная валидация, безопасная авторизация и более чистые визуальные впечатления.",
    "register.benefit.personal.strong": "Персональный аккаунт",
    "register.benefit.personal.text":
      "Пусть вход остаётся активным, а путь покупок — плавным.",
    "register.benefit.wishlist.strong": "Избранное готово",
    "register.benefit.wishlist.text": "Сохраняйте вещи, которые хотите купить позже.",
    "register.benefit.better.strong": "Лучше в целом",
    "register.benefit.better.text":
      "Формы теперь работают с реальным backend вместо локального состояния.",
    "register.card.title": "Создайте аккаунт",
    "register.card.p":
      "Присоединяйтесь к магазину простой, но аккуратной формой регистрации и безопасным хранением сессии.",
    "register.fullName": "Имя и фамилия",
    "register.email": "Email",
    "register.password": "Пароль",
    "register.placeholder.fullName": "Ваше полное имя",
    "register.placeholder.email": "name@email.com",
    "register.placeholder.password": "Минимум 6 символов",
    "register.error.fillAll": "Пожалуйста, заполните все поля.",
    "register.error.passwordTooShort": "Пароль должен быть минимум 6 символов.",
    "register.success": "Аккаунт создан. Перенаправляем...",
    "register.button.create": "Создать аккаунт",
    "register.button.creating": "Создаём аккаунт...",
    "register.meta.already": "Уже зарегистрированы? Войдите здесь",
    "register.meta.linkText": "Войдите здесь",

    "side.theme": "Тема",
    "side.theme.dark": "Тёмн.",
    "side.theme.light": "Светл.",
    "side.lang": "Язык",
    "side.lang.en": "EN",
    "side.lang.ru": "RU",
    "side.lang.az": "AZ",
  },
  az: {
    "navbar.topLeft": "Seçilmiş streetwear mağazası",
    "navbar.signedInAs": "Daxil oldunuz: {name}",
    "navbar.secureAccess": "Hesaba təhlükəsiz giriş",
    "navbar.home": "Ana səhifə",
    "navbar.shop": "Mağaza",
    "navbar.wishlist": "İstək siyahısı",
    "navbar.cart": "Səbət",
    "navbar.account": "Hesab",
    "navbar.logout": "Çıxış",
    "navbar.signIn": "Daxil olun",
    "navbar.createAccount": "Hesab yaradın",
    "navbar.guest": "Qonaq",

    "footer.intro":
      "Seçilmiş streetwear üçün daha səliqəli vitrin, hesab girişi və daha premium alış-veriş hissi.",
    "footer.shop": "Mağaza",
    "footer.company": "Şirkət",
    "footer.support": "Dəstək",
    "footer.newArrivals": "Yeni gələnlər",
    "footer.bestSellers": "Ən çox satılanlar",
    "footer.about": "Haqqımızda",
    "footer.journal": "Jurnal",
    "footer.contact": "Əlaqə",
    "footer.delivery": "Çatdırılma",
    "footer.returns": "Geri qaytarma",
    "footer.account": "Hesab",

    "home.eyebrow": "Yüksəldilmiş streetwear vitrinası",
    "home.h1": "İlk baxışdan brend daha premium hiss yaratsın.",
    "home.p":
      "Daha səliqəli ana səhifə, güclü ierarxiya və peşəkar ecommerce saytlarından ilham alan aydın alış-veriş axını.",
    "home.shopCollection": "Kolleksiyaya bax",
    "home.createAccount": "Hesab yaradın",
    "home.stats.24h.strong": "24s",
    "home.stats.24h.span": "orta sifariş göndərişi",
    "home.stats.new.strong": "Yeni",
    "home.stats.new.span": "autentifikasiya təcrübəsi",
    "home.stats.clean.strong": "Səliqəli",
    "home.stats.clean.span": "premium vizual sistem",
    "home.showcase.capsule.span": "Kapsul",
    "home.showcase.capsule.strong": "Minimal qatlar",
    "home.showcase.texture.span": "Tekstura",
    "home.showcase.texture.strong": "Yumşaq neytrallar",
    "home.showcase.identity.span": "Identitet",
    "home.showcase.identity.strong": "RAF imzalı droup",
    "home.floating.drop": "Droup 04",
    "home.floating.strong": "Struktur qatlar, neytral palitra, premium hiss.",

    "home.brandDirection.label": "Brendin istiqaməti",
    "home.brandDirection.h2": "Daha təmiz dizayn. Məhsula fokus.",
    "home.brandDirection.p":
      "Böyük vizuallar, daha yumşaq rənglər və daha çox nəfəs alma — saytı peşəkar fashion mağazaya yaxın hiss etdirir.",

    "home.story.editorial.title": "Redaksion stil",
    "home.story.editorial.subtitle":
      "Daha təmiz brend identikliyi üçün premium vizuallar.",
    "home.story.fit.title": "Bədəndə oturuş",
    "home.story.fit.subtitle":
      "Məhsullar peşəkar fashion mağazası kimi təqdim edilir.",
    "home.story.mood.title": "Küçə ruhu",
    "home.story.mood.subtitle":
      "Daha sakit və daha premium layout ilə kampaniya enerjisi.",

    "home.why.label": "Niyə daha yaxşı hiss olunur",
    "home.why.h3": "Əsas səhifələrdə peşəkar cilalama",
    "home.why.p":
      "Əsas ekran, hesab axını, naviqasiya və footer indi daha məqsədli görünür və daha çox etibar yaradır.",

    "home.upgrades.label": "Mağaza yeniləmələri",
    "home.upgrades.h4": "Qeydiyyat artıq real sayt kimi davranır.",
    "home.upgrades.tagLine":
      "İstifadəçilər qeydiyyatdan keçə, daxil ola, autentifikasiya altında qala və naviqasiyada hesab vəziyyətini görə bilirlər.",
    "home.upgrades.included.strong": "Bu yenilənməyə daxildir",
    "home.upgrades.included.li1": "Qeydiyyat və giriş üçün backend API",
    "home.upgrades.included.li2": "Şifrə heşləmə və JWT token yaradılması",
    "home.upgrades.included.li3": "Fidbekli, cilalanmış auth formaları",
    "home.upgrades.included.li4": "Sayt üçün daha təmiz premium vizual identiklik",

    "home.ready.label": "İnkişafa hazır",
    "home.ready.h5": "Yeni səviyyəli vitrin bazası hazırdır.",
    "home.ready.p":
      "İndi daha təmiz bazanın üstündə məhsul API inteqrasiyası, istifadəçi profilləri və real checkout prosesini davam etdirə bilərsiniz.",
    "home.exploreProducts": "Məhsulları araşdırın",

    "home.mini.alt1": "Portret",
    "home.mini.alt2": "Aksesuarlar",
    "home.mini.alt3": "Məhsul şəkli",

    "shop.h1": "Mağaza",

    "cart.h1": "Sizin səbətiniz",
    "cart.empty": "Seçdiyiniz məhsullar burada görünəcək.",
    "cart.total": "Cəm: {total}",
    "cart.remove": "Sil",
    "cart.goCheckout": "Ödənişə keç",

    "product.addToCart": "Səbətə əlavə et",
    "product.wishlist.toggle": "İstək siyahısını dəyiş",
    "product.wishlist.in": "♥ İstək siyahısında",
    "product.wishlist.out": "♡ İstək siyahısında yoxdur",

    "product.size.label": "Ölçü",
    "product.size.selected": "Seçilən: {size}",
    "product.size.closest":
      "Ölçü {requested} mövcud deyil. Ən yaxın ölçü seçildi: {closest}.",

    "wishlist.h1": "İstək siyahısı",
    "wishlist.empty": "Saxladığınız sevimli məhsullar.",
    "wishlist.open": "Aç",
    "wishlist.addToCart": "Səbətə əlavə et",
    "wishlist.remove": "Sil",

    "checkout.h1": "Ödəniş",
    "checkout.total": "Cəm: {total}",
    "checkout.fullName": "Ad və Soyad",
    "checkout.address": "Ünvan",
    "checkout.phone": "Telefon nömrəsi",
    "checkout.payNow": "İndi ödə",
    "checkout.error.fillAll": "Zəhmət olmasa bütün sahələri doldurun.",
    "checkout.error.cartEmpty": "Səbətiniz boşdur.",
    "checkout.success": "Ödəniş uğurla başa çatdı. Sifarişiniz üçün təşəkkür edirik!",

    "login.memberAccess": "Üzv girişi",
    "login.h1": "RAF hesabınıza daxil olun.",
    "login.p":
      "Sifarişləri izləyin, istək siyahınızı sinxron saxlayın və premium mağaza kimi checkout edin.",
    "login.benefit.fast.strong": "Sürətli checkout",
    "login.benefit.fast.text": "Profil məlumatlarınız növbəti sifariş üçün hazır qalır.",
    "login.benefit.saved.strong": "Saxlanmış favorilər",
    "login.benefit.saved.text": "Almaq istədiyiniz məhsulları bir yerdə saxlayın.",
    "login.benefit.secure.strong": "Təhlükəsiz giriş",
    "login.benefit.secure.text":
      "Giriş indi yoxlamalarla backend API üzərindən işləyir.",
    "login.card.welcome": "Xoş gəldiniz",
    "login.card.p":
      "Daha təmiz və peşəkar hesab axını ilə alış-verişə davam etmək üçün məlumatlarınızı daxil edin.",
    "login.email": "Email",
    "login.password": "Şifrə",
    "login.placeholder.email": "name@email.com",
    "login.placeholder.password": "Şifrənizi daxil edin",
    "login.error.noAccount": "Hələ hesabınız yoxdur? Buradan yaradın",
    "login.error.missingFields": "Zəhmət olmasa email və şifrəni daxil edin.",
    "login.success.signedIn": "Uğurla daxil oldunuz. Ana səhifəyə yönləndirilir...",
    "login.meta.noAccountPrefix": "Hələ hesabınız yoxdur?",
    "login.meta.linkText": "Buradan daxil olun",
    "login.button.signIn": "Daxil olun",
    "login.button.signingIn": "Daxil olunur...",

    "register.newMember": "Yeni üzv",
    "register.h1": "Premium hiss yaradan bir hesab yaradın.",
    "register.p":
      "Müasir ecommerce saytındakı kimi qeydiyyat: aydın yoxlama, təhlükəsiz autentifikasiya və daha təmiz vizual təcrübə.",
    "register.benefit.personal.strong": "Şəxsi hesab",
    "register.benefit.personal.text": "Girişiniz aktiv qalır və alış-veriş axını hamar olur.",
    "register.benefit.wishlist.strong": "İstək siyahısı hazırdır",
    "register.benefit.wishlist.text": "Sonra almaq istədiyiniz məhsulları saxlayın.",
    "register.benefit.better.strong": "Daha yaxşı təcrübə",
    "register.benefit.better.text":
      "Formalar indi yalnız local state deyil, real backend ilə işləyir.",
    "register.card.title": "Hesabınızı yaradın",
    "register.card.p":
      "Sadə, amma cilalanmış qeydiyyat forması və təhlükəsiz session storage ilə mağazaya qoşulun.",
    "register.fullName": "Ad və Soyad",
    "register.email": "Email",
    "register.password": "Şifrə",
    "register.placeholder.fullName": "Tam adınız",
    "register.placeholder.email": "name@email.com",
    "register.placeholder.password": "Minimum 6 simvol",
    "register.error.fillAll": "Zəhmət olmasa bütün sahələri doldurun.",
    "register.error.passwordTooShort": "Şifrə minimum 6 simvol olmalıdır.",
    "register.success": "Hesab uğurla yaradıldı. Yönləndirilir...",
    "register.button.create": "Hesab yaradın",
    "register.button.creating": "Hesab yaradılır...",
    "register.meta.already": "Artıq qeydiyyatdan keçmisiniz? Buradan daxil olun",
    "register.meta.linkText": "Buradan daxil olun",

    "side.theme": "Tema",
    "side.theme.dark": "Tünd",
    "side.theme.light": "Açıq",
    "side.lang": "Dil",
    "side.lang.en": "EN",
    "side.lang.ru": "RU",
    "side.lang.az": "AZ",
  },
};

function fillTemplate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
}

export function UiProvider({ children }) {
  const [theme, setTheme] = useState(() => readStorage(THEME_KEY, "light"));
  const [language, setLanguage] = useState(() => readStorage(LANG_KEY, "en"));

  useEffect(() => {
    const next = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    writeStorage(THEME_KEY, next);
  }, [theme]);

  useEffect(() => {
    const next = language === "ru" ? "ru" : language === "az" ? "az" : "en";
    document.documentElement.lang = next;
    writeStorage(LANG_KEY, next);
  }, [language]);

  const value = useMemo(() => {
    const t = (key, vars) => {
      const str = dictionary[language]?.[key] ?? dictionary.en[key] ?? key;
      return fillTemplate(str, vars);
    };

    return { theme, setTheme, language, setLanguage, t };
  }, [theme, language]);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used within UiProvider");
  return ctx;
}

