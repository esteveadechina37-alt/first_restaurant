<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DishController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReportController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Dishes (Menu)
    Route::apiResource('dishes', DishController::class);
    Route::get('/categories', [DishController::class, 'categories']);
    Route::get('/allergens', [DishController::class, 'allergens']);

    // Orders
    Route::apiResource('orders', OrderController::class);
    Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);
    Route::get('/orders/{id}/timeline', [OrderController::class, 'timeline']);

    // Tables
    Route::apiResource('tables', TableController::class);
    Route::patch('/tables/{id}/status', [TableController::class, 'updateStatus']);
    Route::get('/tables/{id}/reservations', [TableController::class, 'reservations']);
    Route::post('/tables/{id}/assign-server', [TableController::class, 'assignServer']);

    // Payments
    Route::apiResource('payments', PaymentController::class);
    Route::post('/payments/{id}/process', [PaymentController::class, 'process']);
    Route::post('/payments/{id}/refund', [PaymentController::class, 'refund']);

    // Reports & Analytics
    Route::get('/reports/sales', [ReportController::class, 'sales']);
    Route::get('/reports/dishes', [ReportController::class, 'popularDishes']);
    Route::get('/reports/performance', [ReportController::class, 'performance']);
    Route::get('/reports/export', [ReportController::class, 'export']);

    // Admin only
    Route::middleware('role:admin,manager')->group(function () {
        Route::post('/backup', [AdminController::class, 'backup']);
        Route::get('/logs', [AdminController::class, 'logs']);
        Route::patch('/settings', [AdminController::class, 'updateSettings']);
    });
});
