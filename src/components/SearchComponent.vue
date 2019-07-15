<template>
    <form>
        <v-text-field v-model="ownItem" @keyup="onKeyUp">

        </v-text-field>
        <v-select
                v-model="select"
                :items="tes"
                label="Item"
                @change="onChange"
        ></v-select>
        <v-flex>
            <template v-for="(key, index) in getSearchingRecipes">
                <v-btn :key="index" @click="onClick(index)">{{key}}</v-btn>
            </template>
        </v-flex>
    </form>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "SearchComponent",
        data() {
            return {
                ownItem: '',
                select: '',
                tes: ["barbecue sauce", "chicken", "cilantro", "lettuce", "ranch dressing", "lettuce", "tomato"],
            }
        },
        computed: {
            ...mapGetters('recipes', ['getIngredietsList', 'getSearchingRecipes']),
        },
        methods: {
            ...mapActions('recipes', ['setSearchingRecipes', 'deleteSearchingRecipes']),
            onKeyUp(event) {
                if (event.keyCode === 13) {
                    this.setSearchingRecipes(this.ownItem)
                    this.ownItem = ''
                }
            },
            onChange() {
                this.setSearchingRecipes(this.searchingItems.push(this.select))
            },
            onClick(index) {
                this.deleteSearchingRecipes(index);
            }
        }
    }
</script>

<style scoped>

</style>
