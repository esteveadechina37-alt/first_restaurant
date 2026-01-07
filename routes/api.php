<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DishController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReportController;

// Routes publiques
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

// Dishes - Publique (lecture seule)
Route::get('/dishes', [DishController::class, 'index']);
Route::get('/dishes/{dish}', [DishController::class, 'show']);
Route::get('/categories/{category}/dishes', [DishController::class, 'byCategory']);

// Tables - Publique (consultation)
Route::get('/tables', [TableController::class, 'index']);
Route::get('/tables/{table}', [TableController::class, 'show']);
Route::get('/tables/available', [TableController::class, 'available']);

// Réservations - Publique (création)
Route::post('/reservations', [ReservationController::class, 'store']);
Route::post('/reservations/check-availability', [ReservationController::class, 'checkAvailability']);

// Routes protégées par authentification
Route::middleware('auth:sanctum')->group(function () {
    // Authentification
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);

    // Dishes - Gestion
    Route::post('/dishes', [DishController::class, 'store']);
    Route::put('/dishes/{dish}', [DishController::class, 'update']);
    Route::delete('/dishes/{dish}', [DishController::class, 'destroy']);
    Route::patch('/dishes/{dish}/toggle-availability', [DishController::class, 'toggleAvailability']);

    // Tables - Gestion
    Route::post('/tables', [TableController::class, 'store']);
    Route::put('/tables/{table}', [TableController::class, 'update']);
    Route::delete('/tables/{table}', [TableController::class, 'destroy']);
    Route::patch('/tables/{table}/status', [TableController::class, 'updateStatus']);
    Route::get('/tables/status-summary', [TableController::class, 'getStatusSummary']);

    // Commandes
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);
    Route::delete('/orders/{order}/cancel', [OrderController::class, 'cancel']);
    Route::get('/my-orders', [OrderController::class, 'userOrders']);

    // Réservations
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);
    Route::put('/reservations/{reservation}', [ReservationController::class, 'update']);
    Route::delete('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel']);
    Route::get('/reservations/upcoming', [ReservationController::class, 'upcomingReservations']);

    // Paiements
    Route::get('/payments', [PaymentController::class, 'index']);
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::get('/payments/{payment}', [PaymentController::class, 'show']);
    Route::patch('/payments/{payment}/confirm', [PaymentController::class, 'confirm']);
    Route::patch('/payments/{payment}/reject', [PaymentController::class, 'reject']);
    Route::patch('/payments/{payment}/refund', [PaymentController::class, 'refund']);
    Route::get('/payments/summary', [PaymentController::class, 'getSummary']);
    Route::get('/orders/{order}/payment', [PaymentController::class, 'byOrder']);

    // Rapports et Statistiques
    Route::get('/reports/daily-revenue', [ReportController::class, 'dailyRevenue']);
    Route::get('/reports/monthly-revenue', [ReportController::class, 'monthlyRevenue']);
    Route::get('/reports/order-stats', [ReportController::class, 'orderStats']);
    Route::get('/reports/reservation-stats', [ReportController::class, 'reservationStats']);
    Route::get('/reports/top-dishes', [ReportController::class, 'topDishes']);
    Route::get('/reports/peak-hours', [ReportController::class, 'peakHours']);
    Route::get('/reports/customer-metrics', [ReportController::class, 'customerMetrics']);
});
