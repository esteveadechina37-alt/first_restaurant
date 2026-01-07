<?php
// Script pour remplir tous les modèles avec relations et propriétés

$modelsConfig = [
    'Dish' => [
        'use' => [],
        'fillable' => "['category_id', 'nom', 'description', 'prix', 'ingredients', 'image_url', 'disponible']",
        'casts' => "[\n        'prix' => 'decimal:2',\n        'ingredients' => 'json',\n        'disponible' => 'boolean',\n    ]",
        'methods' => "
    public function category()
    {
        return \$this->belongsTo(Category::class);
    }
    
    public function variants()
    {
        return \$this->hasMany(DishVariant::class);
    }
    
    public function allergens()
    {
        return \$this->belongsToMany(Allergen::class, 'allergen_dish');
    }
    
    public function orderItems()
    {
        return \$this->hasMany(OrderItem::class);
    }"
    ],
    'DishVariant' => [
        'fillable' => "['dish_id', 'nom', 'prix_supplement', 'options']",
        'casts' => "[\n        'prix_supplement' => 'decimal:2',\n        'options' => 'json',\n    ]",
        'methods' => "
    public function dish()
    {
        return \$this->belongsTo(Dish::class);
    }"
    ],
    'Allergen' => [
        'fillable' => "['nom', 'code', 'description']",
        'methods' => "
    public function dishes()
    {
        return \$this->belongsToMany(Dish::class, 'allergen_dish');
    }"
    ],
    'Order' => [
        'use' => "use Illuminate\\Database\\Eloquent\\SoftDeletes;",
        'traits' => "use SoftDeletes;",
        'fillable' => "['restaurant_id', 'user_id', 'numero_commande', 'montant_total', 'statut', 'type_commande', 'notes']",
        'casts' => "[\n        'montant_total' => 'decimal:2',\n        'created_at' => 'datetime',\n        'updated_at' => 'datetime',\n        'deleted_at' => 'datetime',\n    ]",
        'methods' => "
    public function restaurant()
    {
        return \$this->belongsTo(Restaurant::class);
    }
    
    public function user()
    {
        return \$this->belongsTo(User::class);
    }
    
    public function items()
    {
        return \$this->hasMany(OrderItem::class);
    }
    
    public function timeline()
    {
        return \$this->hasMany(OrderTimeline::class);
    }
    
    public function payment()
    {
        return \$this->hasOne(Payment::class);
    }
    
    public function invoice()
    {
        return \$this->hasOne(Invoice::class);
    }
    
    public function tableOrder()
    {
        return \$this->hasOne(TableOrder::class);
    }"
    ],
];

echo "Config ready for models\n";
