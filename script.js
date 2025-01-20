let currentReviewIndex = 0;
const reviewsPerPage = 3;
const isAdmin = false; // Установите false для обычного пользователя

// Функция для добавления отзыва
function addReview() {
    const name = document.getElementById('revew-name').value;
    const phone = document.getElementById('review-phone').value;
    const text = document.getElementById('review-text').value;
    const rating = document.querySelector('input[name="fst"]:checked').value;

    if (name && phone && text && rating) {
        if (!/^\d{11}$/.test(phone)) {
            alert('Номер телефона должен состоять из 11 цифр.');
            return;
        }

        // Сохранение отзыва в localStorage
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.unshift({ name, text, rating }); // Добавляем новый отзыв в начало массива
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Очистка полей
        document.getElementById('review-name').value = '';
        document.getElementById('review-phone').value = '';
        document.getElementById('review-text').value = '';

        // Отображение отзывов
        showReviews();
    } else {
        alert('Пожалуйста, заполните все поля и выберите рейтинг.');
    }
}

// Функция для удаления отзыва
function deleteReview(button) {
    const reviewItem = button.parentElement;
    const reviewList = document.getElementById('review-list');
    reviewList.removeChild(reviewItem);

    // Удаление отзыва из localStorage
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const name = reviewItem.querySelector('h4').textContent;
    const text = reviewItem.querySelector('p').textContent;
    const updatedReviews = reviews.filter(review => review.name !== name || review.text !== text);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));

    // Отображение обновленного списка отзывов
    showReviews();
}

// Функция для отображения отзывов
function showReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';

    // Отображаем только 3 отзыва
    const startIndex = currentReviewIndex;
    const endIndex = startIndex + reviewsPerPage;
    const visibleReviews = reviews.slice(startIndex, endIndex);

    visibleReviews.forEach((review, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
            <h4>${review.name}</h4>
            <p>${review.text}</p>
            <div class="rating">
                ${Array.from({ length: 5 }, (_, i) => `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="${i < review.rating ? 'filled' : ''}">
                        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
                    </svg>
                `).join('')}
            </div>
            ${isAdmin ? '<button onclick="deleteReview(this)">Удалить</button>' : ''}
        `;
        reviewList.appendChild(reviewItem);
    });
}

// Функция для перелистывания вперед
function nextReview() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    if (currentReviewIndex + reviewsPerPage < reviews.length) {
        currentReviewIndex++;
        showReviews();
    }
}

// Функция для перелистывания назад
function prevReview() {
    if (currentReviewIndex > 0) {
        currentReviewIndex--;
        showReviews();
    }
}

// Загрузка отзывов при загрузке страницы
window.onload = function () {
    showReviews();
};

// Плавный переход к разделам
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = 150; // Увеличенный отступ от верха
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Прокрутка вверх при нажатии на логотип
document.querySelector('.logo-link').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});