# Quiz

Un petit jeu de quiz fait avec React, basé sur l'API OpenTDB.
On choisit une catégorie et une difficulté, et on répond à 10 questions

## Lancer le projet

Il faut avoir Node.js installé, puis dans le terminal :

npm install
npm run dev

Ensuite on ouvre http://localhost:5173 dans le navigateur

## Ce que j'ai fait

J'ai créé une app avec 3 pages :
- La page d'accueil où on choisit la catégorie et la difficulté
- La page quiz avec les 10 questions une par une
- La page score qui affiche le résultat final

Les questions viennent directement de l'API OpenTDB
J'ai aussi ajouté un feedback visuel (vert/rouge) après chaque réponse
et une barre de progression pour savoir où on en est

## J'ai pas fait

- Le timer par question (bonus A)
- Le hall of fame avec localStorage (bonus B)