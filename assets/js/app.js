import { fetchPokemon } from "./fetchPokemon.js";
import { criarCardPokemon } from "./CriarCardPokemon.js";

const inputSearch = document.querySelector("[data-search]");

window.addEventListener("load", async () => {
  const arrayPokemons = await fetchPokemon();

  const arrayPokemonsInfo = arrayPokemons.map((pokemon) => {
    return {
      id: pokemon.id,
      nome: pokemon.name,
      tipo: typePokemon(pokemon.types),
      imagem: pokemon.sprites.other["official-artwork"].front_default,
    };
  });

  setTimeout(() => {
    loaderAplication(arrayPokemonsInfo);
  }, 4000);
});

const loaderAplication = (arrayPokemonsInfo) => {
  // Remove loader
  const loader = document.querySelector("[data-loader]");
  loader.remove();

  // Renderiza Pokemons
  criarCardPokemon(arrayPokemonsInfo);

  // Pesquisa de Pokemons
  const listaPokemons = Array.from(
    document.querySelector("[data-list-pokemons]").children
  );
  inputSearch.addEventListener("input", (evento) =>
    searchPokemon(evento, listaPokemons)
  );
};

const searchPokemon = (evento, listaPokemons) => {
  const pokemonSearch = evento.target.value.toLowerCase();
  const resultadoSearch = listaPokemons.filter((pokemon) =>
    pokemon.dataset.pokemonName.includes(pokemonSearch)
  );

  listaPokemons.forEach((pokemon) =>
    pokemon.classList.add("pokemon__content__list__item--hide")
  );

  if (resultadoSearch.length > 0) {
    resultadoSearch.forEach((pokemon) =>
      pokemon.classList.remove("pokemon__content__list__item--hide")
    );
  }
};

const typePokemon = (arrayType) => {
  let type = [];

  arrayType.forEach((array) => type.push(array.type.name));

  type = type.join(", ");

  return type;
};
