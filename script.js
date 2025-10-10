const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

// Initialize form display
function initializeForms() {
    // Show sign-in form by default, hide sign-up form
    if (signInForm) signInForm.style.display = "block";
    if (signUpForm) signUpForm.style.display = "none";
}

// Toggle between Sign Up and Sign In forms
if (signUpButton) {
    signUpButton.addEventListener('click', function(e){
        e.preventDefault();
        if (signInForm) signInForm.style.display = "none";
        if (signUpForm) signUpForm.style.display = "block";
    });
}

if (signInButton) {
    signInButton.addEventListener('click', function(e){
        e.preventDefault();
        if (signInForm) signInForm.style.display = "block";
        if (signUpForm) signUpForm.style.display = "none";
    });
}

// Password toggle functionality
function togglePassword(inputId, button) {
    const passwordInput = document.getElementById(inputId);
    const icon = button.querySelector('i');
    
    if (passwordInput && icon) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

// Password confirmation validation
const submitSignUp = document.getElementById('submitSignUp');
if (submitSignUp) {
    submitSignUp.addEventListener('click', function(event) {
        const password = document.getElementById('rPassword')?.value;
        const confirmPassword = document.getElementById('confirmPassword')?.value;
        const termsCheckbox = document.getElementById('termsCheckbox');
        
        if (password && confirmPassword && password !== confirmPassword) {
            event.preventDefault();
            showMessage('Passwords do not match!', 'signUpMessage');
            return;
        }
        
        if (termsCheckbox && !termsCheckbox.checked) {
            event.preventDefault();
            showMessage('Please agree to the Terms and Conditions!', 'signUpMessage');
            return;
        }
    });
}

// Show message function
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        messageDiv.style.opacity = '1';
        
        setTimeout(function() {
            messageDiv.style.opacity = '0';
            setTimeout(function() {
                messageDiv.style.display = 'none';
            }, 300);
        }, 5000);
    }
}

// Terms and Conditions Modal Functions
function openTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside the modal container
const termsModal = document.getElementById('termsModal');
if (termsModal) {
    termsModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeTermsModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeTermsModal();
    }
});

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
    console.log('Form system initialized');
});