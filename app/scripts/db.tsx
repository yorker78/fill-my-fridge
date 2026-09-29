import SQLite from "expo-sqlite";
import {Recipe, RecipeIngredient, RecipeMap, RecipeTag, TagMap} from "@/types/recipe";
import * as FileSystem from "expo-file-system";
import {Asset} from "expo-asset";
import {SQLiteDatabase} from "expo-sqlite";

type TagRow = {
    TagID: number
    RecipeTag: string
}

type RecipeRow = {
    RecipeName: string
    RecipeVersion: string
    CookTime: string
    CookingMethod: string
    RecipeYield: number
}

type RecipeIngredientRow = {
    RecipeName: string
    RecipeVersion: string
    FDCID: number
    FoodSize: number
    FoodUnit: string
}

type RecipeInstructionRow = {
    RecipeName: string
    RecipeVersion: string
    RecipeInstruction: string
}

// Code Shamelessly Stolen From: https://stackoverflow.com/questions/55622372/expo-sqlite-use-existing-database
const openDB = async() => {
    const internalDbName = "fmf_db.db";
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    if (!(await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
        await FileSystem.makeDirectoryAsync(sqlDir, {intermediates: true});
        const asset = Asset.fromModule(require("../assets/fmf_db.db"));
        await FileSystem.downloadAsync(asset.uri, sqlDir + internalDbName);
    }
    return SQLite.openDatabaseSync(internalDbName);
}



export class Recipes {
    get db(): SQLiteDatabase {
        return this._db as SQLiteDatabase;
    }

    set db(value: SQLiteDatabase) {
        this._db = value;
    }
    get tags(): TagMap {
        return this._tags as TagMap;
    }

    set tags(value: TagMap) {
        this._tags = value;
    }
    get recipes(): RecipeMap {
        return this._recipes as RecipeMap;
    }

    set recipes(value: RecipeMap) {
        this._recipes = value;
    }
    private _recipes: RecipeMap | undefined
    private _tags: TagMap | undefined
    private _db: SQLiteDatabase | undefined

    async Recipes() {
        this._db = await openDB();
        this._recipes = {};
        this._tags = {};
        this._db.getAllSync(
            'SELECT * FROM tags'
            //@ts-ignore
        ).map((tagRow: TagRow) => {
            if (this._tags)
                this._tags[tagRow.TagID] = tagRow.RecipeTag;
        });

        this._db.getAllSync(
            'SELECT * FROM recipe'
            //@ts-ignore
        ).map((recipeRow: RecipeRow) => {
            if (this._db) {
                const recipeIngredients: RecipeIngredient[] = this._db.getAllSync(
                    `SELECT *
                     FROM recipeingredients
                     WHERE RecipeVersion = ${recipeRow.RecipeVersion}
                       AND RecipeName = ${recipeRow.RecipeName}`
                    //@ts-ignore
                ).map((recipeIngredientRow: RecipeIngredientRow) => {
                    return {
                        FDCID: recipeIngredientRow.FDCID,
                        food_size: recipeIngredientRow.FoodSize,
                        food_unit: recipeIngredientRow.FoodUnit
                    }
                });
                const recipeInstructions: string[] = this._db.getAllSync(
                    `SELECT *
                     FROM recipeinstructions
                     WHERE RecipeName = ${recipeRow.RecipeName}
                       AND RecipeVersion = ${recipeRow.RecipeVersion}`
                    //@ts-ignore
                ).map((recipeInstructionRow: RecipeInstructionRow) => {
                    return recipeInstructionRow.RecipeInstruction;
                })
                const recipeTags: RecipeTag[] = this._db.getAllSync(
                    `SELECT *
                     FROM tags
                              JOIN recipetags rt on tags.TagID = rt.TagID
                     WHERE rt.RecipeName = ${recipeRow.RecipeName}
                       AND rt.RecipeVersion = ${recipeRow.RecipeVersion}`
                    //@ts-ignore
                ).map((recipeTagRow: TagRow) => {
                    return {
                        tag_id: recipeTagRow.TagID,
                        tag_text: recipeTagRow.RecipeTag
                    }
                });
                if (this._recipes)
                    this._recipes[recipeRow.RecipeName + recipeRow.RecipeVersion] = {
                        name: recipeRow.RecipeName,
                        version: recipeRow.RecipeVersion,
                        cook_time: recipeRow.CookTime,
                        cooking_method: recipeRow.CookingMethod,
                        recipe_yield: recipeRow.RecipeYield,
                        recipe_ingredients: recipeIngredients,
                        recipe_instructions: recipeInstructions,
                        recipe_tags: recipeTags
                    }
            }
        })
    }

    public addRecipe(recipe: Recipe): void {
        if (this._db) {
            this._db.runSync(
                `INSERT INTO recipe (RecipeName, RecipeVersion, CookTime, CookingMethod, RecipeYield)
                 VALUES (${recipe.name}, ${recipe.version}, ${recipe.cook_time}, ${recipe.cooking_method},
                         ${recipe.recipe_yield})`
            );
            recipe.recipe_ingredients.map((ingredient: RecipeIngredient) => {
                if (this._db) {
                    this._db.runSync(
                        `INSERT INTO recipeingredients (RecipeName, RecipeVersion, FDCID, FoodSize, FoodUnit)
                         VALUES (${recipe.name}, ${recipe.version}, ${ingredient.FDCID}, ${ingredient.food_size},
                                 ${ingredient.food_unit})`
                    );
                }
            });
            recipe.recipe_instructions.map((instruction: string) => {
                if (this._db) {
                    this._db.runSync(
                        `INSERT INTO recipeinstructions (RecipeName, RecipeVersion, RecipeInstruction)
                         VALUES (${recipe.name}, ${recipe.version}, ${instruction})`
                    );
                }
            });
            recipe.recipe_tags.map((tag: RecipeTag) => {
                if (this._db) {
                    this._db.runSync(
                        `INSERT OR
                         REPLACE
                         INTO tags (TagID, RecipeTag)
                         VALUES (${tag.tag_id}, ${tag.tag_text})`
                    )
                    this._db.runSync(
                        `INSERT INTO recipetags (RecipeName, RecipeVersion, TagID)
                         VALUES (${recipe.name}, ${recipe.version}, ${tag.tag_id})`
                    );
                    if (this._tags)
                        this._tags[tag.tag_id] = tag.tag_text;
                }
            });
            if (this._recipes)
                this._recipes[recipe.name + recipe.version] = recipe;
        }
    }

    public getRecipe(name: string, version: string) {
        if (this._recipes)
            return this._recipes[name+version];
    }
}