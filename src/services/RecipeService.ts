import axios from "axios"
import { CategoriesResponse, DrinksResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema"
import { Drink, SearchFilter } from "../types"

export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios(url)
    const response = CategoriesResponse.safeParse(data)

    if(response.success) {
        return response.data
    }
}

export async function getRecipes(filters: SearchFilter) {

    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const { data } = await axios(url)
    const response = DrinksResponse.safeParse(data)

    if(response.success){
        return response.data
    }
}

export async function getDetailsById (id: Drink['idDrink']) {

    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } = await axios(url)
    const response = RecipeAPIResponseSchema.safeParse(data.drinks[0])

    if(response.success) {
        return response.data
    }
}