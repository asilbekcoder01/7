document.addEventListener('DOMContentLoaded', () => {
    // Load profile and cards on page load
    loadProfile();
    loadCards();

    // Handle profile form submission
    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const profileImage = document.getElementById('profile-image').files[0];
        saveProfile(username, password, profileImage);
    });

    // Handle card form submission
    const cardForm = document.getElementById('card-form');
    cardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('card-title').value;
        const content = document.getElementById('card-content').value;
        const cardImage = document.getElementById('card-image').files[0];
        addCard(title, content, cardImage);
    });
});

function saveProfile(username, password, profileImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const profile = { username, password, image: e.target.result };
        localStorage.setItem('profile', JSON.stringify(profile));
        alert('Profile saved successfully!');
        loadProfile();
    };
    if (profileImage) {
        reader.readAsDataURL(profileImage);
    } else {
        const profile = { username, password, image: null };
        localStorage.setItem('profile', JSON.stringify(profile));
        alert('Profile saved successfully!');
        loadProfile();
    }
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
        document.getElementById('username').value = profile.username;
        document.getElementById('password').value = profile.password;
        if (profile.image) {
            const img = document.createElement('img');
            img.src = profile.image;
            img.alt = 'Profile Image';
            img.width = 100;
            img.height = 100;
            const profileForm = document.getElementById('profile-form');
            const existingImg = profileForm.querySelector('img');
            if (existingImg) {
                profileForm.removeChild(existingImg);
            }
            profileForm.insertBefore(img, profileForm.firstChild);
        }
    }
}

function addCard(title, content, cardImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.push({ title, content, image: e.target.result });
        localStorage.setItem('cards', JSON.stringify(cards));
        loadCards();
        alert('Card added successfully!');
    };
    if (cardImage) {
        reader.readAsDataURL(cardImage);
    } else {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.push({ title, content, image: null });
        localStorage.setItem('cards', JSON.stringify(cards));
        loadCards();
        alert('Card added successfully!');
    }
}

function loadCards() {
    const cardsContainer = document.getElementById('cards-container');
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cardsContainer.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'col-md-4';
        cardElement.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text">${card.content}</p>
                    ${card.image ? `<img src="${card.image}" alt="Card Image" class="img-fluid">` : ''}
                    <button class="btn btn-danger mt-2" onclick="deleteCard(${index})">Delete</button>
                </div>
            </div>
        `;
        cardsContainer.appendChild(cardElement);
    });
}

function deleteCard(index) {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.splice(index, 1);
    localStorage.setItem('cards', JSON.stringify(cards));
    loadCards();
}