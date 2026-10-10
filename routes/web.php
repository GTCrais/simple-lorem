<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('fetch-sitemap', [PageController::class, 'sitemap'])->name('fetchSitemap');
Route::get('/', [PageController::class, 'show']);
Route::match(['get', 'post'], '{segments}', [PageController::class, 'show404'])->where('segments', '(.*)');
