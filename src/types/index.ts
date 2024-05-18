import { z } from 'zod'
import { CategoriesResponse, DrinksResponse, SearchFilterSchema, DrinkResponse, RecipeAPIResponseSchema } from '../utils/recipes-schema'

export type Categories = z.infer<typeof CategoriesResponse>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksResponse>
export type Drink = z.infer<typeof DrinkResponse>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>