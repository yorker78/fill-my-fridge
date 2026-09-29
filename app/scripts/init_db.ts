import React from "react";
import { getSavedRecipes } from "./savedRecipes";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const init = async () => {
    try {
        const existingRecipes = await AsyncStorage.getItem('recipes');
        const recipesJson = existingRecipes ? JSON.parse(existingRecipes) : [];

        const recipe = getSavedRecipes();
        recipesJson.push(recipe);

        await AsyncStorage.setItem('recipes', JSON.stringify(recipesJson));

        console.log('New Recipe Saved:', recipe);
    } catch (error) {
        console.error('Error saving recipe:', error);
    }
}