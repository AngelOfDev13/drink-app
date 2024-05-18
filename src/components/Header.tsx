import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

const Header = () => {
    
    const { pathname } = useLocation() 

    const [ searchFilter, setSearchFilter ] = useState({
        ingredient: '',
        category: ''

    })

    const isHome = useMemo(() => pathname === '/', [pathname])

    const { fetchCategory, categories, searchRecipes, showNotification } = useAppStore()

    useEffect(() => {
        fetchCategory()
    },[])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilter({
            ...searchFilter,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(searchFilter).includes('')) {
                console.log('todos los campos son obligatorios')
                showNotification({ text: 'Todos los campos son obligatorios', error: true})
                return
            }
            searchRecipes(searchFilter)
    }

    

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/logo.svg" alt="logotipo" className="w-32"/>
                    </div>

                    <nav className="flex gap-4">
                        <NavLink 
                        to={'/'} 
                        className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'} >Inicio</NavLink>
                        <NavLink
                        to={'/favoritos'} 
                        className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Favoritos</NavLink>
                    </nav>
                </div>

                {
                    isHome && (
                        <form action="" 
                            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow-md space-y-6"
                            onSubmit={ handleSubmit }>
                            <div className="space-y-4">
                                <label 
                                    htmlFor="ingredient" 
                                    className="block text-white uppercase font-extrabold text-lg">
                                    Nombre o Ingredientes:
                                </label>

                                <input 
                                    name="ingredient" 
                                    type="text" 
                                    id="ingredient"
                                    className="p-3 w-full focus:outline-none rounded-lg" 
                                    placeholder="Nombre o Ingrediente. Ej: Vodka, Tequila, Café"
                                    onChange={ handleChange }
                                    value={searchFilter.ingredient}  />
                            </div>
                            <div className="space-y-4">
                                <label 
                                    htmlFor="category" 
                                    className="block text-white uppercase font-extrabold text-lg">
                                    Categoría:
                                </label>

                                <select 
                                    name="category"
                                    id="category"
                                    className="p-3 w-full focus:outline-none rounded-lg"
                                    onChange={ handleChange }
                                    value={searchFilter.category}>
                                        <option value="" hidden>
                                            Seleccione
                                        </option>
                                        {
                                            categories.drinks.map(category => (
                                                <option key={category.strCategory} value={category.strCategory}> {category.strCategory} </option>
                                            ))
                                        }

                                    </select>

                                    <input 
                                        type="submit"
                                        value='Buscar Recetas'
                                        className="cursor-pointer bg-orange-800 hover:bg-orange-900
                                        text-white font-extrabold w-full p-2 rounded-lg uppercase" />
                            </div>
                        </form>
                    )
                }
            </div>
        </header>
    )
}

export default Header