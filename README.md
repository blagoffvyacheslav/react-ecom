# 🏍 ECommerce

🎨 A user interface for an online store based on the [Figma design](https://www.figma.com/design/V105wd67bkF2X7oOzCLPEG/E-commerce). The app includes a product showcase, shopping cart, and user interaction functionality.

## ✨ Tech Stack

- **React**
- **TypeScript**
- **MobX** — state management
- **React Router** — routing
- **Vite** — build tool
- **Prettier & ESLint** — code formatting and linting

## 🛠 Getting Started

```bash
# Install dependencies
yarn

# Start the development server
yarn dev
vite dev

# Build the project
yarn build

# Run ESLint
yarn lint

# Auto-fix ESLint issues
yarn lint:fix

# Format code with Prettier
yarn format
```

## 📀 Prettier Configuration

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

🗖 **Install Prettier as a dev dependency:**

```bash
yarn add --dev prettier
```

**package.json**:

```json
"scripts": {
  "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\""
}
```

---

🗖 Project is currently under development.
