<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1️⃣ ROLES (sans FK)
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->unique();
            $table->text('description')->nullable();
            $table->json('permissions')->nullable();
            $table->timestamps();
        });

        // 2️⃣ RESTAURANTS (sans FK)
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('adresse');
            $table->string('telephone');
            $table->string('email')->unique();
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->time('heure_ouverture')->default('09:00');
            $table->time('heure_fermeture')->default('23:00');
            $table->integer('nombre_tables')->default(20);
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->timestamps();
        });

        // 3️⃣ MODIFIER USERS (ajouter FK vers roles + champs)
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->after('id')->constrained('roles')->onDelete('set null');
            $table->string('telephone')->nullable()->after('email');
            $table->string('adresse')->nullable()->after('telephone');
        });

        // 4️⃣ CATEGORIES
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained('restaurants')->onDelete('cascade');
            $table->string('nom');
            $table->text('description')->nullable();
            $table->string('icone')->nullable();
            $table->integer('position')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });

        // 5️⃣ DISHES
        Schema::create('dishes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained('restaurants')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('nom');
            $table->text('description')->nullable();
            $table->decimal('prix', 8, 2);
            $table->string('image')->nullable();
            $table->integer('temps_preparation')->default(15);
            $table->integer('calories')->nullable();
            $table->json('ingredients')->nullable();
            $table->json('allergenes')->nullable();
            $table->boolean('vegetarien')->default(false);
            $table->boolean('disponible')->default(true);
            $table->integer('quantite_stock')->nullable();
            $table->timestamps();
        });

        // 6️⃣ DISH_VARIANTS
        Schema::create('dish_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dish_id')->constrained('dishes')->onDelete('cascade');
            $table->string('nom');
            $table->decimal('prix_supplementaire', 8, 2)->default(0);
            $table->timestamps();
        });

        // 7️⃣ ALLERGENS
        Schema::create('allergens', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->unique();
            $table->text('description')->nullable();
            $table->string('icone')->nullable();
            $table->timestamps();
        });

        // 7b️⃣ PIVOT TABLE - ALLERGEN_DISH
        Schema::create('allergen_dish', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dish_id')->constrained('dishes')->onDelete('cascade');
            $table->foreignId('allergen_id')->constrained('allergens')->onDelete('cascade');
            $table->timestamps();
        });

        // 8️⃣ TABLES
        Schema::create('tables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained('restaurants')->onDelete('cascade');
            $table->string('numero_table');
            $table->integer('nombre_places')->default(4);
            $table->enum('statut', ['libre', 'occupee', 'reservee'])->default('libre');
            $table->enum('localisation', ['interieur', 'terrasse'])->default('interieur');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // 9️⃣ ORDERS
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained('restaurants')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('table_id')->nullable()->constrained('tables')->onDelete('set null');
            $table->string('numero_commande')->unique();
            $table->enum('type', ['sur_place', 'a_emporter', 'livraison'])->default('sur_place');
            $table->enum('statut', ['en_attente', 'confirmee', 'en_preparation', 'prete', 'livree', 'annulee'])->default('en_attente');
            $table->decimal('sous_total', 10, 2);
            $table->decimal('montant_taxe', 10, 2)->default(0);
            $table->decimal('montant_livraison', 10, 2)->default(0);
            $table->decimal('montant_remise', 10, 2)->default(0);
            $table->decimal('montant_total', 10, 2);
            $table->text('notes_client')->nullable();
            $table->text('notes_cuisine')->nullable();
            $table->timestamp('heure_commande')->nullable();
            $table->timestamp('heure_livraison_estimee')->nullable();
            $table->timestamp('heure_livraison_reelle')->nullable();
            $table->timestamps();
        });

        // 🔟 ORDER_ITEMS
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('dish_id')->constrained('dishes')->onDelete('cascade');
            $table->integer('quantite');
            $table->decimal('prix_unitaire', 8, 2);
            $table->decimal('prix_total', 10, 2);
            $table->json('options')->nullable();
            $table->text('notes_special')->nullable();
            $table->timestamps();
        });

        // 1️⃣1️⃣ ORDER_TIMELINE
        Schema::create('order_timeline', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->string('statut');
            $table->text('commentaire')->nullable();
            $table->timestamp('date_statut');
            $table->timestamps();
        });

        // 1️⃣2️⃣ PAYMENTS
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->string('reference_paiement')->unique();
            $table->enum('methode_paiement', ['carte_credit', 'paypal', 'virement', 'especes', 'cheque'])->default('carte_credit');
            $table->enum('statut_paiement', ['en_attente', 'confirme', 'echoue', 'remboursee'])->default('en_attente');
            $table->decimal('montant', 10, 2);
            $table->string('code_transaction')->nullable();
            $table->text('reponse_api')->nullable();
            $table->timestamp('date_paiement')->nullable();
            $table->timestamps();
        });

        // 1️⃣3️⃣ INVOICES
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->string('numero_facture')->unique();
            $table->string('chemin_pdf')->nullable();
            $table->timestamp('date_generation');
            $table->timestamps();
        });

        // 1️⃣4️⃣ RESERVATIONS
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_id')->constrained('tables')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->dateTime('date_reservation');
            $table->time('heure');
            $table->integer('nombre_personnes');
            $table->enum('statut', ['confirmee', 'en_attente', 'annulee'])->default('en_attente');
            $table->text('notes')->nullable();
            $table->string('telephone_contact')->nullable();
            $table->timestamps();
        });

        // 1️⃣5️⃣ TABLE_ORDERS
        Schema::create('table_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_id')->constrained('tables')->onDelete('cascade');
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('server_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });

        // 1️⃣6️⃣ EMPLOYEES
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained('restaurants')->onDelete('cascade');
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('telephone');
            $table->enum('poste', ['cuisinnier', 'serveur', 'gestionnaire', 'administrateur'])->default('serveur');
            $table->decimal('salaire', 10, 2)->nullable();
            $table->date('date_embauche');
            $table->date('date_depart')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });

        // 1️⃣7️⃣ SCHEDULES
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->date('date_travail');
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->integer('nombre_heures_normales')->default(8);
            $table->integer('nombre_heures_supplementaires')->default(0);
            $table->text('notes')->nullable();
            $table->boolean('presente')->default(false);
            $table->timestamps();
        });

        // 1️⃣8️⃣ NOTIFICATIONS
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('type', ['commande', 'paiement', 'livraison', 'reservation', 'systeme'])->default('systeme');
            $table->string('titre');
            $table->text('message');
            $table->string('lien')->nullable();
            $table->timestamp('date_lecture')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // Désactiver les FK temporairement
        Schema::disableForeignKeyConstraints();

        // Supprimer toutes les tables
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('schedules');
        Schema::dropIfExists('employees');
        Schema::dropIfExists('table_orders');
        Schema::dropIfExists('reservations');
        Schema::dropIfExists('invoices');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('order_timeline');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('allergen_dish');
        Schema::dropIfExists('allergens');
        Schema::dropIfExists('dish_variants');
        Schema::dropIfExists('dishes');
        Schema::dropIfExists('tables');
        Schema::dropIfExists('categories');
        // Pas de dropColumn pour users car on ne veut pas supprimer la table
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'role_id')) {
                $table->dropForeignIdFor('roles');
                $table->dropColumn('role_id');
            }
            if (Schema::hasColumn('users', 'telephone')) {
                $table->dropColumn('telephone');
            }
            if (Schema::hasColumn('users', 'adresse')) {
                $table->dropColumn('adresse');
            }
        });
        Schema::dropIfExists('restaurants');
        Schema::dropIfExists('roles');

        // Réactiver les FK
        Schema::enableForeignKeyConstraints();
    }
};
