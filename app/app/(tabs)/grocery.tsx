import {StyleSheet, ScrollView, View} from "react-native";
import {PreviewContainer} from '@/components/recipe-preview';
import {CreateRecipeButtons} from '@/components/create-recipe-btn';

export default function TabFourScreen() {
  const exampleData = [
    {
      name: "Title 1",
      description: "Short description for card 1.",
      tags: ["Tag1", "React Native"],
    },
    {
      name: "Title 2",
      description: "This is a longer description for card 2, showcasing more content.",
      tags: ["Mobile", "Development", "Example", "Development", "Example", "Development", "Example"],
    },
    {
      name: "Title 3",
      description: "Another example description for card 3.",
      tags: ["Card", "Preview"],
    },
    {
      name: "Title 4",
      description: "Yet another description, testing how this card handles wrapping.",
      tags: ["Test", "React", "Tags"],
    },
    {
      name: "Title 4",
      description: "Yet another description, testing how this card handles wrapping.",
      tags: ["Test", "React", "Tags"],
    },
    {
      name: "Title 4",
      description: "Yet another description, testing how this card handles wrapping.",
      tags: ["Test", "React", "Tags"],
    },
    {
      name: "Title 4",
      description: "Yet another description, testing how this card handles wrapping.",
      tags: ["Test", "React", "Tags"],
    },
    {
      name: "Title 4",
      description: "Yet another description, testing how this card handles wrapping.",
      tags: ["Test", "React", "Tags"],
    },
    {
      name: "Title 4",
      description: "Yet another description, testing how this card handles wrapping.",
      tags: ["Test", "React", "Tags"],
    },
  ];

    return (
        <View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <PreviewContainer data={exampleData} />
            </ScrollView>
            <CreateRecipeButtons />
        </View>
    );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
});


