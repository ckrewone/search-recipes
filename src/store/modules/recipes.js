import axios from 'axios';

const state = {
    allRecipes: [],
    ingredietsList: ["barbecue sauce", "chicken", "cilantro", "lettuce", "ranch dressing", "lettuce", "tomato", 'dupa'],
    searchingIngredients: [],
    searchingRecipes: []
}

const getters = {
    getSearchingRecipes: state => {
        if(!state.searchingRecipes.length && !state.searchingIngredients.length) return state.allRecipes.results
        else return state.searchingRecipes
    },
    getIngredietsList: state => {
        return state.ingredietsList
    },
    getSearchingIngredients: state => {
        return state.searchingIngredients
    },
}

const actions = {
    updateRecipies: (context) => {
        axios.get('api/').then(res => {
            context.commit('UPDATE_RECIPES', res.data)
            context.commit('UPDATE_INGREDIENTS_LIST')
        })
    },
    setSearchingIngredient: (context, payload) => {
        context.commit('ADD_SEARCHING_INGREDIENT', payload)
        context.commit('UPDATE_SEARSHING_RECIPES', true)
    },
    deleteSearchingIngredient: (context, payload) => {
        context.commit('DELETE_SEARCHING_INGREDIENT', payload)
        context.commit('UPDATE_SEARSHING_RECIPES', false)
    }
}
const mutations = {
    UPDATE_RECIPES: (state, payload) => {
        state.allRecipes = payload
    },
    UPDATE_INGREDIENTS_LIST: (state) => {
        const temp  = state.allRecipes.results.map(recipe => {
            return recipe.ingredients
        }).join(', ').split(', ')
        state.ingredietsList = temp.filter((el, i) => {
            return temp.indexOf(el) == i
        })
    },
    ADD_SEARCHING_INGREDIENT: (state, payload) => {
        state.searchingIngredients.push(payload)
    },
    DELETE_SEARCHING_INGREDIENT: (state, payload) => {
        state.searchingIngredients.splice(payload, 1)
    },
    UPDATE_SEARSHING_RECIPES: (state, isAdded) => {
        if (state.searchingRecipes.length === 0 && state.searchingIngredients.length) {
            state.searchingRecipes = state.allRecipes.results
        }

        if(state.searchingIngredients.length) {
            const recipesList = isAdded ? state.searchingRecipes : state.allRecipes.results
            state.searchingIngredients.forEach(ingedient => {
                const found = recipesList ? recipesList.filter(el => el.ingredients.includes(ingedient)) : []
                if (found !== undefined) {
                    state.searchingRecipes = typeof found.length === undefined ? [found] : found
                } else {
                    state.searchingRecipes = []
                }
            })
        } else {
            state.searchingRecipes = state.allRecipes.results
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}


