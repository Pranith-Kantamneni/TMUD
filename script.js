console.log("hello")
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add active class to the clicked link
            this.classList.add('active');

            // Get the target section ID
            const target = this.getAttribute('href').substring(1);

            // Scroll to the target section
            document.getElementById(target).scrollIntoView({ behavior: 'smooth' });

            // Show the relevant section and hide others
            showSection(target);
        });
    });

    // Function to show the relevant section and hide others
    function showSection(id) {
        const sections = ['trending', 'forum', 'about'];
        sections.forEach(section => {
            const secElement = document.getElementById(section);
            if (section === id) {
                secElement.classList.remove('hidden');
            } else {
                secElement.classList.add('hidden');
            }
        });
    }

    // Event listener for the search bar
    const searchBar = document.querySelector('.search-bar');
    searchBar.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const results = searchMusic(query);
        displaySearchResults(results);
    });

    // Function to search music
    function searchMusic(query) {
        // Example data (In a real scenario, this data could be fetched from an API or database)
        const musicDatabase = [
            { title: 'Blinding Lights', artist: 'The Weeknd', image: 'assets/images/song1.jpg' },
            { title: 'Shallow', artist: 'Lady Gaga & Bradley Cooper', image: 'assets/images/song2.jpg' },
            { title: 'Levitating', artist: 'Dua Lipa', image: 'assets/images/song3.jpg' },
            // Add more music items as needed
        ];

        return musicDatabase.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.artist.toLowerCase().includes(query)
        );
    }

    // Function to display search results
    function displaySearchResults(results) {
        const searchResultsContainer = document.getElementById('search-results');
        searchResultsContainer.innerHTML = ''; // Clear previous results
        if (results.length > 0) {
            results.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.classList.add('card');
                resultElement.innerHTML = `
                    <img src="${result.image}" alt="Song Cover">
                    <h3>${result.title}</h3>
                    <p>${result.artist}</p>
                `;
                searchResultsContainer.appendChild(resultElement);
            });
        } else {
            searchResultsContainer.innerHTML = '<p>No results found</p>';
        }
    }
});

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-bar').value;
    if (query) {
        searchDatabase(query); // Function to fetch and display results
    } else {
        alert('Please enter a search term');
    }
});

function searchDatabase(query) {
    // Simulated database search function (replace with actual search logic)
    const results = database.filter(song => song.title.includes(query) || song.artist.includes(query) || song.genre.includes(query));
    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Clear previous results
    if (results.length > 0) {
        results.forEach(song => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3>${song.title}</h3>
                <p>${song.artist} - ${song.genre}</p>
                <button onclick="showDetails('${song.id}')">More Info</button>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found</p>';
    }
}

function showDetails(songId) {
    const song = database.find(item => item.id === songId);
    if (song) {
        alert(`Title: ${song.title}\nArtist: ${song.artist}\nAlbum: ${song.album}\nLyrics: ${song.lyrics}`);
    }
}
const trendingSongs = [
    { title: "Song 1", artist: "Artist A", image: "https://via.placeholder.com/150" },
    { title: "Song 2", artist: "Artist B", image: "https://via.placeholder.com/150" },
    { title: "Song 3", artist: "Artist C", image: "https://via.placeholder.com/150" },
    { title: "Song 4", artist: "Artist D", image: "https://via.placeholder.com/150" },
    { title: "Song 5", artist: "Artist E", image: "https://via.placeholder.com/150" }
];

document.getElementById("explore-trending").addEventListener("click", function () {
    const container = document.getElementById("trending-songs-container");
    container.innerHTML = ""; // Clear previous content

    trendingSongs.forEach(song => {
        const songCard = document.createElement("div");
        songCard.className = "trending-song";

        songCard.innerHTML = `
            <img src="${song.image}" alt="${song.title}">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        `;

        container.appendChild(songCard);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const resultsContainer = document.getElementById('results-container');
  
    // Sample data (This data should ideally come from your database or an API)
    const songs = [
      {
        id: 1,
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        imageUrl: 'path_to_image.jpg', // Path to song photo
        rating: 8.5,
        reviews: ['Great song!', 'Loved the beat!']
      },
      // Add more songs as needed
    ];
  
    function displaySongs() {
      resultsContainer.innerHTML = ''; // Clear previous results
      songs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');
  
        songElement.innerHTML = `
          <img src="${song.imageUrl}" alt="${song.title}">
          <h3>${song.title}</h3>
          <p>Artist: ${song.artist}</p>
          <p>Rating: ${song.rating}/10</p>
          <button onclick="viewSong(${song.id})">View Details</button>
        `;
  
        resultsContainer.appendChild(songElement);
      });
    }
  
    function viewSong(songId) {
      const song = songs.find(s => s.id === songId);
      if (song) {
        // Redirect to song page or show details in a modal
        showSongDetails(song);
      }
    }
  
    function showSongDetails(song) {
      // Display song details in a modal or new page
      const songDetailsContainer = document.getElementById('song-details-container');
      songDetailsContainer.innerHTML = `
        <img src="${song.imageUrl}" alt="${song.title}">
        <h2>${song.title}</h2>
        <p>Artist: ${song.artist}</p>
        <p>Rating: ${song.rating}/10</p>
        <h3>Reviews:</h3>
        <ul>
          ${song.reviews.map(review => `<li>${review}</li>`).join('')}
        </ul>
        <form id="review-form">
          <input type="text" id="review-input" placeholder="Add your review...">
          <button type="submit">Submit Review</button>
        </form>
      `;
  
      // Event listener for review submission
      document.getElementById('review-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const reviewText = document.getElementById('review-input').value;
        if (reviewText) {
          song.reviews.push(reviewText);
          showSongDetails(song); // Update the song details with new review
        }
      });
    }
  
    displaySongs(); // Call the function to display songs when page loads
  });