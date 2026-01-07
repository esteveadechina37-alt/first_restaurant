# 🚀 QUICK START - RestauApp

## ⏱️ 15 Minutes pour Démarrer

### ✅ Prérequis
- [ ] PHP 8.2+ installé (`php --version`)
- [ ] Composer 2.5+ installé (`composer --version`)
- [ ] Node.js 18+ installé (`node --version`)
- [ ] MySQL 8.0+ installé et en cours d'exécution
- [ ] Redis installé (optionnel mais recommandé)

### Step 1️⃣ - Clone & Setup (2 min)
```powershell
cd c:\Users\PRIVE\Desktop\Apprentissage\laravel\MesProjets\First_Restaurant

# Installation
composer install
npm install
```

### Step 2️⃣ - Configuration (3 min)
```bash
# Copier env
cp .env.example .env

# Générer clé
php artisan key:generate

# Éditer .env avec vos credentials MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_app
DB_USERNAME=root
DB_PASSWORD=your_password
DB_USERNAME=your_user
DB_PASSWORD=your_password
```

### Step 3️⃣ - Base de Données (5 min)
```bash
# Migrer
php artisan migrate:fresh --seed

# Ou étape par étape
php artisan migrate
php artisan db:seed
```

### Step 4️⃣ - Démarrer (5 min)
Ouvrir 3 terminaux :

**Terminal 1 - Backend API**
```bash
php artisan serve
# → http://localhost:8000
```

**Terminal 2 - React Dev Server**
```bash
npm run dev
# → http://localhost:5173
```

**Terminal 3 - WebSocket (optionnel)**
```bash
php artisan reverb:start
# → http://localhost:8080
```

### 🎉 Démarrage!
- Frontend: **http://localhost:5173**
- API: **http://localhost:8000/api**
- Login: **admin@restaurant.com** / **password123**

---

## 📦 Packages Déjà Installés

### Backend ✅
```
✅ laravel/sanctum (4.2.2)     - API JWT
✅ laravel/reverb (1.7.0)      - WebSocket
✅ stripe/stripe-php           - Paiements
✅ paypal/rest-api-sdk-php     - Paiements
✅ maatwebsite/excel           - Export
✅ barryvdh/laravel-dompdf     - PDF
✅ sentry/sentry-laravel       - Monitoring
```

### Frontend ✅
```
✅ react@18.3.1                - UI Framework
✅ react-router-dom@7.1.0      - Routing
✅ zustand@4.5.5               - State
✅ axios@1.11.0                - HTTP
✅ zod@3.24.1                  - Validation
✅ react-hot-toast@2.4.1       - Notifications
✅ chart.js + react-chartjs-2  - Graphiques
✅ socket.io-client@4.8.2      - WebSocket Client
✅ @stripe/react-stripe-js     - Paiement UI
✅ TailwindCSS@4.0.0           - CSS
✅ @vitejs/plugin-react        - React Plugin
```

---

## 🎯 Structure du Projet

```
First_Restaurant/
├── app/                    # Code PHP
│   ├── Models/            # Eloquent Models (À créer)
│   └── Http/Controllers/  # API Controllers (À créer)
├── resources/js/          # React Code (✅ Prêt)
│   ├── App.jsx            # Composant principal
│   ├── components/        # Composants réutilisables
│   ├── pages/             # Pages (Home, Menu, Orders, etc)
│   ├── services/          # API Client
│   └── store/             # State Management
├── database/
│   └── migrations/        # BD Schema (À créer)
├── routes/
│   └── api.php           # API Routes (À implémenter)
└── package.json          # ✅ Configuré
```

---

## 🔧 Commandes Utiles

```bash
# NPM
npm run dev           # Démarrer Vite
npm run build         # Build production

# PHP/Laravel
php artisan serve            # Démarrer serveur
php artisan migrate:fresh    # Reset DB + seed
php artisan tinker          # Shell interactif

# Database
php artisan make:migration create_xxx_table
php artisan make:model User
php artisan make:controller Api/UserController --api

# Testing
php artisan test
npm run test (à configurer)
```

---

## 📱 Pages React Créées

| Page | Composant | Statut |
|------|-----------|--------|
| **Login** | `pages/auth/Login.jsx` | ✅ Prêt |
| **Dashboard** | `pages/Home.jsx` | ✅ Prêt |
| **Menu** | `pages/Menu.jsx` | ✅ Prêt |
| **Orders** | `pages/Order.jsx` | ✅ Prêt |
| **Analytics** | `pages/Dashboard.jsx` | ✅ Prêt |
| **Layout** | `components/Layout.jsx` | ✅ Prêt |

---

## 🔐 Sécurité - Checklist Rapide

- [ ] Configurer `SANCTUM_STATEFUL_DOMAINS` dans `.env`
- [ ] Activer HTTPS en production
- [ ] Configurer CORS (`config/cors.php`)
- [ ] Rate Limiting (`middleware/ThrottleRequests`)
- [ ] Valider toutes les entrées
- [ ] Configurer Sentry monitoring
- [ ] Configurer logs
- [ ] Backups automatiques

---

## 🚀 Prochain Pas

### Semaine 1
1. [ ] Créer migrations BD
2. [ ] Créer Models Eloquent
3. [ ] Implémenter API Controllers
4. [ ] Tester API avec Postman

### Semaine 2
1. [ ] Connecter React au Backend
2. [ ] Intégration Stripe
3. [ ] WebSocket notifications
4. [ ] Authentification complète

### Semaine 3
1. [ ] Pages complètes (CRUD)
2. [ ] Tests
3. [ ] Optimisations
4. [ ] Déploiement staging

---

## 🆘 Troubleshooting Rapide

**npm install lent?**
```bash
npm cache clean --force
npm install
```

**Erreur MySQL?**
```bash
# Vérifier connection
mysql -u root -p -h 127.0.0.1

# Ou créer la BD manuellement
createdb restaurant_app
```

**Port 8000 déjà utilisé?**
```bash
php artisan serve --port=8001
```

**Dépendances manquantes?**
```bash
composer install
npm install
```

---

## 📚 Documentation

- [INSTALLATION.md](INSTALLATION.md) - Guide détaillé
- [SETUP_COMPLET.md](SETUP_COMPLET.md) - Guide complet
- [RESUME_NPM_REACT.md](RESUME_NPM_REACT.md) - Résumé React
- [ROUTES_API.php](ROUTES_API.php) - Endpoints API

---

## 💡 Tips

1. **Utilisez Postman** pour tester l'API rapidement
2. **Installez Redux DevTools** pour déboguer Zustand
3. **Utilisez VS Code extensions**:
   - ES7+ React/Redux/React-Native snippets
   - Laravel Artisan
   - Thunder Client (tester API)
4. **Enable CORS** pour eviter les erreurs en dev

---

## 🎯 Objectif

**Créer un système professionnel et sécurisé de gestion de restaurant avec:**
- ✅ Authentification JWT
- ✅ Gestion des commandes
- ✅ Gestion des tables
- ✅ Paiements intégrés
- ✅ Notifications real-time
- ✅ Analytics/Dashboard
- ✅ Exports PDF/Excel

---

**Status**: 🟢 PRÊT À DÉVELOPPER

Besoin d'aide ? Consultez les fichiers MD ou lancez `php artisan tinker` pour explorer la BD!

**Happy Coding! 🚀**