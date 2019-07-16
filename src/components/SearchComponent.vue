<template>
    <form>
        <v-text-field v-model="ownItem" @keyup="onKeyUp">

        </v-text-field>
        <v-select
                v-model="select"
                :items="getIngredietsList"
                label="Item"
                @change="onChange"
        ></v-select>
        <v-flex>
            <template v-for="(key, index) in getSearchingIngredients">
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
            ...mapGetters('recipes', ['getIngredietsList', 'getSearchingIngredients']),
        },
        methods: {
            ...mapActions('recipes', ['setSearchingIngredient', 'deleteSearchingIngredient']),
            onKeyUp(event) {
                if (event.keyCode === 13) {
                    this.setSearchingIngredient(this.ownItem)
                    this.ownItem = ''
                }
            },
            onChange() {
                this.setSearchingIngredient(this.select)
            },
            onClick(index) {
                this.deleteSearchingIngredient(index);
            }
        }
    }
</script>

<style scoped>

</style>
