# 📊 DOCUMENTATION COMPLÈTE - RÔLE DE CHAQUE TABLE

**Système de Gestion de Restaurant**  
**Base de Données**: MySQL 8.0+  
**Date**: 7 Janvier 2026

---

## 🏗️ ARCHITECTURE GLOBALE

Les **18 tables métier** (+ 9 tables système Laravel) sont organisées en **7 modules**:

1. **Authentification & Rôles** (3 tables)
2. **Restaurant & Configuration** (2 tables)
3. **Menu & Plats** (4 tables)
4. **Commandes** (4 tables)
5. **Paiements** (2 tables)
6. **Tables & Réservations** (2 tables)
7. **Employés & Horaires** (2 tables)
8. **Notifications** (1 table)

---

## 📋 DÉTAIL DE CHAQUE TABLE

### 🔐 MODULE 1: AUTHENTIFICATION & RÔLES

#### **1. `roles`** (Rôles utilisateur)
```
Rôle: Définir les permissions et niveaux d'accès
```
**Colonnes**:
- `id` → Identifiant unique
- `nom` → Nom du rôle (admin, manager, serveur, cuisinier, client)
- `description` → Description du rôle
- `permissions` (JSON) → Permissions associées au rôle
- `timestamps` → Créé/Modifié

**Utilité**:
- Créer une hiérarchie d'utilisateurs
- Contrôler qui peut faire quoi (Admin vs Serveur vs Client)
- Gérer les accès au dashboard

**Relations**:
- `users` (1:N) → Un rôle pour plusieurs utilisateurs

**Exemple de données**:
```json
{
  "id": 1,
  "nom": "administrateur",
  "permissions": ["view_dashboard", "manage_orders", "manage_staff", "edit_menu"]
}
```

---

#### **2. `users`** (Utilisateurs du système)
```
Rôle: Stocker tous les utilisateurs (clients, serveurs, admin)
```
**Colonnes**:
- `id` → Identifiant unique
- `role_id` (FK→roles) → Rôle de l'utilisateur
- `name` → Nom complet
- `email` → Email (unique)
- `password` → Mot de passe (hashé)
- `telephone` → Numéro de téléphone
- `adresse` → Adresse du client
- `timestamps` → Créé/Modifié

**Utilité**:
- Stocker les infos de login
- Différencier clients, serveurs, admin
- Suivi des clients pour les commandes

**Relations**:
- `role` (N:1) → users.role_id → roles.id
- `orders` (1:N) → Un user pour plusieurs commandes
- `reservations` (1:N) → Un user pour plusieurs réservations
- `notifications` (1:N) → Un user pour plusieurs notifications

**Exemple de données**:
```json
{
  "id": 1,
  "role_id": 1,
  "name": "Jean Dupont",
  "email": "jean@restaurant.com",
  "telephone": "06 12 34 56 78",
  "adresse": "123 Rue de Paris"
}
```

---

### 🏢 MODULE 2: RESTAURANT & CONFIGURATION

#### **3. `restaurants`** (Configuration du restaurant)
```
Rôle: Stocker les informations du restaurant
```
**Colonnes**:
- `id` → Identifiant unique
- `nom` → Nom du restaurant
- `adresse` → Adresse physique
- `telephone` → Téléphone principal
- `email` → Email de contact
- `description` → Description/présentation
- `logo` → URL du logo
- `heure_ouverture` → Heure d'ouverture (09:00)
- `heure_fermeture` → Heure de fermeture (23:00)
- `nombre_tables` → Nombre total de tables (20)
- `latitude` / `longitude` → Coordonnées GPS
- `timestamps` → Créé/Modifié

**Utilité**:
- Information centrale du restaurant
- Affichage sur le site/app
- Horaires d'ouverture
- Localisation GPS

**Relations**:
- `categories` (1:N) → Les plats du restaurant
- `dishes` (1:N) → Tous les plats
- `tables` (1:N) → Les tables du restaurant
- `employees` (1:N) → L'équipe
- `orders` (1:N) → Les commandes

**Exemple de données**:
```json
{
  "id": 1,
  "nom": "La Belle Cuisine",
  "adresse": "42 Avenue des Champs",
  "heure_ouverture": "09:00",
  "heure_fermeture": "23:00",
  "nombre_tables": 20,
  "latitude": 48.8566,
  "longitude": 2.3522
}
```

---

### 🍽️ MODULE 3: MENU & PLATS

#### **4. `categories`** (Catégories de plats)
```
Rôle: Organiser les plats par catégorie
```
**Colonnes**:
- `id` → Identifiant unique
- `restaurant_id` (FK→restaurants) → Restaurant propriétaire
- `nom` → Nom de la catégorie (Entrées, Plats, Desserts)
- `description` → Description
- `icone` → URL de l'icône
- `position` → Ordre d'affichage (0, 1, 2...)
- `actif` → Afficher/masquer la catégorie
- `timestamps` → Créé/Modifié

**Utilité**:
- Organiser le menu
- Affichage structuré sur l'app client
- Navigation claire pour les clients

**Relations**:
- `restaurant` (N:1) → categories.restaurant_id → restaurants.id
- `dishes` (1:N) → Une catégorie pour plusieurs plats

**Exemple de données**:
```json
{
  "id": 1,
  "restaurant_id": 1,
  "nom": "Entrées",
  "position": 0,
  "actif": true
}
```

---

#### **5. `dishes`** (Plats du menu)
```
Rôle: Stocker tous les plats avec détails nutritionnels
```
**Colonnes**:
- `id` → Identifiant unique
- `restaurant_id` (FK→restaurants) → Restaurant propriétaire
- `category_id` (FK→categories) → Catégorie du plat
- `nom` → Nom du plat
- `description` → Description du plat
- `prix` → Prix en euros (8.99, 15.50)
- `image` → URL de l'image
- `temps_preparation` → Minutes nécessaires (15, 30)
- `calories` → Calories du plat
- `ingredients` (JSON) → Liste des ingrédients
- `allergenes` (JSON) → Allergènes contenus
- `vegetarien` → Booléen (vrai/faux)
- `disponible` → Est disponible actuellement
- `quantite_stock` → Quantité restante (null = illimitée)
- `timestamps` → Créé/Modifié

**Utilité**:
- Base du menu client
- Affichage sur l'app
- Gestion du stock
- Information allergènes (CRITIQUE pour la sécurité)

**Relations**:
- `restaurant` (N:1) → dishes.restaurant_id → restaurants.id
- `category` (N:1) → dishes.category_id → categories.id
- `variants` (1:N) → Un plat pour plusieurs variantes (tailles)
- `allergens` (N:N) → Plusieurs allergènes par plat
- `order_items` (1:N) → Un plat dans plusieurs commandes

**Exemple de données**:
```json
{
  "id": 1,
  "restaurant_id": 1,
  "category_id": 1,
  "nom": "Salade César",
  "prix": 12.99,
  "temps_preparation": 5,
  "calories": 350,
  "ingredients": ["laitue", "croutons", "parmesan", "sauce"],
  "allergenes": ["gluten", "laitier"],
  "vegetarien": true,
  "disponible": true
}
```

---

#### **6. `dish_variants`** (Variantes des plats: tailles, options)
```
Rôle: Gérer les options d'un plat (Petit/Moyen/Grand)
```
**Colonnes**:
- `id` → Identifiant unique
- `dish_id` (FK→dishes) → Plat parent
- `nom` → Nom de la variante (Petit, Moyen, Grand)
- `prix_supplementaire` → Surcoût (0, 2.00, 4.50)
- `timestamps` → Créé/Modifié

**Utilité**:
- Proposer des tailles (Petit: +0€, Moyen: +2€, Grand: +4€)
- Options supplémentaires (Supplément sauce: +0.50€)
- Flexibilité du menu

**Relations**:
- `dish` (N:1) → dish_variants.dish_id → dishes.id
- `order_items` (réference via JSON) → Lié aux commandes

**Exemple de données**:
```json
{
  "id": 1,
  "dish_id": 5,
  "nom": "Petit (+0€)",
  "prix_supplementaire": 0
},
{
  "id": 2,
  "dish_id": 5,
  "nom": "Grand (+3€)",
  "prix_supplementaire": 3.00
}
```

---

#### **7. `allergens`** (Allergènes alimentaires)
```
Rôle: Lister les allergènes et les associer aux plats
```
**Colonnes**:
- `id` → Identifiant unique
- `nom` → Nom de l'allergène (gluten, arachides, lactose)
- `description` → Description
- `icone` → Icône pour l'affichage
- `timestamps` → Créé/Modifié

**Utilité**:
- Sécurité alimentaire CRITIQUE
- Affichage des logos allergènes sur le menu
- Alerter les clients avec allergies

**Relations**:
- `dishes` (N:N via allergen_dish) → Plusieurs allergènes par plat

**Exemple de données**:
```json
{
  "id": 1,
  "nom": "Gluten",
  "icone": "🌾"
},
{
  "id": 2,
  "nom": "Arachides",
  "icone": "🥜"
}
```

---

#### **8. `allergen_dish`** (Pivot: Association plats ↔ allergènes)
```
Rôle: Relation N:N entre dishes et allergens
```
**Colonnes**:
- `id` → Identifiant unique
- `dish_id` (FK→dishes) → Plat
- `allergen_id` (FK→allergens) → Allergène
- `timestamps` → Créé/Modifié

**Utilité**:
- Lier plusieurs allergènes à un plat
- Exemple: "Pâtes" → contient [gluten, lactose]

**Relations**:
- `dish` (N:1) → allergen_dish.dish_id → dishes.id
- `allergen` (N:1) → allergen_dish.allergen_id → allergens.id

**Exemple de données**:
```
dish_id=5 (Pâtes Carbonara) → allergen_id=1 (Gluten)
dish_id=5 (Pâtes Carbonara) → allergen_id=3 (Laitier)
```

---

### 📦 MODULE 4: COMMANDES

#### **9. `orders`** (Commandes clients)
```
Rôle: Enregistrer TOUTES les commandes (restaurant/livraison)
```
**Colonnes**:
- `id` → Identifiant unique
- `restaurant_id` (FK→restaurants) → Restaurant
- `user_id` (FK→users, nullable) → Client (null = commande anonyme)
- `table_id` (FK→tables, nullable) → Table (null = livraison)
- `numero_commande` → Numéro unique (CMD-001, CMD-002)
- `type` → Type (sur_place / a_emporter / livraison)
- `statut` → État (en_attente → confirmee → en_preparation → prete → livree → annulee)
- `sous_total` → Somme avant taxes
- `montant_taxe` → TVA appliquée
- `montant_livraison` → Frais de livraison (0 si sur place)
- `montant_remise` → Réduction appliquée
- `montant_total` → Montant final
- `notes_client` → Demandes spéciales du client
- `notes_cuisine` → Instructions pour la cuisine
- `heure_commande` → Quand commandé
- `heure_livraison_estimee` → Quand sera prêt
- `heure_livraison_reelle` → Quand réellement prêt
- `timestamps` → Créé/Modifié

**Utilité**:
- Cœur du système de gestion
- Suivi complet des commandes
- Historique pour analytics
- Génération de factures

**Relations**:
- `restaurant` (N:1) → orders.restaurant_id → restaurants.id
- `user` (N:1, nullable) → orders.user_id → users.id
- `table` (N:1, nullable) → orders.table_id → tables.id
- `order_items` (1:N) → Les plats de la commande
- `order_timeline` (1:N) → Historique des statuts
- `payments` (1:N) → Les paiements
- `invoices` (1:N) → Les factures
- `table_orders` (1:N) → Lien table

**Exemple de données**:
```json
{
  "id": 1,
  "restaurant_id": 1,
  "user_id": 5,
  "numero_commande": "CMD-001",
  "type": "livraison",
  "statut": "en_preparation",
  "sous_total": 35.00,
  "montant_taxe": 6.65,
  "montant_livraison": 2.50,
  "montant_total": 44.15,
  "heure_commande": "2026-01-07 12:30:00",
  "heure_livraison_estimee": "2026-01-07 13:00:00"
}
```

---

#### **10. `order_items`** (Éléments d'une commande)
```
Rôle: Stocker LES PLATS dans chaque commande
```
**Colonnes**:
- `id` → Identifiant unique
- `order_id` (FK→orders) → Commande parent
- `dish_id` (FK→dishes) → Plat commandé
- `quantite` → Nombre d'exemplaires (2, 3...)
- `prix_unitaire` → Prix du plat au moment de la commande (8.99)
- `prix_total` → quantite × prix_unitaire
- `options` (JSON) → Options sélectionnées ({"taille": "Grand", "sauce": "BBQ"})
- `notes_special` → Notes du client pour ce plat
- `timestamps` → Créé/Modifié

**Utilité**:
- Détail de chaque commande
- Exemple: "2× Salade César + 1× Pizza"
- Historique des prix (important si modification)
- Notes spéciales par plat (sans oignons, etc)

**Relations**:
- `order` (N:1) → order_items.order_id → orders.id
- `dish` (N:1) → order_items.dish_id → dishes.id

**Exemple de données**:
```json
{
  "id": 1,
  "order_id": 1,
  "dish_id": 5,
  "quantite": 2,
  "prix_unitaire": 12.99,
  "prix_total": 25.98,
  "options": {"taille": "Grand"},
  "notes_special": "Sans anchois"
}
```

---

#### **11. `order_timeline`** (Historique des statuts)
```
Rôle: Tracer TOUS les changements de statut d'une commande
```
**Colonnes**:
- `id` → Identifiant unique
- `order_id` (FK→orders) → Commande
- `statut` → Nouveau statut (en_attente, confirmee, etc)
- `commentaire` → Raison du changement (Cuisinnier: "Prise en charge")
- `date_statut` → Quand le statut a changé
- `timestamps` → Créé/Modifié

**Utilité**:
- Audit complet de la commande
- Notifications client en temps réel
- Analytics (temps moyen en cuisine, etc)
- Traçabilité légale

**Relations**:
- `order` (N:1) → order_timeline.order_id → orders.id

**Exemple de données**:
```json
{
  "id": 1,
  "order_id": 1,
  "statut": "confirmee",
  "commentaire": "Commande confirmée par le serveur",
  "date_statut": "2026-01-07 12:31:00"
},
{
  "id": 2,
  "order_id": 1,
  "statut": "en_preparation",
  "commentaire": "Prise en charge par la cuisine",
  "date_statut": "2026-01-07 12:32:00"
}
```

---

### 💳 MODULE 5: PAIEMENTS

#### **12. `payments`** (Paiements des commandes)
```
Rôle: Enregistrer TOUS les paiements (Stripe, PayPal, espèces)
```
**Colonnes**:
- `id` → Identifiant unique
- `order_id` (FK→orders) → Commande à payer
- `reference_paiement` → Numéro unique (PAY-001, PAY-002)
- `methode_paiement` → Carte, PayPal, virement, espèces, chèque
- `statut_paiement` → en_attente / confirme / echoue / remboursee
- `montant` → Montant payé
- `code_transaction` → ID de Stripe/PayPal
- `reponse_api` → Réponse complète de l'API (pour debug)
- `date_paiement` → Quand payé
- `timestamps` → Créé/Modifié

**Utilité**:
- Sécuriser les paiements
- Intégration Stripe/PayPal
- Suivi financier
- Remboursements

**Relations**:
- `order` (N:1) → payments.order_id → orders.id

**Exemple de données**:
```json
{
  "id": 1,
  "order_id": 1,
  "reference_paiement": "PAY-001",
  "methode_paiement": "carte_credit",
  "statut_paiement": "confirme",
  "montant": 44.15,
  "code_transaction": "ch_1234567890abcdef",
  "date_paiement": "2026-01-07 12:45:00"
}
```

---

#### **13. `invoices`** (Factures)
```
Rôle: Générer et stocker les factures PDF
```
**Colonnes**:
- `id` → Identifiant unique
- `order_id` (FK→orders) → Commande facturée
- `numero_facture` → Numéro unique (INV-2026-001)
- `chemin_pdf` → Lien vers le PDF (storage/invoices/INV-2026-001.pdf)
- `date_generation` → Quand générée
- `timestamps` → Créé/Modifié

**Utilité**:
- Génération automatique de factures
- Téléchargement par le client
- Archivage légal
- Comptabilité

**Relations**:
- `order` (N:1) → invoices.order_id → orders.id

**Exemple de données**:
```json
{
  "id": 1,
  "order_id": 1,
  "numero_facture": "INV-2026-001",
  "chemin_pdf": "storage/invoices/INV-2026-001.pdf",
  "date_generation": "2026-01-07 13:00:00"
}
```

---

### 🪑 MODULE 6: TABLES & RÉSERVATIONS

#### **14. `tables`** (Tables physiques du restaurant)
```
Rôle: Gérer les tables du restaurant (placement, statut)
```
**Colonnes**:
- `id` → Identifiant unique
- `restaurant_id` (FK→restaurants) → Restaurant propriétaire
- `numero_table` → Numéro de table (A1, A2, B1)
- `nombre_places` → Capacité (4, 6, 8)
- `statut` → libre / occupee / reservee / nettoyage
- `localisation` → interieur / terrasse
- `notes` → Notes spéciales (près fenêtre, handicapé)
- `timestamps` → Créé/Modifié

**Utilité**:
- Plan interactif du restaurant
- Gestion des réservations
- Statut en temps réel
- Allocation des serveurs

**Relations**:
- `restaurant` (N:1) → tables.restaurant_id → restaurants.id
- `orders` (1:N) → Commandes de cette table
- `reservations` (1:N) → Réservations de cette table
- `table_orders` (1:N) → Lien avec commandes

**Exemple de données**:
```json
{
  "id": 1,
  "restaurant_id": 1,
  "numero_table": "A1",
  "nombre_places": 4,
  "statut": "occupee",
  "localisation": "interieur"
}
```

---

#### **15. `reservations`** (Réservations de tables)
```
Rôle: Gérer les réservations de tables
```
**Colonnes**:
- `id` → Identifiant unique
- `table_id` (FK→tables) → Table réservée
- `user_id` (FK→users, nullable) → Client (null = réservation anonyme)
- `date_reservation` → Date et heure
- `heure` → Heure exacte
- `nombre_personnes` → Combien de personnes
- `statut` → confirmee / en_attente / annulee
- `notes` → Demandes spéciales (anniversaire, terrasse)
- `telephone_contact` → Téléphone pour contact
- `timestamps` → Créé/Modifié

**Utilité**:
- Planning des tables
- Gestion des groupes
- Notifications client
- Optimisation capacité

**Relations**:
- `table` (N:1) → reservations.table_id → tables.id
- `user` (N:1, nullable) → reservations.user_id → users.id

**Exemple de données**:
```json
{
  "id": 1,
  "table_id": 2,
  "user_id": 10,
  "date_reservation": "2026-01-15 19:00:00",
  "nombre_personnes": 6,
  "statut": "confirmee",
  "notes": "Anniversaire, 1 enfant"
}
```

---

#### **16. `table_orders`** (Lien table ↔ commande ↔ serveur)
```
Rôle: Relier une table à sa commande et son serveur
```
**Colonnes**:
- `id` → Identifiant unique
- `table_id` (FK→tables) → Table
- `order_id` (FK→orders) → Commande
- `server_id` (FK→users, nullable) → Serveur responsable
- `timestamps` → Créé/Modifié

**Utilité**:
- Suivi qui sert quelle table
- Gestion du service
- Facturation par table
- Paiements séparés

**Relations**:
- `table` (N:1) → table_orders.table_id → tables.id
- `order` (N:1) → table_orders.order_id → orders.id
- `user` (N:1, nullable) → table_orders.server_id → users.id (serveur)

**Exemple de données**:
```json
{
  "id": 1,
  "table_id": 1,
  "order_id": 1,
  "server_id": 3
}
```

---

### 👥 MODULE 7: EMPLOYÉS & HORAIRES

#### **17. `employees`** (Employés du restaurant)
```
Rôle: Gestion de l'équipe
```
**Colonnes**:
- `id` → Identifiant unique
- `restaurant_id` (FK→restaurants) → Restaurant
- `nom` → Nom de famille
- `prenom` → Prénom
- `email` → Email (unique)
- `telephone` → Téléphone
- `poste` → cuisinnier / serveur / gestionnaire / administrateur
- `salaire` → Salaire mensuel (nullable)
- `date_embauche` → Quand embauché
- `date_depart` → Quand parti (nullable)
- `notes` → Notes internes
- `actif` → Toujours employé?
- `timestamps` → Créé/Modifié

**Utilité**:
- RH du restaurant
- Paies
- Planification
- Contrôle d'accès

**Relations**:
- `restaurant` (N:1) → employees.restaurant_id → restaurants.id
- `schedules` (1:N) → Horaires de travail

**Exemple de données**:
```json
{
  "id": 1,
  "restaurant_id": 1,
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean@restaurant.com",
  "poste": "cuisinnier",
  "salaire": 2200.00,
  "date_embauche": "2025-06-01",
  "actif": true
}
```

---

#### **18. `schedules`** (Horaires de travail)
```
Rôle: Planifier les horaires des employés
```
**Colonnes**:
- `id` → Identifiant unique
- `employee_id` (FK→employees) → Employé
- `date_travail` → Date du jour
- `heure_debut` → Heure d'arrivée (09:00)
- `heure_fin` → Heure de départ (17:00)
- `nombre_heures_normales` → Heures normales (8)
- `nombre_heures_supplementaires` → Heures supplémentaires (0, 1, 2)
- `notes` → Notes (absent, congé, formation)
- `presente` → Venu travailler?
- `timestamps` → Créé/Modifié

**Utilité**:
- Planification hebdomadaire
- Paie (heures supplémentaires)
- Gestion des absences
- Conformité légale

**Relations**:
- `employee` (N:1) → schedules.employee_id → employees.id

**Exemple de données**:
```json
{
  "id": 1,
  "employee_id": 1,
  "date_travail": "2026-01-08",
  "heure_debut": "09:00",
  "heure_fin": "17:00",
  "nombre_heures_normales": 8,
  "nombre_heures_supplementaires": 0,
  "presente": true
}
```

---

### 🔔 MODULE 8: NOTIFICATIONS

#### **19. `notifications`** (Notifications utilisateurs)
```
Rôle: Système de notifications en temps réel
```
**Colonnes**:
- `id` → Identifiant unique
- `user_id` (FK→users) → Utilisateur destinataire
- `type` → commande / paiement / livraison / reservation / systeme
- `titre` → Titre court ("Votre commande est prête")
- `message` → Message complet
- `lien` → URL pour action (orders/1, reservations/5)
- `date_lecture` → Quand lu (nullable = non lu)
- `timestamps` → Créé/Modifié

**Utilité**:
- Notifications push/SMS/email
- Suivi en temps réel
- Engagement client
- Rappels importants

**Relations**:
- `user` (N:1) → notifications.user_id → users.id

**Exemple de données**:
```json
{
  "id": 1,
  "user_id": 5,
  "type": "commande",
  "titre": "Votre commande est prête!",
  "message": "Votre commande CMD-001 est prête à être récupérée",
  "lien": "/orders/1",
  "date_lecture": "2026-01-07 13:15:00"
}
```

---

## 🔄 FLUX DE DONNÉES - EXEMPLE COMPLET

### Scénario: Un client commande en ligne

```
1️⃣ CLIENT CRÉE UN COMPTE
   ↓
   users (id=5, role_id=4 "client")

2️⃣ CLIENT REGARDE LE MENU
   ↓
   Lit: restaurants → categories → dishes → dish_variants
   Vérifie: allergens

3️⃣ CLIENT PASSE COMMANDE
   ↓
   orders (id=1, user_id=5, type="livraison", statut="en_attente")
   ↓
   order_items (Plat 1: Salade, Plat 2: Pizza)
   ↓
   order_timeline (statut="en_attente")

4️⃣ CLIENT PAIE
   ↓
   payments (statut="confirme", methode="carte_credit")

5️⃣ CUISINE PRÉPARE
   ↓
   order_timeline (statut="en_preparation" + timestamp)
   (notifications envoyées au user)

6️⃣ COMMANDE PRÊTE
   ↓
   order_timeline (statut="prete")
   invoices (facture générée)
   (notification "Commande prête")

7️⃣ COMMANDE LIVRÉE
   ↓
   orders (heure_livraison_reelle=NOW())
   order_timeline (statut="livree")
   (notification "Livrée")
```

---

## 📊 STATISTIQUES DES TABLES

| Table | Rôle Principal | Clé Étrangère | Records |
|-------|---|---|---|
| **roles** | Rôles/permissions | - | ~5 |
| **users** | Authentification | roles | ~1000 |
| **restaurants** | Config restaurant | - | 1 |
| **categories** | Menu organisation | restaurants | ~10 |
| **dishes** | Menu items | restaurants, categories | ~100 |
| **dish_variants** | Options plats | dishes | ~300 |
| **allergens** | Allergènes | - | ~15 |
| **allergen_dish** | Plats ↔ allergènes | dishes, allergens | ~500 |
| **tables** | Tables physiques | restaurants | 20 |
| **reservations** | Réservations | tables, users | ~200/mois |
| **orders** | Commandes | restaurants, users, tables | ~1000/mois |
| **order_items** | Détail commandes | orders, dishes | ~3000/mois |
| **order_timeline** | Historique statuts | orders | ~5000/mois |
| **payments** | Paiements | orders | ~1000/mois |
| **invoices** | Factures | orders | ~1000/mois |
| **table_orders** | Table ↔ Commande | tables, orders, users | ~1000/mois |
| **employees** | Employés | restaurants | ~20 |
| **schedules** | Horaires | employees | ~600/mois |
| **notifications** | Notifications | users | ~10000/mois |

---

## ✅ INTÉGRITÉ DES DONNÉES

### Contraintes de clés étrangères:

```
✓ Cascade delete:
  - restaurant deleted → categories, dishes, tables, employees, orders deleted
  - category deleted → dishes deleted
  - dish deleted → dish_variants, order_items deleted
  - order deleted → order_items, payments, invoices, order_timeline deleted
  
✓ Set null:
  - user deleted → orders.user_id = NULL (commande anonyme)
  - table deleted → orders.table_id = NULL (livraison)
  - employee deleted → schedules.employee_id = NULL (jamais)
  
✓ Validations:
  - Email unique (users, employees)
  - Numéro commande unique (orders)
  - Numéro facture unique (invoices)
  - ENUM: statuts valides uniquement
```

---

## 🎯 RÉSUMÉ

✅ **18 tables métier** organisées en **8 modules**  
✅ **Toutes les relations** en place  
✅ **Intégrité référentielle** garantie  
✅ **Prêt pour la Phase 2**: Créer les Models Eloquent  
✅ **Prêt pour la Phase 3**: Implémenter les API Controllers  

---

**Créé le**: 7 Janvier 2026  
**Status**: ✅ COMPLET ET VALIDÉ
