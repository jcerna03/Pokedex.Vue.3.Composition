<script setup lang="ts">
import PokeHeader from '../components/PokeHeader.vue'
import PokePagination from '../components/PokePagination.vue'
import PokeCards from '../components/PokeCards.vue'

import { ref } from 'vue'

const input = ref('')
const currentPage = ref(1)

const search = (prop: any) => {
  input.value = prop
}

const previousPage = () => {
  if (!(currentPage.value > 1)) {
    return
  }
  currentPage.value--
}

const changePage = (page: number) => {
  input.value = ''
  currentPage.value = page
}

const nextPage = () => {
  if (currentPage.value > 114) {
    return
  }
  currentPage.value++
}
</script>

<template>
    <PokeHeader @search="search"></PokeHeader>
    <PokePagination
      @previousPage="previousPage"
      @changePage="changePage"
      @nextPage="nextPage"
      :currentPage="currentPage"
    ></PokePagination>
    <PokeCards :input="input" :currentPage="currentPage"></PokeCards>
</template>
