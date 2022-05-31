<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        /*DB::table('users')->insert([
            'firstname'=>"Lisa",
            'lastname'=>"Miesenböck",
            'email'=>"lisa@lisa@gmail.com",
            'password'=>"sternchen",
            'number'=>"06609351919",
            'picture'=>"https://m.media-amazon.com/images/I/91DGwmaFdxL._AC_UY218_.jpg",
            'isTutor'=>"1",
            'qualification'=>"FH HAGENBERG - Kommuniktion, Wissen, Medien",
            'slogan'=>"Lebe dein Leben so wie du willst",
            'level'=>"1semester"
        ]);*/

        $user3 = new User();
        $user3->firstname="Emily";
        $user3->lastname="Schausberger";
        $user3->email="emily@rocketstudent.com";
        $user3->password= bcrypt("rocket");
        $user3->number="06641122556";
        $user3->isTutor="1";
        $user3->picture="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGVhY2hlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500";
        $user3->slogan="Never stops learning, because lives never stops teaching";
        $user3->qualification="Pädagogische Hochschule Linz - Fächer: Deutsch, Englisch, Geografie, Informatik";
        $user3->save();

        $appointment3 = Appointment::all()->pluck("id");
        $user3->appointments()->sync($appointment3); //Speichere diese Ids zu dem Buch dazu
        $user3->save();

        $user4 = new User();
        $user4->firstname="Frederik";
        $user4->lastname="Huber";
        $user4->email="frederik@rocketstudent.com";
        $user4->password= bcrypt("rocket");
        $user4->number="06634587777";
        $user4->isTutor="1";
        $user4->picture="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlciUyMG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500";
        $user4->slogan="Code is like humor. When you have to explain it, it’s bad.";
        $user4->qualification="Fachhochschule Hagenberg - Software Engineering";
        $user4->save();

        $appointment4 = Appointment::all()->pluck("id");
        $user4->appointments()->sync($appointment4); //Speichere diese Ids zu dem Buch dazu
        $user4->save();


        $user = new User();
        $user->firstname="Leon";
        $user->lastname="Berger";
        $user->email="leon.leonhardsberger@gmail.com";
        $user->password=bcrypt("rocket");
        $user->number="066412121212";
        $user->isTutor="0";
        $user->picture="https://images.unsplash.com/photo-1554126807-6b10f6f6692a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Ym95fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500";
        $user->save();

        $appointment = Appointment::all()->pluck("id");
        $user->appointments()->sync($appointment); //Speichere diese Ids zu dem Buch dazu
        $user->save();

        $user2 = new User();
        $user2->firstname="Anastiasia";
        $user2->lastname="Krakauer";
        $user2->email="anastasia.k@gmail.com";
        $user2->password=bcrypt("rocket");
        $user2->number="06607878779";
        $user2->isTutor="0";
        $user2->picture="https://images.unsplash.com/photo-1621903570450-b6750dce9350?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHlvdW5nJTIwd29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
        $user2->save();

        $appointment2 = Appointment::all()->pluck("id");
        $user2->appointments()->sync($appointment2); //Speichere diese Ids zu dem Buch dazu
        $user2->save();


    }
}
