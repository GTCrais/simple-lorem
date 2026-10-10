# Simple Lorem

This is source code for [simplelorem.com](https://www.simplelorem.com/)

## Local setup

Requires PHP 8.4+, Composer, Node.js 20.19+ and [pnpm](https://pnpm.io/).

```bash
composer install
cp .env.example .env
php artisan key:generate
pnpm install
pnpm run build
```

Then adjust `.env` to your environment. Use `pnpm run dev` instead of `pnpm run build` to run the Vite dev server with hot reloading.

## License

Simple Lorem is licensed under the [MIT license](https://opensource.org/licenses/MIT).
