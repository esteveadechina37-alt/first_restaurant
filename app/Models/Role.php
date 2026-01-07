<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['nom', 'description', 'permissions'];
    
    protected $casts = [
        'permissions' => 'json',
    ];
    
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
