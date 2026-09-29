import { StyleSheet, View } from 'react-native';
import { MethodField } from "@/components/recipe-form-fields/method-field";
import { TextInput } from "react-native-paper";
import { IngredientsField } from "@/components/recipe-form-fields/ingredients-field";
import React, { useState } from "react";
import { StepsField } from "@/components/recipe-form-fields/steps-field";
import { AutocompleteScrollView } from "react-native-paper-autocomplete";
import { TagsField } from "@/components/recipe-form-fields/tags-field";
import { SaveButton } from "@/components/recipe-form-fields/recipe-save-btn";
import { Recipe } from '@/types/recipe';
import {TagsList} from "@/components/recipe-form-fields/tags-list";

export default function CreateRecipeForm(): JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [steps, setSteps] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [method, setMethod] = useState<string>('');

  const handleSave = () => {
    const recipeData: Recipe = {
      name: title,
      version: '1.0',
      cook_time: cookTime,
      cooking_method: method,
      recipe_yield: parseInt(servings, 10),
      recipe_ingredients: ingredients,
      recipe_instructions: steps,
      recipe_tags: tags,
    };
  };

  return (
    <View style={styles.container}>
      <AutocompleteScrollView>
        <View style={styles.cardContainer}>
          <TextInput
            label="Title"
            mode="outlined"
            placeholder="Mom's Tomato Soup"
            value={title}
            onChangeText={setTitle}
            style={styles.textInput}
            textColor="#070707"
          />
          <TextInput
            label="Description"
            mode="outlined"
            placeholder="Homemade Tomato Soup from Mom's Recipe Book"
            value={description}
            onChangeText={setDescription}
            numberOfLines={3}
            style={styles.textInput}
            textColor="#070707"
          />
          <View style={styles.row}>
            <TextInput
                label="Cook Time"
                mode="outlined"
                placeholder="1h 30m"
                value={cookTime}
                onChangeText={setCookTime}
                style={[styles.textInput, {flex: 1, marginRight: 2}]}
                textColor="#070707"
            />

            <TextInput
                label="Servings"
                mode="outlined"
                placeholder="4"
                value={servings}
                onChangeText={setServings}
                style={[styles.textInput, {flex: 1, marginLeft: 2}]}
                textColor="#070707"
            />
          </View>
          <View style={styles.row}>
            <MethodField setMethod={setMethod} />

            <TagsField setTags={setTags} tags={tags} />
          </View>
          <TagsList tags={tags} setTags={setTags} />
        </View>

        <IngredientsField setIngredients={setIngredients} />

        <StepsField setSteps={setSteps} steps={steps} />




        <SaveButton
          recipeData={{
            name: title,
            cook_time: cookTime,
            cooking_method: method,
            recipe_ingredients: ingredients,
            recipe_instructions: steps,
            recipe_tags: tags,
          }}
        />
      </AutocompleteScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 10,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4
  },
  textInput: {
    backgroundColor: "#f8f8f8",
    fontSize: 16,
  },
});
