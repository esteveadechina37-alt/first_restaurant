# PHASE 4 SUITE - Roadmap & Prochaines Étapes

## 📋 Tasks Prioritaires

### Batch 1: Pages Menu & Commande (URGENT)
[ ] **Menu.jsx** - Affichage des plats
- Liste catégories horizontale/verticale
- Grid des plats avec images
- Filtrage par catégorie
- Allergènes affichés
- Bouton "Ajouter au panier"
- Pagination

[ ] **OrderPage.jsx** - Panier & Checkout
- Affichage items du panier
- Modification quantités
- Suppression items
- Calcul total
- Sélection type livraison
- Adresse livraison
- Bouton "Commander"
- Redirection paiement

Estimated: **3-4 heures**

### Batch 2: Réservations (IMPORTANT)
[ ] **ReservationsPage.jsx** - Formulaire réservation
- Sélection date/heure
- Nombre de personnes
- Préférences (fumeur, vue, etc)
- Notes spéciales
- Vérification disponibilité
- Confirmation & paiement

[ ] **MyReservations.jsx** - Historique réservations
- Liste réservations
- Statut de chaque
- Modification/annulation
- PDF ticket

Estimated: **2-3 heures**

### Batch 3: Profils Utilisateur (RECOMMANDÉ)
[ ] **ClientProfile.jsx** - Profil client
- Informations personnelles
- Adresses de livraison
- Historique commandes
- Wishlist plats
- Paramètres notifications

[ ] **EmployeeProfile.jsx** - Profil employé
- Informations personnelles
- Heures de travail
- Statut disponibilité
- Performance stats

Estimated: **2 heures**

### Batch 4: Pages Admin Management (ESSENTIEL)
[ ] **AdminEmployees.jsx** - Gestion employés
- Liste employés
- Création nouvel employé (form)
- Modification infos
- Suppression
- Activation/désactivation

[ ] **AdminDishes.jsx** - Gestion menu
- CRUD plats
- Upload images
- Gestion allergènes
- Stock/disponibilité
- Catégorisation

[ ] **AdminTables.jsx** - Gestion tables
- Création tables
- Configuration (capacité, position)
- Disponibilité
- Réservations

[ ] **AdminPayments.jsx** - Historique paiements
- Liste transactions
- Statuts
- Montants
- Export PDF
- Remboursements

[ ] **AdminReports.jsx** - Rapports & Statistiques
- Graphiques chiffre d'affaires
- Top plats
- Heures de pointe
- Performance employés
- Taux satisfaction clients

Estimated: **8-10 heures**

### Batch 5: Intégration Paiement (CRITIQUE)
[ ] Intégration Stripe
- Modal paiement carte bancaire
- Webhook confirmation
- Récupération token

[ ] Intégration MTN Money
- Redirection portail
- Vérification statut
- Confirmation API

Estimated: **4-5 heures**

### Batch 6: Notifications & Real-time (BONUS)
[ ] Push notifications
- Email (Mailtrap)
- SMS (Twilio)
- In-app toast

[ ] WebSockets (Reverb)
- Commandes en temps réel
- Notifications employés
- Chat support

Estimated: **5-6 heures**

---

## 🎯 Ordre de Priorité Recommandé

### PHASE 4.1 - MVP (7-8 jours)
1. Menu.jsx
2. OrderPage.jsx  
3. ReservationsPage.jsx
4. AdminEmployees.jsx (création comptes uniquement)

### PHASE 4.2 - Core Features (10-12 jours)
5. MyReservations.jsx
6. ClientProfile.jsx
7. AdminDishes.jsx
8. AdminTables.jsx

### PHASE 4.3 - Advanced (8-10 jours)
9. AdminPayments.jsx
10. AdminReports.jsx
11. Intégration paiement

### PHASE 4.4 - Polish (5-7 jours)
12. EmployeeProfile.jsx
13. Notifications
14. WebSockets
15. Performance optimization

---

## 🔌 Intégrations API Requises

### Endpoints à Utiliser (déjà créés Phase 3)

**Dishes:**
- GET `/api/dishes` - Lister tous les plats
- GET `/api/dishes/{id}` - Détails plat
- GET `/api/dishes?category={id}` - Par catégorie
- POST `/api/dishes` (admin) - Créer
- PUT `/api/dishes/{id}` (admin) - Modifier
- DELETE `/api/dishes/{id}` (admin) - Supprimer

**Orders:**
- GET `/api/orders` - Lister (admin)
- GET `/api/orders/user` - Mes commandes
- POST `/api/orders` - Créer commande
- GET `/api/orders/{id}` - Détails
- PUT `/api/orders/{id}` - Modifier statut
- POST `/api/orders/{id}/cancel` - Annuler

**Tables:**
- GET `/api/tables` - Lister
- GET `/api/tables/available` - Tables disponibles
- POST `/api/tables` (admin) - Créer
- PUT `/api/tables/{id}` (admin) - Modifier
- DELETE `/api/tables/{id}` (admin) - Supprimer

**Reservations:**
- GET `/api/reservations` - Lister
- GET `/api/reservations/upcoming` - À venir
- POST `/api/reservations` - Créer
- GET `/api/reservations/{id}` - Détails
- PUT `/api/reservations/{id}` - Modifier
- DELETE `/api/reservations/{id}` - Annuler
- POST `/api/reservations/check-availability` - Vérifier dispo

**Employees (à vérifier):**
- GET `/api/employees` - Lister (admin)
- POST `/api/employees` - Créer (admin)
- PUT `/api/employees/{id}` - Modifier
- DELETE `/api/employees/{id}` - Supprimer (admin)

**Payments:**
- GET `/api/payments` - Lister
- POST `/api/payments` - Créer paiement
- PUT `/api/payments/{id}/confirm` - Confirmer
- POST `/api/payments/{id}/refund` - Rembourser

**Reports:**
- GET `/api/reports/daily-revenue` - CA journalier
- GET `/api/reports/monthly-revenue` - CA mensuel
- GET `/api/reports/top-dishes` - Plats populaires
- GET `/api/reports/peak-hours` - Heures de pointe

---

## 🎨 Components à Créer Ensuite

### Menu Components
```jsx
DishCard.jsx        // Card unique plat
CategoriesFilter.jsx // Filtre catégories
CartSummary.jsx     // Résumé panier
CartModal.jsx       // Panier popup
```

### Reservation Components
```jsx
DateTimePicker.jsx      // Sélection date/heure
PartySize.jsx          // Nombre de personnes
ReservationConfirm.jsx // Confirmation
```

### Admin Components
```jsx
DataTable.jsx          // Table générique réutilisable
FormModal.jsx          // Modal création/édition
StatsCard.jsx          // Card statistique
Chart.jsx              // Graphiques (recharts)
```

---

## 📊 Fichiers Zustand à Mettre à Jour

### `stores/orderStore.js`
```javascript
// Ajouter:
- clearCart()
- getTotalPrice()
- getItemCount()
- saveToLocalStorage()
- loadFromLocalStorage()
- updateQuantity(itemId, qty)
- applyDiscount(code, amount)
```

### `stores/authStore.js`
```javascript
// Ajouter:
- getUserRole()
- hasPermission(action)
- isAdmin()
- isEmployee()
```

### Créer `stores/filterStore.js`
```javascript
// Nouveau store:
- selectedCategories
- selectedPriceRange
- selectedDiets (vegetarian, etc)
- sortBy
- setFilters()
- resetFilters()
```

### Créer `stores/notificationStore.js`
```javascript
// Nouveau store:
- notifications []
- addNotification(message, type, duration)
- removeNotification(id)
- clearAll()
```

---

## 🛠️ Dépendances à Installer (Potentiellement)

```bash
# Charts & Visualizations
npm install recharts chart.js react-chartjs-2

# Date/Time Picker
npm install react-datepicker dayjs

# File Upload
npm install react-dropzone

# Image Gallery
npm install react-photo-gallery

# PDF Generation
npm install jspdf html2pdf

# Excel Export
npm install xlsx

# Animations (optionnel - déjà setup)
npm install framer-motion

# Modal Improvements (optionnel)
npm install headlessui @headlessui/react
```

---

## 🧪 Testing Checklist

Pour chaque page nouvelle:
- [ ] Navigation works from all pages
- [ ] Forms submit correctly
- [ ] API calls return expected data
- [ ] Error handling displayed
- [ ] Loading states shown
- [ ] Mobile responsive
- [ ] Auth guards working
- [ ] Toast notifications appear
- [ ] Buttons redirect correctly
- [ ] Validation shows errors

---

## 💾 Database Queries à Supporter

### Restaurant Analytics (Admin Reports)
```sql
-- Top 10 dishes
SELECT d.name, COUNT(oi.id) as orders
FROM dishes d
JOIN order_items oi ON d.id = oi.dish_id
GROUP BY d.id
ORDER BY orders DESC LIMIT 10;

-- Peak hours
SELECT HOUR(o.created_at) as hour, COUNT(*) as count
FROM orders o
GROUP BY hour
ORDER BY count DESC;

-- Revenue by date
SELECT DATE(created_at) as date, SUM(total) as revenue
FROM orders
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(created_at);
```

---

## 🚀 Optimizations à Faire

### Performance
- [ ] Lazy load images with Next Image or similar
- [ ] Code splitting for routes
- [ ] Memoize expensive components
- [ ] Virtual scrolling for large lists
- [ ] Pagination instead of loading all data

### User Experience  
- [ ] Loading skeletons (not spinners)
- [ ] Optimistic updates
- [ ] Undo/Redo for cart
- [ ] Saved cart (localStorage)
- [ ] One-click reorder

### SEO
- [ ] Meta tags on all pages
- [ ] OpenGraph for sharing
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Structured data (JSON-LD)

---

## 📱 Mobile-Specific Considerations

- Bottom navigation for mobile (alt to sidebar)
- Touch-friendly buttons (min 44x44px)
- Simplified forms (fewer fields)
- Vertical scroll priorities
- Mobile-friendly images
- Test on real devices

---

## 🔐 Security Checklist

- [ ] Token refresh mechanism
- [ ] CORS configuration
- [ ] XSS prevention (React auto-escapes)
- [ ] CSRF tokens
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] Admin routes extra validation

---

## 📞 Support & Help

Si vous avez besoin:
- Consulter `PHASE3_SUMMARY.md` pour API details
- Consulter `DATABASE_STRUCTURE.md` pour data model
- Vérifier `API_CONFIG.md` pour endpoints
- Lire `PHASE4_RECAP.md` pour Phase 4 actuelle

---

**Prochaine Session:** Implémenter Batch 1 (Menu & Order)
