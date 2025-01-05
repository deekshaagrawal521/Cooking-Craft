const YOUTUBE_API_KEY = 'AIzaSyB5tn6Mt026iO90vq1UuiwxuJLRCK5NzX8'; // YouTube API Key

// Selecting the elements from the DOM
const searchButton = document.getElementById('search-btn');
const recipeNameInput = document.getElementById('recipe-name');
const youtubeVideoContainer = document.getElementById('youtube-video-container');

// Function to fetch a YouTube video based on the recipe search query
function fetchRecipeVideo(recipeQuery) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(recipeQuery)}+recipe&key=${YOUTUBE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.items.length > 0) {
                const videoId = data.items[0].id.videoId;  // Get the video ID from the first result
                displayVideo(videoId);  // Display the video on the page
            } else {
                youtubeVideoContainer.innerHTML = "<p>No video found for this recipe.</p>"; // Show message if no video found
            }
        })
        .catch(error => {
            console.error('Error fetching YouTube video:', error);
            youtubeVideoContainer.innerHTML = "<p>Sorry, an error occurred while fetching the video.</p>";
        });
}

// Function to display the YouTube video on the page
function displayVideo(videoId) {
    youtubeVideoContainer.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
}

// Event listener for search button
searchButton.addEventListener('click', function() {
    const recipeName = recipeNameInput.value.trim();
    if (recipeName) {
        fetchRecipeVideo(recipeName);  // Fetch and display video for the entered recipe
    } else {
        youtubeVideoContainer.innerHTML = "<p>Please enter a recipe name.</p>";  // Prompt user to enter a recipe name if input is empty
    }
});
