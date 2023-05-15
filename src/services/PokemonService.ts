export async function getDataAsync() {
  const response = []

  const data = await (await fetch('https://pokeapi.co/api/v2/pokemon')).json()
  for (const result of data.results) {
    const pokemonDetails = await (await fetch(result.url)).json()
    for (const { ability } of pokemonDetails.abilities) {
      const abilityDetails = await (await fetch(ability.url)).json()
      ability.description = abilityDetails.flavor_text_entries.filter(
        (e: any) => e.language.name === 'en'
      )[0].flavor_text
    }
    response.push(pokemonDetails)
  }

  return response
}
