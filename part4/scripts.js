document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessageDiv = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default browser form submission

            // Retrieve input values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Clear any previous error messages
            if (errorMessageDiv) {
                errorMessageDiv.style.display = 'none';
                errorMessageDiv.textContent = '';
            }

            try {
                await loginUser(email, password);
            } catch (error) {
                console.error('Login error:', error);
                showError('An unexpected error occurred. Please try again later.');
            }
        });
    }
});

/**
 * Sends a POST request to the API login endpoint.
 * @param {string} email 
 * @param {string} password 
 */
async function loginUser(email, password) {
    // Replace with your actual back-end API login endpoint URL
    const apiUrl = 'https://your-api-url/login'; 

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const data = await response.json();
        
        // Store the JWT token in a cookie (valid for the entire domain)
        document.cookie = `token=${data.access_token}; path=/; Secure; SameSite=Strict`;
        
        // Redirect to the main page after successful login
        window.location.href = 'index.html';
    } else {
        // Handle failed login
        let errorMsg = 'Login failed. Please check your credentials.';
        try {
            const errData = await response.json();
            if (errData.msg) {
                errorMsg = errData.msg;
            }
        } catch (e) {
            // Fallback if response is not JSON
            errorMsg = `Login failed: ${response.statusText}`;
        }
        showError(errorMsg);
    }
}

/**
 * Displays an error message to the user.
 * @param {string} message 
 */
function showError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    if (errorMessageDiv) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.style.display = 'block';
    } else {
        alert(message); // Fallback to alert if the error div is missing
    }
}
