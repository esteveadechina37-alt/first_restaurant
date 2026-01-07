<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TableOrder extends Model
{
    protected $fillable = ['table_id', 'order_id', 'employee_id', 'heure_debut_service', 'heure_fin_service'];
    
    protected $casts = [
        'heure_debut_service' => 'datetime',
        'heure_fin_service' => 'datetime',
    ];
    
    public function table()
    {
        return $this->belongsTo(Table::class);
    }
    
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
