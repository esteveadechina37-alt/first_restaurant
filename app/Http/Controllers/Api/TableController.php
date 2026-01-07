<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Table;
use App\Models\Reservation;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function index(Request $request)
    {
        $query = Table::with('reservations', 'tableOrders');

        if ($request->statut) {
            $query->where('statut', $request->statut);
        }

        if ($request->restaurant_id) {
            $query->where('restaurant_id', $request->restaurant_id);
        }

        return response()->json($query->get());
    }

    public function show(Table $table)
    {
        return response()->json($table->load('reservations', 'tableOrders.order'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'numero' => 'required|integer|unique:tables,numero',
            'capacite' => 'required|integer|min:1',
            'section' => 'nullable|string|max:100',
        ]);

        $table = Table::create([
            ...$validated,
            'statut' => 'disponible',
        ]);

        return response()->json($table, 201);
    }

    public function update(Request $request, Table $table)
    {
        $validated = $request->validate([
            'numero' => 'nullable|integer|unique:tables,numero,' . $table->id,
            'capacite' => 'nullable|integer|min:1',
            'statut' => 'nullable|in:disponible,occupee,reservee,maintenance',
            'section' => 'nullable|string|max:100',
        ]);

        $table->update($validated);

        return response()->json($table);
    }

    public function destroy(Table $table)
    {
        $table->delete();

        return response()->json(['message' => 'Table supprimée']);
    }

    public function updateStatus(Request $request, Table $table)
    {
        $validated = $request->validate([
            'statut' => 'required|in:disponible,occupee,reservee,maintenance',
        ]);

        $table->update(['statut' => $validated['statut']]);

        return response()->json($table);
    }

    public function available(Request $request)
    {
        $tables = Table::where('statut', 'disponible')
            ->where('restaurant_id', $request->restaurant_id)
            ->get();

        return response()->json($tables);
    }

    public function getStatusSummary(Request $request)
    {
        $restaurantId = $request->restaurant_id;

        $summary = [
            'disponible' => Table::where('restaurant_id', $restaurantId)->where('statut', 'disponible')->count(),
            'occupee' => Table::where('restaurant_id', $restaurantId)->where('statut', 'occupee')->count(),
            'reservee' => Table::where('restaurant_id', $restaurantId)->where('statut', 'reservee')->count(),
            'maintenance' => Table::where('restaurant_id', $restaurantId)->where('statut', 'maintenance')->count(),
        ];

        return response()->json($summary);
    }
}
