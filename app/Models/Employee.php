<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = ['restaurant_id', 'user_id', 'poste', 'salaire', 'date_embauche', 'statut'];
    
    protected $casts = [
        'salaire' => 'decimal:2',
        'date_embauche' => 'date',
    ];
    
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
    
    public function tableOrders()
    {
        return $this->hasMany(TableOrder::class);
    }
}
