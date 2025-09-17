# Configuration du déploiement automatique Netlify

## Étapes pour configurer le déploiement automatique :

### 1. Connexion à Netlify
- Allez sur [netlify.com](https://netlify.com)
- Connectez-vous avec votre compte GitHub

### 2. Nouveau site depuis Git
- Cliquez sur "New site from Git"
- Sélectionnez "GitHub" comme provider
- Choisissez votre repository `site-metagora`

### 3. Configuration du build
- **Branch to deploy**: `master` (ou `main`)
- **Build command**: `echo 'Site statique - pas de build nécessaire'`
- **Publish directory**: `.` (racine du projet)

### 4. Variables d'environnement (optionnel)
- Aucune variable spéciale nécessaire pour ce site statique

### 5. Déploiement automatique
Une fois configuré, Netlify :
- ✅ Détectera automatiquement chaque push sur la branche master
- ✅ Déclenchera un nouveau build
- ✅ Déploiera automatiquement les changements
- ✅ Fournira une URL de prévisualisation pour chaque PR

## Fichiers de configuration

- `netlify.toml` : Configuration automatique du build et des headers
- Ce fichier définit les paramètres de cache, sécurité et redirections

## Fonctionnalités activées

- 🔒 Headers de sécurité (XSS, CSRF protection)
- 🚀 Cache optimisé pour les assets statiques
- 📱 Gestion des erreurs 404 vers index.html
- ⚡ Déploiement automatique sur chaque push

## URL du site
Après configuration, votre site sera accessible via :
- URL Netlify : `https://[nom-du-site].netlify.app`
- Domaine personnalisé (configurable dans les paramètres Netlify)

## Surveillance des déploiements
- Dashboard Netlify : Historique des builds
- Notifications par email en cas d'échec
- Logs détaillés pour chaque déploiement