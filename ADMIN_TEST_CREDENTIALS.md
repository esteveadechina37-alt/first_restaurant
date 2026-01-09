# 🔐 IDENTIFIANTS DE TEST - ACCÈS ADMIN

## Admin Principal
```
Email: admin@restaurant.test
Mot de passe: Admin123!@#
Rôle: Super Admin
Accès: Toutes les fonctionnalités
```

## Manager (Gérant)
```
Email: manager@restaurant.test
Mot de passe: Manager123!@#
Rôle: Manager
Accès: Commandes, Réservations, Rapports, Employés
```

## Chef (Cuisiner)
```
Email: chef@restaurant.test
Mot de passe: Chef123!@#
Rôle: Chef
Accès: Préparation des plats, Historique des commandes
```

## Serveur
```
Email: waiter@restaurant.test
Mot de passe: Waiter123!@#
Rôle: Waiter
Accès: Prendre les commandes, Gestion des tables
```

## Comment accéder à l'espace Admin?

### 1️⃣ Aller au formulaire de connexion
- URL: `http://localhost:5174/login`
- Ou cliquer sur **"Connexion"** dans la navbar

### 2️⃣ Entrer les identifiants
- Email: `admin@restaurant.test`
- Mot de passe: `Admin123!@#`

### 3️⃣ Cliquer sur "Se Connecter"

### 4️⃣ Accéder au Dashboard
- Le système détecte automatiquement votre rôle
- Un bouton **"Dashboard"** apparaît dans la navbar
- Cliquez pour accéder à l'espace d'administration

## Fonctionnalités Admin

### AdminDashboard (pour Super Admin)
- ✅ Gestion complète des utilisateurs
- ✅ Gestion des rôles et permissions
- ✅ Statistiques complètes (CA, commandes, réservations)
- ✅ Gestion des plats et catégories
- ✅ Gestion des tables
- ✅ Gestion des allergènes
- ✅ Rapports financiers (chiffre d'affaires, taxes)
- ✅ Backup de base de données

### ManagerDashboard (pour Manager)
- ✅ Statistiques des commandes
- ✅ Gestion des réservations
- ✅ Gestion des employés
- ✅ Rapports de performance
- ✅ Gestion des promotions

### ChefDashboard (pour Chef)
- ✅ Commandes en attente
- ✅ Historique des préparations
- ✅ Recettes disponibles

### WaiterDashboard (pour Serveur)
- ✅ Tables disponibles
- ✅ Historique des commandes
- ✅ Status des tables

## 🔄 Données de Test Disponibles

La base de données a été créée avec:
- ✅ 15 plats avec catégories
- ✅ 10 réservations de test
- ✅ 5 tables disponibles
- ✅ 20 commandes historiques
- ✅ 8 utilisateurs avec rôles différents

## Réinitialiser les données?

Si vous voulez repartir de zéro, exécutez:
```bash
php artisan migrate:refresh --seed
```

Cela recréera la base de données avec tous les identifiants de test.

## Notes Importantes ⚠️

- 🚫 Ces identifiants sont UNIQUEMENT pour le test local
- 🔒 NE PAS les utiliser en production
- 🔄 Les données peuvent être réinitialisées à tout moment
- 📱 Les mêmes identifiants fonctionnent sur tous les appareils

## Accès URL Direct

- 📌 Accueil: `http://localhost:5174/`
- 🔑 Connexion: `http://localhost:5174/login`
- 📝 Inscription: `http://localhost:5174/register`
- 🛒 Services: `http://localhost:5174/services`
- ❓ FAQ: `http://localhost:5174/faq`
- 📞 Contact: `http://localhost:5174/contact`
- 📊 Dashboard (après connexion): `http://localhost:5174/dashboard`

---
**Dernière mise à jour:** 9 janvier 2026
**Statut:** ✅ Testé et validé
