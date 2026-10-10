<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Root-relative asset URLs, so they never depend on the scheme the app detects behind a proxy
        Vite::createAssetPathsUsing(fn (string $path) => '/'.$path);
    }
}
