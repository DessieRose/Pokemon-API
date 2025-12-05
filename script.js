const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonSpeciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';
// const pokemonAbilityUrl = 'https://pokeapi.co/api/v2/ability/{ability_name}/';

const pokeball = document.querySelector('#pokeball');
const pokemonCard = document.querySelector('.pokemon-card');
const topSection = document.querySelector('.top-section');
const imgSection = document.querySelector('.img-section');
const middleSection = document.querySelector('.middle-section');
const bottomSection = document.querySelector('.bottom-section');

const getRandomId = () => Math.floor(Math.random() * 1025) + 1;


const fetchAbilityDetails = async (abilityName) => {
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
    const data = await res.json();
    
    // Get English ability description
    const description = data.effect_entries.find(
        e => e.language.name === "en"
    ).short_effect;

    return description;
}

const habitatImages = {
    forest: "components/images/habitats/forest.jpg",
    cave: "components/images/habitats/cave.jpg",
    sea: "components/images/habitats/sea.jpg",
    mountain: "components/images/habitats/mountain.jpg",
    grassland: "components/images/habitats/grassland.jpg",
    urban: "components/images/habitats/urban.jpg",
    "rough-terrain": "components/images/habitats/rough-terrain.jpg",
    "waters-edge": "components/images/habitats/waters-edge.jpg",
    unknown: "components/images/habitats/default.jpg"  // fallback
};

// const typeIcons = {
//     bug: "components/images/energy-icons/grass.png",
//     dark: "components/images/energy-icons/darkness.png",
//     dragon: "components/images/energy-icons/dragon.png",
//     electric: "components/images/energy-icons/lightning.png",
//     fairy: "components/images/energy-icons/fairy.png",
//     fighting: "components/images/energy-icons/fighting.png",
//     fire: "components/images/energy-icons/fire.png",
//     flying: "components/images/energy-icons/",
//     ghost: "components/images/energy-icons/.png",
//     grass: "components/images/energy-icons/grass.png",
//     ground: "components/images/energy-icons/fighting.png",
//     ice: "components/images/energy-icons/water.png",
//     normal: "components/images/energy-icons/colorless.png",
//     poison: "components/images/energy-icons/.png",
//     psychic: "components/images/energy-icons/psychic.png",
//     rock: "components/images/energy-icons/fighting.png",
//     steel: "components/images/energy-icons/metal.png",
//     water: "components/images/energy-icons/water.png",
// }

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

        // Type icon
        const typeName = pokemon.types[0].type.name;
        // const energies = pokemon.types.map(t => t.type.name);
        const typeIcon = `components/images/type-icons/${typeName}.png`;
        // const energyIcon = `./components/images/energy-icons${energyIcon}.png`; 

        // Pokemon name
        const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        // Pokemon habitat
        const habitat = species.habitat?.name || "unknown";
        const habitatImage = habitatImages[habitat] || habitatImages["unknown"];

        // Background color change depending on icon
        const cardBackground = pokemonCard.style.backgroundColor = `var(--${typeName})`;
       
        // const changeBackgroundColor = cardBackground

        // Top section (Name, HP, Type)
        topSection.innerHTML = `
            <p class="poke-name">${pokemonName}</p>
            <div class="top-div-icon">
                <p class="poke-hp">${pokemon.stats.find(s => s.stat.name === "hp").base_stat} HP</p>
                <img class="energy-types" src="${typeIcon}" alt="${typeName} icon">
            </div>
        `;

        // Image section
        imgSection.innerHTML = `
            <img src="${pokemon.sprites.other.home.front_default}" 
                alt="${pokemon.name}" class="poke-img">
            <img src="${habitatImage}" class="habitat-img" alt="${habitat} background">
        `;

        // Middle section (Height / Weight / Species)
        middleSection.innerHTML = `
            <p>${species.genera.find(g => g.language.name === "en").genus}</p>
            <p>HT: ${pokemon.height / 10} m</p>
            <p>WT: ${pokemon.weight / 10} kg</p>
        `;

        // Bottom Section (Abilities)
        const abilityList = pokemon.abilities
            .map(a => `<li>${a.ability.name > 2}</li>`)
            .join("");

        // Fetch ability details
        const abilityDescriptions = await Promise.all(
            pokemon.abilities.map(a => fetchAbilityDetails(a.ability.name))
        );

        bottomSection.innerHTML = `
             <ul>
                ${pokemon.abilities.map((a, index) =>
                    `<li class="ability-des-strong">${a.ability.name}</li>
                    <li class="ability-description" >${abilityDescriptions[index]}</li>`)
                .join("")}
            </ul>
            
        `;
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
};

pokeball.addEventListener('click', fetchPokemon);



