document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if the user is authenticated; redirect to index.html if not
    const token = checkAuthentication();
    
    // 2. Extract place ID from URL query parameters (e.g., add_review.html?id=123)
    const placeId = getPlaceIdFromURL();

    // Dynamically set the "Back to Place" link href if placeId exists
    const backLink = document.getElementById('back-to-place');
    if (backLink && placeId) {
        backLink.href = `place.html?id=${placeId}`;
    } else if (backLink) {
        backLink.href = 'index.html';
    }

    // 3. Setup event listener for the review form submission
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const rating = document.getElementById('rating').value;
            const comment = document.getElementById('comment').value;

            if (!placeId) {
                showFormMessage('Error: Place ID is missing from the URL.', 'error');
                return;
            }

            try {
                await submitReview(token, placeId, rating, comment);
            } catch (error) {
                console.error('Error submitting review:', error);
                showFormMessage('An unexpected error occurred. Please try again.', 'error');
            }
        });
    }
});

/**
 * Checks for the JWT token in cookies. Redirects to index.html if missing.
 * @returns {string|null} The token if present.
 */
function checkAuthentication() {
    const token = getCookie('token');
    if (!token) {
        window.location.href = 'index.html';
    }
    return token;
}

/**
 * Helper function to retrieve a cookie value by its name.
 * @param {string} name 
 * @returns {string|null}
 */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

/**
 * Extracts the place ID from window.location.search query parameters.
 * @returns {string|null}
 */
function getPlaceIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

/**
 * Sends a POST request to submit the review data to the API.
 * @param {string} token 
 * @param {string} placeId 
 * @param {string} rating 
 * @param {string} comment 
 */
async function submitReview(token, placeId, rating, comment) {
    // Replace with your actual back-end API review submission endpoint URL
    const apiUrl = `https://your-api-url/places/${placeId}/reviews`; 

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            place_id: placeId,
            rating: parseInt(rating, 10),
            text: comment // Note: adjust key name ('text' or 'comment') based on your API specs
        })
    });

    handleResponse(response);
}

/**
 * Handles the API response for review submission.
 * @param {Response} response 
 */
async function handleResponse(response) {
    const reviewForm = document.getElementById('review-form');

    if (response.ok) {
        showFormMessage('Review submitted successfully!', 'success');
        if (reviewForm) reviewForm.reset();
        
        // Optional: Redirect back to the place details page after a short delay
        setTimeout(() => {
            const placeId = getPlaceIdFromURL();
            if (placeId) {
                window.location.href = `place.html?id=${placeId}`;
            }
        }, 1500);
    } else {
        let errorMsg = 'Failed to submit review.';
        try {
            const errData = await response.json();
            if (errData.msg || errData.message) {
                errorMsg = errData.msg || errData.message;
            }
        } catch (e) {
            errorMsg = `Failed to submit review: ${response.statusText}`;
        }
        showFormMessage(errorMsg, 'error');
    }
}

/**
 * Displays status messages inside the form container.
 * @param {string} message 
 * @param {string} type ('success' or 'error')
 */
function showFormMessage(message, type) {
    const msgDiv = document.getElementById('form-message');
    if (!msgDiv) return;

    msgDiv.textContent = message;
    msgDiv.style.display = 'block';
    
    if (type === 'success') {
        msgDiv.style.backgroundColor = '#d4edda';
        msgDiv.style.color = '#155724';
        msgDiv.style.border = '1px solid #c3e6cb';
    } else {
        msgDiv.style.backgroundColor = '#f8d7da';
        msgDiv.style.color = '#721c24';
        msgDiv.style.border = '1px solid #f5c6cb';
    }
}
