<img width="1415" height="989" alt="image" src="https://github.com/user-attachments/assets/e802d8b0-a30b-42fd-a701-e1833f7f0c13" />

# TravelTrucks

An application for finding and booking campers, built according to the provided Figma design.

<img width="1064" height="972" alt="image" src="https://github.com/user-attachments/assets/1f338025-9116-4505-8ab6-308089acf140" />

## Tech Stack

- Next.js, TypeScript, App Router.
- TanStack Query: `useInfiniteQuery` for the catalog, `useQuery` for filters and reviews, and `useMutation` for bookings.
- CSS Modules, locally hosted Inter fonts, React Icons.
- Swiper: main image, synchronized thumbnails, swipe gestures, and keyboard navigation.

## Getting Started

```
bashnpm cicp .env.example .env.localnpm run dev
```

Open [http://localhost:3000](http://localhost:3000/).

```
bashnpm run typechecknpm run lintnpm run test:apinpm run buildnpm start
```

## Routes

- `/`: home page with a View Now button.
- `/catalog/`: catalog with server-side filters and Load more.
- `/catalog/[camperId]/`: camper details, gallery, reviews, and booking form. Show more opens a new tab with `rel="noopener noreferrer"`.

## API

Documentation: [https://campers-api.goit.study/docs](https://campers-api.goit.study/docs).

- `GET /campers?page=1&perPage=4`: exactly four cards per page.
- `location`, `form`, `engine`, `transmission`: query parameters for server-side filtering.
- `GET /campers/filters`: available filter options.
- `GET /campers/{camperId}`: camper details.
- `GET /campers/{camperId}/reviews`: reviews.
- `POST /campers/{camperId}/booking-requests`: JSON `{ "name": "...", "email": "..." }`.

Filters are applied by clicking Search. Each filter combination has its own query key, so Load more always uses the active filters. Clear filters resets both the fields and the query at the same time. Catalog requests are canceled using AbortSignal.

The form validates the name and email, prevents duplicate submissions while a request is in progress, displays backend errors, and shows a success message only after a successful API response. Date and comment fields have not been added because they are not included in the current BookingRequestDto schema or the design.

Design source: [https://www.figma.com/design/w2oTVpJtDVJIU6J7wVNrsa/Campers--Copy-](https://www.figma.com/design/w2oTVpJtDVJIU6J7wVNrsa/Campers--Copy-).

## Deployment to Vercel

1. Push the project to GitHub.
2. In Vercel, select Add New → Project and import the repository.
3. Set Framework Preset to Next.js and Build Command to `npm run build`.
4. Do not set an Output Directory or enable `PREVIEW_EXPORT`.
5. If needed, set `NEXT_PUBLIC_API_URL=https://campers-api.goit.study`.
6. Click Deploy.

The standard build supports dynamic pages for all campers. A separate mode, `PREVIEW_EXPORT=true npm run build`, is used for the static Computer preview. It generates pages for the campers available at build time in `.next-preview/`.

Deployment to your own Vercel account has not yet been completed: the connection request was closed. The Computer preview does not fulfill this deployment requirement.

## Additional Features

Responsive layout, accessible labels for fields and buttons, a skip link, visible focus indicators, screen reader announcements, and states for loading, no search results, errors, and 404 pages. No simulated bookings or local substitutes for the API.

The test matrix and actual results are provided in `QA.md`.

# TravelTrucks UA 

Застосунок для пошуку й бронювання кемперів, реалізований за наданим макетом Figma.

## Стек

- Next.js, TypeScript, App Router.
- TanStack Query: `useInfiniteQuery` для каталогу, `useQuery` для фільтрів і відгуків, `useMutation` для бронювання.
- CSS Modules, локальні шрифти Inter, React Icons.
- Swiper: головне фото, синхронізовані мініатюри, свайпи та керування клавіатурою.

## Запуск

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Відкрити [http://localhost:3000](http://localhost:3000/).

```bash
npm run typecheck
npm run lint
npm run test:api
npm run build
npm start
```

## Маршрути

- `/`: домашня сторінка з кнопкою View Now.
- `/catalog/`: каталог із серверними фільтрами та Load more.
- `/catalog/[camperId]/`: деталі, галерея, відгуки та форма бронювання. Show more відкриває нову вкладку з `rel="noopener noreferrer"`.

## API

Документація: [https://campers-api.goit.study/docs](https://campers-api.goit.study/docs).

- `GET /campers?page=1&perPage=4`: рівно чотири картки на сторінку.
- `location`, `form`, `engine`, `transmission`: query-параметри серверної фільтрації.
- `GET /campers/filters`: доступні варіанти фільтрів.
- `GET /campers/{camperId}`: деталі.
- `GET /campers/{camperId}/reviews`: відгуки.
- `POST /campers/{camperId}/booking-requests`: JSON `{ "name": "...", "email": "..." }`.

Фільтри застосовуються кнопкою Search. Кожна комбінація фільтрів має окремий query key, тому Load more завжди працює з активними фільтрами. Clear filters одночасно скидає поля та запит. Запити каталогу скасовуються через AbortSignal.

Форма перевіряє ім’я та email, блокує повторну відправку під час запиту, показує помилку бекенду й повідомлення про успіх тільки після успішної відповіді API. Дату та коментар не додано: їх немає в поточній схемі BookingRequestDto та в макеті.

Джерело дизайну: [https://www.figma.com/design/w2oTVpJtDVJIU6J7wVNrsa/Campers--Copy-](https://www.figma.com/design/w2oTVpJtDVJIU6J7wVNrsa/Campers--Copy-).

## Деплой на Vercel

1. Завантажити проєкт до GitHub.
2. У Vercel вибрати Add New → Project та імпортувати репозиторій.
3. Framework Preset: Next.js, Build Command: `npm run build`.
4. Не задавати Output Directory та не вмикати PREVIEW_EXPORT.
5. За потреби задати `NEXT_PUBLIC_API_URL=https://campers-api.goit.study`.
6. Натиснути Deploy.

Звичайний build підтримує динамічні сторінки всіх кемперів. Для статичного Computer-предперегляду використовується окремий режим `PREVIEW_EXPORT=true npm run build`, який генерує сторінки наявних кемперів на момент збірки в `.next-preview/`.

Деплой у власний Vercel-акаунт ще не виконано: запит підключення було закрито. Computer-предперегляд не є заміною цього пункту вимог.

## Додатково

Адаптивна версія, доступні назви полів і кнопок, skip link, видимий focus, повідомлення для скринрідерів, стани завантаження, порожнього пошуку, помилок і 404. Жодних фіктивних бронювань чи локальної підміни API.
