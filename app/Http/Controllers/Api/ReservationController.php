<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $query = Reservation::with('table');

        if ($request->statut) {
            $query->where('statut', $request->statut);
        }

        if ($request->date_from && $request->date_to) {
            $query->whereBetween('date_reservation', [$request->date_from, $request->date_to]);
        }

        return response()->json($query->latest('date_reservation')->paginate(15));
    }

    public function show(Reservation $reservation)
    {
        return response()->json($reservation->load('table'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'table_id' => 'required|exists:tables,id',
            'nom_client' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
            'nombre_personnes' => 'required|integer|min:1',
            'date_reservation' => 'required|date',
            'heure_reservation' => 'required|date_format:H:i',
            'notes' => 'nullable|string',
        ]);

        // Vérifier si la table est disponible
        $conflict = Reservation::where('table_id', $validated['table_id'])
            ->where('date_reservation', $validated['date_reservation'])
            ->where('statut', '!=', 'annulee')
            ->exists();

        if ($conflict) {
            return response()->json(['error' => 'Table non disponible à cette date/heure'], 400);
        }

        $reservation = Reservation::create([
            ...$validated,
            'statut' => 'confirmee',
        ]);

        return response()->json($reservation, 201);
    }

    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'table_id' => 'nullable|exists:tables,id',
            'nom_client' => 'nullable|string|max:255',
            'telephone' => 'nullable|string|max:20',
            'nombre_personnes' => 'nullable|integer|min:1',
            'date_reservation' => 'nullable|date',
            'heure_reservation' => 'nullable|date_format:H:i',
            'statut' => 'nullable|in:confirmee,arrivee,non_arrivee,annulee',
            'notes' => 'nullable|string',
        ]);

        $reservation->update($validated);

        return response()->json($reservation);
    }

    public function cancel(Reservation $reservation)
    {
        if ($reservation->statut === 'annulee') {
            return response()->json(['error' => 'Réservation déjà annulée'], 400);
        }

        $reservation->update(['statut' => 'annulee']);

        return response()->json($reservation);
    }

    public function checkAvailability(Request $request)
    {
        $validated = $request->validate([
            'table_id' => 'required|exists:tables,id',
            'date_reservation' => 'required|date',
            'heure_reservation' => 'required|date_format:H:i',
        ]);

        $conflict = Reservation::where('table_id', $validated['table_id'])
            ->where('date_reservation', $validated['date_reservation'])
            ->where('heure_reservation', $validated['heure_reservation'])
            ->where('statut', '!=', 'annulee')
            ->exists();

        return response()->json(['available' => !$conflict]);
    }

    public function upcomingReservations(Request $request)
    {
        $reservations = Reservation::where('date_reservation', '>=', now()->date())
            ->where('statut', '!=', 'annulee')
            ->with('table')
            ->orderBy('date_reservation')
            ->orderBy('heure_reservation')
            ->get();

        return response()->json($reservations);
    }
}
