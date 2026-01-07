<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['restaurant_id', 'nom', 'description', 'image_url'];
    
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
    
    public function dishes()
    {
        return $this->hasMany(Dish::class);
    }
}
