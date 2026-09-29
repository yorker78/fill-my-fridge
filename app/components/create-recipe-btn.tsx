import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {Link} from "expo-router";

export const CreateRecipeButtons = (props) => {
    const {refreshData} = props;
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Link href="/create-recipe-form" asChild>
          <Button title="New Recipe" />
        </Link>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Import" onPress={() => {
            const newData = {
                name: "new data",
                tags: ["tg1", "tg2"]};
            refreshData(newData);
        }}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20, // Adjust distance from bottom
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});