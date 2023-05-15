<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import PokeCard from '../components/PokeCard.vue'
import { getDataAsync } from '@/services/PokemonService'

const results: Ref<any> = ref([])

onMounted(async () => (results.value = await getDataAsync()))
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
