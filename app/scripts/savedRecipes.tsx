export const getSavedRecipes = () => {
  const exampleData = {
    "name": "Mom's Tomato Soup",
    "version": "1.0",
    "cook_time": "1h",
    "cooking_method": "boil",
    "recipe_yield": 4,
    "recipe_ingredients": [
      {
        "food_size": 4,
        "food_unit": "cups",
        "description": "chopped fresh tomatoes"
      },
      {
        "food_size": 2,
        "food_unit": "cups",
        "description": "chicken broth"
      },
      {
        "food_size": 4,
        "food_unit": "cloves",
        "description": "garlic"
      },
      {
        "food_size": 1,
        "food_unit": "large slice",
        "description": "of onion"
      },
      {
        "food_size": 2,
        "food_unit": "tablespoons",
        "description": "butter"
      },
      {
        "food_size": 2,
        "food_unit": "tablespoons",
        "description": "all-purpose flour"
      },
      {
        "food_size": 2,
        "food_unit": "teaspoons",
        "description": "white sugar, or to taste"
      },
      {
        "food_size": 1,
        "food_unit": "teaspoon",
        "description": "salt, or to taste"
      }
    ],
    "recipe_instructions": [
      "Gather the ingredients.",
      "Combine tomatoes, chicken broth, garlic cloves, and a large slice of onion in a stockpot over medium heat. Bring to a boil, and gently simmer for about 20 minutes to blend flavors.",
      "Remove from heat and run the mixture through a food mill into a large bowl, or pan. Discard any stuff left over in the food mill.",
      "Melt butter over medium heat in the now empty stockpot. Stir in flour to make a roux by cooking, whisking constantly, until mixture turns medium brown.",
      "Gradually whisk in a bit of the tomato mixture to prevent lumps from forming, then stir in the rest.",
      "Season with sugar and salt to taste.",
      "Serve hot and enjoy!"
    ],
    "recipe_tags": [
      {
        "tag_text": "Soup",
        "tag_id": 0
      }
    ]
  };
  return exampleData;
}