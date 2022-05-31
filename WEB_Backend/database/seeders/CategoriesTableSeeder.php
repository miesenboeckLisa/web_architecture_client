<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'title'=>'Mathematik',
            'description'=>'Wir lernen hier das 1+1',
            'picture'=>'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXpPtC26OnDC7uCHDNGgz8cz8H811eiGdpCA&usqp=CAU'
        ]);
    }
}
