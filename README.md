# 🛍 ECommerce

🎨 Интерфейс интернет-магазина, разработанный на основе макета из [Figma](https://www.figma.com/design/V105wd67bkF2X7oOzCLPEG/E-commerce). Приложение демонстрирует витрину товаров, корзину и функциональность взаимодействия с пользователем.

## 🚀 Стек технологий

- **React**
- **TypeScript**
- **MobX** — управление состоянием
- **React Router** — маршрутизация
- **Vite** — сборка
- **Prettier & ESLint** — стиль и качество кода

## 🛠 Установка и запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
vite dev

# Сборка проекта
npm run build

# Запуск ESLint
npm run lint

# Автофикс линтера
npm run lint:fix

# Форматирование Prettier
npm run format
```

## 📀 Настройка Prettier

📂 **.prettierrc**:

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

📅 **Добавление prettier в зависимости:**

```bash
npm install --save-dev prettier
```

**package.json**:

```json
"scripts": {
  "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\""
}
```

---

📅 Проект в разработке.
