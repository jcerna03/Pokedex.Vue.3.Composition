import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PokeCard from '../PokeCard.vue'

describe('PokeCard', () => {
  it('renders properly', () => {
    const pokemonMock = {
      name: 'pikachu',
      id: 1,
      types: [{ type: { name: 'water' } }],
      abilities: [{ ability: { name: 'overgrow', description: 'this is a test description' } }],
      sprites: { front_default: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png' }
    }
    const wrapper = mount(PokeCard, { props: { pokemon: pokemonMock } })
    expect(wrapper.text()).toContain('pikachu')
  })
})
