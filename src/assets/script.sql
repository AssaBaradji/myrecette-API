CREATE DATABASE IF NOT EXISTS recipe_db;

USE recipe_db;

CREATE TABLE recipes_new (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL,
    ingredients TEXT NOT NULL,
    type ENUM('starter', 'main course', 'dessert') NOT NULL
);

INSERT INTO
    recipes (title, ingredients, type)
VALUES
    (
        'Tomato Soup',
        '500g tomatoes, 1 onion, 2 garlic cloves, 200ml vegetable stock',
        'starter'
    ),
    (
        'Spaghetti Carbonara',
        '200g spaghetti, 100g pancetta, 2 eggs, 50g parmesan cheese',
        'main course'
    ),
    (
        'Chocolate Cake',
        '200g flour, 100g cocoa powder, 3 eggs, 200g sugar, 100g butter',
        'dessert'
    ),
    (
        'Caesar Salad',
        '1 romaine lettuce, 100g parmesan cheese, croutons, 100g Caesar dressing',
        'starter'
    ),
    (
        'Grilled Salmon',
        '200g salmon, olive oil, salt, pepper, lemon',
        'main course'
    ),
    (
        'Apple Pie',
        '2 apples, 200g flour, 100g butter, 50g sugar',
        'dessert'
    );