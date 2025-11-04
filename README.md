# Ai-latex-report-generator
AI-powered application to generate professional LaTeX reports with custom formatting, cover pages, and styles. The app uses Google's Gemini API to create high-quality LaTeX documents based on user input.

**Created by [m0hamedabed](https://github.com/m0hamedabed)**

## ✨ Features

- 🤖 **AI-Powered Generation**: Create professional LaTeX reports with a single topic
- 🎨 **Multiple Style Options**: Choose from Modern, Classic, Minimalist, or Academic styles
- 📄 **Customizable Cover Pages**: Select from Standard, Formal Report, or Full Page formats
- 🌐 **Multi-Language Support**: Available in both English and Arabic
- 💻 **Built-in LaTeX Generation**: Complete LaTeX code generation with custom formatting
- 📁 **PDF Compilation**: Option to download as PDF or raw .tex file
- 📱 **Responsive Design**: Works seamlessly across all device sizes
- ⚡ **Lightning Fast**: Optimized React application with Vite bundler

## 🚀 Live Demo

Try the application: [AI Studio App](https://ai.studio/apps/drive/17lhZwnC8PE4Bed04VXIxUTxVet88hBqI)

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [Google Gemini API key](https://ai.google.dev/)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/m0hamedabed/ai-latex-report-maker.git
   cd ai-latex-report-maker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## ⚙️ Configuration

1. Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```

2. Add your Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

3. **Important Security Note**: The `.env.local` file is included in `.gitignore` and will not be committed to the repository, protecting your API key.

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Mode
1. Build the application:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## 📦 Deployment Options

### GitHub Pages
1. Build the application:
   ```bash
   npm run build
   ```

2. Push to GitHub and enable GitHub Pages in your repository settings

3. GitHub Actions workflow will automatically deploy updates when you push to main

### Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

### Netlify
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy via Netlify CLI or drag-and-drop the `dist` folder to the Netlify dashboard.

### Other Platforms
The application can be deployed to any static hosting service:
- Firebase Hosting
- AWS Amplify
- Heroku (with buildpack)
- DigitalOcean App Platform

## 🔑 Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)

## 📁 Project Structure

```
ai-latex-report-maker/
├── components/          # React UI components
├── contexts/            # React context providers
├── services/            # API and utility services
├── public/              # Static assets
├── .env.local          # Environment variables (private)
├── .gitignore          # Git ignore rules
├── App.tsx             # Main application component
├── README.md           # This file
├── package.json        # Project dependencies and scripts
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

## 📜 Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write clear commit messages
- Document new features
- Ensure tests pass before submitting

## 🔐 Security

- API keys are stored in environment variables and never committed to the repository
- Input validation and sanitization implemented where appropriate
- The `.env` and `.env.local` files are properly ignored by git
- Secure handling of user data and API communications

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues & Support

If you encounter any issues or have feature requests:

1. Check the [Issues](https://github.com/m0hamedabed/ai-latex-report-maker/issues) page
2. If your issue doesn't already exist, create a [new issue](https://github.com/m0hamedabed/ai-latex-report-maker/issues/new)
3. For quick questions, feel free to reach out via GitHub

## 🙏 Acknowledgements

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Powered by [Google's Gemini API](https://ai.google.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)

## 📞 Contact

Created by **m0hamedabed** - feel free to reach out!

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

</div>
