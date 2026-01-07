<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = ['order_id', 'dish_id', 'quantite', 'prix_unitaire', 'notes'];
    
    protected $casts = [
        'prix_unitaire' => 'decimal:2',
    ];
    
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    
    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }
}
