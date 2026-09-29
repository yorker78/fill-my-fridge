import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '@/types/recipe';
import {router} from "expo-router";

interface CreateRecipeButtonsProps {
  recipeData: Recipe,
  refreshData: Function
}

export const SaveButton = ({ recipeData, refreshData }: CreateRecipeButtonsProps) => {
  const handleSaveRecipe = async () => {

      await saveRecipeToJson(recipeData);
      try {
        const savedRecipes = await AsyncStorage.getItem('recipes');
        const recipesJson = savedRecipes ? JSON.parse(savedRecipes) : [];
        console.log('Saved Recipes:', recipesJson);
      } catch (error) {
        console.error('Error retrieving recipes:', error);
      }
      router.push("../", {relativeToDirectory: true})
  };


  const saveRecipeToJson = async (recipe: Recipe) => {
    try {

      const existingRecipes = await AsyncStorage.getItem('recipes');
      const recipesJson = existingRecipes ? JSON.parse(existingRecipes) : [];
      recipe.version = "1.0"
      recipesJson.push(recipe);

      await AsyncStorage.setItem('recipes', JSON.stringify(recipesJson));

      console.log('New Recipe Saved:', recipe);
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Save Recipe"
          onPress={handleSaveRecipe}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
  },
});
