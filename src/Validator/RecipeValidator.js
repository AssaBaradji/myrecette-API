import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Recipe } from '../models/Recipe.js';

const validTypes = ['starter', 'main course', 'dessert'];

const addRequestValidator = [
  check('title')
    .notEmpty()
    .withMessage('Titre ne peut pas être vide!')
    .bail()
    .isLength({ min: 4 })
    .withMessage('Minimum 4 caractères requis!')
    .bail()
    .custom(async (value) => {
      const count = await Recipe.checkRecipe(value);
      if (count > 0) {
        throw new Error('Cette recette existe déjà!');
      }
      return true;
    }),
  check('type')
    .notEmpty()
    .withMessage('Type ne peut pas être vide!')
    .bail()
    .isIn(validTypes)
    .withMessage(`Type doit être l'un des suivants : ${validTypes.join(', ')}`)
    .bail(),
  check('ingredients')
    .notEmpty()
    .withMessage('Ingrédients ne peuvent pas être vides!')
    .bail()
    .isLength({ min: 10, max: 50 })
    .withMessage('Les ingrédients doivent comporter entre 10 et 50 caractères!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const deleteRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('Id est obligatoire!')
    .bail()
    .custom(async (value) => {
      const count = await Recipe.existsById(value);
      if (count === 0) {
        throw new Error("Cette recette n'existe pas!");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const updateRequestValidator = [
  param('id')
    .notEmpty()
    .withMessage('Id est requis!')
    .bail()
    .custom(async (value) => {
      const count = await Recipe.existsById(value);
      if (count === 0) {
        throw new Error("Cette recette n'existe pas!");
      }
      return true;
    }),
  check('title')
    .notEmpty()
    .withMessage('Titre ne doit pas être vide')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Minimum 6 caractères requis!')
    .bail()
    .custom(async (value) => {
      const count = await Recipe.checkRecipe(value);
      if (count > 0) {
        throw new Error('Cette recette existe déjà!');
      }
      return true;
    }),
  check('type')
    .notEmpty()
    .withMessage('Type ne peut pas être vide!')
    .bail()
    .isIn(validTypes)
    .withMessage(`Type doit être l'un des suivants : ${validTypes.join(', ')}`)
    .bail(),
  check('ingredients')
    .notEmpty()
    .withMessage('Ingrédients ne peuvent pas être vides!')
    .bail()
    .isLength({ min: 10, max: 50 })
    .withMessage('Les ingrédients doivent comporter entre 10 et 50 caractères!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

export { addRequestValidator, deleteRequestValidator, updateRequestValidator };
