<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Order;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with('order');

        if ($request->statut) {
            $query->where('statut', $request->statut);
        }

        if ($request->methode) {
            $query->where('methode', $request->methode);
        }

        return response()->json($query->latest()->paginate(15));
    }

    public function show(Payment $payment)
    {
        return response()->json($payment->load('order'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'montant' => 'required|numeric|min:0.01',
            'methode' => 'required|in:carte,paypal,especes,cheque',
        ]);

        $order = Order::find($validated['order_id']);

        if ($order->montant_total != $validated['montant']) {
            return response()->json(['error' => 'Montant invalide'], 400);
        }

        $payment = Payment::create([
            ...$validated,
            'statut' => 'en_attente',
            'transaction_id' => 'TXN-' . time(),
            'date_paiement' => now(),
        ]);

        return response()->json($payment, 201);
    }

    public function confirm(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'transaction_id' => 'nullable|string',
        ]);

        $payment->update([
            'statut' => 'confirmee',
            'transaction_id' => $validated['transaction_id'] ?? $payment->transaction_id,
            'date_paiement' => now(),
        ]);

        // Mettre à jour le statut de la commande
        $payment->order->update(['statut' => 'confirmee']);

        return response()->json($payment);
    }

    public function reject(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'raison' => 'nullable|string',
        ]);

        $payment->update(['statut' => 'rejetee']);

        // Mettre à jour le statut de la commande
        $payment->order->update(['statut' => 'en_attente']);

        return response()->json($payment);
    }

    public function refund(Request $request, Payment $payment)
    {
        if ($payment->statut !== 'confirmee') {
            return response()->json(['error' => 'Paiement non confirmé'], 400);
        }

        $payment->update(['statut' => 'remboursee']);
        $payment->order->update(['statut' => 'annulee']);

        return response()->json($payment);
    }

    public function getSummary(Request $request)
    {
        $summary = [
            'total_revenus' => Payment::where('statut', 'confirmee')->sum('montant'),
            'paiements_en_attente' => Payment::where('statut', 'en_attente')->count(),
            'paiements_confirmes' => Payment::where('statut', 'confirmee')->count(),
            'remboursements' => Payment::where('statut', 'remboursee')->count(),
            'methodes' => Payment::where('statut', 'confirmee')
                ->groupBy('methode')
                ->selectRaw('methode, COUNT(*) as count, SUM(montant) as total')
                ->get(),
        ];

        return response()->json($summary);
    }

    public function byOrder(Order $order)
    {
        return response()->json($order->payment);
    }
}
