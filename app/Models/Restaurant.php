<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = ['nom', 'description', 'adresse', 'telephone', 'email', 'heure_ouverture', 'heure_fermeture', 'nombre_tables', 'capacite_totale'];
    
    protected $casts = [
        'heure_ouverture' => 'time',
        'heure_fermeture' => 'time',
    ];
    
    public function users()
    {
        return $this->hasMany(User::class);
    }
    
    public function categories()
    {
        return $this->hasMany(Category::class);
    }
    
    public function tables()
    {
        return $this->hasMany(Table::class);
    }
    
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
    
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
