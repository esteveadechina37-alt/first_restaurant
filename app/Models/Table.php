<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    protected $fillable = ['restaurant_id', 'numero', 'capacite', 'statut', 'section'];
    
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
    
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
    
    public function tableOrders()
    {
        return $this->hasMany(TableOrder::class);
    }
}
