<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DishVariant extends Model
{
    protected $fillable = ['dish_id', 'nom', 'prix_supplement', 'options'];
    
    protected $casts = [
        'prix_supplement' => 'decimal:2',
        'options' => 'json',
    ];
    
    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }
}
