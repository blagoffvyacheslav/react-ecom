# 🏍 ECommerce

🎨 A user interface for an online store based on the [Figma design](https://www.figma.com/design/V105wd67bkF2X7oOzCLPEG/E-commerce).  
The app includes a product showcase, shopping cart, and user interaction functionality.

🚀 [![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://blagoffvyacheslav.github.io/react-ecom)

---

## ✨ Tech Stack

- **React**
- **TypeScript**
- **MobX** — state management
- **React Router** — routing
- **Webpack** — build tool
- **Prettier & ESLint** — code formatting and linting

---

## 🛠 Getting Started

```bash
# Install dependencies
yarn

# Start the development server
yarn dev

# Build the project
yarn build

# Run ESLint
yarn lint

# Auto-fix ESLint issues
yarn lint:fix

# Format code with Prettier
yarn format
```

---

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
  "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"
}
```

---

## 🚀 Deployment

To deploy the project to GitHub Pages:

```bash
yarn deploy
```

Make sure `homepage` in your `package.json` is correctly set:

```json
"homepage": "https://blagoffvyacheslav.github.io/react-ecom"
```

In your `index.html`, use relative paths, like:

```html
<link rel="stylesheet" href="./styles/styles.css" />
```

---

## 📌 Status

✅ **Project is completed.**  
🧩 Responsive design and new features will be added in future updates.
