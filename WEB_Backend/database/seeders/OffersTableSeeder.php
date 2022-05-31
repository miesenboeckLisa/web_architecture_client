<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Author;
use App\Models\Category;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;

class OffersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*DB::table('offers')->insert([
            'title' => "Wurzelziehen",
            'description' => "Wir lernen den Satz des Pytagoras",
            'message' => "",
            "price"=>40,
            'user_id' => "1",
            'category_id' => "1"
        ]);*/
        $offer = new Offer();
        $offer->title="Wurzelziehen";
        $offer->description="Wir lernen den Satz des Pytagoras";
        $offer->message="TEST";
        $offer->price=450;
        $offer->user_id="1";
        $offer->category_id="1";
        $offer->save();


        //Ein Angebot gehört genau zu einer Kategorie
        $category = new Category();
        $category = $category::all()->first();
        $category->offer()->find($category)->first;
        $offer->save();

        //Ein User kann mehrere Offer erstellen
        //get the first User
        $user = User::all()->first();
        $offer->user()->associate($user);
        //user wieder weg  nehmen mit dissociate();
        $offer->save();


        //Anlegen von Terminen
        $appointment1 = new Appointment();
        $appointment1->date = date("Y-m-d H:i:s");
        $appointment1->end = date("Y-m-d H:i:s");
        $appointment1->begin = date("Y-m-d H:i:s");

        $appointment2 = new Appointment();
        $appointment2->date = date("Y-m-d H:i:s");
        $appointment2->end = date("Y-m-d H:i:s");
        $appointment2->begin = date("Y-m-d H:i:s");
        $appointment2-> isAvailable = "0";

        $offer->appointments()->saveMany([$appointment1, $appointment2]);



        $offer2 = new Offer();
        $offer2->title="Java Tutorium xxl";
        $offer2->description="Wir lernen den Satz des Pytagoras";
        $offer2->message="TEST";
        $offer2->price=450;
        $offer2->user_id="1";
        $offer2->category_id="1";
        $offer2->save();

        //Ein Angebot gehört genau zu einer Kategorie
        $category2 = new Category();
        $category2 = $category2::all()->first();
        $category2->offer()->find($category2)->first;
        $offer2->save();

        //Ein User kann mehrere Offer erstellen
        //get the first User
        $user2 = User::all()->find(2);
        $offer2->user()->associate($user2);
        //user wieder weg  nehmen mit dissociate();
        $offer2->save();


        //Anlegen von Terminen
        $appointment3 = new Appointment();
        $appointment3->date = date("Y-m-d H:i:s");
        $appointment3->end = date("Y-m-d H:i:s");
        $appointment3->begin = date("Y-m-d H:i:s");

        $appointment4 = new Appointment();
        $appointment4->date = date("Y-m-d H:i:s");
        $appointment4->end = date("Y-m-d H:i:s");
        $appointment4->begin = date("Y-m-d H:i:s");
        $appointment4-> isAvailable = "0";

        $offer2->appointments()->saveMany([$appointment3, $appointment4]);


    }
}
