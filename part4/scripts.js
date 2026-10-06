document.addEventListener('DOMContentLoaded', () => {
    // 1. Check authentication and load places on page load
    checkAuthentication();

    // 2. Setup client-side price filter event listener
    const priceFilter = document.getElementById('price-filter');
    if (priceFilter) {
        priceFilter.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            const placeCards = document.querySelectorAll('.place-card');

            placeCards.forEach(card => {
                const price = parseFloat(card.getAttribute('data-price'));
                if (selectedValue === 'All' || price <= parseFloat(selectedValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

/**
 * Checks for the JWT token in cookies and updates navigation visibility.
 */
function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');

    if (!token) {
        if (loginLink) loginLink.style.display = 'block';
    } else {
        if (loginLink) loginLink.style.display = 'none';
    }

    // Fetch places data (passes token if available)
    fetchPlaces(token);
}

/**
 * Helper function to get a cookie value by its name.
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
 * Fetches the list of places from the API via a GET request.
 * @param {string|null} token 
 */
async function fetchPlaces(token) {
    // Replace with your actual back-end API places endpoint URL
    const apiUrl = 'https://your-api-url/places'; 

    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers
        });

        if (response.ok) {
            const places = await response.json();
            displayPlaces(places);
        } else {
            console.error('Failed to fetch places:', response.statusText);
        }
    } catch (error) {
        console.error('Error connecting to the API:', error);
    }
}

/**
 * Dynamically builds and inserts place cards into the DOM.
 * @param {Array} places 
 */
function displayPlaces(places) {
    const placesList = document.getElementById('places-list');
    if (!placesList) return;

    placesList.innerHTML = ''; // Clear current content

    if (!places || places.length === 0) {
        placesList.innerHTML = '<p>No places available at the moment.</p>';
        return;
    }

    places.forEach(place => {
        const placeCard = document.createElement('div');
        placeCard.className = 'place-card';
        
        // Store price as a data attribute to make filtering straightforward
        const price = place.price_by_night || place.price || 0;
        placeCard.setAttribute('data-price', price);

        placeCard.innerHTML = `
            <img src="${place.image || 'images/default-place.jpg'}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p><strong>Price per night:</strong> $${price}</p>
            <p>${place.description ? place.description.substring(0, 90) + '...' : ''}</p>
            <a href="place.html?id=${place.id}" class="details-button">View Details</a>
        `;

        placesList.appendChild(placeCard);
    });
}
