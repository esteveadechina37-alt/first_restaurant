<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = ['employee_id', 'jour', 'heure_debut', 'heure_fin', 'type', 'notes'];
    
    protected $casts = [
        'heure_debut' => 'time',
        'heure_fin' => 'time',
    ];
    
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
