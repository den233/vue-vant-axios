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
        DB::table('categories')->insert( 
            ['name'=>'洗发水','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'运动鞋','price'=>600,'pv'=>500,'number'=>1,'category_id'=>1],
            ['name'=>'牙膏','price'=>600,'pv'=>500,'number'=>1,'category_id'=>2],
            ['name'=>'保健品','price'=>600,'pv'=>500,'number'=>1,'category_id'=>3],
            ['name'=>'魔力鞋','price'=>600,'pv'=>500,'number'=>1,'category_id'=>4],
            ['name'=>'美的','price'=>600,'pv'=>500,'number'=>1,'category_id'=>5],
            ['name'=>'格力','price'=>600,'pv'=>500,'number'=>1,'category_id'=>6],
            ['name'=>'眼睛','price'=>600,'pv'=>500,'number'=>1,'category_id'=>7],
            ['name'=>'毛绒玩具','price'=>600,'pv'=>500,'number'=>1,'category_id'=>8],
            ['name'=>'学习用品','price'=>600,'pv'=>500,'number'=>1,'category_id'=>9],
            ['name'=>'手机数码','price'=>600,'pv'=>500,'number'=>1,'category_id'=>10],
            ['name'=>'lv宝宝','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'电视剧','price'=>600,'pv'=>500,'number'=>1,'category_id'=>12],
            ['name'=>'空调家电','price'=>600,'pv'=>500,'number'=>1,'category_id'=>13],
            ['name'=>'办公家具','price'=>600,'pv'=>500,'number'=>1,'category_id'=>14]
        );
     
      
    }
}
