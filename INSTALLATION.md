# RestauApp - Système de Gestion de Restaurant

## 📋 Vue d'ensemble

RestauApp est un système professionnel et sécurisé de gestion de restaurant avec :
- ✅ Gestion des commandes (en ligne et sur place)
- ✅ Gestion des tables et réservations
- ✅ Système de paiement intégré (Stripe/PayPal)
- ✅ Dashboard avec statistiques temps réel
- ✅ Notifications WebSocket (Laravel Reverb)
- ✅ Exports PDF/Excel
- ✅ Architecture moderne (Laravel 12 + React 18)

---

## 🛠️ Stack Technologique

### Backend
- **Framework**: Laravel 12 (PHP 8.2+)
- **BD**: MySQL 8.0+ (recommandé)
- **Cache**: Redis
- **Auth**: Laravel Sanctum (API JWT)
- **WebSocket**: Laravel Reverb
- **Paiements**: Stripe + PayPal

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS v4
- **State Management**: Zustand
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Charts**: Chart.js

### Dev Tools
- **Testing**: Pest
- **Linting**: Pint
- **Monitoring**: Sentry
- **Debug**: Laravel DebugBar
- **API Docs**: Swagger

---

## 📦 Installation

### Prérequis
```
- Node.js 18+
- PHP 8.2+
- Composer 2.5+
- MySQL 8.0+
- Redis (optionnel mais recommandé)
```

### 1. Cloner le projet
```bash
git clone <repo-url>
cd First_Restaurant
```

### 2. Installation Backend
```bash
# Installer les dépendances PHP
composer install

# Copier l'env
cp .env.example .env

# Générer la clé
php artisan key:generate

# Publier les configs
php artisan vendor:publish --tag=sanctum-config --force
php artisan vendor:publish --tag=reverb-config --force
```

### 3. Configuration BD
```bash
# Éditer .env avec les credentials MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_app
DB_USERNAME=root
DB_PASSWORD=your_password

# Migrer
php artisan migrate --seed
```

### 4. Installation Frontend
```bash
# Installer les dépendances NPM
npm install

# Créer le fichier .env frontend
echo "VITE_API_URL=http://localhost:8000/api" > .env.local
echo "VITE_STRIPE_PUBLIC_KEY=pk_test_your_key" >> .env.local
```

### 5. Démarrer l'application
```bash
# Terminal 1 - Server Laravel
php artisan serve

# Terminal 2 - WebSocket (Reverb)
php artisan reverb:start

# Terminal 3 - Vite (React)
npm run dev

# Terminal 4 (optionnel) - Queue
php artisan queue:listen
```

L'application est accessible à : **http://localhost:5173**
API : **http://localhost:8000/api**

---

## 🗂️ Structure du Projet

```
First_Restaurant/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # API Controllers
│   │   └── Requests/          # Form Requests
│   ├── Models/                # Eloquent Models
│   └── Services/              # Business Logic
├── database/
│   ├── migrations/            # BD Migrations
│   ├── factories/             # Factories pour tests
│   └── seeders/               # Seeders de données
├── routes/
│   ├── api.php                # API Routes
│   └── web.php                # Web Routes
├── resources/
│   ├── js/
│   │   ├── components/        # Composants React
│   │   ├── pages/             # Pages React
│   │   ├── services/          # Services API
│   │   ├── store/             # Store Zustand
│   │   └── App.jsx            # App Principal
│   └── css/
│       └── app.css            # TailwindCSS
└── public/                    # Assets statiques
```

---

## 🔐 Sécurité - Checklist

- [x] HTTPS en production
- [x] Sanctum pour authentification API
- [x] Validation stricte des entrées
- [x] Protection CSRF
- [x] Rate Limiting
- [x] Chiffrage données sensibles
- [x] CORS configuré
- [x] Audit logs
- [ ] 2FA (À implémenter)
- [ ] GDPR compliance (À completer)

---

## 📊 Modules Implémentés

### ✅ Authentification
- Login / Register
- JWT Tokens (Sanctum)
- Rôles & Permissions

### ✅ Gestion des Menus
- CRUD Dishes
- Catégories
- Allergènes
- Variantes (tailles, options)
- Stock en temps réel

### ✅ Commandes
- Commandes en ligne
- Commandes sur place
- Statuts (Pending → Preparing → Ready → Delivered)
- Historique
- Notes spéciales

### ✅ Tables
- Plan du restaurant
- Statuts (Libre, Occupée, Réservée)
- Affectation serveurs
- Réservations

### 🔄 En cours
- [ ] Intégration Stripe
- [ ] Intégration PayPal
- [ ] Notifications SMS (Twilio)
- [ ] Export PDF/Excel
- [ ] Rapports avancés

---

## 🧪 Tests

```bash
# Tests unitaires
php artisan test

# Tests avec coverage
php artisan test --coverage

# Tests Frontend
npm run test
```

---

## 📝 API Documentation

### Authentification
```bash
POST /api/login
POST /api/register
POST /api/logout
GET  /api/me
```

### Dishes (Menu)
```bash
GET    /api/dishes
GET    /api/dishes/{id}
POST   /api/dishes (Admin)
PUT    /api/dishes/{id} (Admin)
DELETE /api/dishes/{id} (Admin)
```

### Orders (Commandes)
```bash
GET    /api/orders
GET    /api/orders/{id}
POST   /api/orders
PATCH  /api/orders/{id} (Mise à jour statut)
POST   /api/orders/{id}/cancel
```

### Tables
```bash
GET    /api/tables
PATCH  /api/tables/{id} (Mise à jour statut)
```

### Payments
```bash
POST   /api/payments
POST   /api/payments/{id}/process
```

---

## 🚀 Déploiement

### Production
```bash
# Optimize
composer install --optimize-autoloader
npm run build

# Migrate
php artisan migrate --force

# Cache
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Hosting recommandé
- **Serveur**: DigitalOcean / AWS EC2 / Heroku
- **BD**: PostgreSQL Managed (AWS RDS / DO)
- **Cache**: Redis Cloud / Upstash
- **Storage**: AWS S3 / DigitalOcean Spaces
- **Email**: SendGrid / AWS SES
- **SMS**: Twilio / AWS SNS

---

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📞 Support

Pour toute question ou problème :
- 📧 Email: support@restaurapp.com
- 💬 Discord: [Lien Discord]
- 🐛 Issues: [GitHub Issues]

---

## 📄 License

Ce projet est sous license MIT. Voir [LICENSE](LICENSE) pour plus de détails.

---

**Dernière mise à jour**: 7 janvier 2026
**Version**: 1.0.0 (Beta)