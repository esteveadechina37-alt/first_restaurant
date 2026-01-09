#!/bin/bash
# Railway Build Script

echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

echo "📦 Installing Node dependencies..."
npm install --omit=dev

echo "🏗️ Building React frontend..."
npm run build

echo "🔑 Generating Laravel app key..."
php artisan key:generate

echo "🗄️ Running migrations..."
php artisan migrate --force

echo "✅ Build completed successfully!"
