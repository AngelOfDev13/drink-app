import { StateCreator } from "zustand"; 
import { Recipe } from "../types";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";
import { RecipeSliceType, createRecipeSlice } from "./recipeSlice";

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe ) => void 
    favoriteExist: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipeSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],

    handleClickFavorite: ( recipe ) => {

        if(get().favoriteExist(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({ text: 'Eliminado Correctamente', error: true })
        } else {
            set({
                favorites: [ ...get().favorites, recipe]
            })
            createNotificationSlice(set, get, api).showNotification({ text: 'Se Agrego a tus favoritos', error: false })
        }
        createRecipeSlice(set, get, api ).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites ))
    },

    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },

    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites') 

        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})