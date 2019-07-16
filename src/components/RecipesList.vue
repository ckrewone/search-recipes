<template>
            <v-list>
                <template v-for="(item, index) in getSearchingRecipes">
                    <v-card ripple dark elevation="10" :key="index" height="200" class="white--text" v-if="item">
                        <v-layout >
                            <v-flex xs3>
                                <v-img :src="item.thumbnail" height="200" width="200"></v-img>
                            </v-flex>
                            <v-flex xs9>
                                <v-card-title primary-title>

                                    <div>
                                        <div class="headline">{{item.title}}</div>
                                        <div class="text-sm-left font-weight-bold">Ingredients:</div>
                                        <div class="text-sm-left body-1">{{item.ingredients}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat color="white" :href="item.href">source</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </template>
            </v-list>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "RecipesList",
        computed: {
            ...mapGetters('recipes', ['getSearchingRecipes']),
        }
    }
</script>

