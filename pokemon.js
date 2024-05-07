const pokedexContainer = document.getElementById('pokedex');
const searchInput = document.getElementById('searchInput');
const detailsModal = document.getElementById('detailsModal');
const modalContent = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.close');

// Fetch Pokémon data from the API
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  .then(response => response.json())
  .then(data => {
    const pokemonList = data.results;
    displayPokemonCards(pokemonList);
  })
  .catch(error => console.error('Error fetching Pokémon data:', error));

// Function to display Pokémon cards
function displayPokemonCards(pokemonList) {
  pokedexContainer.innerHTML = '';

  pokemonList.forEach(pokemon => {
    const pokemonCardContainer = document.createElement('div');
    pokemonCardContainer.classList.add('pokemon-card-container');

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then(response => response.json())
      .then(data => {
        const types = data.types.map(type => type.type.name);
        pokemonCardContainer.classList.add(...types);

        const pokemonCard = document.createElement('a');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.href = `details.html?pokemon=${pokemon.name}`;
        pokemonCard.innerHTML = `
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokeId(pokemon.url)}.png" alt="${pokemon.name}">
          <h3>${pokemon.name}</h3>
        `;

        pokemonCardContainer.appendChild(pokemonCard);
        pokedexContainer.appendChild(pokemonCardContainer);
      })
      .catch(error => console.error('Error fetching Pokémon details:', error));
  });
}

// Helper function to get Pokémon ID from the URL
function getPokeId(url) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 2];
}

// Search functionality
searchInput.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const pokemonCards = document.querySelectorAll('.pokemon-card');

  pokemonCards.forEach(card => {
    const pokemonName = card.querySelector('h3').textContent.toLowerCase();
    if (pokemonName.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

const typeColors = {
  normal: "#F8F8FF", // Baby Pink
  fire: "#FFD1DC", // Light Coral
  water: "#ADD8E6", // Light Blue
  electric: "#F0FFF0", // Mint Cream
  grass: "#90EE90", // Pale Green
  ice: "#D3D3D3", // Light Gray
  fighting: "#FFDAB9", // Cornsilk
  poison: "#F0FFFF", // Azure
  ground: "#F5F5DC", // Beige
  flying: "#87CEFA", // Sky Blue
  psychic: "#F0E68C", // Khaki
  bug: "#F0FFF0", // Mint Cream
  rock: "#D3D3D3", // Light Gray
  ghost: "#ADD8E6", // Light Blue
  dragon: "#87CEEB", // Light Sky Blue
  dark: "#708090", // Slate Gray
  steel: "#D3D3D3", // Light Gray
  fairy: "#FFD1DC", // Light Coral
};

function displayPokemonDetails(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(data => {
      const types = data.types.map(type => type.type.name);
      const primaryType = types[0];
      const backgroundColor = typeColors[primaryType];
      const textColor = getContrastYIQ(backgroundColor) ? '#000' : '#fff';

      const pokemonDetails = document.getElementById('pokemonDetails');
      pokemonDetails.innerHTML = '';
      pokemonDetails.style.backgroundColor = backgroundColor;
      pokemonDetails.style.color = textColor;

      const detailsHTML = `
        <div class="pokemon-card">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="${data.name}">
          <h2>${data.name}</h2>
          <p>Height: ${data.height / 10} m</p>
          <p>Weight: ${data.weight / 10} kg</p>
          <p>Types:</p>
          <ul>
            ${data.types.map(type => `<li>${type.type.name}</li>`).join('')}
          </ul>
        </div>
      `;

      pokemonDetails.innerHTML = detailsHTML;
      detailsModal.style.display = 'flex'; // Changed from 'block' to 'flex'
      detailsModal.style.justifyContent = 'center'; // Added to center the modal content
      detailsModal.style.alignItems = 'center'; // Added to center the modal content
      document.body.classList.add('blur');
    })
    .catch(error => console.error('Error fetching Pokémon details:', error));
}

// Search functionality
searchInput.addEventListener('input', handleSearch);
searchInput.addEventListener('keydown', handleEnter);

function handleSearch() {
  const searchTerm = this.value.toLowerCase();
  const pokemonCards = document.querySelectorAll('.pokemon-card a');

  pokemonCards.forEach(card => {
    const pokemonName = card.href.split('=')[1];
    if (pokemonName.includes(searchTerm)) {
      card.parentNode.style.display = 'block';
    } else {
      card.parentNode.style.display = 'none';
    }
  });
}

function handleEnter(event) {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value.toLowerCase();
    const pokemonCards = document.querySelectorAll('.pokemon-card a');

    pokemonCards.forEach(card => {
      const pokemonName = card.href.split('=')[1];
      if (pokemonName.includes(searchTerm)) {
        card.click();
        return;
      }
    });
  }
}

function displayPokemonCards(pokemonList) {
  pokedexContainer.innerHTML = '';

  pokemonList.forEach(pokemon => {
    const pokemonCardContainer = document.createElement('div');
    pokemonCardContainer.classList.add('pokemon-card-container');

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then(response => response.json())
      .then(data => {
        const types = data.types.map(type => type.type.name);
        const primaryType = types[0];
        const backgroundColor = typeColors[primaryType];
        const textColor = getContrastYIQ(backgroundColor) ? '#000' : '#fff';

        pokemonCardContainer.style.backgroundColor = backgroundColor;
        pokemonCardContainer.style.color = textColor;

        const pokemonCard = document.createElement('a');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.href = `details.html?pokemon=${pokemon.name}`;
        pokemonCard.innerHTML = `
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokeId(pokemon.url)}.png" alt="${pokemon.name}">
          <h3>${pokemon.name}</h3>
        `;

        pokemonCardContainer.appendChild(pokemonCard);
        pokedexContainer.appendChild(pokemonCardContainer);
      })
      .catch(error => console.error('Error fetching Pokémon details:', error));
  });
}

// Helper function to get a contrasting text color based on the background color
function getContrastYIQ(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128;
}

function displayPokemonDetails(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(data => {
      const types = data.types.map(type => type.type.name);
      const primaryType = types[0];
      const backgroundColor = typeColors[primaryType];
      const textColor = getContrastYIQ(backgroundColor) ? '#000' : '#fff';

      const pokemonDetails = document.getElementById('pokemonDetails');
      pokemonDetails.innerHTML = '';
      pokemonDetails.style.backgroundColor = backgroundColor;
      pokemonDetails.style.color = textColor;

      const detailsHTML = `
        <div class="pokemon-card">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="${data.name}">
          <h2>${data.name}</h2>
          <p>Height: ${data.height / 10} m</p>
          <p>Weight: ${data.weight / 10} kg</p>
          <p>Types:</p>
          <ul>
            ${data.types.map(type => `<li>${type.type.name}</li>`).join('')}
          </ul>
        </div>
      `;

      pokemonDetails.innerHTML = detailsHTML;
      detailsModal.style.display = 'block';
      document.body.classList.add('blur');
    })
    .catch(error => console.error('Error fetching Pokémon details:', error));
}

// Add click event listener to Pokémon cards
const pokemonCards = document.querySelectorAll('.pokemon-card a');
pokemonCards.forEach(card => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    const pokemonName = event.currentTarget.href.split('=')[1];
    displayPokemonDetails(pokemonName);
  });
});

// Close modal when clicking the close button or outside the modal
closeBtn.addEventListener('click', () => {
  detailsModal.style.display = 'none';
  document.body.classList.remove('blur');
});

window.addEventListener('click', (event) => {
  if (event.target === detailsModal) {
    detailsModal.style.display = 'none';
    document.body.classList.remove('blur');
  }
});

// Helper function to get a contrasting text color based on the background color
function getContrastYIQ(hexColor) {
  /* ... (getContrastYIQ function) */
}