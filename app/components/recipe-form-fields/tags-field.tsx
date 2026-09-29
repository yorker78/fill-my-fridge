import React, { useState } from 'react';
import {NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData, View} from 'react-native';
import { Autocomplete } from "react-native-paper-autocomplete";
import { RecipeTag } from "@/types/recipe";
import { TagsList } from "@/components/recipe-form-fields/tags-list";

interface TagsFieldProps {
  setTags: React.Dispatch<React.SetStateAction<RecipeTag[]>>;
  tags: RecipeTag[];
}

export const TagsField = ({ setTags, tags }: TagsFieldProps) => {
  const options = [
    { label: 'Dinner', value: 0 },
    { label: 'Soup', value: 1 },
    { label: 'Breakfast', value: 2 },
    { label: 'Vegetarian', value: 3 }
  ];

  return (
    <>
      <View style={styles.rowItem}>
        <Autocomplete
          value={null}
          onChange={(newValue) => {
            if (newValue) {
              const newTag: RecipeTag = {
                tag_id: newValue.value,
                tag_text: newValue.label
              };
              setTags([...tags, newTag]);
            }
          }}
          options={options}
          inputProps={{
            label: 'Tags',
            placeholder: 'Dinner',
            onSubmitEditing: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
              setTags([
                ...tags,
                options.filter((tag) => tag.label === e.nativeEvent.text)[0]
              ]);
            },
            style: styles.textInput,
            textColor: "#070707"
          }}
          listProps={{}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#f8f8f8",
    fontSize: 16,
  },
  rowItem: {
    flex: 1,
    marginLeft: 2
  }
})