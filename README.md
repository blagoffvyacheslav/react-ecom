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
npm install

# Start the development server
npm run dev
vite dev

# Build the project
npm run build

# Run ESLint
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
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

📆 **Install Prettier as a dev dependency:**

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

📆 Project is currently under development.

