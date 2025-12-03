const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonSpeciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

const pokeball = document.querySelector('#pokeball');
const topSection = document.querySelector('.top-section');
const imgSection = document.querySelector('.img-section');
const middleSection = document.querySelector('.middle-section');
const bottomSection = document.querySelector('.bottom-section');

const getRandomId = () => Math.floor(Math.random() * 1025) + 1;


const fetchPokemon = async () => {
    try {
        const id = getRandomId();

         // Fetch main Pokémon data
        const pokemonRes = await fetch(pokemonUrl + id);
        // const response = await fetch(pokemonUrl);
        const pokemon = await pokemonRes.json();
    
        // Fetch species data
        const speciesRes = await fetch(pokemonSpeciesUrl + id);
        const species = await speciesRes.json();

        // Type icon fix — you need your own icons. Example:
        const typeName = pokemon.types[0].type.name;
        const typeIcon = `./components/images/type-icons/${typeName}.png`; 

        // Top section (Name, HP, Type)
        topSection.innerHTML = `
            <p class="poke-name">${pokemon.name}</p>
            <p class="poke-hp">${pokemon.stats.find(s => s.stat.name === "hp").base_stat} HP</p>
            <img src="${typeIcon}" alt="${typeName} icon" class="type-icon">
        `;

        // Image section
        imgSection.innerHTML = `
            <img src="${pokemon.sprites.other.home.front_default}" 
                alt="${pokemon.name}" class="poke-img">
        `;

        // Middle section (Height / Weight / Species)
        middleSection.innerHTML = `
            <p>${species.genera.find(g => g.language.name === "en").genus}</p>
            <p>HT: ${pokemon.height / 10} m</p>
            <p>WT: ${pokemon.weight / 10} kg</p>
        `;

        // Bottom Section (Abilities)
        const abilityList = pokemon.abilities
            .map(a => `<li>${a.ability.name}</li>`)
            .join("");


        bottomSection.innerHTML = `
            <ul>${abilityList}</ul>
            
        `;
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
};

pokeball.addEventListener('click', fetchPokemon);



