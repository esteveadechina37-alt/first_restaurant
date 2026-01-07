<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['table_id', 'nom_client', 'telephone', 'nombre_personnes', 'date_reservation', 'heure_reservation', 'statut', 'notes'];
    
    protected $casts = [
        'date_reservation' => 'date',
        'heure_reservation' => 'time',
    ];
    
    public function table()
    {
        return $this->belongsTo(Table::class);
    }
}
