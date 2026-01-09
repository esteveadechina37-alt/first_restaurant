<?php

use Illuminate\Support\Facades\Route;

// Serve React SPA for all non-API routes
Route::fallback(function () {
    return file_get_contents(public_path('index.html'));
});
