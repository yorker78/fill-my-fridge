import { StyleSheet, ScrollView, View } from "react-native";
import { PreviewContainer } from '@/components/recipe-preview';
import { CreateRecipeButtons } from '@/components/create-recipe-btn';
import { getSavedRecipes } from '@/scripts/savedRecipes'
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { init } from '@/scripts/init_db';

export default function TabFourScreen() {
    const [exampleData, setExampleData] = useState([]);



    useEffect(() => {
        // Fetch data initially and set it in state
        const fetchData = async () => {
            const data = await AsyncStorage.getItem('recipes');
            if (data !== null) {
                if (data.length === 0) {
                    await init();
                }
                //@ts-ignore
                setExampleData(JSON.parse(data));
            } else {
                await init();
            }
        };
        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount

    // Optional: Add a function to refresh the data
    const refreshData = () => {
        const data = getSavedRecipes();
        setExampleData(data);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <PreviewContainer data={exampleData} />
            </ScrollView>
            <CreateRecipeButtons refreshData={refreshData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 20,
    },
});


