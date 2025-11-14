# SmartHome Secure

Application Web de supervision et de contrôle **simulé** d’objets connectés, réalisée dans le cadre du module **M1 IHM**.

## Fonctionnalités

- Dashboard global : température moyenne, nombre d’objets actifs, état du mode sécurité, nombre d’alertes.
- Page *Objets connectés* : liste des appareils simulés (lumières, capteurs, caméras, porte), possibilité de les activer/désactiver.
- Page *Sécurité* : mode sécurité global, déclenchement d’alertes simulées, journal d’événements.
- Page *Données & Graphiques* : visualisation de l’historique des températures et des alertes via Chart.js.
- Page *À propos* : description du projet, aspects pédagogiques et techniques.

## Stack technique

- **Frontend** : HTML5, CSS3, JavaScript (modules ES6)
- **Visualisation** : Chart.js (CDN)
- **Données** : simulation côté client (aucun backend nécessaire)

## Lancer le projet en local

1. Cloner ou télécharger le dépôt
2. Ouvrir `index.html` dans un navigateur moderne

Ou, pour un workflow plus propre :

- Ouvrir le dossier dans VS Code
- Installer l’extension *Live Server*
- Clic droit sur `index.html` → *Open with Live Server*

## Déploiement

- Le projet peut être déployé en **site statique** (GitHub Pages, Netlify, etc.).
