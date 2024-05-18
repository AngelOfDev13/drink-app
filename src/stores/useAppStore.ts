import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipeSliceType, createRecipeSlice } from "./recipeSlice";
import { FavoritesSliceType, createFavoritesSlice } from "./favoriteSlice";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";

export const useAppStore = create<RecipeSliceType & FavoritesSliceType & NotificationSliceType>() (devtools( (...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})))
     