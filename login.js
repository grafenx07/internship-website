
        // Toggle between login and signup forms
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const formType = btn.dataset.form;
                
                // Update button states
                document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Show/hide forms
                document.querySelectorAll('.auth-form').forEach(form => {
                    form.classList.remove('active');
                });
                document.getElementById(formType + 'Form').classList.add('active');
                
                // Clear any alerts
                hideAlert();
            });
        });

        // Password toggle functionality
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const icon = input.parentElement.querySelector('.input-icon');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        // Alert functions
        function showAlert(message, type = 'error') {
            const alert = document.getElementById('alert');
            alert.className = `alert ${type}`;
            alert.textContent = message;
            alert.style.display = 'block';
            
            // Auto hide after 5 seconds
            setTimeout(hideAlert, 5000);
        }

        function hideAlert() {
            document.getElementById('alert').style.display = 'none';
        }

        // Form submission
        function handleFormSubmit(form) {
            const submitBtn = form.querySelector('.submit-btn');
            const spinner = form.querySelector('.loading-spinner');
            const btnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            spinner.style.display = 'inline-block';
            
            const formData = new FormData(form);
            
            fetch('auth.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showAlert(data.message, 'success');
                    if (data.redirect) {
                        setTimeout(() => {
                            window.location.href = data.redirect;
                        }, 1500);
                    } else if (formData.get('action') === 'signup') {
                        // Switch to login form after successful signup
                        setTimeout(() => {
                            document.querySelector('[data-form="login"]').click();
                            document.getElementById('loginEmail').value = formData.get('email');
                        }, 1500);
                    }
                } else {
                    showAlert(data.message, 'error');
                }
            })
            .catch(error => {
                showAlert('An error occurred. Please try again.', 'error');
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                spinner.style.display = 'none';
            });
        }

        // Login form handler
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });

        // Signup form handler
        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = this.querySelector('[name="password"]').value;
            const confirmPassword = this.querySelector('[name="confirm_password"]').value;
            
            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }
            
            handleFormSubmit(this);
        });

        // Forgot password functionality
        function showForgotPassword() {
            const email = prompt('Enter your email address:');
            if (email) {
                showAlert('Password reset instructions have been sent to your email.', 'success');
            }
        }

        // Check for dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }
