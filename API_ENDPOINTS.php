<?php

/**
 * ENDPOINTS API - Phase 3 Complète
 * 
 * Ce fichier documente tous les endpoints REST créés
 */

$endpoints = [
    // ========== AUTHENTIFICATION ==========
    'auth' => [
        'POST /api/auth/login' => 'Connexion (email, password)',
        'POST /api/auth/register' => 'Inscription (name, email, password, password_confirmation)',
        'POST /api/auth/logout' => 'Déconnexion [AUTH REQUIRED]',
        'GET /api/auth/me' => 'Profil utilisateur [AUTH REQUIRED]',
        'PUT /api/auth/profile' => 'Mise à jour profil [AUTH REQUIRED]',
    ],

    // ========== GESTION DES PLATS ==========
    'dishes' => [
        'GET /api/dishes' => 'Liste des plats (avec filtres: category_id, disponible)',
        'GET /api/dishes/{id}' => 'Détail d\'un plat',
        'POST /api/dishes' => 'Créer un plat [AUTH REQUIRED]',
        'PUT /api/dishes/{id}' => 'Modifier un plat [AUTH REQUIRED]',
        'DELETE /api/dishes/{id}' => 'Supprimer un plat [AUTH REQUIRED]',
        'GET /api/categories/{category_id}/dishes' => 'Plats par catégorie',
        'PATCH /api/dishes/{id}/toggle-availability' => 'Activer/Désactiver disponibilité [AUTH REQUIRED]',
    ],

    // ========== GESTION DES TABLES ==========
    'tables' => [
        'GET /api/tables' => 'Liste des tables (avec filtres: statut, restaurant_id)',
        'GET /api/tables/{id}' => 'Détail d\'une table',
        'POST /api/tables' => 'Créer une table [AUTH REQUIRED]',
        'PUT /api/tables/{id}' => 'Modifier une table [AUTH REQUIRED]',
        'DELETE /api/tables/{id}' => 'Supprimer une table [AUTH REQUIRED]',
        'PATCH /api/tables/{id}/status' => 'Changer statut (disponible, occupee, reservee, maintenance) [AUTH REQUIRED]',
        'GET /api/tables/available' => 'Tables disponibles [AUTH REQUIRED]',
        'GET /api/tables/status-summary' => 'Résumé statuts [AUTH REQUIRED]',
    ],

    // ========== GESTION DES COMMANDES ==========
    'orders' => [
        'GET /api/orders' => 'Liste des commandes (filtres: statut, type_commande) [AUTH REQUIRED]',
        'POST /api/orders' => 'Créer une commande [AUTH REQUIRED]',
        'GET /api/orders/{id}' => 'Détail d\'une commande [AUTH REQUIRED]',
        'PATCH /api/orders/{id}/status' => 'Changer statut (en_attente, confirmee, preparation, prete, livree, annulee) [AUTH REQUIRED]',
        'DELETE /api/orders/{id}/cancel' => 'Annuler une commande [AUTH REQUIRED]',
        'GET /api/my-orders' => 'Mes commandes [AUTH REQUIRED]',
    ],

    // ========== GESTION DES RÉSERVATIONS ==========
    'reservations' => [
        'GET /api/reservations' => 'Liste des réservations [AUTH REQUIRED]',
        'POST /api/reservations' => 'Créer une réservation',
        'GET /api/reservations/{id}' => 'Détail d\'une réservation [AUTH REQUIRED]',
        'PUT /api/reservations/{id}' => 'Modifier une réservation [AUTH REQUIRED]',
        'DELETE /api/reservations/{id}/cancel' => 'Annuler une réservation [AUTH REQUIRED]',
        'POST /api/reservations/check-availability' => 'Vérifier disponibilité',
        'GET /api/reservations/upcoming' => 'Réservations à venir [AUTH REQUIRED]',
    ],

    // ========== GESTION DES PAIEMENTS ==========
    'payments' => [
        'GET /api/payments' => 'Liste des paiements [AUTH REQUIRED]',
        'POST /api/payments' => 'Créer un paiement [AUTH REQUIRED]',
        'GET /api/payments/{id}' => 'Détail d\'un paiement [AUTH REQUIRED]',
        'PATCH /api/payments/{id}/confirm' => 'Confirmer le paiement [AUTH REQUIRED]',
        'PATCH /api/payments/{id}/reject' => 'Rejeter le paiement [AUTH REQUIRED]',
        'PATCH /api/payments/{id}/refund' => 'Rembourser le paiement [AUTH REQUIRED]',
        'GET /api/payments/summary' => 'Résumé des paiements [AUTH REQUIRED]',
        'GET /api/orders/{order_id}/payment' => 'Paiement d\'une commande [AUTH REQUIRED]',
    ],

    // ========== RAPPORTS & STATISTIQUES ==========
    'reports' => [
        'GET /api/reports/daily-revenue' => 'Revenus du jour [AUTH REQUIRED]',
        'GET /api/reports/monthly-revenue' => 'Revenus mensuels [AUTH REQUIRED]',
        'GET /api/reports/order-stats' => 'Statistiques commandes [AUTH REQUIRED]',
        'GET /api/reports/reservation-stats' => 'Statistiques réservations [AUTH REQUIRED]',
        'GET /api/reports/top-dishes' => 'Top 10 plats [AUTH REQUIRED]',
        'GET /api/reports/peak-hours' => 'Heures de pointe [AUTH REQUIRED]',
        'GET /api/reports/customer-metrics' => 'Métriques clients [AUTH REQUIRED]',
    ],
];

echo "✅ PHASE 3 - API CONTROLLERS & ROUTES COMPLÈTES\n";
echo "═══════════════════════════════════════════════════════════\n\n";

$totalEndpoints = 0;
foreach ($endpoints as $category => $routes) {
    echo "📌 " . strtoupper($category) . "\n";
    foreach ($routes as $endpoint => $description) {
        echo "   • $endpoint → $description\n";
        $totalEndpoints++;
    }
    echo "\n";
}

echo "═══════════════════════════════════════════════════════════\n";
echo "📊 STATISTIQUES\n";
echo "   • Contrôleurs créés: 7\n";
echo "   • Endpoints: $totalEndpoints\n";
echo "   • Routes protégées: ~35 (auth: sanctum)\n";
echo "   • Routes publiques: ~8\n";
echo "   • Méthodes HTTP: GET, POST, PUT, PATCH, DELETE\n";
echo "═══════════════════════════════════════════════════════════\n\n";

echo "🚀 UTILISATION\n";
echo "   curl -X GET http://localhost:8000/api/dishes\n";
echo "   curl -X POST http://localhost:8000/api/auth/login \\\n";
echo "     -H \"Content-Type: application/json\" \\\n";
echo "     -d '{\"email\":\"user@example.com\",\"password\":\"password\"}'\n";
echo "\n";

echo "✨ Prochaines étapes:\n";
echo "   1. Intégrer le frontend React avec les API endpoints\n";
echo "   2. Créer les seeders pour données de test\n";
echo "   3. Écrire les tests (Pest)\n";
echo "   4. Configurer Stripe/PayPal webhooks\n";
echo "═══════════════════════════════════════════════════════════\n";
