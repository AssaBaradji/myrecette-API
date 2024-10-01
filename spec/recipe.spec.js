import { Recipe } from "../src/models/Recipe.js";

describe("Recipe Model Tests", () => {
  let recipeId = 23;

  it("can create a recipe", async () => {
    const recipe = {
      title: "Domoda",
      ingredients: "sel,eau, ll",
      type: "main course",
    };

    recipeId = await Recipe.createRecipe(
      recipe.title,
      recipe.type,
      recipe.ingredients
    );

    const recipeCreated = await Recipe.getRecipes();
    const createdRecipe = recipeCreated.find((r) => r.id === recipeId);

    expect(recipeId).not.toBeNull();
    expect(createdRecipe).not.toBeUndefined();
    expect(createdRecipe.title).toBe(recipe.title);
    expect(createdRecipe.ingredients).toBe(recipe.ingredients);
    expect(createdRecipe.type).toBe(recipe.type);
  });

  it("should not create a recipe with missing fields", async () => {
    await expectAsync(
      Recipe.createRecipe(null, "main course", "sel, eau")
    ).toBeRejectedWithError("Column 'title' cannot be null");

    await expectAsync(
      Recipe.createRecipe("Domoda", null, "sel, eau")
    ).toBeRejectedWithError("Column 'type' cannot be null");
  });

  it("can retrieve all recipes", async () => {
    const allRecipes = await Recipe.getRecipes();

    expect(allRecipes).not.toBeNull();
    expect(Array.isArray(allRecipes)).toBe(true);
  });

  it("can update a recipe", async () => {
    const updatedRecipe = {
      title: "Updated Mafé",
      ingredients: "sel, eau, riz",
      type: "main course",
    };

    const result = await Recipe.updateRecipe(
      recipeId,
      updatedRecipe.title,
      updatedRecipe.ingredients,
      updatedRecipe.type
    );

    const updatedRecipeFromDb = await Recipe.getRecipes();
    const updatedRecipeObj = updatedRecipeFromDb.find((r) => r.id === recipeId);

    expect(result).toBe(true);
    expect(updatedRecipeObj.title).toBe(updatedRecipe.title);
    expect(updatedRecipeObj.ingredients).toBe(updatedRecipe.ingredients);
    expect(updatedRecipeObj.type).toBe(updatedRecipe.type);
  });

  it("should not update a recipe that does not exist", async () => {
    await expectAsync(
      Recipe.updateRecipe(9999, "Non-existent Recipe", "none", "main course")
    ).toBeRejectedWithError("Recipe not found");
  });
  it("can delete a recipe", async () => {
    const result = await Recipe.destroyRecipe(recipeId);
    const recipesAfterDeletion = await Recipe.getRecipes();

    const recipeAfterDeletion = recipesAfterDeletion.find(
      (r) => r.id === recipeId
    );

    expect(result).toBe(true);
    expect(recipeAfterDeletion).toBeUndefined();
  });

  it("should not delete a recipe that does not exist", async () => {
    await expectAsync(Recipe.destroyRecipe(9999)).toBeRejectedWithError(
      "Recipe not found"
    );
  });
});
