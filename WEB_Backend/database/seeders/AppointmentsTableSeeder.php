<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Offer;
use App\Models\User;
use Cassandra\Date;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;

class AppointmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       /* DB::table('appointments')->insert([
            'date' => date("Y-m-d H:i:s"),
            'begin' => date("Y-m-d H:i:s"),
            'end' => date("Y-m-d H:i:s"),
            'isAvailable' => "1",
            'offer_id' => "1"
        ]);*/
        //Appointment finden damit man es hinzufügen kann
        $appointment = new Appointment();
        $appointment-> date = Carbon::createFromFormat("Y.m.d", "2021.04.10", "Europe/Vienna");
        $appointment-> begin = Carbon::createFromTime(13, 00, 00, "Europe/Vienna");
        $appointment-> end = Carbon::createFromTime(17, 00, 00, "Europe/Vienna");


       //$appointment = $appointment::all()->find("2");
        //Vorher muss ich zwischenspeicher, damit ich dir OfferId im Appointment haben und diese anschließend
        //Mit dem User verbinden kann.
        $offer=Offer::all()->first();
        $appointment->offer()->associate($offer);
        $appointment->save();

        //holt mir alle IDs von den Autoren raus
        $user = User::all()->pluck("id");
        $appointment->user()->sync($user); //Speichere diese Ids zu dem Buch dazu
        $appointment->save();
    }
}
