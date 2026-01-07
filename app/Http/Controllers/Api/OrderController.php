<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderTimeline;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['user', 'items.dish', 'payment', 'timeline']);

        if ($request->statut) {
            $query->where('statut', $request->statut);
        }

        if ($request->type_commande) {
            $query->where('type_commande', $request->type_commande);
        }

        return response()->json($query->latest()->paginate(15));
    }

    public function show(Order $order)
    {
        return response()->json($order->load(['user', 'items.dish', 'payment', 'timeline']));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'items' => 'required|array|min:1',
            'items.*.dish_id' => 'required|exists:dishes,id',
            'items.*.quantite' => 'required|integer|min:1',
            'items.*.notes' => 'nullable|string',
            'type_commande' => 'required|in:dine_in,takeaway,delivery',
            'notes' => 'nullable|string',
        ]);

        $order = Order::create([
            'restaurant_id' => $validated['restaurant_id'],
            'user_id' => $request->user()->id,
            'numero_commande' => 'CMD-' . time(),
            'montant_total' => 0,
            'statut' => 'en_attente',
            'type_commande' => $validated['type_commande'],
            'notes' => $validated['notes'] ?? null,
        ]);

        $totalAmount = 0;
        foreach ($validated['items'] as $item) {
            $dish = \App\Models\Dish::find($item['dish_id']);
            $amount = $dish->prix * $item['quantite'];
            $totalAmount += $amount;

            OrderItem::create([
                'order_id' => $order->id,
                'dish_id' => $item['dish_id'],
                'quantite' => $item['quantite'],
                'prix_unitaire' => $dish->prix,
                'notes' => $item['notes'] ?? null,
            ]);
        }

        $order->update(['montant_total' => $totalAmount]);

        OrderTimeline::create([
            'order_id' => $order->id,
            'statut' => 'en_attente',
            'description' => 'Commande créée',
            'timestamp' => now(),
        ]);

        return response()->json($order->load('items'), 201);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'statut' => 'required|in:en_attente,confirmee,preparation,prete,livree,annulee',
        ]);

        $oldStatus = $order->statut;
        $order->update(['statut' => $validated['statut']]);

        OrderTimeline::create([
            'order_id' => $order->id,
            'statut' => $validated['statut'],
            'description' => "Status changé de {$oldStatus} à {$validated['statut']}",
            'timestamp' => now(),
        ]);

        return response()->json($order);
    }

    public function cancel(Order $order)
    {
        if ($order->statut === 'annulee' || $order->statut === 'livree') {
            return response()->json(['error' => 'Impossible d\'annuler cette commande'], 400);
        }

        $order->update(['statut' => 'annulee']);

        OrderTimeline::create([
            'order_id' => $order->id,
            'statut' => 'annulee',
            'description' => 'Commande annulée par l\'utilisateur',
            'timestamp' => now(),
        ]);

        return response()->json($order);
    }

    public function userOrders(Request $request)
    {
        return response()->json($request->user()->orders()->with('items.dish', 'timeline')->latest()->get());
    }
}
