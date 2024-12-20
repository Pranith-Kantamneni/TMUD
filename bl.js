// DOM Elements
const ratingForm = document.getElementById("rating-form");
const ratingInput = document.getElementById("rating");
const reviewInput = document.getElementById("review");
const reviewsContainer = document.getElementById("reviews-container");

// Preloaded reviews for Blinding Lights
const reviews = [
    { rating: 5, text: "This song is a masterpiece!" },
    { rating: 4, text: "Great vibes, love the energy." },
];

// Display preloaded reviews
function displayReviews() {
    reviewsContainer.innerHTML = ""; // Clear previous content

    reviews.forEach((review) => {
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "review";

        reviewDiv.innerHTML = `
            <p><strong>Rating:</strong> ${review.rating} / 5</p>
            <p><strong>Review:</strong> ${review.text}</p>
        `;

        reviewsContainer.appendChild(reviewDiv);
    });
}

// Handle form submission for new review
ratingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newRating = parseInt(ratingInput.value);
    const newReviewText = reviewInput.value.trim();

    // Validate input
    if (isNaN(newRating) || newRating < 1 || newRating > 5) {
        alert("Please provide a rating between 1 and 5.");
        return;
    }

    if (newReviewText === "") {
        alert("Please write a review.");
        return;
    }

    // Add new review to the array
    reviews.push({ rating: newRating, text: newReviewText });

    // Reset form
    ratingForm.reset();

    // Update reviews display
    displayReviews();
});

// Initialize page with existing reviews
displayReviews();