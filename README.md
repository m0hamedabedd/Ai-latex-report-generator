<div align="center">
  <img width="1200" height="475" alt="AI LaTeX Report Maker Banner" src="https://i.postimg.cc/TP4bmjXP/Screenshot-2025-11-07-095822.png" />
  
  # AI LaTeX Report Maker

  [![Netlify Deploy](https://img.shields.io/badge/Netlify-Deploy-green?logo=netlify&logoColor=white)](https://dapper-squirrel-0020a6.netlify.app)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

</div>

<div align="center">

**AI-Powered LaTeX Report Generation Made Simple**

Transform your ideas into professional LaTeX reports with AI assistance.

</div>

---

## 🌟 Overview

AI LaTeX Report Maker is an innovative web application that leverages Google's Gemini AI to automatically generate professional LaTeX reports. Simply provide a topic or concept, and the AI creates a structured LaTeX document with customizable formatting, cover pages, and styles.

### ✨ Key Features
- 🤖 **AI-Powered Generation**: Create professional LaTeX reports with a single topic
- 🎨 **Multiple Style Options**: Choose from Modern, Classic, Minimalist, or Academic styles
- 📄 **Customizable Cover Pages**: Select from Standard, Formal Report, or Full Page formats
- 🌐 **Multi-Language Support**: Available in both English and Arabic
- 💻 **Built-in LaTeX Generation**: Complete LaTeX code generation with custom formatting
- 📁 **PDF Compilation**: Option to download as PDF or raw .tex file
- 📱 **Responsive Design**: Works seamlessly across all device sizes
- ⚡ **Lightning Fast**: Optimized React application with Vite bundler

---

## 🚀 Live Demo

Try the application in action:
- [Netlify Deploy - Report Generator](https://dapper-squirrel-0020a6.netlify.app)

---

## 🛠️ Tech Stack

<div align="center">
  
| Technology | Purpose |
|------------|---------|
| [React](https://reactjs.org/) | UI Components & State Management |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety & Development |
| [Vite](https://vitejs.dev/) | Build Tool & Development Server |
| [Tailwind CSS](https://tailwindcss.com/) | Styling & Responsive Design |
| [Google Gemini API](https://ai.google.dev/) | AI-Powered Content Generation |
| [ESM.sh](https://esm.sh/) | CDN for React Dependencies |

</div>

---

## 📋 Prerequisites

Before running this application, make sure you have:

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [Google Gemini API key](https://ai.google.dev/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/m0hamedabedd/Ai-latex-report-generator.git
cd Ai-latex-report-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add your Gemini API key to `.env.local`:

```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

> **Important Security Note**: The `.env.local` file is included in `.gitignore` and will not be committed to the repository, protecting your API key.

### 4. Run the Application

#### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### Production Mode
1. Build the application:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 📦 Deployment

### Netlify
This application is optimized for deployment to Netlify:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy via Netlify CLI:
   ```bash
   npx netlify deploy
   ```

3. Or use drag-and-drop with the `dist` folder in the Netlify dashboard.

### Other Platforms
The application can also be deployed to any static hosting service:
- GitHub Pages
- Vercel
- Firebase Hosting
- AWS Amplify
- Heroku (with buildpack)

---

## 🔧 Configuration

### Environment Variables
- `GEMINI_API_KEY`: Your Google Gemini API key (required)

### Build Configuration
The application uses Vite for building and development. Configuration can be found in `vite.config.ts`.

---

## 🏗️ Project Structure

```
Ai-latex-report-generator/
├── components/          # React UI components
├── contexts/            # React context providers
├── public/              # Static assets
├── .env.local           # Environment variables (private)
├── .gitignore           # Git ignore rules
├── App.tsx              # Main application component
├── README.md            # Project documentation
├── package.json         # Project dependencies and scripts
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm test` - Run tests (if any exist)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Guidelines
- Follow the existing code style
- Write clear, descriptive commit messages
- Document new features and components
- Ensure all changes work across different browsers and devices

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 🔐 Security

- API keys are stored in environment variables and never committed to the repository
- Input validation and sanitization implemented where appropriate
- The `.env` and `.env.local` files are properly ignored by git
- Secure handling of user data and API communications

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🐛 Issues & Support

If you encounter any issues or have feature requests:

1. Check the [Issues](https://github.com/m0hamedabedd/Ai-latex-report-generator/issues) page
2. If your issue doesn't already exist, create a [new issue](https://github.com/m0hamedabedd/Ai-latex-report-generator/issues/new)
3. For quick questions, feel free to reach out via GitHub

### Support Resources
- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: General questions and discussions
- Pull Requests: Code contributions welcome

---

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Powered by [Google's Gemini API](https://ai.google.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)
- Hosted on [Netlify](https://netlify.com/)

This project started as an innovative way to combine AI technology with academic and professional document creation, making LaTeX more accessible to everyone.

---

## 📞 Contact

Created by **m0hamedabed** - feel free to reach out!

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

**Made with 💻 and 🤖 for the AI-empowered future**

</div>
