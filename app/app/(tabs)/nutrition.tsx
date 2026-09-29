import {Text, View, StyleSheet} from "react-native";
import { Hello } from '@/components/testComponent';
import { scrapeWebPage, parseRecipeData } from '@/scripts/scrap-allrecipe';
import { useState, useEffect } from 'react';


export default function TabSixScreen() {
    const [html, setHtml] = useState(null); // State to store the scraped HTML

    //html = scrapeWebPage("https://www.allrecipes.com/recipe/15206/cocktail-meatballs/");
    //console.log(html);
    console.log("hello");

    useEffect(() => {
            // Async function to fetch the HTML data
            const fetchData = async () => {
                const data = await scrapeWebPage("https://www.allrecipes.com/recipe/15206/cocktail-meatballs/");
                setHtml(data); // Update state with the fetched HTML
            };

            fetchData(); // Call the async function
    }, []);

    if (!html) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.cardContainer}>
            <Text>Nutrition Test</Text>
            <Hello />
            <Text>{JSON.stringify(parseRecipeData(html))}</Text>
        </View>
    );

}

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
  }
});
