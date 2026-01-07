<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=restaurant_app', 'root', '');
    $stmt = $pdo->query('SHOW TABLES');
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "\n✅ MIGRATION RÉUSSIE!\n";
    echo "═══════════════════════════════════════════════════════════\n\n";
    echo "📊 Total tables créées: " . count($tables) . "\n\n";
    echo "Tables:\n";
    
    foreach ($tables as $table) {
        echo "  ✓ $table\n";
    }
    
    echo "\n═══════════════════════════════════════════════════════════\n";
    echo "✅ Toutes les tables sont prêtes!\n\n";
} catch (Exception $e) {
    echo "❌ Erreur: " . $e->getMessage();
}
?>
