export const getPokemons = (first) => `
    query {
        pokemons (first: ${first}) {
        id
        number
        name
        types
        image
        }
    }`;

export const getPokemonDetails = (name, id) => `
    query {
      pokemon (id: ${JSON.stringify(id)}, name: ${JSON.stringify(name)}) {
        number
        name
        types
        image
        classification
        resistant
        evolutions{
          number
          image
          name
          types
        }
        attacks{
          fast {
            name
            type
            damage
          }
          special {
            name
            type
            damage
          }
        }
    }
}
`;
