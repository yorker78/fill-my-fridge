import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Chip } from "@/components/chip";
import { ScrollView } from "react-native-gesture-handler";
import {RecipeIngredient, RecipeTag} from "@/types/recipe";

export default function ViewRecipeForm(): JSX.Element {
    const recipe_list = useLocalSearchParams();
    console.log(JSON.parse(recipe_list.recipe));
    //@ts-ignore
    const recipe = JSON.parse(recipe_list.recipe);
    //@ts-ignore
    const parsedTags = recipe.recipe_tags ? recipe.recipe_tags : [];
    //@ts-ignore
    const ingredients = recipe.recipe_ingredients ? recipe.recipe_ingredients : [];
    //@ts-ignore
    const instructions = recipe.recipe_instructions ? recipe.recipe_instructions : [];

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Viewing Recipe: {recipe.name}</Text>
                <Text style={styles.subtitle}>version: {recipe.version}</Text>
                <Text style={styles.subtitle}>Cook Time: {recipe.cook_time}</Text>
                <Text style={styles.subtitle}>Cook Method: {recipe.cooking_method}</Text>
                <Text style={styles.subtitle}>Serves: {recipe.recipe_yield}</Text>

                <View style={styles.ingredientsContainer}>
                    <Text style={styles.subtitle}>Ingredients:</Text>
                    {ingredients.map((ingredient: RecipeIngredient, index: number) => (
                        <Text key={index} style={styles.ingredientItem}>
                            • {ingredient.food_size} {ingredient.food_unit} {ingredient.description}
                        </Text>
                    ))}
                </View>

                {/* Instructions Box */}
                <View style={styles.instructionsContainer}>
                    <Text style={styles.subtitle}>Instructions:</Text>
                    {instructions.map((instruction: string, index: number) => (
                        <Text key={index} style={styles.instructionItem}>
                            {index + 1}. {instruction}
                        </Text>
                    ))}
                </View>

                <Text style={styles.subtitle}>Tags:</Text>
                <View style={styles.tagsContainer}>
                    {parsedTags.map((tag: RecipeTag, index: number) => (
                        <Chip key={index} label={tag.tag_text} style={styles.tag} />
                    ))}
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#555",
        marginBottom: 10,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
    },
    tag: {
        marginRight: 8,
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: "#f8f8f8",
        fontSize: 16,
    },
    ingredientsContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
    },
    ingredientItem: {
        fontSize: 16,
        color: "#444",
        marginBottom: 5,
    },
    instructionsContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
    },
    instructionItem: {
        fontSize: 16,
        color: "#444",
        marginBottom: 5,
    },
});
