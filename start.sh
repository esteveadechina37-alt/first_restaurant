#!/bin/bash
# Start Laravel and Vite together

echo "🚀 Démarrage du serveur Laravel et Vite..."

# Installer les dépendances
composer install --no-dev
npm install --omit=dev

# Construire le frontend
npm run build

# Démarrer Laravel
php artisan migrate:fresh --seed
php -S 0.0.0.0:8000 -t public
