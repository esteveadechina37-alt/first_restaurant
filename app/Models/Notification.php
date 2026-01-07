<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['user_id', 'type', 'titre', 'message', 'data', 'est_lue', 'date_lecture'];
    
    protected $casts = [
        'data' => 'json',
        'est_lue' => 'boolean',
        'date_lecture' => 'datetime',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
