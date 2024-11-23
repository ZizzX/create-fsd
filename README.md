# create-fsd-structure

CLI инструмент для создания и управления структурой проекта по методологии Feature-Sliced Design (FSD) в React проектах.

## Установка

Глобальная установка:
```bash
npm install -g create-fsd-structure
# или
yarn global add create-fsd-structure
```

Локальная установка:
```bash
npm install create-fsd-structure
# или
yarn add create-fsd-structure
```

## Использование

### Инициализация FSD структуры

Создание базовой FSD структуры в проекте:

```bash
create-fsd init [options]
```

Опции:
- `-f, --force` - принудительное создание, даже если директории существуют
- `-i, --interactive` - интерактивный режим создания

Создаст структуру:
```
src/
├── app/          # Инициализация приложения
├── processes/    # Бизнес-процессы
├── pages/        # Страницы приложения
├── widgets/      # Самостоятельные блоки
├── features/     # Действия пользователя
├── entities/     # Бизнес-сущности
└── shared/       # Переиспользуемый код
    ├── ui/       # UI компоненты
    ├── lib/      # Библиотеки
    ├── api/      # API
    ├── config/   # Конфигурация
    ├── types/    # Типы
    └── constants/# Константы
```

### Создание компонента

```bash
create-fsd component <layer> <name> [options]
```

Аргументы:
- `layer` - слой FSD (entities, features, widgets)
- `name` - имя компонента

Опции:
- `-t, --tests` - создать тесты
- `-s, --stories` - создать Storybook истории

Пример:
```bash
create-fsd component widgets Header --tests --stories
```

### Создание shared компонента

```bash
create-fsd shared <segment> <name> [options]
```

Аргументы:
- `segment` - сегмент shared слоя (ui, lib, api, config, types, constants, helpers)
- `name` - имя компонента или модуля

Опции:
- `-t, --tests` - создать тесты (для ui, lib, api, helpers)
- `-s, --stories` - создать Storybook истории (только для ui)

Примеры:
```bash
# UI компонент
create-fsd shared ui Button --tests --stories

# API модуль
create-fsd shared api users --tests

# Библиотека
create-fsd shared lib hooks --tests

# Типы
create-fsd shared types User

# Константы
create-fsd shared constants routes

# Вспомогательные функции
create-fsd shared helpers formatters --tests
```

Создаст соответствующую структуру:

```
shared/ui/Button/
├── Button.tsx
├── Button.module.css
├── Button.test.tsx
├── Button.stories.tsx
└── index.ts

shared/api/users/
├── users.ts
├── users.test.ts
└── index.ts

shared/lib/hooks/
├── hooks.ts
├── hooks.test.ts
└── index.ts

shared/types/User/
├── User.ts
└── index.ts

shared/constants/routes/
├── routes.ts
└── index.ts

shared/helpers/formatters/
├── formatters.ts
├── formatters.test.ts
└── index.ts
```

### Создание фичи

```bash
create-fsd feature <name> [options]
```

Аргументы:
- `name` - имя фичи

Опции:
- `-t, --tests` - создать тесты
- `-s, --stories` - создать Storybook истории

### Создание сущности

```bash
create-fsd entity <name> [options]
```

Аргументы:
- `name` - имя сущности

Опции:
- `-t, --tests` - создать тесты
- `-s, --stories` - создать Storybook истории

## Структура генерируемых файлов

### Компоненты
- `.tsx` - React компонент
- `.module.css` - CSS модуль
- `.test.tsx` - Тесты (опционально)
- `.stories.tsx` - Storybook истории (опционально)
- `index.ts` - Публичное API

### Shared модули
- UI компоненты: React компоненты с тестами и историями
- API модули: Методы API с тестами
- Библиотеки: Утилиты и хуки с тестами
- Типы: TypeScript интерфейсы и типы
- Константы: Константы проекта
- Helpers: Вспомогательные функции с тестами

### Фичи
- `ui/` - React компоненты
- `model/` - Бизнес-логика (Redux slice, селекторы, типы)
- `api/` - API запросы (RTK Query)
- `index.ts` - Публичное API

### Сущности
- `ui/` - React компоненты
- `model/` - Бизнес-логика и типы
  - `schema.ts` - Схема состояния
  - `selectors.ts` - Селекторы
  - `types.ts` - Типы
- `index.ts` - Публичное API

## Лицензия

MIT
