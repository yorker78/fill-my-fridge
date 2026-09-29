import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Chip } from '@/components/chip'

export const RecipePreview = ({ data }) => {
  const { name, recipe_tags } = data;

  return (
    <Link href={{
      pathname: "/view-recipe-form",
      params: { recipe: JSON.stringify(data) },
    }} asChild>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.tagsContainer}>
          {recipe_tags.map((tag, index) => (
            <Chip key={index} label={tag.tag_text} />
          ))}
        </View>
      </View>
    </Link>
  );
};

export const PreviewContainer = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <RecipePreview data={item} key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
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
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alightItems: 'flex-start',
    padding: 10,
    gap: 10,
  },
});


