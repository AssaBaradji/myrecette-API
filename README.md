# Recipe API

## Description

Ce projet backend a été développé en Express.js pour gérer des recettes via une API RESTful consommée par un frontend Vue.js. Le backend permet la gestion des recettes avec des fonctionnalités CRUD (Create, Read, Update, Delete) et est connecté à une base de données MySQL.

## Diagramme de Classes

![Diagramme de Classes](./src/assets/Recette%20UML.png)

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- Node.js
- npm
- MySQL
- Docker (optionnel)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. Clonez le dépôt :

```bash
   git clone https://github.com/AssaBaradji/myrecette-API.git
```

2.Installez les dépendances :

```bash
   cd myrecette-API
   npm install
```

## Configuration de la Base de Données

1. Créez un fichier `.env` à la racine du projet en vous basant sur le fichier `.env.example` fourni. Ce fichier contient les variables d'environnement nécessaires pour configurer la connexion à la base de données MySQL.

2. Dans le fichier `/assets/script.sql`, vous trouverez toutes les commandes SQL nécessaires pour créer la base de données et les tables associées.

3. L'application se connecte automatiquement à la base de données en utilisant les variables d'environnement définies dans le fichier `.env`.

## Utilisation

1. Démarrez l'application avec la commande suivante :

```bash
   npm start
```

2.L'application sera disponible à l'adresse suivante : `http://localhost:3000`.

## Tests avec Postman

Une collection Postman est disponible dans le fichier `/assets/Recipe API.postman_collection.json` contenant des requêtes pour tester les différents endpoints de l'API.

## Endpoints de l'API

1. **Récupérer une Recette par ID**

   - **Endpoint :** `GET /recipes/:id`
   - **Description :** Récupérer une seule recette par son ID.
   - **Réponse :** Objet recette ou une erreur 404 si non trouvé.

2.**Récupérer Toutes les Recettes**

- **Endpoint :** `GET /recipes`
- **Description :** Récupérer toutes les recettes de la base de données.
- **Réponse :** Tableau d'objets recette.

  3.**Créer une Nouvelle Recette**

- **Endpoint :** `POST /recipes`
- **Description :** Créer une nouvelle recette.
- **Corps de la requête :**

  ```json
  {
    "title": "Titre de la Recette",
    "ingredient": "Liste des Ingrédients",
    "type": "Type de Recette"
  }
  ```

- **Réponse :** Retourne l'ID de la recette nouvellement créée.

  4.**Mettre à Jour une Recette par ID**

- **Endpoint :** `PUT /recipes/:id`
- **Description :** Mettre à jour une recette existante par son ID.
- **Corps de la requête :**

  ```json
  {
    "title": "Titre Mis à Jour",
    "ingredient": "Liste des Ingrédients Mise à Jour",
    "type": "Type de Recette Mis à Jour"
  }
  ```

- **Réponse :** Confirmation de la mise à jour réussie ou une erreur 404 si non trouvé.

  5.**Supprimer une Recette par ID**

- **Endpoint :** `DELETE /recipes/:id`
- **Description :** Supprimer une recette par son ID.
- **Réponse :** Confirmation de la suppression réussie ou une erreur 404 si non trouvé.

## Tests Unitaires

Des tests unitaires sont disponibles pour vérifier que les actions CRUD fonctionnent correctement.

Exécutez les tests avec la commande suivante :

```bash
npm test
```

## Analyse de Code et Formatage

- **ESLint et Prettier sont intégrés :**

  - Exécutez ESLint pour analyser statiquement le code :

```bash
   npm run lint
```

- Exécutez Prettier pour formater automatiquement le code :

```bash
   npm run format
```

## Étapes pour Construire et Lancer le Conteneur Docker

1. Initialisez Docker (si ce n'est pas déjà fait) :

```bash
   docker init
```

2.Construisez l'image Docker à partir du Dockerfile :

```bash
docker build -t myrecette-api-app .
```

3.Lancez un conteneur à partir de cette image :

```bash
docker run -p 3000:3000 myrecette-api-app
```

4.Si vous utilisez un fichier `docker-compose.yml`, démarrez l'application et MySQL avec la commande suivante :

```bash
   docker-compose up
```

5.Pour interagir avec MySQL dans le conteneur Docker, utilisez la commande suivante :

```bash
   docker exec -it my_new_mysql_container mysql -u root -p
```

## Auteur

[Assa Baradji](https://github.com/AssaBaradji)
