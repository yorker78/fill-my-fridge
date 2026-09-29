import axios from 'axios';
import * as cheerio from 'react-native-cheerio';

type Ingredient = {
    quantity: string | number | null;
    unit: string | null;
    ingredient: string | null;
};

type Recipe = {
    title: string;
    ingredients: Ingredient[];
    instructions: string[];
};

function convertFractionToDecimal(fraction: string): number | string {
    const fractionMap: { [key: string]: number } = {
        '½': 0.5,
        '⅓': 0.3333,
        '⅔': 0.6666,
        '¼': 0.25,
        '¾': 0.75,
        '⅕': 0.2,
        '⅖': 0.4,
        '⅗': 0.6,
        '⅘': 0.8,
        '⅑': 0.1111,
        '⅒': 0.1
    };

    return fractionMap[fraction] || fraction;
}

export async function scrapeWebPage(url: string): Promise<string | null> {
    try {
        // Fetch the HTML content of the page
        const { data: html } = await axios.get(url);
        return html;
    } catch (error) {
        console.error('Error scraping the recipe:', (error as Error).message);
        return null;
    }
}

export function parseRecipeData(html: string | null): Promise<Recipe | string> {
    if (html === null) {
        return "null";
    }
    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Extract the recipe title
    const title = $('#article-header--recipe_1-0 h1.article-heading').text().trim();

    // Extract ingredients
    const ingredients: Ingredient[] = [];
    $('#mm-recipes-structured-ingredients_1-0 ul li p').each((_, element) => {
        let ingredient: Ingredient = {
            quantity: null,
            unit: null,
            ingredient: null,
        };

        // Look for the span with data-ingredient-name="true"
        $(element).find('span[data-ingredient-name="true"]').each((_, span) => {
            ingredient.ingredient = $(span).text().trim();
        });
        // Look for the span with data-ingredient-unit="true"
        $(element).find('span[data-ingredient-unit="true"]').each((_, span) => {
            ingredient.unit = $(span).text().trim();
        });

        // Look for the span with data-ingredient-quantity="true"
        $(element).find('span[data-ingredient-quantity="true"]').each((_, span) => {
            ingredient.quantity = $(span).text().trim();
        });

        const converted = convertFractionToDecimal("" + ingredient.quantity);
        console.log("unit = ", converted);
        ingredient.quantity = converted;

        ingredient.quantity = parseFloat(String(ingredient.quantity));

        ingredients.push(ingredient);
    });

    // Extract instructions
    const instructions: string[] = [];
    $('#mm-recipes-steps__content_1-0 ol li').each((_, element) => {
        const instruction = $(element).find('p').text().trim();
        instructions.push(instruction);
    });

    const recipe: Recipe = {
        title: title,
        ingredients: ingredients,
        instructions: instructions,
    };

    console.log(recipe);
    return recipe;
}