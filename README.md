# CodeCraft - Professional Online Code Editor

A modern, professional online code editor with AI assistance, multi-language support, and real-time collaboration features.

![CodeCraft Banner](https://via.placeholder.com/1200x400/0F172A/06D6A0?text=CodeCraft+-+Code+Your+Future)

## ✨ Features

### 🎨 Frontend (Static UI)
- **Modern Design**: Dark theme (#0F172A) with glassmorphism effects and neon green-blue accents
- **Responsive Layout**: Mobile-first design using Tailwind CSS utility classes
- **Smooth Animations**: Full-screen animated hero section with SVG waves and floating blobs
- **Professional Navigation**: Sticky frosted-glass header with smooth scrolling
- **Google Fonts**: Poppins and Inter fonts for modern typography
- **Social Integration**: Branded social buttons for LinkedIn, Facebook, Website, and GetUp

### 💻 Functional Code Editor
- **Multi-Language Support**: Python, JavaScript, Java, C++, HTML, CSS
- **Real-time Execution**: Integrated terminal with simulated code execution
- **AI-Powered Assistant**: GitHub Copilot-like code suggestions and explanations
- **Package Management**: Install and manage packages from UI
- **Code History**: Save and load previous coding sessions
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + Enter`: Run code
  - `Ctrl/Cmd + S`: Save to history
  - `Tab`: Smart indentation

### 🔐 User Authentication
- **Secure Login/Signup**: Email/password authentication with validation
- **Session Management**: Persistent login sessions with localStorage
- **OAuth Integration**: Google, Microsoft, and GitHub OAuth (placeholders ready)
- **User Profiles**: Customizable profiles with avatars and bio
- **Password Security**: Strength checker and visibility toggle

### 📊 Real-time Rankings
- **Progress Tracking**: Lines of code, tasks completed, and scoring system
- **Rank System**: Beginner → Intermediate → Advanced → Expert
- **Visual Dashboard**: Progress cards with animated stats

### 🤖 AI Integration
- **Code Analysis**: Simulated AI responses for code explanation and optimization
- **Bug Detection**: AI-powered code review and suggestions
- **API Ready**: Clearly defined section for external AI API integration
- **Customizable Prompts**: Ask specific questions about your code

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codecraft.git
   cd codecraft
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or serve it using a local web server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the application**
   - Open `http://localhost:8000` in your browser
   - Or double-click `index.html` to open directly

## 📁 Project Structure

```
codecraft/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS and animations
├── script.js           # Main JavaScript functionality
├── auth.js             # Authentication system
├── README.md           # Project documentation
└── assets/             # Images and other assets (if any)
```

## 🛠️ Configuration

### AI Integration Setup

To integrate with external AI APIs (OpenAI, Google PaLM, etc.):

1. **Locate the AI integration section** in `script.js`:
   ```javascript
   processAIRequest() {
       // Replace this simulation with actual API calls
       // Example: OpenAI GPT integration
   }
   ```

2. **Add your API configuration**:
   ```javascript
   const AI_CONFIG = {
       apiKey: 'your-api-key-here',
       endpoint: 'https://api.openai.com/v1/chat/completions',
       model: 'gpt-3.5-turbo'
   };
   ```

3. **Implement actual API calls**:
   ```javascript
   async processAIRequest() {
       const prompt = document.getElementById('ai-prompt')?.value;
       const codeEditor = document.getElementById('code-editor');
       
       try {
           const response = await fetch(AI_CONFIG.endpoint, {
               method: 'POST',
               headers: {
                   'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   model: AI_CONFIG.model,
                   messages: [{
                       role: 'user',
                       content: `${prompt}\n\nCode:\n${codeEditor.value}`
                   }]
               })
           });
           
           const data = await response.json();
           // Display AI response
       } catch (error) {
           console.error('AI API Error:', error);
       }
   }
   ```

### OAuth Integration

To enable Google, Microsoft, and GitHub OAuth:

1. **Register your application** with each provider
2. **Update the OAuth methods** in `auth.js`:
   ```javascript
   async signInWithGoogle() {
       // Implement Google OAuth flow
       // Use libraries like google-auth-library
   }
   ```

3. **Add OAuth configuration**:
   ```javascript
   const OAUTH_CONFIG = {
       google: {
           clientId: 'your-google-client-id',
           redirectUri: 'your-redirect-uri'
       },
       github: {
           clientId: 'your-github-client-id',
           scope: 'user:email'
       }
   };
   ```

## 🎯 Usage

### Basic Code Editing
1. Select a programming language from the dropdown
2. Write your code in the editor
3. Click "Run" or press `Ctrl+Enter` to execute
4. View output in the integrated terminal

### AI Assistance
1. Click "AI Assist" button
2. Type your question or request
3. Choose "Analyze Code" or "Explain Code"
4. View AI-generated suggestions

### Package Management
1. Click "Packages" button in the editor header
2. Search for packages in your selected language
3. Click "Install" to add packages
4. View installed packages in the bottom section

### User Authentication
1. Click "Sign Up" to create an account
2. Fill in your details and create a password
3. Sign in with your credentials
4. Access your profile and code history

## 🔧 Customization

### Themes and Colors
Modify the color scheme in `tailwind.config`:
```javascript
colors: {
    primary: '#0F172A',     // Background color
    accent: '#06D6A0',      // Primary accent (green)
    'accent-blue': '#118AB2' // Secondary accent (blue)
}
```

### Adding New Languages
1. Update the language selector in `index.html`
2. Add language template in `script.js`:
   ```javascript
   const templates = {
       newlang: `// Your new language template
   console.log('Hello from new language!');`
   };
   ```
3. Add execution simulation in `simulateCodeExecution()`

### Custom Animations
Add new animations in `styles.css`:
```css
@keyframes yourAnimation {
    from { /* initial state */ }
    to { /* final state */ }
}
```

## 🔒 Security Considerations

- **API Keys**: Never expose API keys in client-side code
- **Authentication**: Implement proper server-side authentication for production
- **Input Validation**: Validate all user inputs on both client and server
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure proper CORS policies for API calls

## 🚀 Deployment

### Static Hosting (Recommended for frontend-only)
- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: Use Firebase CLI

### Full-Stack Deployment
For production with backend integration:
- **AWS**: EC2 + S3 + RDS
- **Google Cloud**: Compute Engine + Cloud Storage
- **Azure**: App Service + Blob Storage
- **DigitalOcean**: Droplets + Spaces

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 Roadmap

- [ ] **Real Code Execution**: Integrate with code execution APIs
- [ ] **Collaboration**: Real-time collaborative editing
- [ ] **File Management**: Project folders and file organization
- [ ] **Git Integration**: Version control system
- [ ] **Plugin System**: Extensible plugin architecture
- [ ] **Themes**: Multiple color themes and customization
- [ ] **Mobile App**: React Native mobile application
- [ ] **Desktop App**: Electron desktop application

## 📞 Support

- **Documentation**: Check this README and code comments
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Email**: contact@codecraft.com (placeholder)

## 🙏 Acknowledgments

- **Tailwind CSS**: For the utility-first CSS framework
- **Font Awesome**: For beautiful icons
- **Google Fonts**: For typography
- **Inspiration**: VS Code, CodePen, and other modern editors

---

**Made with ❤️ by You B Tech | 2025**

*CodeCraft - Where ideas become reality, one line of code at a time.*