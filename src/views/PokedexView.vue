<script setup lang="ts">
import PokeHeader from '../components/PokeHeader.vue'
import PokePagination from '../components/PokePagination.vue'
import PokeCards from '../components/PokeCards.vue'
import { ref } from 'vue'

const input = ref('')
const currentPage = ref(1)
const pokeHeader: any = ref(null)

const search = (text: string) => {
  input.value = text
}

const previousPage = () => {
  if (!(currentPage.value > 1)) {
    return
  }
  pokeHeader.value.inputModel = ''
  currentPage.value--
}

const changePage = (page: number) => {
  pokeHeader.value.inputModel = ''
  currentPage.value = page
}

const nextPage = () => {
  if (currentPage.value > 114) {
    return
  }
  pokeHeader.value.inputModel = ''
  currentPage.value++
}
</script>

<template>
  <PokeHeader @search="search" @changePage="changePage" ref="pokeHeader"></PokeHeader>
  <PokePagination
    @previousPage="previousPage"
    @changePage="changePage"
    @nextPage="nextPage"
    :currentPage="currentPage"
  ></PokePagination>
  <PokeCards :input="input" :currentPage="currentPage"></PokeCards>
</template>
