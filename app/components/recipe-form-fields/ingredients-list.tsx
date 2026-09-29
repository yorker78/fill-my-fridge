import { IconButton, List } from "react-native-paper";
import { GestureResponderEvent } from "react-native";
import {RecipeIngredient} from "@/types/recipe";

export const IngredientsList = (props: { ingredients: RecipeIngredient[]; setIngredients: Function }) => {
    const { ingredients, setIngredients } = props;
    return ingredients.map((ingredient: RecipeIngredient, index: number) => {
        return (
            <List.Item
                title={`${ingredient.food_size}${ingredient.food_unit} ${ingredient.description}`}
                key={index}
                right={() => (
                    <IconButton
                        icon="close"
                        size={20}
                        onPress={(e: GestureResponderEvent) => {
                            setIngredients(ingredients.filter((_, i) => i !== index));
                        }}
                    />
                )}
            />
        );
    });
};
