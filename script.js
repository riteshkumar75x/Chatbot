// CodeCraft - Main JavaScript File

class CodeCraft {
    constructor() {
        this.currentLanguage = 'javascript';
        this.codeHistory = [];
        this.packages = [];
        this.isRunning = false;
        this.userStats = {
            linesOfCode: 0,
            tasksCompleted: 0,
            rank: 'Beginner',
            score: 0
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCodeEditor();
        this.loadUserData();
        this.initializeRankingSystem();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Navigation smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        // Language selector
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }

        // Run button
        const runBtn = document.getElementById('run-btn');
        if (runBtn) {
            runBtn.addEventListener('click', () => {
                this.runCode();
            });
        }

        // AI Assist button
        const aiAssistBtn = document.getElementById('ai-assist-btn');
        if (aiAssistBtn) {
            aiAssistBtn.addEventListener('click', () => {
                this.showAIAssistant();
            });
        }

        // Code editor events
        const codeEditor = document.getElementById('code-editor');
        if (codeEditor) {
            codeEditor.addEventListener('input', () => {
                this.onCodeChange();
            });

            codeEditor.addEventListener('keydown', (e) => {
                this.handleKeyboardShortcuts(e);
            });
        }

        // Hero section buttons
        const startCodingBtn = document.querySelector('.px-8.py-4.bg-gradient-to-r');
        if (startCodingBtn) {
            startCodingBtn.addEventListener('click', () => {
                document.getElementById('editor').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }

    setupCodeEditor() {
        const codeEditor = document.getElementById('code-editor');
        if (!codeEditor) return;

        // Set default code based on language
        this.changeLanguage(this.currentLanguage);
        
        // Add line numbers (simplified version)
        this.addLineNumbers();
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        const codeEditor = document.getElementById('code-editor');
        
        if (!codeEditor) return;

        const templates = {
            javascript: `// JavaScript Example
console.log('Hello, World!');

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci sequence:');
for (let i = 0; i < 10; i++) {
    console.log(fibonacci(i));
}`,
            
            python: `# Python Example
print('Hello, World!')

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print('Fibonacci sequence:')
for i in range(10):
    print(fibonacci(i))`,
    
            java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        System.out.println("Fibonacci sequence:");
        for (int i = 0; i < 10; i++) {
            System.out.println(fibonacci(i));
        }
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`,
    
            cpp: `// C++ Example
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << "Hello, World!" << endl;
    
    cout << "Fibonacci sequence:" << endl;
    for (int i = 0; i < 10; i++) {
        cout << fibonacci(i) << endl;
    }
    
    return 0;
}`,
    
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a simple HTML page.</p>
    
    <script>
        console.log('JavaScript is working!');
    </script>
</body>
</html>`,
    
            css: `/* CSS Example */
body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 20px;
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 {
    color: #333;
    text-align: center;
    animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}`
        };

        codeEditor.value = templates[language] || '// Start coding here...';
        this.updateTerminal(`Switched to ${language.toUpperCase()} mode`);
    }

    runCode() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        const runBtn = document.getElementById('run-btn');
        const codeEditor = document.getElementById('code-editor');
        
        if (runBtn) {
            runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Running...</span>';
            runBtn.disabled = true;
        }

        // Simulate code execution
        setTimeout(() => {
            this.simulateCodeExecution(codeEditor.value);
            
            if (runBtn) {
                runBtn.innerHTML = '<i class="fas fa-play"></i> <span>Run</span>';
                runBtn.disabled = false;
            }
            
            this.isRunning = false;
            this.updateUserStats();
        }, 1500);
    }

    simulateCodeExecution(code) {
        const terminal = document.getElementById('terminal-output');
        if (!terminal) return;

        // Clear previous output
        terminal.innerHTML = '';

        // Add execution indicator
        this.addTerminalLine('$ Executing code...', 'text-blue-400');
        
        setTimeout(() => {
            // Simulate output based on language
            switch (this.currentLanguage) {
                case 'javascript':
                    this.addTerminalLine('Hello, World!', 'text-green-400');
                    this.addTerminalLine('Fibonacci sequence:', 'text-green-400');
                    this.addTerminalLine('0\n1\n1\n2\n3\n5\n8\n13\n21\n34', 'text-green-400');
                    break;
                
                case 'python':
                    this.addTerminalLine('Hello, World!', 'text-green-400');
                    this.addTerminalLine('Fibonacci sequence:', 'text-green-400');
                    this.addTerminalLine('0\n1\n1\n2\n3\n5\n8\n13\n21\n34', 'text-green-400');
                    break;
                
                case 'java':
                    this.addTerminalLine('Hello, World!', 'text-green-400');
                    this.addTerminalLine('Fibonacci sequence:', 'text-green-400');
                    this.addTerminalLine('0\n1\n1\n2\n3\n5\n8\n13\n21\n34', 'text-green-400');
                    break;
                
                case 'cpp':
                    this.addTerminalLine('Hello, World!', 'text-green-400');
                    this.addTerminalLine('Fibonacci sequence:', 'text-green-400');
                    this.addTerminalLine('0\n1\n1\n2\n3\n5\n8\n13\n21\n34', 'text-green-400');
                    break;
                
                case 'html':
                    this.addTerminalLine('HTML file rendered successfully', 'text-green-400');
                    this.addTerminalLine('JavaScript is working!', 'text-blue-400');
                    break;
                
                case 'css':
                    this.addTerminalLine('CSS compiled successfully', 'text-green-400');
                    this.addTerminalLine('No syntax errors found', 'text-blue-400');
                    break;
                
                default:
                    this.addTerminalLine('Code executed successfully', 'text-green-400');
            }
            
            this.addTerminalLine('\nExecution completed.', 'text-gray-400');
        }, 500);
    }

    addTerminalLine(text, className = 'text-green-400') {
        const terminal = document.getElementById('terminal-output');
        if (!terminal) return;

        const line = document.createElement('div');
        line.className = className;
        line.textContent = text;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }

    updateTerminal(message) {
        this.addTerminalLine(message, 'text-blue-400');
    }

    onCodeChange() {
        const codeEditor = document.getElementById('code-editor');
        if (!codeEditor) return;

        // Update line count
        const lines = codeEditor.value.split('\n').length;
        this.userStats.linesOfCode = lines;
        
        // Save to history
        this.saveCodeToHistory();
    }

    saveCodeToHistory() {
        const codeEditor = document.getElementById('code-editor');
        if (!codeEditor) return;

        const entry = {
            code: codeEditor.value,
            language: this.currentLanguage,
            timestamp: new Date().toISOString()
        };

        this.codeHistory.push(entry);
        
        // Keep only last 50 entries
        if (this.codeHistory.length > 50) {
            this.codeHistory = this.codeHistory.slice(-50);
        }

        // Save to localStorage
        localStorage.setItem('codecraft_history', JSON.stringify(this.codeHistory));
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            this.runCode();
        }
        
        // Ctrl/Cmd + S to save (prevent default)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            this.saveCodeToHistory();
            this.showNotification('Code saved to history', 'success');
        }
        
        // Tab for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            
            textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 4;
        }
    }

    showAIAssistant() {
        // Create AI Assistant modal
        const modal = this.createModal('AI Code Assistant', this.getAIAssistantContent());
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
        }, 10);
    }

    getAIAssistantContent() {
        return `
            <div class="ai-panel p-6 rounded-lg">
                <div class="mb-6">
                    <h3 class="text-xl font-semibold mb-3 text-white">AI Code Assistant</h3>
                    <p class="text-gray-300 mb-4">Get intelligent code suggestions, bug fixes, and explanations.</p>
                    
                    <div class="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-4">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-exclamation-triangle text-yellow-500"></i>
                            <span class="text-yellow-200 font-medium">API Configuration Required</span>
                        </div>
                        <p class="text-yellow-100 text-sm mt-2">
                            To enable AI assistance, please configure your API key in the settings.
                        </p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-white mb-2">Ask the AI:</label>
                        <textarea 
                            id="ai-prompt" 
                            class="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                            rows="3"
                            placeholder="e.g., 'Explain this code', 'Find bugs', 'Optimize performance', 'Add comments'"
                        ></textarea>
                    </div>
                    
                    <div class="flex space-x-3">
                        <button 
                            onclick="codeCraft.processAIRequest()" 
                            class="flex-1 px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors duration-300"
                        >
                            <i class="fas fa-magic mr-2"></i>
                            Analyze Code
                        </button>
                        <button 
                            onclick="codeCraft.explainCode()" 
                            class="flex-1 px-4 py-2 bg-accent-blue hover:bg-accent-blue/80 text-white rounded-lg transition-colors duration-300"
                        >
                            <i class="fas fa-question-circle mr-2"></i>
                            Explain Code
                        </button>
                    </div>
                </div>
                
                <div id="ai-response" class="mt-6 hidden">
                    <h4 class="text-white font-medium mb-2">AI Response:</h4>
                    <div class="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div id="ai-response-content" class="text-gray-300"></div>
                    </div>
                </div>
            </div>
        `;
    }

    processAIRequest() {
        const prompt = document.getElementById('ai-prompt')?.value;
        if (!prompt) {
            this.showNotification('Please enter a prompt', 'error');
            return;
        }

        // Simulate AI processing
        const responseDiv = document.getElementById('ai-response');
        const contentDiv = document.getElementById('ai-response-content');
        
        if (responseDiv && contentDiv) {
            responseDiv.classList.remove('hidden');
            contentDiv.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
            
            setTimeout(() => {
                contentDiv.innerHTML = `
                    <div class="space-y-3">
                        <p><strong>Analysis:</strong> This is a simulated AI response. In a real implementation, this would connect to an AI service like OpenAI's GPT or Google's PaLM API.</p>
                        <p><strong>Suggestion:</strong> Your code looks good! Consider adding error handling and comments for better maintainability.</p>
                        <p><strong>Optimization:</strong> For better performance, you might want to implement memoization for the fibonacci function.</p>
                    </div>
                `;
            }, 2000);
        }
    }

    explainCode() {
        const codeEditor = document.getElementById('code-editor');
        if (!codeEditor || !codeEditor.value.trim()) {
            this.showNotification('No code to explain', 'error');
            return;
        }

        const responseDiv = document.getElementById('ai-response');
        const contentDiv = document.getElementById('ai-response-content');
        
        if (responseDiv && contentDiv) {
            responseDiv.classList.remove('hidden');
            contentDiv.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Analyzing code...';
            
            setTimeout(() => {
                contentDiv.innerHTML = `
                    <div class="space-y-3">
                        <p><strong>Code Explanation:</strong></p>
                        <ul class="list-disc list-inside space-y-1 text-sm">
                            <li>This code demonstrates a basic ${this.currentLanguage} program</li>
                            <li>It includes a fibonacci function that calculates numbers recursively</li>
                            <li>The main execution prints "Hello, World!" and displays fibonacci sequence</li>
                            <li>Consider using iterative approach for better performance with large numbers</li>
                        </ul>
                        <p class="text-xs text-gray-400 mt-2">
                            Note: This is a simulated explanation. Real AI integration would provide detailed, context-aware analysis.
                        </p>
                    </div>
                `;
            }, 1500);
        }
    }

    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm opacity-0 transition-opacity duration-300';
        
        modal.innerHTML = `
            <div class="bg-primary border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 class="text-2xl font-semibold text-white">${title}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white transition-colors duration-300">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div class="p-0">
                    ${content}
                </div>
            </div>
        `;
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        return modal;
    }

    updateUserStats() {
        this.userStats.tasksCompleted++;
        this.userStats.score += 10;
        
        // Update rank based on score
        if (this.userStats.score >= 1000) {
            this.userStats.rank = 'Expert';
        } else if (this.userStats.score >= 500) {
            this.userStats.rank = 'Advanced';
        } else if (this.userStats.score >= 100) {
            this.userStats.rank = 'Intermediate';
        }
        
        this.saveUserData();
        this.showNotification(`Task completed! Score: ${this.userStats.score}`, 'success');
    }

    initializeRankingSystem() {
        // Create ranking dashboard if it doesn't exist
        this.createRankingDashboard();
    }

    createRankingDashboard() {
        const editorSection = document.getElementById('editor');
        if (!editorSection) return;

        const rankingHTML = `
            <div class="mt-16">
                <h3 class="text-3xl font-poppins font-bold text-center mb-8">Your Progress</h3>
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="ranking-card rounded-xl p-6 text-center">
                        <div class="w-16 h-16 bg-gradient-to-r from-accent to-accent-blue rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-trophy text-white text-2xl"></i>
                        </div>
                        <h4 class="text-xl font-semibold mb-2">Current Rank</h4>
                        <p class="text-2xl font-bold text-accent" id="user-rank">${this.userStats.rank}</p>
                    </div>
                    
                    <div class="ranking-card rounded-xl p-6 text-center">
                        <div class="w-16 h-16 bg-gradient-to-r from-accent to-accent-blue rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-code text-white text-2xl"></i>
                        </div>
                        <h4 class="text-xl font-semibold mb-2">Lines of Code</h4>
                        <p class="text-2xl font-bold text-accent" id="lines-count">${this.userStats.linesOfCode}</p>
                    </div>
                    
                    <div class="ranking-card rounded-xl p-6 text-center">
                        <div class="w-16 h-16 bg-gradient-to-r from-accent to-accent-blue rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-star text-white text-2xl"></i>
                        </div>
                        <h4 class="text-xl font-semibold mb-2">Score</h4>
                        <p class="text-2xl font-bold text-accent" id="user-score">${this.userStats.score}</p>
                    </div>
                </div>
            </div>
        `;

        const container = editorSection.querySelector('.max-w-7xl');
        if (container) {
            container.insertAdjacentHTML('beforeend', rankingHTML);
        }
    }

    addLineNumbers() {
        // Simplified line numbers - in a real implementation, you'd use a proper code editor library
        const codeEditor = document.getElementById('code-editor');
        if (!codeEditor) return;

        // This is a basic implementation - consider using CodeMirror or Monaco Editor for production
        console.log('Line numbers functionality would be implemented with a proper code editor library');
    }

    loadUserData() {
        const saved = localStorage.getItem('codecraft_user');
        if (saved) {
            this.userStats = { ...this.userStats, ...JSON.parse(saved) };
        }

        const history = localStorage.getItem('codecraft_history');
        if (history) {
            this.codeHistory = JSON.parse(history);
        }
    }

    saveUserData() {
        localStorage.setItem('codecraft_user', JSON.stringify(this.userStats));
        
        // Update dashboard
        const rankElement = document.getElementById('user-rank');
        const linesElement = document.getElementById('lines-count');
        const scoreElement = document.getElementById('user-score');
        
        if (rankElement) rankElement.textContent = this.userStats.rank;
        if (linesElement) linesElement.textContent = this.userStats.linesOfCode;
        if (scoreElement) scoreElement.textContent = this.userStats.score;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${type}`;
        
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button onclick="this.closest('.notification').remove()" class="text-white/70 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('translate-x-full');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// Initialize CodeCraft when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.codeCraft = new CodeCraft();
});

// Package Manager functionality
class PackageManager {
    constructor() {
        this.installedPackages = [];
        this.availablePackages = {
            javascript: [
                { name: 'lodash', description: 'Modern JavaScript utility library', version: '4.17.21' },
                { name: 'axios', description: 'Promise based HTTP client', version: '1.6.0' },
                { name: 'moment', description: 'Parse, validate, manipulate dates', version: '2.29.4' }
            ],
            python: [
                { name: 'numpy', description: 'Scientific computing library', version: '1.24.3' },
                { name: 'pandas', description: 'Data manipulation and analysis', version: '2.0.3' },
                { name: 'requests', description: 'HTTP library for Python', version: '2.31.0' }
            ],
            java: [
                { name: 'junit', description: 'Unit testing framework', version: '5.9.3' },
                { name: 'jackson', description: 'JSON processing library', version: '2.15.2' },
                { name: 'spring-boot', description: 'Java application framework', version: '3.1.0' }
            ]
        };
    }

    showPackageManager() {
        const modal = codeCraft.createModal('Package Manager', this.getPackageManagerContent());
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
        }, 10);
    }

    getPackageManagerContent() {
        const currentLanguage = codeCraft.currentLanguage;
        const packages = this.availablePackages[currentLanguage] || [];

        return `
            <div class="p-6">
                <div class="mb-6">
                    <h3 class="text-xl font-semibold mb-3 text-white">Available Packages for ${currentLanguage}</h3>
                    <div class="flex space-x-4 mb-4">
                        <input 
                            type="text" 
                            id="package-search" 
                            placeholder="Search packages..." 
                            class="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                        >
                        <button class="px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors duration-300">
                            <i class="fas fa-search mr-2"></i>Search
                        </button>
                    </div>
                </div>
                
                <div class="space-y-3 max-h-96 overflow-y-auto">
                    ${packages.map(pkg => `
                        <div class="package-item rounded-lg p-4 flex items-center justify-between">
                            <div class="flex-1">
                                <h4 class="text-white font-medium">${pkg.name}</h4>
                                <p class="text-gray-300 text-sm">${pkg.description}</p>
                                <span class="text-xs text-gray-400">v${pkg.version}</span>
                            </div>
                            <button 
                                onclick="packageManager.installPackage('${pkg.name}', '${pkg.version}')"
                                class="px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors duration-300 text-sm"
                            >
                                <i class="fas fa-download mr-2"></i>Install
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-6 pt-6 border-t border-white/10">
                    <h4 class="text-white font-medium mb-3">Installed Packages</h4>
                    <div id="installed-packages" class="space-y-2">
                        ${this.installedPackages.length === 0 ? 
                            '<p class="text-gray-400 text-sm">No packages installed yet</p>' : 
                            this.installedPackages.map(pkg => `
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-green-400">${pkg.name} v${pkg.version}</span>
                                    <button onclick="packageManager.uninstallPackage('${pkg.name}')" class="text-red-400 hover:text-red-300">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `).join('')
                        }
                    </div>
                </div>
            </div>
        `;
    }

    installPackage(name, version) {
        // Simulate package installation
        codeCraft.addTerminalLine(`Installing ${name}@${version}...`, 'text-blue-400');
        
        setTimeout(() => {
            this.installedPackages.push({ name, version });
            codeCraft.addTerminalLine(`✓ ${name}@${version} installed successfully`, 'text-green-400');
            codeCraft.showNotification(`${name} installed successfully`, 'success');
            
            // Update installed packages list
            const installedDiv = document.getElementById('installed-packages');
            if (installedDiv) {
                this.updateInstalledPackagesList(installedDiv);
            }
        }, 2000);
    }

    uninstallPackage(name) {
        this.installedPackages = this.installedPackages.filter(pkg => pkg.name !== name);
        codeCraft.addTerminalLine(`✓ ${name} uninstalled successfully`, 'text-yellow-400');
        codeCraft.showNotification(`${name} uninstalled`, 'success');
        
        const installedDiv = document.getElementById('installed-packages');
        if (installedDiv) {
            this.updateInstalledPackagesList(installedDiv);
        }
    }

    updateInstalledPackagesList(container) {
        if (this.installedPackages.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-sm">No packages installed yet</p>';
        } else {
            container.innerHTML = this.installedPackages.map(pkg => `
                <div class="flex items-center justify-between text-sm">
                    <span class="text-green-400">${pkg.name} v${pkg.version}</span>
                    <button onclick="packageManager.uninstallPackage('${pkg.name}')" class="text-red-400 hover:text-red-300">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }
}

// Initialize Package Manager
const packageManager = new PackageManager();

// Add package manager button to editor header
document.addEventListener('DOMContentLoaded', () => {
    const editorHeader = document.querySelector('#editor .flex.items-center.space-x-4:last-child');
    if (editorHeader) {
        const packageBtn = document.createElement('button');
        packageBtn.className = 'px-4 py-2 bg-purple-600 hover:bg-purple-600/80 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2';
        packageBtn.innerHTML = '<i class="fas fa-box"></i> <span>Packages</span>';
        packageBtn.onclick = () => packageManager.showPackageManager();
        editorHeader.appendChild(packageBtn);
    }
});