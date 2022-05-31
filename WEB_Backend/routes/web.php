<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Models\Offer;
use App\Http\Controllers\OfferController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', [OfferController::class,'index']);
Route::get('/offers', [OfferController::class,'index']);
Route::get('/offers/{id}',[OfferController::class,'show']);

/*
Route::get('/', function () {
    $offers = DB::table('offers')->get();
//return $books;
    return view('welcome',compact('offers'));
});

Route::get('/offers', function () {
//$books = DB::table('books')->get();
    $offers = Offer::all();
    return view('offers.index',compact('offers'));
});

Route::get('/offers/{id}', function ($id) {
//dd($isbn); //die and dump -> Hilfsfunktion von Laravel
    $offer = Offer::find($id);
//dd($book);
    return view('offers.show',compact('offer'));
});*/

