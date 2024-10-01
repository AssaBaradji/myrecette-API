import { Recipe } from '../models/Recipe.js';

class RecipeController {
  static async getByID(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Recipe.getRecipeById(id);
      res.json(result);
    } catch (e) {
      console.log(e.message);
    }
    next();
  }
  static async getAllRecipes(_req, res, next) {
    try {
      const result = await Recipe.getRecipes();
      res.json(result);
    } catch (e) {
      console.log(e.message);
    }
    next();
  }

  static async createRecipe(req, res, next) {
    try {
      const title = req.body.title;
      const type = req.body.type;
      const ingredients = req.body.ingredients;
      await Recipe.createRecipe(title, type, ingredients);
      res.json('Added successfully');
    } catch (e) {
      console.log(e.message);
    }
    next();
  }

  static async deleteRecipe(req, res, next) {
    try {
      const id = req.params.id;
      await Recipe.destroyRecipe(id);
      res.json('Deleted successfully');
    } catch (e) {
      console.log(e.message);
    }
    next();
  }

  static async updateRecipe(req, res, next) {
    const id = req.params.id;
    const { title, type, ingredients } = req.body;

    if (!title || !type || !ingredients) {
      return res.status(400).json({
        error:
          'Tous les champs (title, ingredients, type) doivent être fournis.',
      });
    }

    try {
      await Recipe.updateRecipe(id, title, ingredients, type);
      res.json('Updated successfully');
    } catch {
      res
        .status(500)
        .json({ error: 'Erreur lors de la mise à jour de la recette.' });
    }

    next();
  }
}

export { RecipeController };
