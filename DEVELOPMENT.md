# CodeCraft - VS Code Development Setup

## 🚀 Quick Start in VS Code

### 1. **Open Project**
```bash
# Clone and open
git clone https://github.com/yourusername/codecraft.git
cd codecraft
code .

# Or open the workspace file
code codecraft.code-workspace
```

### 2. **Install Recommended Extensions**
When you open the project, VS Code will prompt you to install recommended extensions. Click "Install All" or install manually:

- **Tailwind CSS IntelliSense** - Auto-completion for Tailwind classes
- **Prettier** - Code formatting
- **Live Server** - Live reload development server
- **Auto Rename Tag** - Automatically rename paired HTML tags
- **Path Intellisense** - File path auto-completion

### 3. **Start Development Server**

#### Option A: Live Server Extension (Recommended)
1. Right-click on `index.html`
2. Select "Open with Live Server"
3. Your browser will open at `http://127.0.0.1:5500`

#### Option B: VS Code Tasks
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Tasks: Run Task"
3. Select "Start Local Server" or "Start Node Server"

#### Option C: Terminal
```bash
# Python server
python -m http.server 8080

# Node.js serve (install first: npm install -g serve)
npx serve . -p 8080
```

## 🛠️ VS Code Features for CodeCraft

### **IntelliSense & Auto-completion**
- **Tailwind CSS**: Get class suggestions as you type
- **HTML**: Tag and attribute completion
- **JavaScript**: Function and variable suggestions
- **CSS**: Property and value completion

### **Keyboard Shortcuts**
- `Ctrl+Shift+P`: Command Palette
- `Ctrl+`` `: Toggle Terminal
- `Ctrl+Shift+E`: Explorer
- `Ctrl+Shift+F`: Global Search
- `Ctrl+/`: Toggle Line Comment
- `Alt+Shift+F`: Format Document
- `F5`: Start Debugging

### **Debugging**
1. Set breakpoints in your JavaScript files
2. Press `F5` or go to Run and Debug view
3. Select "Launch CodeCraft in Chrome"
4. Debug your code with browser dev tools integration

### **Tasks & Commands**

#### Available Tasks (`Ctrl+Shift+P` → "Tasks: Run Task"):
- **Start Local Server**: Python HTTP server on port 8080
- **Start Node Server**: Node.js serve on port 8080
- **Format All Files**: Format HTML, CSS, and JS files
- **Open in Browser**: Launch with Live Server

#### Custom Snippets
Press `Ctrl+Shift+P` → "Preferences: Configure User Snippets" to add custom snippets.

## 📁 File Organization in VS Code

### **Explorer View**
```
codecraft/
├── .vscode/                 # VS Code configuration
│   ├── extensions.json      # Recommended extensions
│   ├── settings.json        # Workspace settings
│   ├── tasks.json          # Build tasks
│   └── launch.json         # Debug configuration
├── index.html              # Main HTML file
├── styles.css              # Custom styles
├── script.js               # Main JavaScript
├── auth.js                 # Authentication system
├── .prettierrc             # Code formatting rules
├── README.md               # Project documentation
└── DEVELOPMENT.md          # This file
```

### **Recommended VS Code Layout**
1. **Left**: Explorer view for file navigation
2. **Center**: Main editor
3. **Bottom**: Integrated terminal
4. **Right**: Extensions/Git/Debug panels

## 🎨 Customizing Your Development Environment

### **Theme Recommendations**
- **Dark Themes**: Default Dark Modern, One Dark Pro, Dracula
- **Light Themes**: Default Light Modern, GitHub Light
- **CodeCraft Colors**: Consider themes with green/blue accents

### **Font Recommendations**
- **JetBrains Mono** (recommended for this project)
- **Fira Code**
- **Cascadia Code**
- **Source Code Pro**

### **Useful Extensions Beyond the Defaults**
```json
{
  "recommendations": [
    "aaron-bond.better-comments",
    "ms-vscode.vscode-json",
    "bradlc.vscode-tailwindcss",
    "formulahendry.code-runner",
    "ms-vscode.live-server",
    "gruntfuggly.todo-tree",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

## 🔧 Development Workflow

### **Daily Development**
1. **Open VS Code** with the workspace file
2. **Start Live Server** for auto-reload
3. **Edit files** with full IntelliSense support
4. **Format on Save** keeps code clean
5. **Use integrated terminal** for git commands

### **Code Formatting**
- **Auto-format on save** (enabled by default)
- **Manual format**: `Alt+Shift+F`
- **Format selection**: `Ctrl+K, Ctrl+F`

### **Version Control**
- **Source Control view**: `Ctrl+Shift+G`
- **Stage changes**: Click '+' next to files
- **Commit**: `Ctrl+Enter` in commit message box
- **Sync**: Click sync button in status bar

### **Debugging JavaScript**
1. **Set breakpoints**: Click left of line numbers
2. **Start debugging**: `F5`
3. **Step through code**: `F10` (over), `F11` (into)
4. **Watch variables**: Add to Watch panel

## 🚀 Building and Deployment

### **Local Testing**
```bash
# Quick test
python -m http.server 8080

# Or with Live Server extension
Right-click index.html → "Open with Live Server"
```

### **Production Build**
```bash
# Format all files
npx prettier --write *.html *.css *.js

# Validate HTML
npx html-validate *.html

# Minify CSS (optional)
npx cssnano styles.css styles.min.css
```

### **Deployment from VS Code**
1. **Install extension**: "Azure App Service" or "Netlify"
2. **Right-click project folder**
3. **Select deploy option**
4. **Follow extension prompts**

## 🐛 Troubleshooting

### **Common Issues**

#### Live Server not working:
- Check if port 5500 is available
- Try different port in extension settings
- Restart VS Code

#### Tailwind suggestions not appearing:
- Install "Tailwind CSS IntelliSense" extension
- Check workspace settings for Tailwind configuration
- Restart extension: `Ctrl+Shift+P` → "Developer: Reload Window"

#### JavaScript debugging not working:
- Ensure Chrome debugging extension is installed
- Check launch.json configuration
- Verify source maps are enabled

### **Performance Tips**
- **Exclude large folders** from search (already configured)
- **Use workspace instead of folder** for better performance
- **Disable unused extensions** in workspace
- **Enable auto-save** for convenience

## 📚 Learning Resources

### **VS Code Documentation**
- [VS Code Basics](https://code.visualstudio.com/docs)
- [Debugging Guide](https://code.visualstudio.com/docs/editor/debugging)
- [Tasks Documentation](https://code.visualstudio.com/docs/editor/tasks)

### **Extension Documentation**
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 🎯 Next Steps

1. **Explore the codebase** using VS Code's navigation features
2. **Try the debugging tools** with breakpoints
3. **Customize your workspace** with themes and extensions
4. **Set up version control** with Git integration
5. **Deploy your project** using VS Code extensions

Happy coding! 🚀