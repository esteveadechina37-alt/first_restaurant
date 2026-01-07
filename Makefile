#!/bin/bash
# ============================================
# 🚀 RestauApp - Commandes Essentielles
# ============================================

# =============== INSTALLATION ===============

# 1. Installer les dépendances
install:
	composer install
	npm install

# 2. Configurer l'environnement
setup:
	cp .env.example .env
	php artisan key:generate
	php artisan migrate:fresh --seed
	npm install

# ============= DÉVELOPPEMENT =============

# Démarrer tous les serveurs (require concurrently)
dev:
	concurrently \
	  "php artisan serve" \
	  "php artisan reverb:start" \
	  "npm run dev" \
	  "php artisan queue:listen --tries=1"

# Ou individuellement:
serve:
	php artisan serve

reverb:
	php artisan reverb:start

vite:
	npm run dev

queue:
	php artisan queue:listen

# ============= DATABASE =============

migrate:
	php artisan migrate

migrate-fresh:
	php artisan migrate:fresh --seed

seed:
	php artisan db:seed

rollback:
	php artisan migrate:rollback

# ============= TESTING =============

test:
	php artisan test

test-coverage:
	php artisan test --coverage

# ============= CODE QUALITY =============

format:
	php artisan pint

lint:
	php artisan pint --test

type-check:
	php artisan type:check

security-audit:
	composer audit
	npm audit

# ============= BUILD =============

build:
	npm run build

build-prod:
	npm run build
	php artisan config:cache
	php artisan route:cache
	php artisan view:cache

# ============= CACHE =============

cache-clear:
	php artisan cache:clear
	php artisan config:clear
	php artisan route:clear
	php artisan view:clear

cache-all:
	php artisan config:cache
	php artisan route:cache
	php artisan view:cache

# ============= API =============

# Générer API token
api-token:
	php artisan tinker
	User::first()->createToken('API Token')

# Tester API (require curl)
test-api:
	curl -X GET http://localhost:8000/api/dishes

# ============= UTILITIES =============

# Ouvrir la base de données
tinker:
	php artisan tinker

# Afficher les routes
routes:
	php artisan route:list

# Afficher les commandes disponibles
help:
	php artisan list

# Créer un nouvel utilisateur
create-user:
	php artisan tinker
	User::create(['name' => 'Admin', 'email' => 'admin@restaurant.com', 'password' => bcrypt('password123')])

# ============= RESET =============

reset:
	php artisan migrate:fresh --seed
	npm run build

clean:
	rm -rf node_modules vendor
	rm -rf public/build
	rm composer.lock package-lock.json

# ============= PRODUCTION =============

deploy:
	git pull origin main
	composer install --no-dev
	npm install --production
	php artisan migrate --force
	npm run build
	php artisan cache:clear

deploy-setup:
	php artisan key:generate
	php artisan passport:install
	php artisan storage:link

# ============= MONITORING =============

logs:
	tail -f storage/logs/laravel.log

monitor:
	php artisan pail

# ============= SYNC =============

# Sync avec server (utiliser rsync)
sync-to-server:
	rsync -avz --exclude node_modules --exclude vendor . user@server:/path/to/app

sync-from-server:
	rsync -avz --exclude node_modules --exclude vendor user@server:/path/to/app . 

.PHONY: install setup dev serve reverb vite queue migrate migrate-fresh seed rollback test test-coverage format lint type-check security-audit build build-prod cache-clear cache-all api-token test-api tinker routes help create-user reset clean deploy deploy-setup logs monitor sync-to-server sync-from-server