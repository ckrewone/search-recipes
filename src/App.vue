<template>
  <v-app>
  <div id="app">
    <v-layout>
      <v-flex xs2/>
      <v-flex xs8 pt-3>
        <v-flex class="display-2 text-sm-left">Search:</v-flex>
    <search-component></search-component>
    <recipes-list></recipes-list>
      </v-flex>
    </v-layout>
  </div>
  </v-app>
</template>

<script>
import RecipesList from "./components/RecipesList";
import SearchComponent from "./components/SearchComponent";

export default {
  name: 'app',
  components: {
    SearchComponent,
    RecipesList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
