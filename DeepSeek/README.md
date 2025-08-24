# CypherX - AI Chatbot Application

CypherX is a professional DeepSeek AI-powered chatbot application built with React and TypeScript. It features a sleek dark theme with black and green color palette, designed for a premium user experience.

## 🚀 Features

- **Professional Login System**: Secure authentication with comprehensive form validation
- **Dark Theme UI**: Modern black and green color scheme for professional appearance
- **Form Validation**: Real-time JavaScript validation for username and password fields
- **Responsive Design**: Mobile-friendly interface that works across all devices
- **TypeScript Support**: Full type safety and better development experience
- **Modern React**: Built with React 18+ and functional components with hooks

## 🎨 Design Philosophy

- **Color Palette**:
  - Primary: Black (#000000)
  - Secondary: Bright Green (#00ff00)
  - Accent: Dark Gray (#1a1a1a)
  - Text: White (#ffffff)

## 📋 Current Implementation

### ✅ Completed Features

- Login page with username and password fields
- Complete form validation with error messages
- Password visibility toggle
- Forgot password button (placeholder)
- Professional dark theme styling
- Responsive design for mobile and desktop
- Loading states and animations

### 🔄 Coming Next

- Main chatbot interface
- DeepSeek AI integration
- Message history functionality
- User preferences and settings
- Advanced chat features

## 🛠️ Technical Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with CSS Variables
- **Validation**: Custom JavaScript validation utilities
- **Development**: Hot Module Replacement (HMR) with Vite

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd deepseek
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🔐 Login Validation Rules

The login form includes comprehensive validation:

### Username Requirements:

- Minimum 3 characters
- Maximum 20 characters
- Only alphanumeric characters, underscores, and hyphens allowed
- Cannot be empty

### Password Requirements:

- Minimum 8 characters
- Maximum 128 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter
- Must contain at least one number
- Must contain at least one special character

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (up to 767px)

## 🎯 Project Structure

```
src/
├── components/
│   └── Auth/
│       ├── Login.tsx
│       └── Login.css
├── utils/
│   └── validation.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## 🔮 Future Enhancements

- DeepSeek AI API integration
- Real-time chat functionality
- Message threading and history
- User authentication backend
- Advanced chat features (file uploads, voice messages)
- Admin dashboard
- Mobile app development

## 📄 License

This project is part of a personal AI chatbot development initiative.

---

**CypherX** - Bringing the future of AI conversation to your fingertips.
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
