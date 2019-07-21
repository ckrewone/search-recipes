<template>
            <v-list>
                <template v-for="(item, index) in getSearchingRecipes">
                    <v-card ripple :key="index" height="200" v-if="item">
                        <v-layout>
                            <v-flex item xs3>
                                <v-img :src="item.thumbnail" style="max-height: 200px"></v-img>
                            </v-flex>
                            <v-flex item xs9>
                                <v-card-title primary-title>

                                    <div>
                                        <div class="headline">{{item.title}}</div>
                                        <div class="text-sm-left font-weight-bold">Ingredients:</div>
                                        <div class="text-sm-left body-1">{{item.ingredients}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat :href="item.href">link</v-btn>
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

