import {NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData, View} from "react-native";
import { Icon, List, TextInput } from "react-native-paper";
import { StepsList } from "@/components/recipe-form-fields/steps-list";
import React from "react";

export const StepsField = ({ setSteps }) => {
  const [steps, setLocalSteps] = React.useState([]);

  const handleAddStep = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const newStep = e.nativeEvent.text;
    if (newStep) {
      setLocalSteps(prevSteps => [...prevSteps, newStep]);
      setSteps(prevSteps => [...prevSteps, newStep]);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <StepsList
        steps={steps}
        setSteps={setSteps}
      />
      <TextInput
        label="Steps"
        placeholder="Mix Tomato paste and spices"
        onSubmitEditing={handleAddStep}
        left={<TextInput.Icon icon="plus" />}
        style={styles.textInput}
        textColor="#070707"
      />
    </View>
  );
};

const styles=StyleSheet.create({
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
    textInput: {
        backgroundColor: "#f8f8f8",
        fontSize: 16,
    },
})