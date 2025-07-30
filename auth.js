// Authentication System for CodeCraft

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.isSignedIn = false;
        this.sessionToken = null;
        
        this.init();
    }

    init() {
        this.loadSession();
        this.setupAuthEventListeners();
        this.updateAuthUI();
    }

    setupAuthEventListeners() {
        // Sign In button
        document.querySelectorAll('button').forEach(btn => {
            if (btn.textContent.includes('Sign In')) {
                btn.addEventListener('click', () => this.showSignInModal());
            }
            if (btn.textContent.includes('Sign Up')) {
                btn.addEventListener('click', () => this.showSignUpModal());
            }
        });
    }

    showSignInModal() {
        const modal = this.createAuthModal('Sign In', this.getSignInContent());
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
        }, 10);
    }

    showSignUpModal() {
        const modal = this.createAuthModal('Sign Up', this.getSignUpContent());
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
        }, 10);
    }

    getSignInContent() {
        return `
            <div class="p-6">
                <div class="mb-6 text-center">
                    <h3 class="text-2xl font-semibold text-white mb-2">Welcome Back!</h3>
                    <p class="text-gray-300">Sign in to continue coding</p>
                </div>

                <form id="signin-form" class="space-y-4">
                    <div>
                        <label class="block text-white mb-2">Email</label>
                        <input 
                            type="email" 
                            id="signin-email"
                            required
                            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                            placeholder="Enter your email"
                        >
                    </div>
                    
                    <div>
                        <label class="block text-white mb-2">Password</label>
                        <div class="relative">
                            <input 
                                type="password" 
                                id="signin-password"
                                required
                                class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none pr-12"
                                placeholder="Enter your password"
                            >
                            <button 
                                type="button" 
                                onclick="authSystem.togglePasswordVisibility('signin-password')"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <label class="flex items-center text-sm text-gray-300">
                            <input type="checkbox" class="mr-2 rounded bg-white/10 border-white/20">
                            Remember me
                        </label>
                        <button type="button" class="text-accent hover:text-accent/80 text-sm">
                            Forgot password?
                        </button>
                    </div>

                    <button 
                        type="submit"
                        class="w-full py-3 bg-gradient-to-r from-accent to-accent-blue text-white font-semibold rounded-lg hover:scale-105 transform transition-all duration-300"
                    >
                        Sign In
                    </button>
                </form>

                <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-white/20"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-3 bg-primary text-gray-300">Or continue with</span>
                        </div>
                    </div>

                    <div class="mt-6 grid grid-cols-3 gap-3">
                        <button 
                            onclick="authSystem.signInWithGoogle()"
                            class="flex justify-center items-center px-4 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-300"
                        >
                            <i class="fab fa-google text-red-500 text-xl"></i>
                        </button>
                        <button 
                            onclick="authSystem.signInWithMicrosoft()"
                            class="flex justify-center items-center px-4 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-300"
                        >
                            <i class="fab fa-microsoft text-blue-500 text-xl"></i>
                        </button>
                        <button 
                            onclick="authSystem.signInWithGitHub()"
                            class="flex justify-center items-center px-4 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-300"
                        >
                            <i class="fab fa-github text-white text-xl"></i>
                        </button>
                    </div>
                </div>

                <div class="mt-6 text-center">
                    <p class="text-gray-300">
                        Don't have an account? 
                        <button 
                            onclick="document.querySelector('.fixed').remove(); authSystem.showSignUpModal();"
                            class="text-accent hover:text-accent/80 font-medium"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        `;
    }

    getSignUpContent() {
        return `
            <div class="p-6">
                <div class="mb-6 text-center">
                    <h3 class="text-2xl font-semibold text-white mb-2">Join CodeCraft</h3>
                    <p class="text-gray-300">Create your account and start coding</p>
                </div>

                <form id="signup-form" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-white mb-2">First Name</label>
                            <input 
                                type="text" 
                                id="signup-firstname"
                                required
                                class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                                placeholder="First name"
                            >
                        </div>
                        <div>
                            <label class="block text-white mb-2">Last Name</label>
                            <input 
                                type="text" 
                                id="signup-lastname"
                                required
                                class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                                placeholder="Last name"
                            >
                        </div>
                    </div>

                    <div>
                        <label class="block text-white mb-2">Email</label>
                        <input 
                            type="email" 
                            id="signup-email"
                            required
                            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                            placeholder="Enter your email"
                        >
                    </div>
                    
                    <div>
                        <label class="block text-white mb-2">Password</label>
                        <div class="relative">
                            <input 
                                type="password" 
                                id="signup-password"
                                required
                                minlength="8"
                                class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none pr-12"
                                placeholder="Create a strong password"
                            >
                            <button 
                                type="button" 
                                onclick="authSystem.togglePasswordVisibility('signup-password')"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                        <div class="mt-2">
                            <div id="password-strength" class="hidden">
                                <div class="flex space-x-1 mb-2">
                                    <div class="h-1 flex-1 bg-white/20 rounded"></div>
                                    <div class="h-1 flex-1 bg-white/20 rounded"></div>
                                    <div class="h-1 flex-1 bg-white/20 rounded"></div>
                                    <div class="h-1 flex-1 bg-white/20 rounded"></div>
                                </div>
                                <p class="text-xs text-gray-400">Password strength: <span id="strength-text">Weak</span></p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-white mb-2">Confirm Password</label>
                        <input 
                            type="password" 
                            id="signup-confirm-password"
                            required
                            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                            placeholder="Confirm your password"
                        >
                    </div>

                    <div class="flex items-start space-x-2">
                        <input 
                            type="checkbox" 
                            id="signup-terms"
                            required
                            class="mt-1 rounded bg-white/10 border-white/20"
                        >
                        <label for="signup-terms" class="text-sm text-gray-300">
                            I agree to the 
                            <a href="#" class="text-accent hover:text-accent/80">Terms of Service</a> 
                            and 
                            <a href="#" class="text-accent hover:text-accent/80">Privacy Policy</a>
                        </label>
                    </div>

                    <button 
                        type="submit"
                        class="w-full py-3 bg-gradient-to-r from-accent to-accent-blue text-white font-semibold rounded-lg hover:scale-105 transform transition-all duration-300"
                    >
                        Create Account
                    </button>
                </form>

                <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-white/20"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-3 bg-primary text-gray-300">Or sign up with</span>
                        </div>
                    </div>

                    <div class="mt-6 grid grid-cols-3 gap-3">
                        <button 
                            onclick="authSystem.signUpWithGoogle()"
                            class="flex justify-center items-center px-4 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-300"
                        >
                            <i class="fab fa-google text-red-500 text-xl"></i>
                        </button>
                        <button 
                            onclick="authSystem.signUpWithMicrosoft()"
                            class="flex justify-center items-center px-4 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-300"
                        >
                            <i class="fab fa-microsoft text-blue-500 text-xl"></i>
                        </button>
                        <button 
                            onclick="authSystem.signUpWithGitHub()"
                            class="flex justify-center items-center px-4 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-300"
                        >
                            <i class="fab fa-github text-white text-xl"></i>
                        </button>
                    </div>
                </div>

                <div class="mt-6 text-center">
                    <p class="text-gray-300">
                        Already have an account? 
                        <button 
                            onclick="document.querySelector('.fixed').remove(); authSystem.showSignInModal();"
                            class="text-accent hover:text-accent/80 font-medium"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        `;
    }

    createAuthModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm opacity-0 transition-opacity duration-300';
        
        modal.innerHTML = `
            <div class="bg-primary border border-white/20 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 class="text-2xl font-semibold text-white">${title}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white transition-colors duration-300">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                ${content}
            </div>
        `;
        
        // Setup form submission
        modal.addEventListener('submit', (e) => {
            e.preventDefault();
            if (e.target.id === 'signin-form') {
                this.handleSignIn(e.target);
            } else if (e.target.id === 'signup-form') {
                this.handleSignUp(e.target);
            }
        });

        // Setup password strength checker for signup
        if (title === 'Sign Up') {
            setTimeout(() => {
                const passwordInput = modal.querySelector('#signup-password');
                if (passwordInput) {
                    passwordInput.addEventListener('input', (e) => {
                        this.checkPasswordStrength(e.target.value);
                    });
                }
            }, 100);
        }
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        return modal;
    }

    handleSignIn(form) {
        const email = form.querySelector('#signin-email').value;
        const password = form.querySelector('#signin-password').value;
        
        // Simulate authentication
        this.showLoadingState('Signing in...');
        
        setTimeout(() => {
            // Simulate successful login
            const user = {
                id: 'user_' + Date.now(),
                email: email,
                name: email.split('@')[0],
                avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=06D6A0&color=fff`,
                joinDate: new Date().toISOString(),
                isVerified: true
            };
            
            this.signInUser(user);
            this.hideLoadingState();
            document.querySelector('.fixed').remove();
            
            if (window.codeCraft) {
                window.codeCraft.showNotification('Successfully signed in!', 'success');
            }
        }, 2000);
    }

    handleSignUp(form) {
        const firstName = form.querySelector('#signup-firstname').value;
        const lastName = form.querySelector('#signup-lastname').value;
        const email = form.querySelector('#signup-email').value;
        const password = form.querySelector('#signup-password').value;
        const confirmPassword = form.querySelector('#signup-confirm-password').value;
        
        if (password !== confirmPassword) {
            if (window.codeCraft) {
                window.codeCraft.showNotification('Passwords do not match', 'error');
            }
            return;
        }
        
        // Simulate user registration
        this.showLoadingState('Creating account...');
        
        setTimeout(() => {
            const user = {
                id: 'user_' + Date.now(),
                email: email,
                name: `${firstName} ${lastName}`,
                firstName: firstName,
                lastName: lastName,
                avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=06D6A0&color=fff`,
                joinDate: new Date().toISOString(),
                isVerified: false
            };
            
            this.signInUser(user);
            this.hideLoadingState();
            document.querySelector('.fixed').remove();
            
            if (window.codeCraft) {
                window.codeCraft.showNotification('Account created successfully!', 'success');
            }
        }, 2000);
    }

    signInUser(user) {
        this.currentUser = user;
        this.isSignedIn = true;
        this.sessionToken = 'token_' + Date.now();
        
        // Save to localStorage
        localStorage.setItem('codecraft_user', JSON.stringify(user));
        localStorage.setItem('codecraft_session', this.sessionToken);
        
        this.updateAuthUI();
    }

    signOut() {
        this.currentUser = null;
        this.isSignedIn = false;
        this.sessionToken = null;
        
        // Clear localStorage
        localStorage.removeItem('codecraft_user');
        localStorage.removeItem('codecraft_session');
        
        this.updateAuthUI();
        
        if (window.codeCraft) {
            window.codeCraft.showNotification('Signed out successfully', 'success');
        }
    }

    loadSession() {
        const savedUser = localStorage.getItem('codecraft_user');
        const savedSession = localStorage.getItem('codecraft_session');
        
        if (savedUser && savedSession) {
            this.currentUser = JSON.parse(savedUser);
            this.sessionToken = savedSession;
            this.isSignedIn = true;
        }
    }

    updateAuthUI() {
        // Update navigation buttons
        const signInBtns = document.querySelectorAll('button');
        
        signInBtns.forEach(btn => {
            if (btn.textContent.includes('Sign In') || btn.textContent.includes('Sign Up')) {
                const parent = btn.parentElement;
                
                if (this.isSignedIn) {
                    // Replace with user menu
                    if (!parent.querySelector('.user-menu')) {
                        const userMenu = this.createUserMenu();
                        parent.innerHTML = '';
                        parent.appendChild(userMenu);
                    }
                } else {
                    // Show original buttons
                    if (parent.querySelector('.user-menu')) {
                        parent.innerHTML = `
                            <button class="px-4 py-2 text-white hover:text-accent transition-colors duration-300">Sign In</button>
                            <button class="px-4 py-2 bg-gradient-to-r from-accent to-accent-blue text-white rounded-lg hover:scale-105 transform transition-transform duration-300">Sign Up</button>
                        `;
                        this.setupAuthEventListeners();
                    }
                }
            }
        });
    }

    createUserMenu() {
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu relative';
        
        userMenu.innerHTML = `
            <button class="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors duration-300" onclick="authSystem.toggleUserDropdown()">
                <img src="${this.currentUser.avatar}" alt="Avatar" class="w-8 h-8 rounded-full">
                <span class="text-white">${this.currentUser.name}</span>
                <i class="fas fa-chevron-down text-white text-sm"></i>
            </button>
            
            <div id="user-dropdown" class="absolute right-0 top-full mt-2 w-64 bg-primary border border-white/20 rounded-lg shadow-xl opacity-0 invisible transform scale-95 transition-all duration-200 z-50">
                <div class="p-4 border-b border-white/10">
                    <div class="flex items-center space-x-3">
                        <img src="${this.currentUser.avatar}" alt="Avatar" class="w-12 h-12 rounded-full">
                        <div>
                            <p class="text-white font-medium">${this.currentUser.name}</p>
                            <p class="text-gray-400 text-sm">${this.currentUser.email}</p>
                        </div>
                    </div>
                </div>
                
                <div class="py-2">
                    <button onclick="authSystem.showProfile()" class="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-300 flex items-center space-x-3">
                        <i class="fas fa-user text-accent"></i>
                        <span>Profile</span>
                    </button>
                    <button onclick="authSystem.showSettings()" class="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-300 flex items-center space-x-3">
                        <i class="fas fa-cog text-accent"></i>
                        <span>Settings</span>
                    </button>
                    <button onclick="authSystem.showCodeHistory()" class="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-300 flex items-center space-x-3">
                        <i class="fas fa-history text-accent"></i>
                        <span>Code History</span>
                    </button>
                    <div class="border-t border-white/10 my-2"></div>
                    <button onclick="authSystem.signOut()" class="w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/10 transition-colors duration-300 flex items-center space-x-3">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        `;
        
        return userMenu;
    }

    toggleUserDropdown() {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            const isVisible = dropdown.classList.contains('opacity-100');
            
            if (isVisible) {
                dropdown.classList.remove('opacity-100', 'visible', 'scale-100');
                dropdown.classList.add('opacity-0', 'invisible', 'scale-95');
            } else {
                dropdown.classList.remove('opacity-0', 'invisible', 'scale-95');
                dropdown.classList.add('opacity-100', 'visible', 'scale-100');
            }
        }
    }

    showProfile() {
        const modal = this.createAuthModal('User Profile', this.getProfileContent());
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
        }, 10);
        
        this.toggleUserDropdown();
    }

    getProfileContent() {
        return `
            <div class="p-6">
                <div class="text-center mb-6">
                    <div class="relative inline-block">
                        <img src="${this.currentUser.avatar}" alt="Avatar" class="w-24 h-24 rounded-full mx-auto mb-4">
                        <button class="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors duration-300">
                            <i class="fas fa-camera text-white text-sm"></i>
                        </button>
                    </div>
                    <h3 class="text-xl font-semibold text-white">${this.currentUser.name}</h3>
                    <p class="text-gray-400">${this.currentUser.email}</p>
                    <div class="flex items-center justify-center space-x-2 mt-2">
                        <span class="text-sm text-gray-400">Member since ${new Date(this.currentUser.joinDate).toLocaleDateString()}</span>
                        ${this.currentUser.isVerified ? '<i class="fas fa-check-circle text-green-500"></i>' : '<i class="fas fa-exclamation-circle text-yellow-500"></i>'}
                    </div>
                </div>

                <form class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-white mb-2">First Name</label>
                            <input 
                                type="text" 
                                value="${this.currentUser.firstName || ''}"
                                class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                            >
                        </div>
                        <div>
                            <label class="block text-white mb-2">Last Name</label>
                            <input 
                                type="text" 
                                value="${this.currentUser.lastName || ''}"
                                class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                            >
                        </div>
                    </div>

                    <div>
                        <label class="block text-white mb-2">Email</label>
                        <input 
                            type="email" 
                            value="${this.currentUser.email}"
                            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                        >
                    </div>

                    <div>
                        <label class="block text-white mb-2">Bio</label>
                        <textarea 
                            rows="3"
                            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:outline-none resize-none"
                            placeholder="Tell us about yourself..."
                        ></textarea>
                    </div>

                    <div class="flex space-x-3">
                        <button 
                            type="submit"
                            class="flex-1 py-3 bg-gradient-to-r from-accent to-accent-blue text-white font-semibold rounded-lg hover:scale-105 transform transition-all duration-300"
                        >
                            Save Changes
                        </button>
                        <button 
                            type="button"
                            onclick="this.closest('.fixed').remove()"
                            class="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    showSettings() {
        // Placeholder for settings functionality
        if (window.codeCraft) {
            window.codeCraft.showNotification('Settings panel coming soon!', 'info');
        }
        this.toggleUserDropdown();
    }

    showCodeHistory() {
        const modal = this.createAuthModal('Code History', this.getCodeHistoryContent());
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
        }, 10);
        
        this.toggleUserDropdown();
    }

    getCodeHistoryContent() {
        const history = JSON.parse(localStorage.getItem('codecraft_history') || '[]');
        
        return `
            <div class="p-6">
                <div class="mb-6">
                    <h3 class="text-xl font-semibold text-white mb-2">Your Code History</h3>
                    <p class="text-gray-400">Recent coding sessions and saved snippets</p>
                </div>

                <div class="space-y-4 max-h-96 overflow-y-auto">
                    ${history.length === 0 ? 
                        '<p class="text-gray-400 text-center py-8">No code history yet. Start coding to see your history here!</p>' :
                        history.reverse().map((entry, index) => `
                            <div class="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-accent font-medium">${entry.language.toUpperCase()}</span>
                                    <span class="text-gray-400 text-sm">${new Date(entry.timestamp).toLocaleDateString()}</span>
                                </div>
                                <pre class="text-sm text-gray-300 bg-black/20 rounded p-2 overflow-x-auto max-h-32">${entry.code.substring(0, 200)}${entry.code.length > 200 ? '...' : ''}</pre>
                                <div class="flex space-x-2 mt-3">
                                    <button 
                                        onclick="authSystem.loadHistoryEntry(${index})"
                                        class="px-3 py-1 bg-accent hover:bg-accent/80 text-white text-sm rounded transition-colors duration-300"
                                    >
                                        Load
                                    </button>
                                    <button 
                                        onclick="authSystem.deleteHistoryEntry(${index})"
                                        class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        `;
    }

    loadHistoryEntry(index) {
        const history = JSON.parse(localStorage.getItem('codecraft_history') || '[]');
        const entry = history.reverse()[index];
        
        if (entry && window.codeCraft) {
            const codeEditor = document.getElementById('code-editor');
            const languageSelect = document.getElementById('language-select');
            
            if (codeEditor) codeEditor.value = entry.code;
            if (languageSelect) languageSelect.value = entry.language;
            
            window.codeCraft.changeLanguage(entry.language);
            window.codeCraft.showNotification('Code loaded from history', 'success');
            
            document.querySelector('.fixed').remove();
        }
    }

    deleteHistoryEntry(index) {
        const history = JSON.parse(localStorage.getItem('codecraft_history') || '[]');
        history.splice(-(index + 1), 1);
        localStorage.setItem('codecraft_history', JSON.stringify(history));
        
        // Refresh the modal
        document.querySelector('.fixed').remove();
        this.showCodeHistory();
    }

    togglePasswordVisibility(inputId) {
        const input = document.getElementById(inputId);
        const icon = input.nextElementSibling.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    checkPasswordStrength(password) {
        const strengthDiv = document.getElementById('password-strength');
        const strengthText = document.getElementById('strength-text');
        const bars = strengthDiv.querySelectorAll('.h-1');
        
        if (!strengthDiv || !strengthText) return;
        
        strengthDiv.classList.remove('hidden');
        
        let strength = 0;
        let strengthLabel = 'Weak';
        let color = 'bg-red-500';
        
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        if (strength >= 4) {
            strengthLabel = 'Strong';
            color = 'bg-green-500';
        } else if (strength >= 3) {
            strengthLabel = 'Good';
            color = 'bg-yellow-500';
        } else if (strength >= 2) {
            strengthLabel = 'Fair';
            color = 'bg-orange-500';
        }
        
        bars.forEach((bar, index) => {
            if (index < strength) {
                bar.className = `h-1 flex-1 ${color} rounded`;
            } else {
                bar.className = 'h-1 flex-1 bg-white/20 rounded';
            }
        });
        
        strengthText.textContent = strengthLabel;
    }

    showLoadingState(message) {
        const existingLoader = document.querySelector('.auth-loader');
        if (existingLoader) existingLoader.remove();
        
        const loader = document.createElement('div');
        loader.className = 'auth-loader fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm';
        loader.innerHTML = `
            <div class="bg-primary border border-white/20 rounded-lg p-6 flex items-center space-x-4">
                <i class="fas fa-spinner fa-spin text-accent text-xl"></i>
                <span class="text-white">${message}</span>
            </div>
        `;
        
        document.body.appendChild(loader);
    }

    hideLoadingState() {
        const loader = document.querySelector('.auth-loader');
        if (loader) loader.remove();
    }

    // OAuth Methods (Placeholders)
    signInWithGoogle() {
        this.showLoadingState('Connecting to Google...');
        setTimeout(() => {
            this.hideLoadingState();
            if (window.codeCraft) {
                window.codeCraft.showNotification('Google OAuth integration coming soon!', 'info');
            }
        }, 1500);
    }

    signUpWithGoogle() {
        this.signInWithGoogle();
    }

    signInWithMicrosoft() {
        this.showLoadingState('Connecting to Microsoft...');
        setTimeout(() => {
            this.hideLoadingState();
            if (window.codeCraft) {
                window.codeCraft.showNotification('Microsoft OAuth integration coming soon!', 'info');
            }
        }, 1500);
    }

    signUpWithMicrosoft() {
        this.signInWithMicrosoft();
    }

    signInWithGitHub() {
        this.showLoadingState('Connecting to GitHub...');
        setTimeout(() => {
            this.hideLoadingState();
            if (window.codeCraft) {
                window.codeCraft.showNotification('GitHub OAuth integration coming soon!', 'info');
            }
        }, 1500);
    }

    signUpWithGitHub() {
        this.signInWithGitHub();
    }
}

// Initialize Authentication System
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown && dropdown.classList.contains('opacity-100')) {
            dropdown.classList.remove('opacity-100', 'visible', 'scale-100');
            dropdown.classList.add('opacity-0', 'invisible', 'scale-95');
        }
    }
});