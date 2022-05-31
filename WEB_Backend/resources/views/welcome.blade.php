<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>

    </head>
    <body class="antialiased">
    <ul>
    <?php foreach ($offers as $offer) {?>
    <li><?= $offer->title; ?></li>
    <?php }; ?>
    </ul>
    </body>
</html>

