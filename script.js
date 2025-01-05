const API_KEY = 'e9a31b727ab945018d9c52dbd57d80a1'; // Spoonacular API Key
const YOUTUBE_API_KEY = 'AIzaSyB5tn6Mt026iO90vq1UuiwxuJLRCK5NzX8'; // YouTube API Key

// Selecting elements from the DOM

const searchForm = document.getElementById('search-form');
const ingredientsInput = document.getElementById('ingredients');
const recipesContainer = document.getElementById('recipes-container');
const shoppingListContainer = document.getElementById('shopping-list-container');
const recipeDetailContainer = document.getElementById('recipe-detail-container');
const youtubeVideoContainer = document.getElementById('youtube-video-container');

// Function to fetch recipes based on ingredients
function fetchRecipes(ingredients) {
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data); // Display recipe list
            // Fetch YouTube video for the first recipe
            if (data.length > 0) {
                fetchRecipeVideo(data[0].title); // Fetch the video for the first recipe
            }
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

// Function to fetch a YouTube video related to the recipe
function fetchRecipeVideo(recipeTitle) {
    const videoSearchQuery = `${recipeTitle} recipe`;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(videoSearchQuery)}&key=${YOUTUBE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const videoId = data.items[0].id.videoId;
            displayVideo(videoId);
        })
        .catch(error => console.error('Error fetching YouTube video:', error));
}

// Function to display recipe list
function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <button onclick="viewRecipeDetail(${recipe.id})">View Recipe</button>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}

// Function to display recipe video
function displayVideo(videoId) {
    youtubeVideoContainer.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
}

// Event listener for recipe search
document.getElementById('search-btn').addEventListener('click', function() {
    const ingredients = ingredientsInput.value;
    fetchRecipes(ingredients);
});
