# Contributing to Apna Vyapar 🇮🇳

First off, thank you for considering contributing to Apna Vyapar! We welcome contributions from everyone—whether you're a developer, designer, or business enthusiast.

Our goal is to build the most comprehensive, easy-to-use, and intelligent platform for first-time Indian entrepreneurs. 

## 🛠️ How to Contribute

### 1. Adding New Business Ideas
We are always looking to expand our catalog of curated business ideas tailored for the Indian market.
- Ideas are stored in our Supabase `business_ideas` table.
- To suggest an idea, please open an Issue with the tag `new-idea`. 
- Include the following details: Title, Description, Estimated Budget, Complexity, and Target Location (State/City).

### 2. Improving the Codebase
If you're a developer and want to contribute code:

1. **Fork & Clone:** Fork the repository and clone it to your local machine.
2. **Branching:** Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature-name` or `bugfix/issue-description`).
3. **Local Setup:** Follow the **For Developers** section in the `README.md` to set up your local `.env.local` and run the development server.
4. **Coding Standards:** 
   - We use **Next.js 14 App Router** and **TypeScript**. Please ensure your code is strictly typed.
   - For styling, we use **Tailwind CSS**. Follow the existing "Project Aethereal" glassmorphism aesthetic (dark backgrounds, neon teal/amber accents, `backdrop-blur`).
   - Use `framer-motion` for animations, keeping them subtle and purposeful.
5. **Commit Messages:** Write clear, concise commit messages.
6. **Pull Request:** Open a Pull Request against the `main` branch. Provide a detailed description of your changes and attach screenshots if you modified the UI.

### 3. Translation & Localization
Apna Vyapar supports English and Hindi. If you notice translation errors or want to help add a new regional language (like Marathi, Tamil, or Bengali):
- Look at the `locales/` directory (`en.json`, `hi.json`).
- Open a PR with the corrected or new translation strings.

### 4. Reporting Bugs & Requesting Features
If you find a bug or have a feature request, please open a GitHub Issue. 
- **Bugs:** Include steps to reproduce, expected behavior, and screenshots.
- **Features:** Explain why the feature would be useful for Indian entrepreneurs.

## 🤝 Code of Conduct
Please be respectful and constructive in all interactions. We are building a welcoming community for everyone.

Happy building! 🚀
