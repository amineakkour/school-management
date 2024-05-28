<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response("Application de gestion scolaire... <br /> <small>Developed by Amine Akkour and El Mouda Amine</small>", 200);
});
