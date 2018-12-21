<?php

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
        DB::table('ls_categories')->insert( 
            ['name'=>'洗发水1','price'=>600,'pv'=>500,'number'=>1,'category_id'=>321],
            ['name'=>'运动鞋1','price'=>600,'pv'=>500,'number'=>1,'category_id'=>23]
        );
     
      
    }
}
