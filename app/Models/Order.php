<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['restaurant_id', 'user_id', 'numero_commande', 'montant_total', 'statut', 'type_commande', 'notes'];
    
    protected $casts = [
        'montant_total' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];
    
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
    
    public function timeline()
    {
        return $this->hasMany(OrderTimeline::class);
    }
    
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
    
    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }
    
    public function tableOrder()
    {
        return $this->hasOne(TableOrder::class);
    }
}
