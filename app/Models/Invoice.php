<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = ['order_id', 'numero_facture', 'montant_ht', 'montant_ttc', 'tva', 'date_facture', 'statut', 'url_pdf'];
    
    protected $casts = [
        'montant_ht' => 'decimal:2',
        'montant_ttc' => 'decimal:2',
        'tva' => 'decimal:2',
        'date_facture' => 'datetime',
    ];
    
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
