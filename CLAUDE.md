# 450·BUD — Cottage Building landing site

Статичний односторінковий сайт (+ підсторінки послуг) будівельної компанії
«450·BUD». Чистий HTML/CSS/JS, без збірки, без бекенду. Хоститься на GitHub Pages.

## Швидкий старт
- **Подивитися локально:** відкрити `index.html` у браузері (або скіл `/preview` для скріншотів).
- **Опублікувати зміни:** скіл `/deploy` (коміт + `git push pages main` + перевірка живого сайту).
- **Додати реальні фото:** скіл `/add-photos`.

## Живий сайт
- URL: **https://possible1770.github.io/450bud.github.io/**
- Деплой: гілка `main` репозиторію `possible1770/450bud.github.io` через GitHub Pages
  (Deploy from a branch → `main` / root). Файл `.nojekyll` вимикає Jekyll.

## Git / деплой
- Remote `pages` → `git@github.com:possible1770/450bud.github.io.git` — **це продакшн**, push сюди оновлює сайт.
- Remote `origin` → `git@github.com:possible1770/450bud.git` — може не існувати; push в нього не обовʼязковий і часто фейлиться. Ігнорувати.
- Автентифікація: SSH-ключ `~/.ssh/id_ed25519_possible1770` (привʼязаний до акаунта possible1770).
  Він уже зашитий у репо через `git config core.sshCommand`, тому звичайний `git push pages main` працює.
  `gh` НЕ залогінений, токенів у середовищі немає — користуватися лише цим SSH-ключем.

## Структура
```
index.html              головна (hero, послуги-bento, процес, роботи, форма)
services/
  budivnytstvo.html     Будівництво під ключ
  rekonstruktsiya.html  Реконструкція та добудова
  ozdoblennya.html      Оздоблення та інтерʼєр
  proekt.html           Проєкт і кошторис
styles.css              ВСІ стилі (один файл на всі сторінки)
app.js                  форма→mailto, анімації появи, рік у футері
logo.jpg                фавікон
.nojekyll               вимикає Jekyll на Pages
```

## Дизайн-система (редизайн «світлий мінімал», 2026)
- **Шрифти:** заголовки — `Bricolage Grotesque` (`--display`); текст — `Manrope` (`--sans`). Підключені з Google Fonts у `<head>` КОЖНОЇ сторінки — при зміні шрифту правити в усіх 5 файлах.
- **Палітра** (CSS-змінні у `:root` в `styles.css`): тепла бумага `--paper`, зелені блоки `--green`/`--green-deep`, оак-акцент `--accent`/`--accent-d`, чорнило `--ink`, крем `--cream`.
- **Логіка кольору:** світлі секції за замовчуванням; `.panel--green` — тёмно-зелені акцентні блоки (процес, контакт, футер).
- **Лейаут:** hero — спліт (текст + медіа); послуги — bento (`.card--feature` на всю ширину + звичайні `.card`); роботи — фото-плитки `.tile`.
- **Анімації:** один оркестрований reveal на скрол + entrance hero (керується класом `body.loaded` в `app.js`). Поважають `prefers-reduced-motion`.

## Фото-плейсхолдери
Поки що зображень немає — використовуються `.media` блоки (зелений градієнт + лайн-арт будинку через CSS).
Щоб поставити реальне фото: всередину `<div class="media">…</div>` вставити `<img src="..." alt="...">`.
Плейсхолдер (іконка/градієнт) автоматично ховається через `.media:has(img)`, фото отримує `object-fit: cover`. Деталі — скіл `/add-photos`.

## Форма
`app.js` збирає поля і відкриває поштовий клієнт відвідувача через `mailto:`.
Бекенду немає. Адреса інбоксу — константа `INBOX` у `app.js` (зараз `hello@450bud.com`, замінити на реальну).

## Контакти / зовнішнє
- Email: hello@450bud.com (тестовий, змінити)
- Instagram: https://www.instagram.com/4.5.0.bud/
