export type RecipeIngredient = {
    description: string;
    FDCID: number
    food_size: number
    food_unit: string
}

export type RecipeTag = {
    tag_id: number
    tag_text: string
}

export type Recipe = {
    name: string
    version: string
    cook_time: string
    cooking_method: string
    recipe_yield: number
    recipe_ingredients: RecipeIngredient[]
    recipe_instructions: string[]
    recipe_tags: RecipeTag[]
}

export type RecipeMap = {
    [id: string]: Recipe
}

export type TagMap = {
    [id: number]: string
}