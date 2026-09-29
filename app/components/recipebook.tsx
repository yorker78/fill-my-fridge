import {Animated, Text, View} from "react-native";
import ScrollView = Animated.ScrollView;
import * as SQLite from 'expo-sqlite';
import FlatList = Animated.FlatList;

/*
const db = SQLite.openDatabaseSync('fill-my-fridge');

db.execSync(`
CREATE TABLE IF NOT EXISTS recipes (
    id             INTEGER  PRIMARY KEY  NOT NULL, 
    name           TEXT                  NOT NULL, 
    version        TEXT                          , 
    cook_time      TEXT                          , 
    cooking_method TEXT                          ,
    yield          INTEGER
);

CREATE TABLE IF NOT EXISTS tags (
    id  INTEGER PRIMARY KEY NOT NULL,
    tag TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe_tags (
    recipe_id      INTEGER NOT NULL,
    tag_id         INTEGER NOT NULL,
    FOREIGN KEY(recipe_id) REFERENCES recipes(id),
    FOREIGN KEY(tag_id) REFERENCES tags(id)
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id                 INTEGER PRIMARY KEY NOT NULL,
    recipe_id          INTEGER NOT NULL,
    food_item_id       INTEGER,
    food_item_quantity INTEGER,
    food_item_unit     TEXT
);

CREATE TABLE IF NOT EXISTS recipe_instructions (
    id                INTEGER PRIMARY KEY NOT NULL,
    recipe_id         INTEGER NOT NULL,
    instruction_order INTEGER NOT NULL,
    instruction_text  TEXT NOT NULL,
    FOREIGN KEY(recipe_id) REFERENCES recipes(id)
);
`);

db.runSync(`INSERT INTO recipes (name, version, cook_time, cooking_method, yield) VALUES (?, ?, ?, ?, ?)`, 'test', '1.0', '0h 0m', 'Saute', 1);

const recipeRows = db.getAllSync('SELECT * FROM recipes')
const recipes = recipeRows.map((recipeRow) => {
    // @ts-ignore
    const ingredientRows = db.getAllSync(`SELECT * FROM recipe_ingredients WHERE recipe_id = ${recipeRow.id}`)
    // @ts-ignore
    const instructionRows = db.getAllSync(`SELECT * FROM recipe_instructions WHERE recipe_id = ${recipeRow.id}`).sort((a, b) => {
        // @ts-ignore
        return a.instruction_order - b.instruction_order
    })
    // @ts-ignore
    const tagRows = db.getAllSync(`SELECT * FROM tags JOIN recipe_tags WHERE recipe_id = ${recipeRow.id}`);



    return {
        // @ts-ignore
        name: recipeRow.name,
        // @ts-ignore
        version: recipeRow.version,
        // @ts-ignore
        cookTime: recipeRow.cook_time,
        // @ts-ignore
        cookingMethod: recipeRow.cooking_method,
        // @ts-ignore
        yield: recipeRow.yield,
        ingredients: ingredientRows.map((ingredient) => {
            return {
                // @ts-ignore
                id: ingredient.food_item_id,
                // @ts-ignore
                quantity: ingredient.food_item_quantity,
                // @ts-ignore
                unit: ingredient.food_item_unit
            }
        }),
        instructions: instructionRows.map((instruction) => {
            // @ts-ignore
            return instruction.instruction_text;
        }),
        tags: tagRows.map((tag) => {
            // @ts-ignore
            return tag.tag;
        })
    }
})
*/


export default function TabSevenScreen() {
    return (
        <FlatList data={recipes} renderItem={({item}) => <Text>{item.name}</Text> }></FlatList>
    )
}