<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderTimeline extends Model
{
    protected $fillable = ['order_id', 'statut', 'description', 'timestamp'];
    
    protected $casts = [
        'timestamp' => 'datetime',
    ];
    
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
