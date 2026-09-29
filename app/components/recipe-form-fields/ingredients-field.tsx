// IngredientsField.tsx
import { Autocomplete } from "react-native-paper-autocomplete";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData, View } from "react-native";
import { IngredientsList } from "@/components/recipe-form-fields/ingredients-list";
import { Dropdown } from "react-native-paper-dropdown";
import { RecipeIngredient } from "@/types/recipe";

const UNITS = [
  { label: 'cup', value: 'cup' },
  { label: 'tbsp', value: 'tbsp' },
  { label: 'tsp', value: 'tsp' },
  { label: 'lb.', value: 'lb.' },
  { label: 'g', value: 'g' },
  { label: 'mL', value: 'mL' },
  { label: 'oz', value: 'oz' },
];

export const IngredientsField = ({ setIngredients }) => {
  const options = [
    { value: 348658, label: "Cascadian Farm Organic French Vanilla Almond Granola" },
    { value: 1105951, label: "Pepperidge Farm Crackers" },
    { value: 2259794, label: "Yogurt, Greek, plain, whole milk" },
    { value: 2346396, label: "Oats, whole grain, rolled, old fashioned" },
    { value: 2346410, label: "Raspberries, raw" },
    { value: 2346411, label: "Blueberries, raw" },
  ];
  const [ingredients, setLocalIngredients] = useState([]);
  const [unit, setUnit] = useState({ label: '', value: '' });
  const [quantity, setQuantity] = useState(0);

  const addIngredient = (newIngredient) => {
    setLocalIngredients([...ingredients, newIngredient]);
    setIngredients([...ingredients, newIngredient]);
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        <IngredientsList
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          label="Amt"
          mode="outlined"
          placeholder="1"
          value={quantity.toString()}
          onChange={(newValue) => {
            setQuantity(parseFloat(newValue.nativeEvent.text));
          }}
          style={[styles.textInput, {flex: 1, marginRight: 4}]}
          textColor="#070707"
        />
        <Dropdown
          label="Unit"
          placeholder=""
          options={UNITS}
          value={unit.label}
          onSelect={(newValue) => {
            setUnit(UNITS.find(filteredUnit => filteredUnit.label === newValue));
          }}
        />
        <Autocomplete
          value={null}
          onChange={(newValue) => {
            if (newValue) {
              const newIngredient: RecipeIngredient = {
                description: newValue.label,
                FDCID: newValue.value,
                food_size: quantity,
                food_unit: unit.label,
              };
              addIngredient(newIngredient);
            }
          }}
          options={options}
          inputProps={{
            label: 'Ingredients',
            placeholder: 'Roma Tomato',
            onSubmitEditing: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
              const newIngredient = options.find(option => option.label === e.nativeEvent.text);
              if (newIngredient) addIngredient(newIngredient);
            },
            style: styles.textInput,
            textColor: "#070707"
          }}
          style={{flex: 8, marginLeft: 4}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: "row"
  },
  textInput: {
    backgroundColor: "#f8f8f8",
    fontSize: 16,
  },
})