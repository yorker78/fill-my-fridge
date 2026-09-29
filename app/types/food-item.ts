export type FoodItem = {
    FDCID: number
    Description: string
    FoodCategory: string
    FoodPortion: string
    BrandOwner: string
    GTINUPC: number
    ServingSize: number
    ServingSizeUnit: string
    FoodType: string
    Ingredients: string
}

export type FoodItemMap = {
    [id: number]: FoodItem
}