const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonSpeciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

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
    
    // Get english ability description
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

const fetchPokemon = async (id) => {
    try {
        if (!id) id = getRandomId();

         // Fetch main Pokémon data
        const pokemonRes = await fetch(pokemonUrl + id);
        const pokemon = await pokemonRes.json();
    
        // Fetch species data
        const speciesRes = await fetch(pokemonSpeciesUrl + id);
        const species = await speciesRes.json();

        // Type icon
        const typeName = pokemon.types[0].type.name;
        const typeIcon = `components/images/type-icons/${typeName}.png`;

        // Pokemon name
        const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        // Pokemon habitat
        const isWaterType = pokemon.types.some(t => t.type.name === "water");
        let habitatName = species?.habitat?.name || "unknown";
        let habitatImage;

        if (isWaterType) {
            // habitatName = "waters-edge";
            habitatImage = habitatImages["waters-edge"] || habitatImages["unknown"];
        } else {
            habitatImage = habitatImages[habitatName] || habitatImages["unknown"];
        }
        

        // Background color change depending on icon
       pokemonCard.style.backgroundColor = `var(--${typeName})`;
       

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
            <img src="${habitatImage}" class="habitat-img" alt="${habitatName} background">
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
                ${pokemon.abilities
                    .slice(0, 2)
                    .map((a, index) =>
                    `<li class="ability-des-strong">
                    ${a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)}
                    </li>
                    <li class="ability-description">
                    ${abilityDescriptions[index]}</li>`)
                .join("")}
            </ul>  
        `;

    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
};

// Show Pikachu on first load
window.addEventListener("DOMContentLoaded", () => {
    fetchPokemon(25);
});

pokeball.addEventListener('click', () => {
    fetchPokemon();
});

// DropDown Menu
document.querySelectorAll("#dropdown a").forEach(item => {
    item.addEventListener('click', function () {
        const chosenId = this.dataset.id;

        fetchPokemon(chosenId);

        document.getElementById("dropdown").classList.remove("show");
    });
});

function selectdropdown () {
    document.getElementById("dropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.closest('.dropdown') && !event.target.matches('.dropbtn')) {
        document.getElementById("dropdown").classList.remove("show");
    }
}

