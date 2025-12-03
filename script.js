const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
const randomPokemon = Math.floor(Math.random() * 1025 + 1);

const pokeball = document.querySelector('#pokeball');
const topSection = document.querySelector('.top-section');
const middleSection = document.querySelector('.middle-section');
const bottomSection = document.querySelector('.bottom-section');




const fetchPokemon = async () => {
    try {
        const response = await fetch(pokemonUrl + randomPokemon);
        const data = await response.json();
    
        topSection.innerHTML = `
            <p>${data.name}</p>
            <p>Hp: ${data.base_experience}</p>
            
        `;

        middleSection.innerHTML = `
            <img src="${data.sprites.other.home.front_default}" alt="element-icon">
            <p>${data.attack}</p>
        `;
    } catch (error) {
        console.error(error);
    }
};

pokeball.addEventListener('click', () => {
    fetchPokemon();

    // if (pokemonCounter > randomPokemon.length -1) {
    //     pokemonCounter = 1;
    // }
});


