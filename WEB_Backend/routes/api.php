<?php

use App\Http\Controllers\AppointmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('offers', [OfferController::class,'index']);
Route::get('offers/{id}', [OfferController::class,'findById']);
Route::get('offers/checkid/{id}', [OfferController::class,'checkId']);
Route::get('offers/search/{searchTerm}', [OfferController::class,'findBySearchTerm']);


// methods which need authentication - JWT Token
Route::group(['middleware' => ['api','auth.jwt']], function(){
    Route::post('offers', [OfferController::class,'save']);
    Route::put('offers/{id}', [OfferController::class,'update']);
    Route::put('offers/updateMessage/{id}', [OfferController::class,'updateMessage']);
    Route::delete('offers/{title}', [OfferController::class,'delete']);
    Route::post('auth/logout', [AuthController::class,'logout']);
    //all appointments
    Route::get('appointments', [AppointmentController::class,'getAllAppointments']);
    //find the current appointment
    Route::get('appointments/{id}', [AppointmentController::class,'findAppointmentById']);
    //update the appointment (book)
    Route::put('appointments/update/{id}', [AppointmentController::class,'updateAppointment']);
});


Route::post('auth/login', [AuthController::class,'login']);

