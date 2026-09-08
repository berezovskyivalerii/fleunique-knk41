# Fleunique

Frontend проекта **Fleunique**.

## Stack

* React 19
* TypeScript
* Vite
* React Router
* Tailwind CSS 4
* Feature-Sliced Design (FSD)

## Запуск проекта

Установить зависимости:

```bash
npm install
```

Запустить development server:

```bash
npm run dev
```

Проверить TypeScript:

```bash
npx tsc --noEmit
```

Проверить production-сборку:

```bash
npm run build
```

Запустить линтер:

```bash
npm run lint
```

## Архитектура

Проект использует **Feature-Sliced Design (FSD)**.

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

### App

`src/app/` отвечает за глобальную конфигурацию приложения:

* запуск приложения;
* роутинг;
* глобальные стили;
* общие настройки приложения.

### Pages

`src/pages/` содержит полноценные страницы приложения.

```text
pages/
├── home/
├── product/
├── checkout/
├── rating/
└── not-found/
```

Структура страницы:

```text
pages/
└── home/
    ├── route.tsx
    └── ui/
        └── HomePage.tsx
```

`ui/` содержит UI страницы.
`route.tsx` содержит информацию о маршруте страницы.
Пример:

```tsx
import { HomePage } from './ui/HomePage'

export const route = {
  path: '/',
  element: <HomePage />,
}
```

## Автоматический роутинг

Маршруты страниц подключаются автоматически.
Файл `src/app/routes/routes.tsx` использует `import.meta.glob` и автоматически находит все:

```text
src/pages/**/route.tsx
```

Поэтому при создании новой страницы **не нужно изменять центральный роутинг**.
Например:

```text
src/pages/catalog/
├── route.tsx
└── ui/
    └── CatalogPage.tsx
```

`route.tsx`:

```tsx
import { CatalogPage } from './ui/CatalogPage'

export const route = {
  path: '/catalog',
  element: <CatalogPage />,
}
```

После этого маршрут `/catalog` будет автоматически найден приложением.

### Важно

Каждая новая страница должна иметь собственный `route.tsx`.
Центральный файл `src/app/routes/routes.tsx` при добавлении страниц изменять не нужно.

## Widgets

`src/widgets/` содержит крупные самостоятельные блоки интерфейса, объединяющие несколько функций или сущностей.
Примеры:

```text
Header
Footer
ProductList
CheckoutForm
```

В `widgets` не следует помещать обычные маленькие UI-компоненты.

## Features

`src/features/` содержит пользовательские действия и бизнес-сценарии.
Например:

```text
add-to-cart
apply-promo
login
register
add-to-wishlist
rate-product
```

Feature должна описывать действие пользователя, а не просто UI-компонент.

## Entities

`src/entities/` содержит основные бизнес-сущности приложения.
Например:

```text
user
product
order
bouquet
category
```

Здесь находится логика и UI, относящиеся непосредственно к конкретной сущности.

## Shared

`src/shared/` содержит переиспользуемый код, который не относится к конкретной бизнес-сущности.

```text
shared/
├── api/
├── config/
├── lib/
└── ui/
```

### shared/ui

Общие UI-компоненты:

```text
Button
Input
Modal
Loader
```

### shared/api

Общие настройки API и HTTP-клиента.

### shared/lib

Утилиты и вспомогательные функции.

### shared/config

Глобальные настройки приложения.

## Правила зависимостей

В проекте используется направление зависимостей FSD:

```text
app
 ↓
pages
 ↓
widgets
 ↓
features
 ↓
entities
 ↓
shared
```

Верхние слои могут использовать нижние. Нижние слои не должны импортировать код из верхних.

```text
pages → widgets       ✅
widgets → features    ✅
features → entities   ✅
entities → shared     ✅

shared → entities      ❌
entities → features    ❌
features → pages       ❌
```

## Alias

Для импортов из `src` используется alias `@/*`.
Пример:

```tsx
import { ProductPage } from '@/pages/product/ui/ProductPage'
```

Вместо:

```tsx
import { ProductPage } from '../../../pages/product/ui/ProductPage'
```

## Routing

Основной роутер находится здесь:

```text
src/app/routes/index.tsx
```

Конфигурация маршрутов автоматически собирается из:

```text
src/pages/**/route.tsx
```

Текущие маршруты:

| URL                | Страница |
| ------------------ | -------- |
| `/`                | Home     |
| `/product/:id`     | Product  |
| `/checkout`        | Checkout |
| `/rating/:orderId` | Rating   |
| `*`                | 404      |

## Tailwind CSS

Используется **Tailwind CSS 4**.
Основные стили:

```text
src/app/styles/index.css
```

Tailwind подключается через Vite plugin.
Глобальные шрифты и typography tokens также находятся в `index.css`.

## Fonts

Используются шрифты из дизайна:

* Rubik Bubbles
* Montserrat
* PT Sans
  Основные typography tokens определены через Tailwind `@theme`.

## Project structure

```text
src/
├── app/
│   ├── App.tsx
│   ├── routes/
│   │   ├── index.tsx
│   │   └── routes.tsx
│   └── styles/
│       └── index.css
├── pages/
│   ├── home/
│   │   ├── route.tsx
│   │   └── ui/
│   │       └── HomePage.tsx
│   ├── product/
│   ├── checkout/
│   ├── rating/
│   └── not-found/
├── widgets/
├── features/
├── entities/
├── shared/
│   ├── api/
│   ├── config/
│   ├── lib/
│   └── ui/
└── main.tsx
```

## MVP

На текущем этапе архитектура предусматривает:

* Home
* Product
* Checkout
* 404
* Rating
  Авторизация и регистрация должны использовать modal window.

## Дальнейшая функциональность

В дальнейшем планируется добавить:

* категории и фильтры;
* поиск;
* результаты поиска;
* профиль пользователя;
* wishlist;
* collections;
* настройки профиля;
* контактную информацию;
* адрес;
* комментарии;
* отзывы;
* рейтинг букетов;
* административную роль пользователя.

## Makefile

Отдельный `Makefile` не используется.
Для проекта на Windows достаточно npm scripts:

```bash
npm run dev
npm run build
npm run lint
```

## Development rules

Перед созданием новой страницы:

1. Создать папку страницы в `src/pages/`.
2. Создать `ui/`.
3. Создать компонент страницы.
4. Создать `route.tsx`.
5. Указать `path` и `element` в `route.tsx`.
   Центральный роутинг изменять не требуется.
   Перед созданием новой общей сущности или функции необходимо определить, к какому FSD-слою она относится.
   Перед commit рекомендуется проверить:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Проект должен оставаться независимым от конкретных страниц: добавление новой страницы или компонента не должно требовать изменения глобальной конфигурации роутинга.
