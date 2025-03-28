// Pokemon API base URL
const API_BASE_URL = 'https://pokeapi.co/api/v2';

// Function to search Pokemon
async function searchPokemon(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${query.toLowerCase()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        return null;
    }
}

// Function to display Pokemon details
function displayPokemonDetails(pokemon) {
    const resultDiv = document.getElementById('pokemon-result');
    
    if (!pokemon) {
        resultDiv.innerHTML = '<p class="text-center">Pokemon not found!</p>';
        return;
    }

    const html = `
        <div class="pokemon-card p-4">
            <div class="text-center">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="img-fluid">
                <h3 class="text-capitalize">${pokemon.name}</h3>
                <div class="types mb-3">
                    ${pokemon.types.map(type => 
                        `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
                    ).join('')}
                </div>
                <div class="stats">
                    <h4>Stats</h4>
                    ${pokemon.stats.map(stat => 
                        `<div class="stat-row">
                            <span>${stat.stat.name}: ${stat.base_stat}</span>
                        </div>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = html;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', async () => {
            const query = searchInput.value.trim();
            if (query) {
                const pokemon = await searchPokemon(query);
                displayPokemonDetails(pokemon);
            }
        });

        searchInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    const pokemon = await searchPokemon(query);
                    displayPokemonDetails(pokemon);
                }
            }
        });
    }

    // Load featured Pokemon on homepage
    if (document.getElementById('featured-pokemon')) {
        loadFeaturedPokemon();
    }
});

// Function to load featured Pokemon
async function loadFeaturedPokemon() {
    const featuredIds = [1, 4, 7, 25]; // Bulbasaur, Charmander, Squirtle, Pikachu
    const featuredContainer = document.getElementById('featured-pokemon');
    
    for (const id of featuredIds) {
        const pokemon = await searchPokemon(id);
        if (pokemon) {
            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'col-md-3';
            pokemonCard.innerHTML = `
                <div class="pokemon-card p-3 text-center">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <h5 class="text-capitalize">${pokemon.name}</h5>
                    <div class="types">
                        ${pokemon.types.map(type => 
                            `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
                        ).join('')}
                    </div>
                </div>
            `;
            featuredContainer.appendChild(pokemonCard);
        }
    }
}
