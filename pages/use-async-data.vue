<template>
  <h1>Use Async Data</h1>

  <button @click="refresh">Recarregar Dados</button>

  <div v-if="pending">Carregando...</div>
  <div v-else-if="error">Erro: {{ error.message }}</div>

  <pre v-else>
    {{ charmander }}
  </pre>

  <div>
    <select v-model="selectedPokemon" name="pokemon">
      <option value="charmander">Charmander</option>
      <option value="bulbasaur">Bulbasaur</option>
      <option value="pikachu">Pikachu</option>
    </select>
  </div>
</template>

<script setup>
const selectedPokemon = ref("charmander");

const {
  data: charmander,
  pending,
  error,
  refresh,
} = await useAsyncData(
  "pokemon-info",
  async () => {
    const [pokemonData, sepeciesData] = await Promise.all([
      $fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.value}`),
      $fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.value}`
      ),
    ]);

    return {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      habitat: sepeciesData.habitat?.name,
      shape: sepeciesData.shape?.name,
    };
  },
  {
    watch: [selectedPokemon],
    lazy: true,
  }
);
</script>
