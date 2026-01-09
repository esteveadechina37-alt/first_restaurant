#!/bin/bash
set -e
# Railway Build Script

echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

echo "📦 Installing Node dependencies..."
npm install --omit=dev

echo "🏗️ Building React frontend..."
npm run build

echo "🔑 Setting up Laravel environment..."
# Copy .env.production to .env if .env doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env from .env.production"
    cp .env.production .env
else
    echo ".env already exists"
fi

# Ensure APP_KEY is set (CRITICAL)
echo "🔑 Ensuring APP_KEY is set..."
if ! grep -q "^APP_KEY=" .env; then
    echo "APP_KEY=base64:hmNATPHrfSfHLf7pRXzAFOyuHbCz/P+YvVtQvPR+gMQ=" >> .env
fi

# Set app to production
sed -i 's/APP_ENV=.*/APP_ENV=production/' .env
sed -i 's/APP_DEBUG=.*/APP_DEBUG=false/' .env

echo "🗄️ Clearing cache and caches..."
php artisan config:clear || true
php artisan cache:clear || true

echo "🗄️ Running migrations..."
php artisan migrate --force

echo "🔗 Creating storage symlink..."
php artisan storage:link || true

echo "✅ Build completed successfully!"
