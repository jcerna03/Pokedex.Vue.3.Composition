import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { getDataAsync } from '@/services/PokemonService'
import type IPokemon from '@/interfaces/IPokemon'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons: Ref<Array<IPokemon>> = ref([])
  const isLoading: Ref<boolean> = ref(true)

  async function getPokemons({ page, limit }: { page: number; limit: number }) {
    pokemons.value = await getDataAsync({ page, limit })
  }

  function setIsLoadingValue(value: boolean) {
    isLoading.value = value
  }

  return { pokemons, getPokemons, isLoading, setIsLoadingValue }
})
