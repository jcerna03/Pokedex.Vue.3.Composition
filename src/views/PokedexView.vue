<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import PokeCard from '../components/PokeCard.vue'

const results: Ref<any> = ref([])

onMounted(async () => {
  const data = await (await fetch('https://pokeapi.co/api/v2/pokemon')).json()
  for (const result of data.results) {
    const pokemonDetails = await (await fetch(result.url)).json()
    for (const ability of pokemonDetails.abilities) {
      const abilityDetails = await (await fetch(ability.ability.url)).json()
      ability.ability.description = abilityDetails.flavor_text_entries.filter(
        (e: any) => e.language.name === 'en'
      )[0].flavor_text
    }
    results.value.push(pokemonDetails)
  }
})
</script>

<template>
  <div class="container">
    <div class="row">
      <div
        v-for="pokemon in results"
        :key="pokemon.id"
        className="col-12 col-sm-6 col-md-4 col-lg-3 p-3"
      >
        <PokeCard :pokemon="pokemon" />
      </div>
    </div>
  </div>
</template>
