import axios from 'axios';

const state = {
    allRecipes: JSON.parse(JSON.stringify({
        "title": "Recipe Puppy",
        "version": 0.1,
        "href": "http://www.recipepuppy.com/",
        "results": [{
            "title": "Ginger Champagne",
            "href": "http://allrecipes.com/Recipe/Ginger-Champagne/Detail.aspx",
            "ingredients": "champagne, ginger, ice, vodka",
            "thumbnail": "http://img.recipepuppy.com/1.jpg"
        }, {
            "title": "Potato and Cheese Frittata",
            "href": "http://allrecipes.com/Recipe/Potato-and-Cheese-Frittata/Detail.aspx",
            "ingredients": "cheddar cheese, eggs, olive oil, onions, potato, salt",
            "thumbnail": "http://img.recipepuppy.com/2.jpg"
        }, {
            "title": "Eggnog Thumbprints",
            "href": "http://allrecipes.com/Recipe/Eggnog-Thumbprints/Detail.aspx",
            "ingredients": "brown sugar, butter, butter, powdered sugar, eggs, flour, nutmeg, rum, salt, vanilla extract, sugar",
            "thumbnail": "http://img.recipepuppy.com/3.jpg"
        }, {
            "title": "Succulent Pork Roast",
            "href": "http://allrecipes.com/Recipe/Succulent-Pork-Roast/Detail.aspx",
            "ingredients": "brown sugar, garlic, pork chops, water",
            "thumbnail": "http://img.recipepuppy.com/4.jpg"
        }, {
            "title": "Irish Champ",
            "href": "http://allrecipes.com/Recipe/Irish-Champ/Detail.aspx",
            "ingredients": "black pepper, butter, green onion, milk, potato, salt",
            "thumbnail": "http://img.recipepuppy.com/5.jpg"
        }, {
            "title": "Chocolate-Cherry Thumbprints",
            "href": "http://allrecipes.com/Recipe/Chocolate-Cherry-Thumbprints/Detail.aspx",
            "ingredients": "cocoa powder, baking powder, butter, eggs, flour, oats, salt, sugar, vanilla extract",
            "thumbnail": "http://img.recipepuppy.com/6.jpg"
        }, {
            "title": "Mean Woman Pasta",
            "href": "http://allrecipes.com/Recipe/Mean-Woman-Pasta/Detail.aspx",
            "ingredients": "garlic, kalamata olive, olive oil, pepperoncini, seashell pasta, tomato",
            "thumbnail": "http://img.recipepuppy.com/7.jpg"
        }, {
            "title": "Hot Spiced Cider",
            "href": "http://allrecipes.com/Recipe/Hot-Spiced-Cider/Detail.aspx",
            "ingredients": "allspice, apple cider, brown sugar, cinnamon, cloves, nutmeg, orange, salt",
            "thumbnail": "http://img.recipepuppy.com/8.jpg"
        }, {
            "title": "Isa's Cola de Mono",
            "href": "http://allrecipes.com/Recipe/Isas-Cola-de-Mono/Detail.aspx",
            "ingredients": "cinnamon, cloves, instant coffee, milk, rum, vanilla extract, water, sugar",
            "thumbnail": "http://img.recipepuppy.com/9.jpg"
        }, {
            "title": "Amy's Barbecue Chicken Salad",
            "href": "http://allrecipes.com/Recipe/Amys-Barbecue-Chicken-Salad/Detail.aspx",
            "ingredients": "barbecue sauce, chicken, cilantro, lettuce, ranch dressing, lettuce, tomato",
            "thumbnail": "http://img.recipepuppy.com/10.jpg"
        }]
    })),
    ingredietsList: ["barbecue sauce", "chicken", "cilantro", "lettuce", "ranch dressing", "lettuce", "tomato", 'dupa'],
    searchingIngredients: [],
    searchingRecipes: []
}

const getters = {
    getAllRecipes: state => state.allRecipes,
    getSearchingRecipes: state => state.searchingRecipes,
    getIngredietsList: state => {
        return state.ingredietsList
    },
    getSearchingIngredients: state => {
        return state.searchingIngredients
    },
}

const actions = {
    updateRecipies: (context) => {
        axios.get('http://www.recipepuppy.com/api/').then(res => {
            context.commit('UPDATE_RECIPES', res)
            context.commit('UPDATE_RECIPIES')
        });
    },
    setSearchingIngredient: (context, payload) => {
        context.commit('SET_SEARCHING_INGREDIENT', payload)
        context.commit('UPDATE_SEARSHING_RECIPES', payload)
    },
    deleteSearchingIngredient: (context, payload) => {
        context.commit('DELETE_INGREDIENT_RECIPE', payload)
        context.commit('UPDATE_SEARSHING_RECIPES', payload)
    },
    addSearshingRecipe: (context, payload) => {
        context.commit('UPDATE_SEARSHING_RECIPES', payload)
    }
}
const mutations = {
    UPDATE_RECIPES: (state, payload) => {
        state.allRecipes = payload
    },
    UPDATE_RECIPIES: (state) => {
        state.ingredietsList = state.allRecipes.results.map(recipe => {
            return recipe.ingredients
        }) || []
    },
    SET_SEARCHING_INGREDIENT: (state, payload) => {
        state.searchingIngredients.push(payload)
    },
    DELETE_INGREDIENT_RECIPE: (state, payload) => {
        state.searchingIngredients.splice(payload, 1);
    },
    UPDATE_SEARSHING_RECIPES: (state, payload) => {
        if (state.searchingRecipes.length === 0 && state.searchingIngredients.length) {
            state.searchingRecipes = state.allRecipes.results
        }

        if(state.searchingIngredients.length) {
            state.searchingIngredients.forEach(ingedient => {
                const found = state.searchingRecipes ? state.searchingRecipes.find(el => el.ingredients.includes(ingedient)) : []
                if (found !== undefined) {
                    state.searchingRecipes = typeof found === 'object' ? [found] : found
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


