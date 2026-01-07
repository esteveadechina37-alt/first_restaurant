<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function dailyRevenue(Request $request)
    {
        $date = $request->date ?? now()->toDateString();

        $revenue = Payment::where('statut', 'confirmee')
            ->whereDate('date_paiement', $date)
            ->selectRaw('methode, COUNT(*) as count, SUM(montant) as total')
            ->groupBy('methode')
            ->get();

        $totalDaily = Payment::where('statut', 'confirmee')
            ->whereDate('date_paiement', $date)
            ->sum('montant');

        return response()->json([
            'date' => $date,
            'total' => $totalDaily,
            'by_method' => $revenue,
        ]);
    }

    public function monthlyRevenue(Request $request)
    {
        $year = $request->year ?? now()->year;
        $month = $request->month ?? now()->month;

        $revenue = Payment::where('statut', 'confirmee')
            ->whereYear('date_paiement', $year)
            ->whereMonth('date_paiement', $month)
            ->selectRaw('DATE(date_paiement) as date, SUM(montant) as total')
            ->groupBy(DB::raw('DATE(date_paiement)'))
            ->orderBy('date')
            ->get();

        $totalMonthly = $revenue->sum('total');

        return response()->json([
            'year' => $year,
            'month' => $month,
            'total' => $totalMonthly,
            'daily_breakdown' => $revenue,
        ]);
    }

    public function orderStats(Request $request)
    {
        $stats = [
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('statut', 'en_attente')->count(),
            'confirmed_orders' => Order::where('statut', 'confirmee')->count(),
            'delivered_orders' => Order::where('statut', 'livree')->count(),
            'cancelled_orders' => Order::where('statut', 'annulee')->count(),
            'average_order_value' => Order::where('statut', 'livree')->avg('montant_total'),
            'by_type' => Order::selectRaw('type_commande, COUNT(*) as count, AVG(montant_total) as avg_amount')
                ->groupBy('type_commande')
                ->get(),
        ];

        return response()->json($stats);
    }

    public function reservationStats(Request $request)
    {
        $stats = [
            'total_reservations' => Reservation::count(),
            'upcoming' => Reservation::where('date_reservation', '>=', now()->date())
                ->where('statut', 'confirmee')
                ->count(),
            'completed' => Reservation::where('statut', 'arrivee')->count(),
            'no_shows' => Reservation::where('statut', 'non_arrivee')->count(),
            'cancelled' => Reservation::where('statut', 'annulee')->count(),
            'by_date' => Reservation::where('statut', 'confirmee')
                ->selectRaw('date_reservation, COUNT(*) as count')
                ->groupBy('date_reservation')
                ->orderBy('date_reservation')
                ->limit(7)
                ->get(),
        ];

        return response()->json($stats);
    }

    public function topDishes(Request $request)
    {
        $limit = $request->limit ?? 10;

        $topDishes = DB::table('order_items')
            ->join('dishes', 'order_items.dish_id', '=', 'dishes.id')
            ->selectRaw('dishes.id, dishes.nom, SUM(order_items.quantite) as total_quantity, SUM(order_items.quantite * order_items.prix_unitaire) as total_revenue')
            ->groupBy('dishes.id', 'dishes.nom')
            ->orderByDesc('total_quantity')
            ->limit($limit)
            ->get();

        return response()->json($topDishes);
    }

    public function peakHours(Request $request)
    {
        $peakHours = DB::table('orders')
            ->selectRaw('HOUR(created_at) as hour, COUNT(*) as count, AVG(montant_total) as avg_amount')
            ->groupBy(DB::raw('HOUR(created_at)'))
            ->orderBy('count', 'desc')
            ->get();

        return response()->json($peakHours);
    }

    public function customerMetrics(Request $request)
    {
        $metrics = [
            'total_customers' => DB::table('orders')->distinct('user_id')->count(),
            'repeat_customers' => DB::table('orders')
                ->selectRaw('user_id')
                ->groupBy('user_id')
                ->havingRaw('COUNT(*) > 1')
                ->count(),
            'total_spent_per_customer' => DB::table('orders')
                ->selectRaw('user_id, COUNT(*) as orders, SUM(montant_total) as total_spent')
                ->groupBy('user_id')
                ->orderByDesc('total_spent')
                ->limit(10)
                ->get(),
        ];

        return response()->json($metrics);
    }
}
