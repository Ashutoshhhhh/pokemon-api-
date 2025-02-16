async function fetchPokemon() {
    const maxNumber = parseInt(document.getElementById('numPokemon').value);
    const pokemonType = document.getElementById('category').value;

    let count = 0;
    let cardArray = [];

    // Show the loading animation
    document.getElementById('loading').style.display = 'block';

    while (count < maxNumber) {
        const id = Math.floor(Math.random() * 1000) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        data.types.forEach(type => {
            if (type.type.name.toLowerCase() === pokemonType.toLowerCase()) {
                cardArray.push(data);
                count += 1;
            }
        });
    }

    // Hide the loading animation once the data is ready
    document.getElementById('loading').style.display = 'none';

    if (count === maxNumber) {
        console.log(cardArray);
        showCard(cardArray, pokemonType);
    }
}
function showCard(data,pokemontype){
    const cardContainer=document.getElementsByClassName('card-container')[0];
    let html='';
    pokemontype=pokemontype.toUpperCase();
    data.forEach(item=>{
        const name=item.name.toUpperCase();
        console.log(name);
        const img=item.sprites.front_default;
        let abilities='';
        item.abilities.forEach(ability=>{
            abilities+=`${(ability.ability.name).toUpperCase()}, `;
            
            
        });
        html+=`<div class="card">
            <h1>PokemonName-${name}</h1>
            <img class="card-image" src="${img}">
            <h2> Type-${pokemontype}</h2>
            <h1>Abilities</h1>
            <h2>${abilities}</h2>
       </div>`
    });
    cardContainer.innerHTML=html;

}