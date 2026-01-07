<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    protected $fillable = ['category_id', 'nom', 'description', 'prix', 'ingredients', 'image_url', 'disponible'];
    
    protected $casts = [
        'prix' => 'decimal:2',
        'ingredients' => 'json',
        'disponible' => 'boolean',
    ];
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    
    public function variants()
    {
        return $this->hasMany(DishVariant::class);
    }
    
    public function allergens()
    {
        return $this->belongsToMany(Allergen::class, 'allergen_dish');
    }
    
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
