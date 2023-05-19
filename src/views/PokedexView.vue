<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import PokeCard from '../components/PokeCard.vue'
import { getDataAsync } from '@/services/PokemonService'

let originalResults: Array<any> = []
let limit = 8
let totalPages = Math.ceil(150 / limit)
let currentPage = 1

const resultsToDisplay: Ref<Array<any>> = ref([])
const inputModel: Ref<string> = ref('')

onMounted(async () => {
  originalResults = await getDataAsync({ page: currentPage, limit })
  resultsToDisplay.value = originalResults
})

const search = () => {
  resultsToDisplay.value = originalResults.filter((pokemon) =>
    pokemon.name.includes(inputModel.value)
  )
}

const changePage = async (page: number) => {
  inputModel.value = ''
  currentPage = page
  originalResults = await getDataAsync({ page, limit })
  resultsToDisplay.value = originalResults
}

const previousPage = async () => {
  if (!(currentPage > 1)) {
    return
  }
  currentPage--
  changePage(currentPage)
}

const nextPage = async () => {
  if (currentPage > 114) {
    return
  }
  currentPage++
  changePage(currentPage)
}
</script>

<template>
  <nav class="py-2 bg-light border-bottom">
    <div class="container d-flex flex-wrap">
      <ul class="nav me-auto">
        <li class="nav-item">
          <a href="#" class="nav-link link-dark px-2 active" aria-current="page">Home</a>
        </li>
        <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Features</a></li>
        <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Pricing</a></li>
        <li class="nav-item"><a href="#" class="nav-link link-dark px-2">FAQs</a></li>
        <li class="nav-item"><a href="#" class="nav-link link-dark px-2">About</a></li>
      </ul>
      <ul class="nav">
        <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Login</a></li>
        <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Sign up</a></li>
      </ul>
    </div>
  </nav>
  <header class="py-3 mb-4 border-bottom text-white">
    <div class="container d-flex flex-wrap justify-content-between">
      <img
        @click="changePage(1)"
        class="img-fluid w-25 btn"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1920px-International_Pok%C3%A9mon_logo.svg.png"
      />
      <div class="col-12 col-lg-4 d-flex">
        <input
          type="search"
          @input="search"
          v-model="inputModel"
          class="form-control align-self-center"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>
    </div>
  </header>
  <nav aria-label="Page navigation example">
    <ul class="pagination pagination-lg justify-content-center">
      <li class="page-item">
        <button class="page-link bg-dark text-white" @click="previousPage">Previous</button>
      </li>
      <li
        class="page-item"
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
      >
        <button
          class="page-link"
          @click="changePage(page)"
          :class="{
            'text-white': !(page === currentPage),
            'bg-dark': !(page === currentPage),
            'text-primary': page === currentPage,
            'bg-warning': page === currentPage,
            'fw-bold': page === currentPage
          }"
        >
          {{ page }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link bg-dark text-white" @click="nextPage">Next</button>
      </li>
    </ul>
  </nav>
  <div class="container">
    <div class="row">
      <div
        v-for="pokemon in resultsToDisplay"
        :key="pokemon.id"
        className="col-12 col-sm-6 col-md-4 col-lg-3 p-3"
      >
        <PokeCard :pokemon="pokemon" />
      </div>
    </div>
  </div>
</template>
