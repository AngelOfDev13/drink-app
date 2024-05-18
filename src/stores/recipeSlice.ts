import { StateCreator } from "zustand"
import { getCategories, getRecipes, getDetailsById } from "../services/RecipeService"
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import { FavoritesSliceType } from "./favoriteSlice"

export type RecipeSliceType = {
    categories: Categories
    drinks: Drinks
    details: Recipe
    modal: boolean
    fetchCategory: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipeSlice : StateCreator<RecipeSliceType & FavoritesSliceType, [], [], RecipeSliceType> = (set) => ({

    categories: {
        drinks: []
    },

    drinks: {
        drinks: []   
    },

    details: {} as Recipe,

    modal: false,

    fetchCategory: async () => {
       const categories = await getCategories()
       set({
            categories
       })
    },

    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },

    selectRecipe: async (id) => {
        const details = await getDetailsById(id)
        set({
            details,
            modal: true
        })
    },

    closeModal: () => {
        set({
            modal: false,
            details: {} as Recipe
        })
    }

})